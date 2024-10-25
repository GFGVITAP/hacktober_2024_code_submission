import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "./Signin.css";
import gif from"../img/waving.png"

function SignIn() {
  const navigate = useNavigate()


  //State variable of signin -------- ------ ------ --------- ------

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")

  let handleUsernameChange = (event) => {
    console.log(event.target);
    setusername(event.target.value)
  };
  let handlePasswordChange = (event) => {
    console.log(event.target);
    setpassword(event.target.value)
  };

  // POst data to the server----------  ------------

  const postData = ()=>{

    fetch("http://localhost:8080/signin",
        {
            method : "post",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
              username:username,
              password:password
            })
        }
    ).then(res=>res.json())
    .then(data =>{
      if(data.error){
          notifyB(data.error)
      }
      else{
            notifyA(data.message)
            localStorage.setItem("jwt",data.token)
            setuserLogin(true)
            console.log(data.message)
            
            navigate("/")
          }
          
        console.log(data)})
    
  //Toast Function --------- ------ --------- -------
  
  const notifyA = (msg)=>toast.success(msg)
  const notifyB = (msg)=>toast.error(msg)
  }
  return (
<>
<div className='signin-form-container'>
  <div className='signin-form-gif'><h1 className='welcome'>Welcome Back</h1>
    <img src={gif} alt="" /> 
  </div>
  <div className='signin-form'>
  <Form className='m-5'>
      <Form.Group className="mb-3 " controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" value={username} onChange={handleUsernameChange} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} />
      </Form.Group>
   
      <input type="button" className='btn btn-danger mt-3' value={"signin"} onClick={postData}  />

      <input type="button" className='btn btn-danger mt-3' value={"signup"} onClick="/signup"  />


      
    </Form>
    
    
  </div>
</div>
</>
  );
}

export default SignIn;