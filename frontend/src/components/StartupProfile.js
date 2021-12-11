import React, {useState, useEffect} from 'react'
import './styles/StartupProfile.css';
import { Button, Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StartupNavbar from './StartupNavbar'

const StartupProfile = () => {


    const [ startupName, setStartupName ] = useState(null);
    const [ startupBio, setStartupBio ] = useState(null);
    const [ startupContact, setStartupContact ] = useState(null);
    const [ startupSkills, setStartupSkills ] = useState(null);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     // https://api.github.com/users/dleguisamo

    //     axios.get("/api/getStartupProfile")
    //         .then((response) => {
    //             console.log(response.data);
    //             setStartupName(response.data.name);
    //             setStartupBio(response.data.bio);
    //             setStartupContact(response.data.contact);
    //             setStartupSkills(response.data.skills);
    //         })
    //         .catch((error) => {
    //             console.error("Could not fetch data: ", error);
    //             setError(error)
    //         })
    //         .finally(() => {
    //             setLoading(false)
    //         });
    // }, []);

    // if (loading) return "Loading data...";
    // if (error) return "An error!"

    // const doStartupProfileUpdate = () => {
    //     axios({
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         method: "POST",
    //         data: {
    //             startup_bio: editStartupBio, 
    //             startup_skills: editStartupSkills,
    //         },
    //         withCredentials: true,
    //         url: "/api/editStartupProfile",
    //     }).then((res) => {
    //         console.log(res);
    //         console.log(res.data);
    //         // probably don't need a redirect for profile updates
    //         // if (res.data.redirectTo) {
    //         //     window.location = res.data.redirectTo;
    //         // }
    //     }).catch((error) => {
    //         console.error('Error:', error);
    //     });
        
    //     axios.interceptors.request.use(function (config) {
    //         // console.log(req);
    //         console.log(config)
    //         return config;
    //       }, function (error) {
    //         // Do something with request error
    //         return Promise.reject(error);
    //       });
    // };
    return (
        <Container className='sProfileContainer'>
            <StartupNavbar/>
            <Row className='sProfileRow'>
                <Col className='sProfileCard'>
                    <div className='startupName'>Test Name</div>
                    <Link to="/editstartupprofile">
                        <Button className='sEditProfileButton'>Edit Profile</Button>
                    </Link>
                    <hr className='sLine'/>
                    <div className='sHeader'>About Us</div>
                    <div className='sBioText'></div>
                    <hr className='sLine'/>
                    <div className='sHeader'>Desired Skills</div>
                    <div className='sSkillsText'>{
                        // skills.map((item) => (
                        // <li key={item}>{item}</li>
                        // ))
                    }</div>
                    <hr className='sLine'/>
                    <div className='sHeader'>Contact Us</div>
                    <div className='sContactText'></div>
                </Col>
            </Row>
        </Container>

    )
}

export default StartupProfile