import React from 'react'
import './styles/login.css';
import { Button, Container, Row, Col, Form, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    handleEmailChange = (event) => {
        this.setState({ username: event.target.value });
    }
    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    handleSubmit = (event) => {

        fetch('/api/login', {
            method: 'POST',
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
    }

    render() {
        // const { errors } = this.state;

        return (
            <Container className='lgContainer'>
                <Row className='row'>
                    <Col className='LGleftCol'>
                        <div className="logIn">Log In</div>
                        <Form>
                            <Form.Group className="emailForm">
                                <FloatingLabel label="email">
                                    <Form.Control onChange={e => this.handleEmailChange(e)} className="emailBorder" type="email" placeholder="email" />
                                </FloatingLabel>
                            </Form.Group>


                            <Form.Group className="passwordForm">
                                <FloatingLabel label="password">
                                    <Form.Control onChange={e => this.handlePasswordChange(e)} className="passwordBorder" type="password" placeholder="password" />
                                </FloatingLabel>
                            </Form.Group>
                            <Button onClick={e => this.handleSubmit(e)} className="loginButton">login</Button>

                        </Form>
                        <Link to="/register">
                            <Button className="toRegister">Register</Button>
                        </Link>

                    </Col>
                    <Col className='LGrightCol'>
                        <div className='loginGreeting1'>Meet your match.</div>
                        <div className='loginGreeting2'>Find a startup where you'll grow and make an impact!</div>
                    </Col>
                </Row>
            </Container>


        )
    }
}

export default Login