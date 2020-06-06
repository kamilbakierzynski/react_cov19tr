// React
import React from 'react';

// Props checking
import PropTypes from 'prop-types';

// Form
import { Formik, ErrorMessage } from 'formik';

// Bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

// Helpers
import addCommas from '../../helpers/addCommas';


const EditScreen = (props) => {

    // Initial values for Formik
    const initialValues = {
        note: props.note || '',
        notify: props.notify || false,
        notWhenSurpass: props.notWhenSurpass || props.cases.active,
        notWhenDrop: props.notWhenDrop || props.cases.active,
        blockSync: props.blockSync || false,
        color: props.color || 'Default',
        username: props.username || ''
    }

    // Wrapper to display confirm box before running Formik's handleReset
    const confirmReset = (func) => {
        if (window.confirm('Reset changes?')) {
            func();
        }
    }

    // Small red box with error message bellow the field
    const ErrorMessageBadge = (msg) => {
        return (
            <Alert key={msg} variant="danger">{msg}</Alert>
        );
    }

    return (
        <>
            <Jumbotron style={{ marginLeft: 30, marginRight: 30 }}>
                <h1>You are editing <i>"{props.country}"</i></h1>
            </Jumbotron>
            <Jumbotron style={{ marginLeft: 30, marginRight: 30 }}>
                <Formik
                    onSubmit={(values, { setSubmitting }) => {

                        // Simulate async call
                        setTimeout(() => {

                            // Save/override data from form to proper element in localData array.
                            const newLocalData = props.local.localData.reduce((akum, element) => {
                                if (element.id === props.id) {
                                    const newElement = {...element, ...values};
                                    return [...akum, newElement];
                                } else {
                                    return [...akum, element];
                                }
                            }, []);
                            props.local.overrideLocalData(newLocalData);

                            // Make form active again. No need to reset the form.
                            setSubmitting(false);
                            
                        }, 2000);
                    }}
                    onReset={() => console.log('Reset')}
                    // Defined above the Formik
                    initialValues={initialValues}
                    // Defined bellow the Component
                    validate={validator}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        handleReset,
                        isSubmitting,
                        values,
                        touched,
                        isValid,
                        errors,
                        dirty
                    }) => (
                            <Form noValidate onSubmit={handleSubmit} onReset={() => confirmReset(handleReset)}>
                                <Form.Group as={Col} controlId="note">
                                    <Form.Label>Note</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows="3"
                                        name="note"
                                        value={values.note}
                                        disabled={isSubmitting}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.note && !errors.note}
                                    />
                                    <Form.Control.Feedback>{values.note !== '' ? "Great!" : ''}</Form.Control.Feedback>
                                    <ErrorMessage name="note">{msg => ErrorMessageBadge(msg)}</ErrorMessage>
                                </Form.Group>

                                <Form.Group as={Col} controlId="notify">
                                    <Form.Label>Notify</Form.Label>
                                    <Form.Check
                                        type="switch"
                                        name="notify"
                                        value={values.notify}
                                        label={values.notify ? "Notify" : "Disabled"}
                                        disabled={isSubmitting}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.notify && !errors.notify}
                                    />
                                    <Form.Control.Feedback>{props.notify === values.notify ? '' : "Perfect!"}</Form.Control.Feedback>
                                    <ErrorMessage name="notify">{msg => ErrorMessageBadge(msg)}</ErrorMessage>
                                </Form.Group>

                                <Form.Group as={Col} controlId="notWhenSurpass">
                                    <Form.Label>Notify when active cases surpass: {addCommas(values.notWhenSurpass)}</Form.Label>
                                    <Form.Control
                                        type="range"
                                        name="notWhenSurpass"
                                        min={props.cases.active}
                                        max={props.cases.active * 2}
                                        step="1"
                                        value={values.notWhenSurpass}
                                        disabled={isSubmitting || !values.notify}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.notWhenSurpass && !errors.notWhenSurpass}
                                    />
                                    <Form.Control.Feedback>{props.cases.active === values.notWhenSurpass ? '' : "Great!"}</Form.Control.Feedback>
                                    <ErrorMessage name="notWhenSurpass">{msg => ErrorMessageBadge(msg)}</ErrorMessage>
                                </Form.Group>

                                <Form.Group as={Col} controlId="notWhenDrop">
                                    <Form.Label>Notify when active cases drop below: {addCommas(values.notWhenDrop)}</Form.Label>
                                    <Form.Control
                                        type="range"
                                        name="notWhenDrop"
                                        min="0"
                                        max={props.cases.active}
                                        step="1"
                                        value={values.notWhenDrop}
                                        disabled={isSubmitting || !values.notify}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.notWhenDrop && !errors.notWhenDrop}
                                    />
                                    <Form.Control.Feedback>{props.cases.active === values.notWhenDrop ? '' : "Looks good!"}</Form.Control.Feedback>
                                    <ErrorMessage name="notWhenDrop">{msg => ErrorMessageBadge(msg)}</ErrorMessage>
                                </Form.Group>

                                <Form.Group as={Col} controlId="blockSync">
                                    <Form.Label>Block Sync</Form.Label>
                                    <Form.Check
                                        type="switch"
                                        name="blockSync"
                                        value={values.blockSync}
                                        label={values.blockSync ? "Active" : "Disabled"}
                                        disabled={isSubmitting}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.blockSync && !errors.blockSync}
                                    />
                                    <Form.Control.Feedback>{props.blockSync === values.blockSync ? '' : "Perfect!"}</Form.Control.Feedback>
                                    <ErrorMessage name="blockSync">{msg => ErrorMessageBadge(msg)}</ErrorMessage>
                                </Form.Group>

                                <Form.Group as={Col} md="5" controlId="color">
                                    <Form.Label>Color</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name='color'
                                        value={values.color}
                                        disabled={isSubmitting}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.color && !errors.color}
                                        custom>
                                        <option value="Default">Default</option>
                                        <option value="Green">Green</option>
                                        <option value="Red">Red</option>
                                        <option value="Blue">Blue</option>
                                        <option value="Yellow">Yellow</option>
                                    </Form.Control>
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <ErrorMessage name="color">{msg => ErrorMessageBadge(msg)}</ErrorMessage>
                                </Form.Group>


                                <Form.Group as={Col} md="5" controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="text"
                                            placeholder="username"
                                            aria-describedby="inputGroupPrepend"
                                            name="username"
                                            value={values.username}
                                            disabled={isSubmitting}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.username}
                                        />
                                        <Form.Control.Feedback>
                                            {errors.username}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                    <ErrorMessage name="username">{msg => ErrorMessageBadge(msg)}</ErrorMessage>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <ButtonGroup aria-label="Basic example">
                                        <Button disabled={isSubmitting || !dirty} type="reset" variant="outline-danger">Reset</Button>
                                        <Button disabled={isSubmitting || !dirty} type="submit" variant="primary">{isSubmitting
                                            ? <><Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true" /> {" Saving..."}</>
                                            : "Save"
                                        }</Button>
                                    </ButtonGroup>
                                </Form.Group>
                            </Form>
                        )}
                </Formik>
            </Jumbotron>
        </>
    )
}

