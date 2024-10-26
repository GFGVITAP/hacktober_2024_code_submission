const userModel = require('../models/userModel.js');
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const session = require('express-session')
const MongoDBStore = require("connect-mongodb-session")(session);
require('dotenv').config();
const axios = require("axios");
const puppeteer = require("puppeteer")
const path = require("path");
const fs = require('fs');
const { Groq } = require("groq-sdk");
const uri = process.env.uri
const EMAIL = "colabvitap@gmail.com"
const PASSWORD = process.env.PASSWORD
const store = new MongoDBStore({
    uri: uri,
    collection: "userSession",
});



let config = {
    service: 'Gmail',
    auth: {
        user: EMAIL,
        pass: PASSWORD
    }
}


let transporter = nodemailer.createTransport(config)



exports.index = (req, res) => {
    if (req.session.isAuth == true) {
        return res.redirect('home');
    }
    return res.render('landing');
}

exports.signIn = (req, res) => {
    if (req.session.isAuth == true) {
        return res.redirect('home')
    }
    if (req.device.type === 'phone' || req.device.type === 'tablet') {
        return res.render('signInMobile');
    } else {
        return res.render('signIn');
    }
}




exports.signUp = (req, res) => {
    if (req.device.type === 'phone' || req.device.type === 'tablet') {
        return res.render("signUpMobile")
    }
    else {
        return res.redirect("/signIn#signUp")
    }
}



