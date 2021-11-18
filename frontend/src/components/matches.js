import React from 'react'
import './styles/login.css';
import { Button, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Matches extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {

        return (
            <Container className='lgContainer'>
                <Row className='row'>
                    <Link to="/profile">
                        <Button>Take me to my profile</Button>
                    </Link>
                    <Button>This is where you see your matches</Button>
                </Row>
            </Container>

        )
    }
}

export default Matches