import React from 'react'
import './styles/login.css';
import { Button, Container, Row, Col, Form, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const StartupLogin = () => {
    return (
        <Container className='lgContainer'>
            <Row className='row'>
                <Col className='LGleftCol'>
                    <div className="logIn">Log In As a Startup</div>
                    <Form>
                        <Form.Group className="emailForm">
                            <FloatingLabel label="username">
                                <Form.Control className="emailBorder" type="username" placeholder="username" />
                            </FloatingLabel>
                        </Form.Group>


                        <Form.Group className="passwordForm">
                            <FloatingLabel label="password">
                                <Form.Control className="passwordBorder" type="password" placeholder="password" />
                            </FloatingLabel>
                        </Form.Group>
                        <Button className="loginButton">login</Button>

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
