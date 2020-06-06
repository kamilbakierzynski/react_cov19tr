// React
import React from 'react';

// Bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//Components
import PlaceHolder from '../../components/PlaceHolder';


const DetailsSkeleton = () => {
    return (
        <>
            <Jumbotron style={{ marginLeft: 30, marginRight: 30 }}>
                <h1>
                    <PlaceHolder max={50} min={10} height={40} radius={3} />
                </h1>
                <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                <Row>
                    <Col md="auto">
                        <Button variant="primary" disabled>Edit</Button>
                    </Col>
                    <Col md="auto">
                        <Button variant="danger" disabled>Remove</Button>
                    </Col>
                </Row>
            </Jumbotron>
            <Jumbotron style={{ marginLeft: 30, marginRight: 30 }}>
                <Row className="justify-content-md-center">
                    <Col lg="3">
                        <PlaceHolder max={60} min={10} height={40} radius={3} /><br />
                        <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                        <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                        <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                        <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                        <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                    </Col>
                    <Col lg="3" />
                    <Col lg="3">
                        <PlaceHolder max={60} min={10} height={40} radius={3} /><br />

                        <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                        <PlaceHolder max={30} min={5} height={15} radius={1} /><br />

                    </Col>
                </Row>
            </Jumbotron>
            <Jumbotron style={{ marginLeft: 30, marginRight: 30 }}>
                <h1>
                    <PlaceHolder max={50} min={10} height={40} radius={3} />
                </h1>
                <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
            </Jumbotron>
        </>
    );
}

export default DetailsSkeleton;