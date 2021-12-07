import React, {useState, useEffect } from 'react'
// import { StartupItem, Navbar } from 'Navbar.js'
import AppNavbar from './AppNavbar'
import {Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './styles/personHomepage.css';

const PersonHomepage = () => {

    const [name, setName ] = useState(null);

    const [error, setError ] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        // https://api.github.com/users/dleguisamo
        // /api/getUserProfile

        axios.get("/api/getUserProfile")
            .then((response) => {
                console.log(response.data);
                setName(response.data.name);
            })
            .catch((error) => {
                console.error("Could not fetch data: ", error);
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            });
    }, []);

    if (loading) return "Loading data...";
    if (error) return "An error!"

    return (
        
        <Container className='phContainer'>
            
            <AppNavbar/>
            <Row className='phWelcomeRow'>
                <Col className='phWelcomeCol'>
                    <div className='m1'>Welcome, {name}</div>
                    <div className='m2'>Here are your matches based on your skills!</div>
                </Col>
            </Row>
        </Container>
    )
}

export default PersonHomepage