// Check props
EditScreen.propTypes = {
    country: PropTypes.string.isRequired,
    cases: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
}

const validator = (values) => {
    const errors = {};

    // Note
    if (values.note.length > 255) {
        errors.note = 'Note length has to be less than 255 characters.';
    }

    // Username
    // Test if empty
    if (!values.username) {
        errors.username = 'Field is required.';
    } else {
        const regexFull = /^[a-zA-Z]{1,}[a-zA-Z0-9]{1,}$/g;

        // Test if starts with letter and contains only A-Z a-z or 0-9 characters.
        if (!regexFull.test(values.username)) {
            let output = '';
            const errorUsername = {};
            const regexForFirstLetter = /^[a-zA-Z]/g;

            // Test if first character is letter.
            if (!regexForFirstLetter.test(values.username)) {
                output += 'Username has to start with a letter';
                errorUsername.firstLetter = true;
            }

            // Checks if username contains special characters.
            const regexForSpecialChars = /[!@#$%^&*)(+=._-]/g;
            if (regexForSpecialChars.test(values.username)) {
                output += output !== ''
                    ? ' and must not contain any special character'
                    : 'Username must not contain any special character';
                errorUsername.specialChars = true;
            }

            // Checks for spaces in username.
            if (values.username.includes(' ')) {
                if (errorUsername.firstLetter) {
                    if (errorUsername.specialChars) {
                        output += ' or space';
                    } else {
                        output += ' and must not contain space';
                    }
                } else if (errorUsername.specialChars) {
                    output += ' or space';
                } else {
                    output += 'Username must not contain space';
                }
            }

            // Adds dot after the concatenated sentence.
            output += output !== '' ? '.' : '';
            errors.username = output;
        }
    }

    return errors;
}

export default EditScreen;