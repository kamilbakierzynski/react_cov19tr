// React
import React from 'react';

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


const AddScreen = (props) => {

    // Initial values for Formik
    const initialValues = {
        country: '',
        newCases: "0",
        activeCases: "0",
        recovered: "0",
        deaths: "0",
        total: "0",
        tests: "0",
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
                <h1>You are creating new entry.</h1>
            </Jumbotron>
            <Jumbotron style={{ marginLeft: 30, marginRight: 30 }}>
                <Formik
                    onSubmit={(values, { setSubmitting }) => {

                        // Simulate async call
                        setTimeout(() => {
                            // Save/override data from form to proper element in localData array.


                            // Make form active again. No need to reset the form.
                            setSubmitting(false);

                        }, 2000);
                    }}
                    onReset={() => console.log('Reset')}
                    // Defined above the Formik
                    initialValues={initialValues}
                    // Defined bellow the Component
                    validate={console.log}
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
                                <Form.Group as={Col} controlId="country">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        placeholder="ex. Gdańsk"
                                        name="country"
                                        value={values.country}
                                        disabled={isSubmitting}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.country && !errors.country && values.country !== ''}
                                    />
                                    <Form.Control.Feedback>{values.country !== '' ? "Great!" : ''}</Form.Control.Feedback>
                                    <ErrorMessage name="country">{msg => ErrorMessageBadge(msg)}</ErrorMessage>
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
                                                aria-hidden="true" /> {" Adding..."}</>
                                            : "Add"
                                        }</Button>
                                    </ButtonGroup>
                                </Form.Group>
                            </Form>
                        )}
                </Formik>
            </Jumbotron>
        </>
    );
}

export default AddScreen;