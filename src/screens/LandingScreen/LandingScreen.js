// React
import React from 'react';

// Navigation
import { useHistory } from 'react-router-dom';

// Bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


const LandingScreen = (props) => {
    const history = useHistory();

    return (
        <>
            <Jumbotron style={{ marginLeft: 30, marginRight: 30 }}>
                <Container fluid>
                    <Row>
                        <Col md="auto">
                            <div style={{ width: "100px", height: "100px" }}><Image src="assets/logo_big.png" fluid /></div>
                        </Col>
                        <Col>
                            <h1><b>COV<span style={{color: "#007bff"}}>19</span>TR</b></h1>
                            <h2 style={{color: 'grey'}}>Coronavirus Tracker Web App</h2>
                            <p>
                                Track the spread of the Coronavirus COVID-19 epidemic, browse live data, view charts and save local data.
                        </p>
                        </Col>
                    </Row>
                    <Row>
                        <Container style={{height: 10}} fluid />
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="primary" onClick={() => history.push('/live-data')}>Check Live Data</Button>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
            <CardDeck style={{ marginLeft: 20, marginRight: 20, marginBottom: 50 }}>
                <Card className="text-center">
                    <Card.Img variant="top" src="assets/react.png" />
                    <Card.Body>
                        <Card.Title>Made with <b>React.js</b></Card.Title>
                        <Card.Text>
                            This project is entirely made with React.js. Developed as a
                            final project during Univeristy lectures.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="primary" onClick={() => window.open('https://reactjs.org/')}>React website</Button>
                    </Card.Footer>
                </Card>
                <Card className="text-center">
                    <Card.Img variant="top" src="assets/chart.png" />
                    <Card.Body>
                        <Card.Title>Check recent statistics</Card.Title>
                        <Card.Text>
                            Check <b>Live data</b> about Coronavirus and check how many people
                            are infected right now.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="primary" onClick={() => history.push('/live-data')}>View Live Data</Button>
                    </Card.Footer>
                </Card>
                <Card className="text-center">
                    <Card.Img variant="top" src="assets/table.png" />
                    <Card.Body>
                        <Card.Title>Save local data</Card.Title>
                        <Card.Text>
                            Add data to your local storage and keep eye how the virus is spreading.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="primary" onClick={() => history.push('/local-data')}>View Local Data</Button>
                    </Card.Footer>
                </Card>
            </CardDeck>
        </>
    );
}

export default LandingScreen;