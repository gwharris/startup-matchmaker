import React, {useState, useEffect } from 'react'
import StartupItem from './StartupItem'
import AppNavbar from './AppNavbar'
import {Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';
import './styles/personHomepage.css';


const PersonHomepage = () => {

    const [name, setName ] = useState(null);

    const [error, setError ] = useState(null);
    const [loading, setLoading] = useState(true);

    const [ data, setData ] = useState (null);




    const mockData = [{
       "name": "My Startup",
       "skills" : ["research", "software engineering"],
       "bio": "this is the best startup!"
    },
    {
        "name": "The other startup",
        "skills" : ["research", "software engineering"],
        "bio": "this is the best startup!"
    },
    {
        "name": "startup3",
        "skills" : ["research", "software engineering"],
        "bio": "everyone else sucks im the best"
    }];

    const renderCompanies = () => {
        if (data == null) {
            console.log("renderComp: There is no data in 'data'");

            return (
                <Spinner animation='grow'/>
            );
        }
        else {
            console.log("redercomp:", data);
            return (
                data.map((company) => {
                    return <StartupItem name={company.name} bio={company.bio}/>
                    //return (<div>{company.name}</div>)

                })
                
            )
        }      

    }

    

    useEffect(() => {
        // https://api.github.com/users/dleguisamo
        // /api/getUserProfile
        
        setData(mockData);

    

        axios.get("/api/getUserProfile")
            .then((response) => {
                //console.log(response.data);
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

    // if (loading) return "Loading data...";
    // if (error) return "An error!"

    return (
        
        <Container className='phContainer'>
            
            <AppNavbar/>
            <Row className='phWelcomeRow'>
                <Col className='phWelcomeCol'>
                    <div className='m1'>Welcome, {name} </div>
                    <div className='m2'>Here are your matches based on your skills!</div>
                </Col>
            </Row>

            <Row className='startupRow'>
                <div className='allStartups'>{renderCompanies()}</div>
                
            </Row>
        </Container>
    )
}

export default PersonHomepage
