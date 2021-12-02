import { Container, Form, Button, Row, Alert } from 'react-bootstrap';
import React, { useState, useRef, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from "axios";

import { API } from "../../config/config";


function RegisterPage() {


    const emailAddress = useRef("");
    const password = useRef("");
    const confirmPW = useRef("");
    const userFullName = useRef("");


    const [errMsg, setErrMsg ] = useState("");
    const [successMsg, setSuccessMsg ] = useState("");
    // const [folders, setFolders] = useState([]);
    // const [isLoadingFolders, setIsLoadingFolders] = useState(false);

    let history =  useHistory();


    useEffect(() => {


    }, [])

    const RegisterAccount = (ev) => {

        //prevent default behaviour
        ev.preventDefault();
        // console.log(emailAddress);
        const email = emailAddress.current.value;
        const pw = password.current.value;
        const confirmPw = confirmPW.current.value;
        const fullName = userFullName.current.value;
        // alert(` Email Address: ${email}, Password: ${pw}`);

        if(pw !== confirmPw ){
            setErrMsg("Password and confirm password doesn't match!");
            return;
        }

        if(email === "" || fullName === "" || confirmPw === ""){
            setErrMsg("Please fill out all the fields properly");
            return;
        }

        const payload = {
            email: email,
            name: fullName,
            password: confirmPw,
        }

        const reqUrl = API.ROOT + API.USER.USERS;
        axios({
            url: reqUrl,
            method: 'POST',
            data: payload
        })
        .then(res => {
            console.log(res.data);
            if(res.data.message){
                setSuccessMsg(res.data.message);
            }

            let createdUser =  res.data.user;
            delete createdUser.hash;
            localStorage.setItem("userData", JSON.stringify(createdUser));
            setTimeout(() => {
                history.push("/login")
            }, 3000);

        })
        .catch(err => {
            // console.log(err.response);
            // setErrMsg(err.message ? err.message : '');
            setErrMsg(err?.response?.data?.message)
           
        })
    }

    //   if(localStorage.getItem("userData")){
    //     return <Redirect to="/search_ads"/>
    //   }

    document.title = "Signup Page";
    
    document.body.style = `
        background: #005C97;
        background: -webkit-linear-gradient(to right, #363795, #005C97);
        background: linear-gradient(to right, #363795, #005C97);
    `

    return (
        <Container className="login-content-page">
            <Row className="justify-content-md-center" md={2}>
                <Form className="login-page-form">
                    <h2>Register On AdSwipe</h2>
                    <Form.Group className="mb-3" controlId="formBasicFullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Full Name, ex: John Doe" ref={userFullName} onChange={() => setErrMsg("")}/>
                        <Form.Text className="text-muted">
                            Enter your full name for this account
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={emailAddress} onChange={() => setErrMsg("")}/>
                        <Form.Text className="text-muted">
                            Enter Your registered email address
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={password} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" ref={confirmPW} onChange={() => setErrMsg("")}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="errorMessage">
                        {errMsg !== "" ? (
                            <Alert variant="danger">
                               {errMsg}
                            </Alert>
                        ) : '' }
                        {successMsg !== "" ? (
                            <Alert variant="success">
                                {successMsg}
                            </Alert>
                        ) : '' }
                    </Form.Group>
                    <div className="login-footer-wrapper">
                        <Button variant="primary" type="submit" onClick={RegisterAccount}>
                            Register
                        </Button>
                        <span> OR</span>
                        <Link to="/login" className="">Login, If you're registered</Link>
                        <span> OR</span>
                        <Link to="/forgotPassword" className="">Forgot Password?</Link>
                    </div>
                </Form>
            </Row>

        </Container>
    );
}

export default RegisterPage;
