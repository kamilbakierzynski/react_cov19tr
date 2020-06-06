// React
import React, { useState, useEffect } from 'react';

// Navigation
import { useHistory } from 'react-router-dom';

// Helpers
import addCommas from '../helpers/addCommas';
import preetifyTime from '../helpers/preetifyTime';

// Components
import Toast from 'react-bootstrap/Toast';

const Toasts = (props) => {
    // Saving state of all toast to display
    const [toasts, setToasts] = useState([]);
    // Used to link to specific page when clicked on toast
    const history = useHistory();

    // useEffect checks every time localData changes to notify about recent changes
    useEffect(() => {
        const toastArr = props.localData.reduce((akum, element) => {
            if (!element.notify) return akum;
            if (element.cases.active < element.notWhenDrop) {
                return [...akum, element];
            }
            if (element.cases.active > element.notWhenSurpass) {
                return [...akum, element];
            }
            return akum;
        }, []);
        setToasts(toastArr);
    }, [props.localData]);

    // when X clicked, the field in the country object is changed to false
    // this field then decides whether to show toast or not
    const handleClose = (id) => {
        const onlineDataWithElementChange = props.localData.reduce((akum, element) => {
            if (element.id === id) {
                element.notify = false;
            }
            return [...akum, element];
        }, []);
        props.overrideLocalData(onlineDataWithElementChange);
    }

    // link to specific country
    const handleClick = (id) => {
        history.push(`/local-data/show/${id}`);
    }

    // Toast style to position in the right bottom corner, above all other components
    // Toasts stack on top of each other by default
    const styles = {
        zIndex: 10,
        position: 'fixed',
        right: 40,
        bottom: 50
    }

    return (
        <div style={styles}>
            {
                toasts.map((element) => (
                    <ToastMaker
                        {...element}
                        handleClose={handleClose}
                        handleClick={handleClick} />
                ))
            }
        </div>
    );
}

const ToastMaker = (props) => {
    const timeDiff = Date.now() - new Date(props.time).getTime();
    let body = '';
    if (props.cases.active < props.notWhenDrop) {
        body = `${props.country} has just dropped bellow ${addCommas(props.notWhenDrop)} active cases!`;
    }
    if (props.cases.active > props.notWhenSurpass) {
        body = `${props.country} has just surpassed ${addCommas(props.notWhenSurpass)} active cases!`;
    }
    return (
        <Toast show={true} style={{cursor: "pointer"}} onClose={() => props.handleClose(props.id)} key={props.id}>
            <Toast.Header>
                <strong className="mr-auto" onClick={() => props.handleClick(props.id)}>{props.country}</strong>
                <small onClick={() => props.handleClick(props.id)}>{preetifyTime(timeDiff)}</small>
            </Toast.Header>
            <Toast.Body onClick={() => props.handleClick(props.id)} >{body}</Toast.Body>
        </Toast>
    );
}

export default Toasts;
