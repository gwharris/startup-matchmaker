import React, {useState } from 'react'
import './styles/PersonProfile.css';
import { Modal, Button, Container, Row, Col, Form, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';

const ContactModal = (props) => {
    const [info, setInfo] = useState("");

    const saveContactInfo = () => {
        console.log(info);
    }
    return (
        <Modal
            {...props}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>
                    Edit Contact Information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='personContactInfo'>
                        <Form.Control onChange={e => setInfo(e.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button onClick={saveContactInfo}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

const AboutModal = (props) => {
    const [bio, setBio] = useState("");
    const saveBio = () => {
        console.log(bio);
        console.log("inbio")
    }

    return (
        <Modal
            {...props}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>
                    Edit Bio
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='personBio'>
                        <Form.Control onChange={e => setBio(e.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button onClick={saveBio}>Save</Button>
            </Modal.Footer>
        </Modal>

    );
    
}

const PersonProfile = () => {
    const [showContact, setShowContact] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [showSkills, setShowSkills] = useState(false);
    
    return (
        <Container className='pProfileContainer'>

            <Row className='personBasicInfoRow'>
                <Col className='personCard'>
                
                </Col>
            </Row>
            
            <Row className='personBioRow'>
                <Col className='personContactCard'>
                    <div className='personProfileText'>Contact</div>
                    <div>
                        <Button className='personContactButton' onClick={() => setShowContact(true)}>
                            Edit Contact Information
                        </Button>
                        <ContactModal
                            show={showContact}
                            onHide={()=> setShowContact(false)}
                        />
                    </div>
                </Col>
                
                <Col className='personBioCard'>
                    <div className='personAbout'>
                        About
                        <div>
                            <Button className='personBioButton' onClick={() => setShowAbout(true)}>
                                Edit Bio
                            </Button>
                            <AboutModal
                                show={showAbout}
                                onHide={()=> setShowAbout(false)}
                            />
                        </div>
                        {/* <hr className='l1'></hr> */}
                    </div>

                    <div className='personSkills'>
                        Skills
                    </div>
                </Col>

            </Row>

        </Container>

    )
}

export default PersonProfile

/*
class PersonProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: '',
            skills: '',
            experience: '',
        };
    }

    handleBioChange = (event) => {
        this.setState({ bio: event.target.value });
    }
    handleSkillsChange = (event) => {
        this.setState({ skills: event.target.value });
    }
    handleExperienceChange = (event) => {
        this.setState({ experience: event.target.value });
    }

    getUserProfile = (event) => {
        fetch('/api/getProfile', {
            method: 'GET',
        }).then(function (response) {
            console.log(response)
            return response.json();
        }).then(function (data) {
            console.log(data);
        }).catch((error) => {
            console.error('Error:', error);
        });

        event.preventDefault();
    }

    updateUserProfile = (event) => {
        fetch('/api/editProfile', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        }).then(function (response) {
            console.log(response)
            return response.json();
        }).then(function (data) {
            console.log(data);
        }).catch((error) => {
            console.error('Error:', error);
        });

        event.preventDefault();
    }

    render() {

        return (
            <Container className='profileContainer'>
                <Row className='row'>
                    <Col className='leftCol'>
                        <Button onClick={e => this.getUserProfile(e)}>Get my profile!</Button>
                    </Col>
                    <Col className='rightCol'>
                        <div className='register'>Register</div>
                        <Form>

                            <Form.Group className="bioForm">
                                <FloatingLabel label="bio">
                                    <Form.Control className="bioBorder" onChange={e => this.handleBioChange(e)} type="bio" placeholder="bio" />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className='skillsForm'>
                                <FloatingLabel label="skills">
                                    <Form.Control className="skillsBorder" onChange={e => this.handleSkillsChange(e)} type="skills" placeholder="skills" />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="experienceForm">
                                <FloatingLabel label="experience">
                                    <Form.Control className="experienceBorder" onChange={e => this.handleExperienceChange(e)} type="experience" placeholder="experience" />
                                </FloatingLabel>
                            </Form.Group>

                            <Link to="/login">
                                <Button onClick={e => this.updateUserProfile(e)} className='editProfileButton'>Save Updates</Button>
                            </Link>

                        </Form>
                    </Col>
                </Row>
            </Container>

        )
    }
}

export default PersonProfile
*/
