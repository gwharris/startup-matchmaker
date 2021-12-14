import React from 'react'
import {Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import './styles/StartupItem.css'
//on mount, fetch matches? 
const StartupItem = (props) => {
    return (
        <Container className="startupItemContainer">
            {/* <div style={{ backgroundImage: `url(${image})` }}> </div> */}
            <h1>{props.name}</h1>
            <p>{props.bio}</p>
        </Container>
    )
}

export default StartupItem
