import React, {useState} from 'react'
import './styles/register.css';
import { Button, Container, Row, Col, Form, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const StartupProfile = () => {

    const [editStartupBio, setStartupBio] = useState("")
    const [editStartupSkills, setStartupSkills] = useState("")

    const doStartupProfileUpdate = () => {
        axios({
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            data: {
                startup_bio: editStartupBio, 
                startup_skills: editStartupSkills,
            },
            withCredentials: true,
            url: "/api/editStartupProfile",
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
        
        axios.interceptors.request.use(function (config) {
            // console.log(req);
            console.log(config)
            return config;
          }, function (error) {
            // Do something with request error
            return Promise.reject(error);
          });
    };
    return (
        <Container className='rgContainer'>
            <Row className='row'>
                <Col className='midCol'>
                    <div className='startupProfile'>Your Startup's Profile</div>
                    <Form>

                        <Form.Group className="bioForm">
                            <FloatingLabel label="startup bio">
                                <Form.Control onChange={e => setStartupBio(e.target.value)} className="bioBorder" type="bio" placeholder="tell us about your startup" />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className='skillsForm'>
                            <FloatingLabel label="startup skills">
                                <Form.Control onChange={e => setStartupSkills(e.target.value)} className="startupSkillsBorder" type="skills" placeholder="tell us more about the skills you need" />
                            </FloatingLabel>
                        </Form.Group>

                        <Link to="/startupprofile">
                            <Button onClick={doStartupProfileUpdate} className='updateProfileButton'>Save</Button>
                        </Link>

                    </Form>
                </Col>
            </Row>
        </Container>

    )
}

export default StartupProfile