import React, { useState } from 'react'
import './styles/login.css';
import { Button, Container, Row, Col, Form, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
const StartupLogin = () => {
    const [loginStartupEmail, setLoginStartupEmail ] = useState("")
    const [ startupLoginPassword, setStartupLoginPassword ] = useState("")
    const doStartupLogin = () => {
        axios({
            method: "POST",
            data: {
                startup_email: loginStartupEmail,
                startup_password: startupLoginPassword,
            },
            withCredentials: true,
            url: "http://localhost:4000/startuplogin",
        }).then((res) => console.log(res))

    }
    return (
        <Container className='lgContainer'>
            <Row className='row'>
                <Col className='LGleftCol'>
                    <div className="logIn">Log In As a Startup</div>
                    <Form>
                        <Form.Group className="emailForm">
                            <FloatingLabel label="email">
                                <Form.Control onChange={e => setLoginStartupEmail(e.target.value)} className="emailBorder" type="email" placeholder="email" />
                            </FloatingLabel>
                        </Form.Group>


                        <Form.Group className="passwordForm">
                            <FloatingLabel label="password">
                                <Form.Control onChange={e => setStartupLoginPassword(e.target.value)} className="passwordBorder" type="password" placeholder="password" />
                            </FloatingLabel>
                        </Form.Group>
                        <Button onClick={doStartupLogin} className="loginButton">login</Button>

                    </Form>
                    <Link to="/startupregister">
                        <Button className="toRegister">Register</Button>
                    </Link>

                </Col>
                <Col className='LGrightCol'>
                    <div className='loginGreeting1'>Meet your match.</div>
                    <div className='loginGreeting2'>Find talented people to help grow your startup</div>
                </Col>
            </Row>
    </Container>



    )
}

export default StartupLogin
