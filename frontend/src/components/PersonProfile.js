import React, {useState, useEffect } from 'react'
import './styles/PersonProfile.css';
import { Button, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';

const PersonProfile = () => {

    // All data fields we are using, will be modified with official backend
    //for testing purposes, organization = data.company // name = data.name // bio = data.bio // organization = data.company // title = data.type
    //skills still empty for now need to figure out storage method
    const [ name, setName ] = useState(null);
    const [ organization, setOrganization ] = useState(null);
    const [ title, setTitle ] = useState(null);
    const [ bio, setBio ] = useState(null);
    const [ contact, setContact ] = useState(null);
    const [ skills, setSkill ] = useState(null);


    // fetching data, error and loading notifications included
    const [error, setError] = useState(null);
    const [ loading, setLoading] = useState(true);

    // Get data from github api. This is for testing purposes. Endpoint will be modified 
    // to use data from LOGGED IN USER
    useEffect(() => {
        axios.get("https://api.github.com/users/dleguisamo")
        .then((response) => {
            setName(response.data.name);
            setTitle(response.data.type);
            setOrganization(response.data.company);
            setBio(response.data.bio);
            setContact(response.data.html_url);

        })
        .catch((error) => {
            console.error("Could not fetch data: ", error);
            setError(error)
        })
        .finally(() =>{
            setLoading(false)
        });
    }, []);

    if (loading) return "Loading data...";
    if (error) return "An error!"



    
    return (
        <Container className='pProfileContainer'>

            <Row className='personBasicInfoRow'>
                <Col className='personCard'>
                    <div className='personName'>{name}</div>
                    <div className='personTitle'>{title}</div>
                    <div className='personOrganization'>{organization}</div>
                    <Button>Edit Profile</Button>
                </Col>
            </Row>
            
            <Row className='personBioRow'>

                <Col className='personContactCard'>
                    <div className='personProfileText'>Contact</div>
                    <div className='personContactText'>{contact}</div>

                </Col>
                
                <Col className='personBioCard'>
                    <div className='personAbout'>
                        About
                        <div className='personBioText'>{bio}</div>

                    </div>

                    <div className='personSkills'>
                        Skills
                        <div className='skillsText'></div>     

                    </div>
                </Col>

            </Row>

        </Container>

    )
}

export default PersonProfile

/*
        <Container className='pProfileContainer'>

            <Row className='personBasicInfoRow'>
                <Col className='personCard'>
                    <div className='personName'>David Leguisamo</div>
                    <div className='personTitle'>Student</div>
                    <div className='personOrganization'>New York University</div>
                </Col>
            </Row>
            
            <Row className='personBioRow'>
                <Col className='personContactCard'>
                    <div className='personProfileText'>Contact</div>
                    <div>
                        <Button className='personContactButton' onClick={handleContactShow}>
                            Edit Contact Information
                        </Button>
                        <Modal size='lg' aria-labelledby='contained-modal-title-vcenter' centered show={showContact} onHide={handleContactClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title id='contained-modal-title-vcenter'>
                                        Edit Contact Info
                                    </Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <Form>
                                        <Form.Group className='personContactInfo'>
                                            <Form.Label>Make changes here!</Form.Label>
                                            <Form.Control onChange={e=> setContact(e.target.value)} as='textarea' rows={4}/>
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={handleContactClose}>Close</Button>
                                   
                                    </Modal.Footer>
                                    </Modal>
                            </div>
                            <div className='personContactText'>
                                {contact}
                            </div>
                        </Col>
                        
                        <Col className='personBioCard'>
                            <div className='personAbout'>
                                About
                                <div>
                                    <Button className='personBioButton' onClick={handleAboutShow}>
                                        Edit Bio
                                    </Button>
        
                                    <Modal size='lg' aria-labelledby='contained-modal-title-vcenter' centered show={showAbout} onHide={handleAboutClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title id='contained-modal-title-vcenter'>
                                                Edit Bio
                                            </Modal.Title>
                                        </Modal.Header>
        
                                        <Modal.Body>
                                            <Form>
                                                <Form.Group className='personBio'>
                                                    <Form.Label>Make changes here!</Form.Label>
                                                    <Form.Control onChange={e=> setBio(e.target.value)} as='textarea' rows={4}/>
                                                </Form.Group>
                                            </Form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button onClick={handleAboutClose}>Close</Button>
                                            
                                        </Modal.Footer>
                                    </Modal>
        
                                </div>
                                
                                <div className='personBioText'>
                                    {bio}
                                </div>
                            </div>
        
                            <div className='personSkills'>
                                Skills
                                <div className='personSelect'>
                                    <Select
                                        options={personSkills}
                                        placeholder='Select skills here'
                                        isMulti
                                        autoFocus
                                        onChange={setSkills}
                                    />
                                </div>
                                <Button className='saveSkillsButton'>Save Skills</Button>
                                <div className='skillsText'></div>     
        
                            </div>
                        </Col>
        
                    </Row>
        
                </Container>
*/
