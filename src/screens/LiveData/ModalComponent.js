// React
import React, { useRef } from 'react';

// Form
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';

// Bootstrap
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Helpers
import addCommas from '../../helpers/addCommas';


const ModalComponent = (props) => {
  const formRef = useRef();

  const handleClose = () => props.setShowModal(false);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  }

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          innerRef={formRef}
          initialValues={props.initialVals}
          validate={values => {
            const errors = {};
            if (values.maxActiveCases < values.minActiveCases) {
              values.maxActiveCases = values.minActiveCases;
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            props.setModalVals(values);
            setSubmitting(false);
            handleClose();
          }}
        >
          {({ values, validateForm }) => (
            <FormikForm as={Form}>

              <Form.Group controlId="formGroupCountryName">
                <Form.Label>Country name</Form.Label>
                <Field type='text' name='countryName' placeholder="ex. USA" as={Form.Control} />
                <ErrorMessage name='countryName' component='div' as={Form.Text} />
              </Form.Group>

              <Form.Group controlId="formGroupMinCases">
                <Form.Label>Min active cases: {addCommas(values.minActiveCases)}</Form.Label>
                <ErrorMessage name='minActiveCases' component='div' as={Form.Text} />
                <Field type='range' name='minActiveCases' min={props.range.min} max={props.range.max} step={props.range.max/100} as={Form.Control} />
                <ErrorMessage name='minActiveCases' component='div' as={Form.Text} />
              </Form.Group>

              <Form.Group controlId="formGroupMaxCases">
                <Form.Label>Max active cases: {addCommas(values.maxActiveCases)}</Form.Label>
                <ErrorMessage name='maxActiveCases' component='div' as={Form.Text} />
                <Field type='range' name='maxActiveCases' min={props.range.min} max={props.range.max} step={props.range.max/100} as={Form.Control} />
                <ErrorMessage name='maxActiveCases' component='div' as={Form.Text} />
              </Form.Group>

              <Form.Group controlId="displayContinents">
              <Field type='checkbox' name='displayContinents' as={Form.Check} label="Display continents"/>
              </Form.Group>

            </FormikForm>
          )}
        </Formik>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} >
          {props.buttonOk}
        </Button>
      </Modal.Footer>
    </Modal >

  );
}

export default ModalComponent;