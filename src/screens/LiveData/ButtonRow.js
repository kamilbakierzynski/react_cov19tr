// React
import React from 'react';

// Boootstrap
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';


const ButtonRow = (props) => (
    <Container fluid>
        <Row className="justify-content-md-center">
            <ButtonGroup aria-label="table-controls">
                <Button
                    variant="primary"
                    onClick={() => props.fetchData()}
                    disabled={props.isLoading}
                    data-testid="button-update">
                    {!props.isLoading
                        ? "Update"
                        : (<>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                data-testid="spinner-loading" />
                            &ensp;Loading...
                            </>)
                    }
                </Button>
                <Button
                    onClick={() => { props.setShowModal(true) }}
                    variant="primary"
                    data-testid="button-filter">Filter
                </Button>
                {props.countClicked
                    ? <>
                        <Button
                            variant="danger"
                            disabled={!props.countClicked}
                            onClick={() => props.resetClicked()}
                            data-testid="button-reset" >Reset
                        </Button>
                        <Button
                            onClick={() => { props.saveClicked(); props.resetClicked() }}
                            variant="success"
                            data-testid="button-add">Add <Badge variant="light" data-testid="badge-add">{props.countClicked}</Badge>
                        </Button>
                    </>
                    : null}
            </ButtonGroup>
        </Row>
    </Container>
);

export default ButtonRow;