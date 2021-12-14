import React from 'react'
import {Button, Container, Row, Col, Spinner} from 'react-bootstrap';
import './styles/StartupItem.css'
import mascot from './styles/mascot.png'
//on mount, fetch matches? 
import Modal from 'react-bootstrap/Modal'



const StartupItem = (props) => {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <Container onClick={() => setModalShow(true)} className="startupItemContainer">
            {/* <div style={{ backgroundImage: `url(${image})` }}> </div> */}
            <h1 className="startupName">{props.name}</h1>
            <p>{props.bio}</p>
            <img src={mascot} className='img-fluid'/>

            <StartupModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Container>
    )
}
function StartupModal(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        
        <Modal.Body>
          <h2>Company Name</h2>
          <h4>Company Bio</h4>
          <br></br>
          <h5>Desired Skills</h5>
            <dl>
            <dt>Skill 1</dt>
            <dt>Skill 2</dt>
            </dl>
        </Modal.Body>
        <Modal.Footer>
            <p>Company Contact Information</p>
          <Button onClick={props.onHide}>Press Esc to Close</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default StartupItem
