import React, { useState, useEffect } from 'react'
import './styles/editPersonProfile.css';
import { Button, Container, Row, Col, Form} from 'react-bootstrap';
import axios from 'axios';
import Select from 'react-select'
import { Link } from 'react-router-dom';

const EditPersonProfile = () => {

    // Skills to be used eventually
    const personSkills = [
        { value: 'software engineering', label:'Software Engineering'},
        { value: 'marketing', label:'Marketing'},
        { value: 'product development', label:'Product Development'},
        { value: 'consulting', label:'Consulting'},
        { value: 'graphic design', label:'Graphic Design'},
        { value: 'design', label:'Design'},
        { value: 'growth hacking', label:'Growth Hacking'},
        { value: 'social media', label:'Social Media'},
        { value: 'data', label:'Data'},
        { value: 'hardware engineering', label:'Hardware Engineering'},
        { value: 'biology', label:'Biology'},
        { value: 'chemistry', label:'Chemistry'},
        { value: 'physics', label:'Physics'},
        { value: 'research', label:'Research'}
    
    ];

    //states to be populated
    const [ name, setName ] = useState(null);
    const [ organization, setOrganization ] = useState(null);
    const [ title, setTitle ] = useState(null);
    const [ bio, setBio ] = useState(null);
    const [ contact, setContact ] = useState(null);
    const [ skills, setSkills ] = useState(null);

    //on mount, data for the user that is logged in should be visible in editable forms
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

    //Custom Styles for Skills Dropdown Menu
    // const customStyles = {
    //     control: base => ({
    //         ...base,
    //         border: 0,
    //         // This line disable the blue border
    //         boxShadow: 'none'
    //       })
    //   }

    // Method to test that skills are being stored as array in state....it works!
    const consoleLogSkills = () => {
        console.log(skills);
    }

    return (
        <Container className='pEditProfileContainer'>
            <Row className='pEditProfileRow'>
                <Col className='pEditProfileCol'>

                    <p className='pEditProfileTitle'>Edit Profile</p>
                    <Form>

                        <Form.Group className='pEditNameForm'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control className='pEditNameBorder' value={name} onChange={e=> setName(e.target.value)} type='name'/>
                        </Form.Group>

                        
                        <Form.Group className='pEditTitleForm'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control className='pEditTitleBorder' value={title} onChange={e=> setTitle(e.target.value)} type='title'/>
                        </Form.Group>

                        
                        <Form.Group className='pEditOrgForm'>
                            <Form.Label>Organization</Form.Label>
                            <Form.Control className='pEditOrgBorder' value={organization} onChange={e=> setOrganization(e.target.value)} type='org'/>
                        </Form.Group>
                        

                        <Form.Group className='pEditBioForm'>
                            <Form.Label>Bio</Form.Label>
                            <Form.Control className='pEditBioBorder' value={bio} onChange={e=> setBio(e.target.value)} type='bio' as='textarea' rows={3}/>
                        </Form.Group>
                        

                        <Form.Group className='pEditContactForm'>
                            <Form.Label>Contact Info</Form.Label>
                            <Form.Control className='pEditContactBorder' value={contact} onChange={e=> setContact(e.target.value)} type='contact' as='textarea' rows={3}/>
                        </Form.Group>
                        Skills
                        <Select
                                className='pSkillSelectBorder'
                                options={personSkills}
                                placeholder='Select skills here'
                                isMulti
                                autoFocus
                                onChange={setSkills}
                                />

                        <Button onClick={consoleLogSkills}className='pUpdateProfileButton'>Save Changes</Button>

                        <Link to="/personprofile">
                            <Button className='pBackToProfileButton'>Back to Profile</Button>
                        </Link>

                        
                    
                    </Form>

                </Col>
{/* 
                <Col className='pEditSkillsCol'>
                    <div className='pEditPersonSkills'>
                        Skills
                        <div className='pEditPersonSelect'>
                            <Select
                                className='pSkillSelectBorder'
                                options={personSkills}
                                placeholder='Select skills here'
                                isMulti
                                autoFocus
                                onChange={setSkills}
                                />
                        </div>        
                    </div>
                
                </Col> */}
            </Row>
        </Container>
    )
}

export default EditPersonProfile
