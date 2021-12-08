import React from 'react'
import {Button, Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/homepage.css'

const HomePage = (props) => {

    return (
        <Container fluid className='hpContainer'>
            <Row className='hpRow'>
                <Col className="leftCol">
                    <div className='startupQuestion'>ARE YOU A</div>
                    <Link to="/login">
                        <Button className="startupButton">STARTUP?</Button>
                    </Link>
                </Col>
                <Col className='rightCol'>
                    <div className='personQuestion'>ARE YOU AN</div>
                    <Link to="/login">
                        <Button className='personButton'>INDIVIDUAL?</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage
