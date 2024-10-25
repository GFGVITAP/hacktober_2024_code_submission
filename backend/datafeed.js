const mongoose = require("mongoose")
const { Schema } = mongoose;
const {UserDetails} = require("./models/userdetails");

const url = "mongodb+srv://2mohitsoni:Mohit1234@cluster0.wjfspkb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const feedUserData = async () => {
  const users = [
    {
      userId: '5f71e5c6a6b6c6c6c6c6c6c6',
      propertyTax: 1000,
      waterTax: 500,
      garbageTax: 200,
      others: 100,
      balance: 1500,
      rewards: 50,
      dueTaxes: 2000,
      paymentStatus: 'pending',
      paymentHistory: [
        {
          paymentDate: new Date('2022-01-01'),
          paymentAmount: 1000,
          paymentMethod: 'cash'
        }
      ]
    },
    {
      userId: '5f71e5c6a6b6c6c6c6c6c6d',
      propertyTax: 800,
      waterTax: 300,
      garbageTax: 150,
      others: 50,
      balance: 1000,
      rewards: 20,
      dueTaxes: 1500,
      paymentStatus: 'paid',
      paymentHistory: [
        {
          paymentDate: new Date('2022-02-01'),
          paymentAmount: 1500,
          paymentMethod: 'online'
        }
      ]
    },
    {
      userId: '5f71e5c6a6b6c6c6c6c6c6e',
      propertyTax: 1200,
      waterTax: 400,
      garbageTax: 250,
      others: 150,
      balance: 2000,
      rewards: 30,
      dueTaxes: 2500,
      paymentStatus: 'overdue',
      paymentHistory: [
        {
          paymentDate: new Date('2022-03-01'),
          paymentAmount: 1000,
          paymentMethod: 'cash'
        }
      ]
    },
    {
      userId: '5f71e5c6a6b6c6c6c6c6c6f',
      propertyTax: 900,
      waterTax: 350,
      garbageTax: 200,
      others: 100,
      balance: 1500,
      rewards: 40,
      dueTaxes: 2000,
      paymentStatus: 'pending',
      paymentHistory: [
        {
          paymentDate: new Date('2022-04-01'),
          paymentAmount: 500,
          paymentMethod: 'online'
        }
      ]
    },
    {
      userId: '5f71e5c6a6b6c6c6c6c6c70',
      propertyTax: 1100,
      waterTax: 450,
      garbageTax: 300,
      others: 200,
      balance: 2500,
      rewards: 50,
      dueTaxes: 3000,
      paymentStatus: 'paid',
      paymentHistory: [
        {
          paymentDate: new Date('2022-05-01'),
          paymentAmount: 3000,
          paymentMethod: 'cash'
        }
      ]
    },
    {
      userId: '5f71e5c6a6b6c6c6c6c6c71',
      propertyTax: 800,
      waterTax: 300,
      garbageTax: 150,
      others: 50,
      balance: 1000,
      rewards: 20,
      dueTaxes: 1500,
      paymentStatus: 'overdue',
      paymentHistory: [
        {
          paymentDate: new Date('2022-06-01'),
          paymentAmount: 500,
          paymentMethod: 'online'
        }
      ]
    },
    {
      userId: '5f71e5c6a6b6c6c6c6c6c72',
      propertyTax: 1200,
      waterTax: 400,
      garbageTax: 250,
      others: 150,
      balance: 2000,
      rewards: 30,
      dueTaxes: 2500,
      paymentStatus: 'pending',
      paymentHistory: [
        {
          paymentDate: new Date('2022-07-01'),
          paymentAmount: 1000,
          paymentMethod: 'cash'
        }
      ]
    },
  ]

  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    for (const user of users) {
      const newUser = new UserDetails(users);
      await newUser.save();
      console.log('User created:', newUser);
    }

    console.log('All users created');
  } catch (error) {
    console.error('Error creating users:', error);
  } finally {
    mongoose.disconnect();
  }
};

feedUserData();