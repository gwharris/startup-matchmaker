import React from 'react'
import './styles/register.css';
import { Button, Container, Row, Col, Form, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
        };
    }

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    }
    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }
    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    handleSubmit = (event) => {
        
        fetch('/api/login', {
            method: 'POST',
            dataType: 'json',
            body: JSON.stringify(this.state)
        }).then(function (response) {
            console.log(response)
            return response.json();
        }).then(data => {
            if (data.redirectTo) {
                window.location = data.redirectTo;
            }
        }).catch((error) => {
            console.error('Error:', error);
        });

        event.preventDefault();

        event.preventDefault();
    }

    render() {

        return (
            <Container className='rgContainer'>
                <Row className='row'>
                    <Col className='midCol'>
                        <div className='register'>Register</div>
                        <Form>

                            <Form.Group className="nameForm">
                                <FloatingLabel label="full name">
                                    <Form.Control className="nameBorder" onChange={e => this.handleNameChange(e)} type="name" placeholder="full name" />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className='rpEmailForm'>
                                <FloatingLabel label="email">
                                    <Form.Control className="rpEmailBorder" onChange={e => this.handleEmailChange(e)} type="email" placeholder="email" />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="rpPasswordForm">
                                <FloatingLabel label="password">
                                    <Form.Control className="rpPasswordBorder" onChange={e => this.handlePasswordChange(e)} type="password" placeholder="password" />
                                </FloatingLabel>
                            </Form.Group>

                            <Link to="/login">
                                <Button onClick={e => this.handleSubmit(e)} className='createAcctButton'>Create Account</Button>
                            </Link>

                        </Form>
                    </Col>
                </Row>
            </Container>

        )
    }
}

export default Register
