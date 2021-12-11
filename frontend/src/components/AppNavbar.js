import React, {useState} from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import './styles/Navbar.css';
import axios from 'axios';

const AppNavbar = () => {
    const [searchTerm, setSearchTerm] = useState("")
    
    const doSearch = () => {
        console.log(JSON.stringify({
            term: searchTerm,
        }));
        axios({
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            data: JSON.stringify({
                term: searchTerm,
            }),
            withCredentials: true,
            url: "/api/search",
        }).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand className='navText' href="#">Startup Matchmaker</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link className='navText' href="/personhomepage">Home</Nav.Link>
                    <Nav.Link className='navText' href="/personprofile">Profile</Nav.Link>

                </Nav>
                <Form className="d-flex">
                    <FormControl
                    onChange={e => setSearchTerm(e.target.value)}
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button onClick={doSearch} className='navbuttons' variant="outline-secondary">Search</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default AppNavbar


// import React, { useState } from "react";
// // import Logo from "../assets/logo.png";
// import { Link } from "react-router-dom";
// // import ReorderIcon from "@material-ui/icons/Reorder";
// // import "../styles/Navbar.css";

// function Navbar() {
//   const [openLinks, setOpenLinks] = useState(false);

//   const toggleNavbar = () => {
//     setOpenLinks(!openLinks);
//   };
//   return (
//     <div className="navbar">
//       <div className="leftSide" id={openLinks ? "open" : "close"}>
//         {/* <img src={Logo} /> */}
//         <div className="hiddenLinks">
//           <Link to="/"> Talents </Link>
//           <Link to="/startup"> Startups </Link>
//         </div>
//       </div>
//       <div className="rightSide">
//         <Link to="/"> Talents </Link>
//         <Link to="/startup"> Startups </Link>
//         <button onClick={toggleNavbar}>
//           {/* <ReorderIcon /> */}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Navbar;