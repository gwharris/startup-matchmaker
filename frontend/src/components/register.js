import React from 'react'
import './styles/register.css';
import {Button, Container, Row, Col, Form, FloatingLabel} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <Container className='rgContainer'>
            <Row className='row'>
                <Col className='midCol'>
                    <div className='register'>Register</div>
                    <Form>

                        <Form.Group className="nameForm">
                            <FloatingLabel label="full name">
                                <Form.Control className="nameBorder" type="name" placeholder="full name" />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className = 'rpEmailForm'>
                            <FloatingLabel label="email">
                                <Form.Control className="rpEmailBorder" type="email" placeholder="email" />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="rpPasswordForm">
                            <FloatingLabel label="password">
                                <Form.Control className="rpPasswordBorder" type="password" placeholder="password" />
                            </FloatingLabel>
                        </Form.Group>

                        <Link to="/login">
                            <Button className='createAcctButton'>Create Account</Button>
                        </Link>
                        
                    </Form>
                </Col>
            </Row>
        </Container>

    )
}

export default Register
