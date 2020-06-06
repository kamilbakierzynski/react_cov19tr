// React
import React from 'react';

// Navigation
import { useHistory } from 'react-router-dom';

// Bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

const NoPageFoundScreen = (props) => {
    const history = useHistory();

    return (
        <Jumbotron  style={{ marginLeft: 30, marginRight: 30 }}>
            <h1>404? How?</h1>
            <p>
                It's a shame you didn't get what you've wanted.<br /><br />
                Here is a joke for you:<br /><br />
                <b>What's the best thing about Switzerland?</b><br />
                <i>I don't know, but the flag is a big plus.</i>
            </p>
            <p>
                <Button variant="primary" onClick={history.goBack}>Go back in time!</Button>
            </p>
        </Jumbotron>
    );
}

export default NoPageFoundScreen;