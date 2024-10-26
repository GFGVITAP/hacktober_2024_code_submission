import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import gif from "../img/waving.png";
import "./Signup.css";

function SignUp() {
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [aadharNumber, setAadharNumber] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");

    const handleUserNameChange = (event) => setUserName(event.target.value);
    const handleAadharChange = (event) => setAadharNumber(event.target.value);
    const handleMobileChange = (event) => setMobileNumber(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    
        // Toast Function ----------- ---------- --------- -------
        const notifyA = (msg) => toast.success(msg)
        const notifyB = (msg) => toast.error(msg)
    const postData = () => {
        fetch("http://localhost:8080/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: userName,
                password: password,
                mobileno: mobileNumber,
                aadharno: aadharNumber
            })
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.message) {
                notifyA(data.message);
                navigate("/signin");
            }
            if (data.error) {
                notifyB(data.error);
            }
        })
        .catch(err => {
            console.error("Error:", err);
            notifyB("An error occurred during signup.");
        });
    }

    return (
        <>

            <div className='signup-form-container'>
                <div className='signup-form-gif'><img src={gif} alt="" /></div>
                <div className='signup-form w-100'>
                    <Form className='m-5'>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type='text' placeholder="Enter Full Name" value={userName} onChange={handleUserNameChange} />
                            <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="aadharno">
                            <Form.Label>Aadhar Number</Form.Label>
                            <Form.Control type='text' placeholder="Enter Aadhar Number" value={aadharNumber} onChange={handleAadharChange} />
                            <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="mobileno">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type='text' placeholder="Enter Mobile Number" value={mobileNumber} onChange={handleMobileChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                            <Form.Text className="text-muted">Create a Strong Password</Form.Text>
                        </Form.Group>

                        <input type="button" value="Sign-up" onClick={postData} className="signup-btn" />
                    </Form>
                </div>
            </div>
        </>
    );
}

export default SignUp;
