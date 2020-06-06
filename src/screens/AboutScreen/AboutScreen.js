// React
import React from 'react';

// Bootstrap
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const AboutScreen = (props) => {

    return (
        <Accordion defaultActiveKey="0" style={{ marginLeft: 30, marginRight: 30 }}>
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        How to add countries to Local data?
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>Click on the Live data tab and select (by clicking on it)
                    countries/places you want to "follow". After that they will turn green
                    and you will see an indicator close to the Local data in the Navbar.
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        How can I set up notifications?
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>You have to have desired country added to Local data. Click on it and then click on Edit button.
                    In the form select Notify to ON and select details. When selected country surpasses or drops bellow provided
                    number you will get a notify in the right bottom corner.
                    Bare in mind that you still have to sync your data to get notification.
                    There is no autosync.
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="2">
                        I've spotted a bug. How can I report it?
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                    <Card.Body>
                        <Card.Text>
                            Please file an issue on GitHub. Thank you in advance!
                        </Card.Text>
                        <Card.Link href="#bug-report" onClick={() => window.open('https://github.com/kamilbakierzynski/react_coronavirus/issues/new?assignees=kamilbakierzynski&labels=bug&template=bug_report.md&title=%5BBUG%5D')}>File an issue.</Card.Link>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

export default AboutScreen;

