import React from 'react'
import {Button, Container, Row, Col, Spinner} from 'react-bootstrap';
import './styles/StartupItem.css'
import mascot from './styles/mascot.png'
//on mount, fetch matches? 
const StartupItem = (props) => {
    return (
        <Container className="startupItemContainer">
            {/* <div style={{ backgroundImage: `url(${image})` }}> </div> */}
            <h1 className="startupName">{props.name}</h1>
            <p>{props.bio}</p>
            <img src={mascot} className='img-fluid'/>
        </Container>
    )
}

export default StartupItem
