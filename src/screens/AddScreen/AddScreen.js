// React
import React from 'react';

// Navigation
import { useHistory } from 'react-router-dom';

// Form
import { Formik, ErrorMessage } from 'formik';

// Bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';


const AddScreen = (props) => {
    const history = useHistory();

    // Initial values for Formik
    const initialValues = {
        country: '',
        newCases: "",
        activeCases: "",
        recovered: "",
        deaths: "",
        total: "",
        tests: "",
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
                            const id = generateUID()
                            const newEntry = {
                                country: values.country,
                                id: id,
                                localEntry: true,
                                cases: {
                                    active: +values.activeCases,
                                    new: `+${values.newCases}`,
                                    recovered: +values.recovered,
                                    total: +values.total
                                },
                                deaths: {
                                    total: +values.deaths
                                },
                                tests: {
                                    total: +values.tests
                                },
                                time: new Date().toISOString()
                            }
                            const newLocalData = [...props.local.localData, newEntry];
                            props.local.overrideLocalData(newLocalData);
                            // Make form active again. No need to reset the form.
                            setSubmitting(false);
                            // Redirect to freshly created object
                            history.push(`/local-data/show/${id}`);

                        }, 2000);
                    }}
                    onReset={() => console.log('Reset')}
                    // Defined above the Formik
                    initialValues={initialValues}
                    // Defined bellow the Component
                    validate={values => validationChecker(values)}
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
                                    <Form.Label>Country / City / Place</Form.Label>
                                    <Form.Control
                                        placeholder="ex. Gdańsk"
                                        name="country"
                                        value={values.country}
                                        disabled={isSubmitting}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.country && !errors.country}
                                    />
                                    <Form.Control.Feedback>{values.country !== '' ? "Great!" : ''}</Form.Control.Feedback>
                                    <ErrorMessage name="country">{msg => ErrorMessageBadge(msg)}</ErrorMessage>
                                </Form.Group>

                                <Form.Group as={Col} controlId="newCases">
                                    <Form.Label>New Cases</Form.Label>
                                    <Form.Control
                                        placeholder="Type number here (optional)"
                                        name="newCases"
                                        value={values.newCases}
                                        disabled={isSubmitting}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.newCases && !errors.newCases}
                                    />
                                    <Form.Control.Feedback>{values.newCases !== '' ? "Great!" : ''}</Form.Control.Feedback>
                                    <ErrorMessage name="newCases">{msg => ErrorMessageBadge(msg)}</ErrorMessage>
                                </Form.Group>

                                <Form.Group as={Col} controlId="activeCases">
                                    <Form.Label>Active cases</Form.Label>
                                    <Form.Control
                                        placeholder="Type number here"
                                        name="activeCases"
                                        value={values.activeCases}
                                        disabled={isSubmitting}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.activeCases && !errors.activeCases}
                                    />
                                    <Form.Control.Feedback>{values.activeCases !== '' ? "Great!" : ''}</Form.Control.Feedback>
                                    <ErrorMessage name="activeCases">{msg => ErrorMessageBadge(msg)}</ErrorMessage>
                                </Form.Group>

                                <Form.Group as={Col} controlId="recovered">
                                    <Form.Label>Recovered</Form.Label>
                                    <Form.Control
                                        placeholder="Type number here"
                                        name="recovered"
                                        value={values.recovered}
                                        disabled={isSubmitting}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.recovered && !errors.recovered}
                                    />
                                    <Form.Control.Feedback>{values.recovered !== '' ? "Great!" : ''}</Form.Control.Feedback>
                                    <ErrorMessage name="recovered">{msg => ErrorMessageBadge(msg)}</ErrorMessage>
                                </Form.Group>

                                <Form.Group as={Col} controlId="deaths">
                                    <Form.Label>Deaths</Form.Label>
                                    <Form.Control
                                        placeholder="Type number here"
                                        name="deaths"
                                        value={values.deaths}
                                        disabled={isSubmitting}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.deaths && !errors.deaths}
                                    />
                                    <Form.Control.Feedback>{values.deaths !== '' ? "Great!" : ''}</Form.Control.Feedback>
                                    <ErrorMessage name="deaths">{msg => ErrorMessageBadge(msg)}</ErrorMessage>
                                </Form.Group>

                                <Form.Group as={Col} controlId="total">
                                    <Form.Label>Total</Form.Label>
                                    <Form.Control
                                        placeholder="Type number here"
                                        name="total"
                                        value={values.total}
                                        disabled={isSubmitting}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.total && !errors.total}
                                    />
                                    <Form.Control.Feedback>{values.total !== '' ? "Great!" : ''}</Form.Control.Feedback>
                                    <ErrorMessage name="total">{msg => ErrorMessageBadge(msg)}</ErrorMessage>
                                </Form.Group>

                                <Form.Group as={Col} controlId="tests">
                                    <Form.Label>Tests</Form.Label>
                                    <Form.Control
                                        placeholder="Type number here (optional)"
                                        name="tests"
                                        value={values.tests}
                                        disabled={isSubmitting}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.tests && !errors.tests}
                                    />
                                    <Form.Control.Feedback>{values.tests !== '' ? "Great!" : ''}</Form.Control.Feedback>
                                    <ErrorMessage name="tests">{msg => ErrorMessageBadge(msg)}</ErrorMessage>
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

const validationChecker = (values) => {
    const errors = {};

    const numRegx = /^\d+$/;

    // Check is Number
    if (values.newCases !== '' && !numRegx.test(values.newCases)) errors.newCases = 'Input has to be a number';
    if (!numRegx.test(values.activeCases)) errors.activeCases = 'Input has to be a number';
    if (!numRegx.test(values.recovered)) errors.recovered = 'Input has to be a number';
    if (!numRegx.test(values.deaths)) errors.deaths = 'Input has to be a number';
    if (!numRegx.test(values.total)) errors.total = 'Input has to be a number';
    if (values.tests !== '' && !numRegx.test(values.tests)) errors.tests = 'Input has to be a number'

    // Required
    if (values.country === '') errors.country = 'Field is required';
    if (values.activeCases === '') errors.activeCases = 'Field is required';
    if (values.recovered === '') errors.recovered = 'Field is required';
    if (values.deaths === '') errors.deaths = 'Field is required';
    if (values.total === '') errors.total = 'Field is required';


    return errors;
}

const generateUID = () => {
    const date = Date.now().toString().split('').reverse();
    const stringPart = Math.random().toString(36).slice(-6).split('');

    const output = stringPart.reduce((akum, elem, index) => {
        const regex = /^[a-z]$/;
        let add = elem;
        if (regex.test(elem) && Math.random() > 0.5) add = elem.toUpperCase()
        return akum + add + date[index];
    }, '');

    return output;

}

export default AddScreen;