import React, {useState} from 'react'
import './styles/register.css';
import { Button, Container, Row, Col, Form, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PersonProfile = () => {

    const [editPersonBio, setPersonBio] = useState("")
    const [editPersonSkills, setPersonSkills] = useState("")
    const [editPersonExperience, setPersonExperience] = useState("")

    const doPersonProfileUpdate = () => {
        axios({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            data: {
                person_bio: editPersonBio, 
                person_skills: editPersonSkills,
                person_experience: editPersonExperience,
            },
            withCredentials: true,
            url: "/api/editPersonProfile",
        }).then((res) => {
            console.log(res);
            console.log(res.data);
            // probably don't need a redirect for profile updates
            // if (res.data.redirectTo) {
            //     window.location = res.data.redirectTo;
            // }
        }).catch((error) => {
            console.error('Error:', error);
        });
        
    };
    return (
        <Container className='rgContainer'>
            <Row className='row'>
                <Col className='midCol'>
                    <div className='register'>Your Profile</div>
                    <Form>

                        <Form.Group className="bioForm">
                            <FloatingLabel label="person bio">
                                <Form.Control onChange={e => setPersonBio(e.target.value)} className="bioBorder" type="bio" placeholder="tell us about yourself" />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className='skillsForm'>
                            <FloatingLabel label="person skills">
                                <Form.Control onChange={e => setPersonSkills(e.target.value)} className="personSkillsBorder" type="skills" placeholder="tell us more about your skills" />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="experienceForm">
                            <FloatingLabel label="person experience">
                                <Form.Control onChange={e => setPersonExperience(e.target.value)} className="personExperienceBorder" type="experience" placeholder="tell us more about your experience" />
                            </FloatingLabel>
                        </Form.Group>

                        <Link to="/personprofile">
                            <Button onClick={doPersonProfileUpdate} className='updateProfileButton'>Save</Button>
                        </Link>

                    </Form>
                </Col>
            </Row>
        </Container>

    )
}

export default PersonProfile

// important line dividing new and old code

// class PersonProfile extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             bio: '',
//             skills: '',
//             experience: '',
//         };
//     }

//     handleBioChange = (event) => {
//         this.setState({ bio: event.target.value });
//     }
//     handleSkillsChange = (event) => {
//         this.setState({ skills: event.target.value });
//     }
//     handleExperienceChange = (event) => {
//         this.setState({ experience: event.target.value });
//     }

//     getUserProfile = (event) => {
//         fetch('/api/getProfile', {
//             method: 'GET',
//         }).then(function (response) {
//             console.log(response)
//             return response.json();
//         }).then(function (data) {
//             console.log(data);
//         }).catch((error) => {
//             console.error('Error:', error);
//         });

//         event.preventDefault();
//     }

//     updateUserProfile = (event) => {
//         fetch('/api/editProfile', {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(this.state)
//         }).then(function (response) {
//             console.log(response)
//             return response.json();
//         }).then(function (data) {
//             console.log(data);
//         }).catch((error) => {
//             console.error('Error:', error);
//         });

//         event.preventDefault();
//     }

//     render() {

//         return (
//             <Container className='profileContainer'>
//                 <Row className='row'>
//                     <Col className='leftCol'>
//                         <Button onClick={e => this.getUserProfile(e)}>Get my profile!</Button>
//                     </Col>
//                     <Col className='rightCol'>
//                         <div className='register'>Register</div>
//                         <Form>

//                             <Form.Group className="bioForm">
//                                 <FloatingLabel label="bio">
//                                     <Form.Control className="bioBorder" onChange={e => this.handleBioChange(e)} type="bio" placeholder="bio" />
//                                 </FloatingLabel>
//                             </Form.Group>

//                             <Form.Group className='skillsForm'>
//                                 <FloatingLabel label="skills">
//                                     <Form.Control className="skillsBorder" onChange={e => this.handleSkillsChange(e)} type="skills" placeholder="skills" />
//                                 </FloatingLabel>
//                             </Form.Group>

//                             <Form.Group className="experienceForm">
//                                 <FloatingLabel label="experience">
//                                     <Form.Control className="experienceBorder" onChange={e => this.handleExperienceChange(e)} type="experience" placeholder="experience" />
//                                 </FloatingLabel>
//                             </Form.Group>

//                             <Link to="/login">
//                                 <Button onClick={e => this.updateUserProfile(e)} className='editProfileButton'>Save Updates</Button>
//                             </Link>

//                         </Form>
//                     </Col>
//                 </Row>
//             </Container>

//         )
//     }
// }

// export default PersonProfile
