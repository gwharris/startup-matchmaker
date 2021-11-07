import React from 'react'
import {Button, Container, Row, Col} from 'react-bootstrap';
import './styles/homepage.css'

const HomePage = (props) => {

    const handleStartupClick = () => {
        console.log("SELECTED STARTUP")
    }

    const handlePersonClick = () => {
        console.log("SELECTED PERSON")
    }
    
    return (
        <Container fluid className='hpContainer'>
            <Row className='hpRow'>
                <Col className="leftCol">
                    <div className='startupQuestion'>ARE YOU A</div>
                    <Button onClick={handleStartupClick} className="startupButton">STARTUP?</Button>
                </Col>
                <Col className='rightCol'>
                    <div className='personQuestion'>ARE YOU A</div>
                    <Button onClick={handlePersonClick} className='personButton'>PERSON?</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage
