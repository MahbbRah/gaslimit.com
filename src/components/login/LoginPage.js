import { Container, Form, Button, Row, Alert } from 'react-bootstrap';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";

import { API } from "../../config/config";


function LoginPage(props) {


    const emailAddress = useRef("");
    const password = useRef("");

    const [errMsg, setErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    
    
    const history = useHistory();
    
    useEffect(() => {
        
        const copyHistory = history
        if (localStorage.getItem("authToken")) {
            copyHistory.push("/");
        }
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps


    const LoginToAccount = (ev) => {

        ev.preventDefault();
        const email = emailAddress.current.value;
        const pw = password.current.value;
        // alert(` Email Address: ${email}, Password: ${pw}`);

        if (email === "" || pw === "") {
            setErrMsg("Please fill out all the fields properly");
            return;
        }

        const payload = {
            email: email,
            password: pw
        }

        const reqUrl = API.ROOT + API.AUTH.LOGIN;
        axios({
            url: reqUrl,
            method: 'POST',
            data: payload
        })
            .then(res => {
                console.log(res.data);
                if (res?.data?.tokens) {
                    setSuccessMsg("Login you in...");
                }

                let createdUser = res.data.user;
                let authToken =  res.data.tokens[1];
                localStorage.setItem("userData", JSON.stringify(createdUser));
                localStorage.setItem("authToken", authToken);
                setTimeout(() => {

                    document.body.style = "";
                    history.push("/search_ads");
                    // window.location.href = '/search_ads';
                }, 1000);

            })
            .catch(err => {
                // console.log(err.response);
                // setErrMsg(err.message ? err.message : '');
                setErrMsg(err?.response?.data?.message)

            })
    }

    document.title = "Login To your Account";
    
    document.body.style = `
        background: #005C97;
        background: -webkit-linear-gradient(to right, #363795, #005C97);
        background: linear-gradient(to right, #363795, #005C97);
    `

    return (
        <Container className="login-content-page">
            <Row className="justify-content-md-center" md={2}>
                <Form className="login-page-form">
                    <h2>Login To Your Account</h2>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={emailAddress}/>
                        <Form.Text className="text-muted">
                            Enter Your registered email address
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={password} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="errorMessage">
                        {errMsg !== "" ? (
                            <Alert variant="danger">
                                {errMsg}
                            </Alert>
                        ) : ''}
                        {successMsg !== "" ? (
                            <Alert variant="success">
                                {successMsg}
                            </Alert>
                        ) : ''}
                    </Form.Group>
                    <div className="login-footer-wrapper">
                        <Button variant="primary" type="submit" onClick={LoginToAccount}>
                            Login
                        </Button>
                        <span> OR</span>
                        {/* <a href="/register">Register Account</a> */}
                        <Link to="/register" className="">Register Account</Link>
                    </div>
                </Form>
            </Row>

        </Container>
    );
}

export default LoginPage;
