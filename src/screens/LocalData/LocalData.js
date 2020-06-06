// React
import React, { useState, useEffect } from 'react';

// Navigation
import { useHistory } from 'react-router-dom';

// Bootstrap
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

// Components
import ModalComponent from '../LiveData/ModalComponent';
import LocalTable from './LocalTable.js';


const LocalDataScreen = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [modalVals, setModalVals] = useState({ countryName: '', minActiveCases: 0, maxActiveCases: 5000000, displayContinents: true });
    const [tmpFiltered, setTmpFiltered] = useState(props.local.localData);
    const history = useHistory();

    const { local } = props;

    useEffect(() => {
        if (local.localData.length !== 0) {
            const filteredList = local.localData.filter(element => {
                const continents = ['All', 'South-America', 'North-America', 'Asia', 'Europe', 'Africa'];
                const country = element.country.toLowerCase();
                const byName = country.startsWith(modalVals.countryName.toLowerCase());
                const byMin = element.cases.active >= modalVals.minActiveCases;
                const byMax = element.cases.active <= modalVals.maxActiveCases;
                const byContinent = !modalVals.displayContinents ? !continents.includes(element.country) : true;

                const result = (byName && byMin && byMax && byContinent);

                return result;
            });
            setTmpFiltered(filteredList);
        } else {
            setTmpFiltered(local.localData);
        }
    }, [modalVals, local.localData]);

    const handleReset = () => {
        if (window.confirm('Do you want to reset local data?')) {
            local.clearLocalData();
        }
    }

    const tableComponentProps = { list: tmpFiltered, local: props.local };
    const modalComponentProps = {
        show: showModal,
        title: "Filter settings",
        setShowModal,
        buttonOk: "Filter",
        initialVals: modalVals,
        range: { min: 0, max: 5000000 },
        setModalVals
    };

    return (
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col md='auto'>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="primary" onClick={() => local.syncLocalData()}>
                            Synchronize
                    </Button>
                        <Button variant="primary" onClick={() => setShowModal(true)}>
                            Filter
                    </Button>
                        <Button variant="primary" onClick={() => history.push(`/local-data/add/${Date.now()}`)}>
                            Add
                    </Button>
                    </ButtonGroup>
                </Col>
                <Col md='auto'>
                    <Button variant="danger" onClick={handleReset}>
                        Reset Local Data
                    </Button>
                </Col>
            </Row>
            <Container style={{ height: 30 }} />
            <ModalComponent {...modalComponentProps} />
            <Row className="justify-content-md-center">
                <LocalTable {...tableComponentProps} />
            </Row>
        </Container>
    );
}

export default LocalDataScreen;