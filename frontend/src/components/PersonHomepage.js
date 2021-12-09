import React, { useState, useEffect } from 'react'
import StartupItem from './StartupItem'
import AppNavbar from './AppNavbar'
import { Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';
import './styles/personHomepage.css';


const PersonHomepage = () => {

    const [name, setName] = useState(null);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState(null);




    const mockData = [{
        "name": "DailyPay",
        "skills": ["research", "software engineering"],
        "bio": "DailyPay is an American financial services company founded in 2015, which provides payroll services such as earned wage access. DailyPay charges up to $2.99 for users to receive 100% of their earned but unpaid income. This fee has been compared to traditional payday lending which has prompted regulatory scrutiny."
    },
    {
        "name": "MarketAxess",
        "skills": ["research", "software engineering"],
        "bio": "MarketAxess Holdings Inc. is an international financial technology company that operates an electronic trading platform for the institutional credit markets, and also provides market data and post-trade services."
    },
    {
        "name": "Rokt",
        "skills": ["research", "software engineering"],
        "bio": "Rokt is the global leader in ecommerce technology, powering the Transaction Moment™ of best-in-class companies including Live Nation, Groupon, Staples, Lands' End, Fanatics, GoDaddy, Vistaprint, and HelloFresh. Since launch, we have been focused on our mission: to make ecommerce smarter, faster, and better."
    },
    {
        "name": "Share Local Media",
        "skills": ["research", "software engineering"],
        "bio": "SLM is a full-service direct mail agency focused exclusively on e-commerce. Founded by direct marketers for direct marketers, we’re motivated by opportunities to drive high-scale, CPA-efficient outcomes for clients."
    },
    {
        "name": "RocketReach",
        "skills": ["research", "software engineering"],
        "bio": "Real-time verified data for 450 million professionals across 17 million companies, worldwide. Trusted by over 9.7 million users — powering sales, recruiting, and marketing at companies large and small. Prospect, connect and converse with your leads at scale."
    },
    {
        "name": "Cedar",
        "skills": ["research", "software engineering"],
        "bio": "At Cedar, we foster that mutually beneficial relationship through proven expertise and modern technology. We combine the best techniques of fintech, ad tech, consumer and healthcare to help providers understand and engage patients more effectively."
    },
    {
        "name": "Addepar",
        "skills": ["research", "software engineering"],
        "bio": "Addepar consolidates and unifies all your data so you can easily analyze any portfolio, provide clients with a more complete and meaningful financial picture and offer the best possible advice."
    }];

    const renderCompanies = () => {
        if (data == null) {
            console.log("renderComp: There is no data in 'data'");

            return (
                <Spinner animation='grow' />
            );
        }
        else {
            console.log("rendercomp:", data);
            return (
                data.map((company) => {
                    return <StartupItem name={company.name} bio={company.bio} />
                    //return (<div>{company.name}</div>)

                })

            )
        }

    }



    useEffect(() => {
        // https://api.github.com/users/dleguisamo
        // /api/getUserProfile

        // setData(mockData);
        axios.get("/api/getUserProfile")
            .then((response) => {
                console.log(response.data);
                setName(response.data.name);
            })
            .catch((error) => {
                console.error("Could not fetch data: ", error);
                setError(error)
            })

        axios.get("/api/getPersonMatches")
            .then((response) => {
                console.log(response.data);
                setData(response.data);
                // setName(response.data.name);
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

            <AppNavbar />
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
