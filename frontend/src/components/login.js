import React from 'react'
import './styles/login.css';
import {Button, Container, Row, Col, Form, FloatingLabel} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = (props) => {
    return (
        <Container className='lgContainer'>
            <Row className='row'>
                <Col className='LGleftCol'>
                    <div className="logIn">Log In</div>
                    <Form>
                        <Form.Group className="emailForm">
                            <FloatingLabel label="email">
                                <Form.Control className="emailBorder" type="email" placeholder="email" />
                            </FloatingLabel>    
                        </Form.Group>


                        <Form.Group className="passwordForm">
                            <FloatingLabel label="password">
                                <Form.Control className="passwordBorder" type="password" placeholder="password" />
                            </FloatingLabel>
                        </Form.Group>
                        <Button className="loginButton">login</Button>

                    </Form>
                    <Link to="/register">
                        <Button className="toRegister">Register</Button>
                    </Link>
                    
                </Col>
                <Col className='LGrightCol'>
                    <div className='loginGreeting1'>Meet your match.</div>
                    <div className='loginGreeting2'>Find a startup where you will grow and make an impact.</div>
                </Col>
            </Row>
        </Container>
        

    )
}

export default Login
