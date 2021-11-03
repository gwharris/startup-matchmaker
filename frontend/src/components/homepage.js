import React from 'react'
import {Button, Container, Row, Col} from 'react-bootstrap';

const HomePage = (props) => {
    return (
        <Container fluid className='hpContainer'>
            <Row className='hpRow'>
                <Col className="leftCol">
                    <Button className="startupButton">STARTUP?</Button>
                </Col>
                <Col className='rightCol'>
                    <Button className='personButton'>PERSON?</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage
