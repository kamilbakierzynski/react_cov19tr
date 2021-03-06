// React
import React from 'react';

// Bootstrap
import Alert from 'react-bootstrap/Alert';

const AlertComponent = (props) => {

    if (!props.alertOptions.show) return null;

    const handleClose = () => {
        const alertOptionsCopy = {...props.alertOptions};
        alertOptionsCopy.show = false;
        props.setAlertOptions(alertOptionsCopy);
    }

    return (
        <Alert id="alert" key="primary" variant="danger" style={{ marginTop: 5, marginLeft: 5, marginRight: 5 }}
            onClose={handleClose} dismissible>
            <Alert.Heading id="heading">{props.alertOptions.title}</Alert.Heading>
            <p id="body">{props.alertOptions.body}</p>
        </Alert>
    );
}

export default AlertComponent;