exports.create = async (req, res) => {
    const { name, email, password } = req.body;


    try {
        const isExist = await userModel.findOne({ email: email });

        if (isExist) {
            return res.render('signIn', { exists: true, pass: true });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create a new user
        const user = await userModel.create({
            name: name,
            email: email,
            password: hash,
            isVerified: false
        });

        // Store user ID in session
        req.session.userId = user._id;
        const host = req.get('host')
        const link = (host == 'localhost:3000') ? `http://${host}/verify/${user._id}` : `https://${host}/verify/${user._id}`

        // Email body and options
        const mailOptions = {
            from: EMAIL,
            to: user.email,
            subject: 'Verify Your Email Address',
            text: `
Hello,

Thank you for signing up with CLEAN

To complete your registration, please verify your email address by clicking the link below:

Verification Link: ${link}

If you did not create an account with us, please disregard this email.

If you have any questions or need assistance, feel free to reply to this email.

Thank you,

            `
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Redirect to the resend email page
        return res.render('verify');
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).send(error.message);
    }
}

exports.emailVerify = async (req, res) => {
    const id = req.params.id;

    try {
        // Attempt to find the user by ID and update the isVerified field
        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            { isVerified: true },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        return res.render('emailVerified');
    } catch (err) {
        console.error(err);
        return res.status(500).send('An error occurred while verifying the email.');
    }
}

exports.authenticate = async (req, res) => {

    try {
        const { S_email } = req.body;
        let isExist = await userModel.findOne({
            $or: [
                { email: S_email },
                { name: S_email }
            ]
        });
        if (!isExist) {
            return res.render('signIn', { trial: false });
        }
        const isMatch = await bcrypt.compare(req.body.S_password, isExist.password);
        if (!isMatch) {
            return res.render('signIn', { trial: false });
        }
        if (isExist.isVerified) {
            req.session.isAuth = true;
            req.session.userId = isExist._id;
            return res.redirect('home')
        }
        else {
            return res.render('verify')
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}

exports.home = async (req, res) => {
    const barcode = 5000159461122;
    let cache = readCacheFile();
    const references = await scraper(cache[barcode].productName + ' health Impacts');
    return res.render('home2', { data: cache[barcode], references })
}

exports.profile = (req, res) => {
    return res.render('profile')
}

exports.edit = (req, res) => {
    return res.render('edit')
}

// Assuming you have set up your session store as 'store'

exports.signOut = (req, res) => {
    const sessionId = req.sessionID;  // Get the session ID

    // Destroy session from the application
    req.session.destroy((err) => {
        if (err) {
            console.log('Error destroying session:', err);
            return res.status(500).send('Error logging out.');
        }

        // Destroy session from MongoDB store with a proper callback
        store.destroy(sessionId, (err) => {
            if (err) {
                console.log('Error deleting session from MongoDB:', err);
                return res.status(500).send('Error logging out.');
            }

            // Optionally clear the cookie
            res.clearCookie('connect.sid', { path: '/' });

            // Redirect to login or home page
            res.redirect('/signIn');
        });
    });
};


const cacheFilePath = path.join(__dirname, './barcodeCache.json');

// Helper to read the file
const readCacheFile = () => {
    if (fs.existsSync(cacheFilePath)) {
        const fileData = fs.readFileSync(cacheFilePath);
        return JSON.parse(fileData);
    }
    return {};
};

// Helper to write data back to file
const writeCacheFile = (data) => {
    fs.writeFileSync(cacheFilePath, JSON.stringify(data, null, 2)); // Pretty print the JSON
};

// Function to handle report generation
exports.report = async (req, res) => {

    console.log('I am Searching');
    const barcode = req.body.barcode;
    console.log(barcode);

    try {
        // Step 1: Check if barcode data exists in file
        let cache = readCacheFile();

        if (cache[barcode]) {
            // Barcode data exists, render the report
            console.log('Cache hit for barcode:', barcode);
            const references = await scraper(cache[barcode].productName + ' health Impacts');
            return res.render('home2', { data: cache[barcode], references });
        }
        const uri = `https://world.openfoodfacts.org/api/v1/product/${barcode}.json`;

        // Step 2: Fetch product data from the API if not cached
        console.log('Cache miss for barcode:', barcode);
        const response = await axios.get(uri);
        const productData = response.data;

        console.log("product:",productData);
        // Check if product data is valid
        if (!productData || !productData.product) {
            throw new Error('Product data is missing or invalid');
        }

        // Prepare the Groq prompt
        const groq = new Groq({
            apiKey: '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',
        });

        const template = `{
	"productInterestingFacts":[3-4 each fact of min 10 words],
	"consumptionIndicator":[on the scale of 1-8 give it a risk number. 1 for minimum risk and 8 for maximum risk],	
	"ingredients":[
	   {
	      "ingredient1":{
			"description":"briefDescription of min 10 words",
			"effects":[2-3 long term effects]
		}
	   }
	]
}`;

        const productName = productData['product']['product_name'];  // Use productData here
        console.log("productName has been identified");
        console.log(productName);
        console.log(productName);
        const prompt = `You are a Nutrition expert. Provide a JSON response only, following this format: ${template}. Include all ingredients with health impacts. If ingredients are encoded, give their full names. Use the product name ${productName} and ingredients from ${productData['product']['ingredients_text']}.`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'llama-3.1-70b-versatile',
        });
        console.log("Raw API Response:", chatCompletion.choices[0]?.message?.content);
        const rawResponse = chatCompletion.choices[0]?.message?.content || '{}';
        const cleanResponse = rawResponse.replace(/`/g, '').trim(); // Removes backticks and trims whitespace

        let productDetails;
        try {
            productDetails = JSON.parse(cleanResponse);
        } catch (parseError) {
            console.error("JSON Parsing Failed:", parseError);
            return res.status(500).render('error', { barcode, message: 'Unable to parse product details.' });
        }
        // creating an tags of nutriments
        console.log(productDetails)
        console.log(productData['product']['nutrient_levels_tags'])
        const tags = productData['product']['nutrient_levels_tags'].map(tag =>
            tag.replace("en:", "").replace(/-/g, " ")
        );
        console.log(tags);
        const potionControls = [];
        potionControls.push(["energy", productData['product']['nutriments']['energy']]);
        potionControls.push(["nova category", productData['product']['nutriments']['nova - group']]);
        console.log(potionControls);
        // creating allergens
        // const allergens = productDetails['product']['allergens'].map(allergen =>
        //     allergen.replace("en:", "")
        // )
        //   creating alergen alerts
        console.log("I am after the api report")
        //   console.log(productDetails);
        // Step 3: Cache the fetched product data in the file
        const foodAPI = {
            "tags": tags,
            // "alergenAlerts": allergens,
            "potionControls": potionControls

        }
        cache[barcode] = { productName, data: productDetails, foodAPI: foodAPI };
        writeCacheFile(cache);  // Persist updated cache to file

        // Render the report
        const references = await scraper(productName + ' health Impacts');
        res.render('home2', { data: cache[barcode], references });

    } catch (error) {
        console.error('Error generating report:', error); // Log the error object
        res.status(500).render('error', { barcode: barcode });
    }
};

scraper = async (topic) => {
    const browser = await puppeteer.launch({
        headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', "--single-process",
            "--no-zygote",], executablePath:
            process.env.NODE_ENV === "production"
                ? process.env.PUPPETEER_EXECUTABLE_PATH
                : puppeteer.executablePath(),
    });

    const page = await browser.newPage();

    // Construct the search URL
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(topic)}`;

    await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 0 });


    const searchResults = await page.evaluate(() => {
        const results = [];
        const searchResultElements = document.querySelectorAll('div.g h3');

        let count = 0;
        for (const titleElement of searchResultElements) {
            const linkElement = titleElement.closest('a');

            if (linkElement && titleElement) {
                const url = linkElement.href;
                const title = titleElement.innerText;

                if (url && title) {
                    results.push({ uri: url, title: title });
                    count++;
                }

                if (count >= 2) break;
            }
        }
        return results;
    });


    await browser.close();

    return searchResults;
}