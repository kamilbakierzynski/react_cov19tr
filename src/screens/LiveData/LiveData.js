// React
import React, { useState, useEffect } from 'react';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

// Components
import TableComponent from './TableComponent';
import ModalComponent from './ModalComponent';
import ButtonRow from './ButtonRow.js';


const LiveDataScreen = (props) => {
    const [onlineData, setOnlineData] = useState(props.onlineData);
    const [showModal, setShowModal] = useState(false);
    const [clicked, setClicked] = useState([]);
    const [modalVals, setModalVals] = useState({ countryName: '', minActiveCases: 0, maxActiveCases: 5000000, displayContinents: true });

    const resetClicked = () => setClicked([]);
    // Reset clicked every time loading button is pressed
    useEffect(resetClicked, [props.isLoading]);

    useEffect(() => {
        if (onlineData !== "Ładowanie") {
            const filteredList = props.onlineData.filter(element => {
                const continents = ['All', 'South America', 'North America', 'Asia', 'Europe', 'Africa'];
                const country = element.country.toLowerCase();
                const byName = country.startsWith(modalVals.countryName.toLowerCase());
                const byMin = element.cases.active >= modalVals.minActiveCases;
                const byMax = element.cases.active <= modalVals.maxActiveCases;
                const byContinent = !modalVals.displayContinents ? !continents.includes(element.country) : true;
                
                const result = (byName && byMin && byMax && byContinent);
                
                return result;
            });
            setOnlineData(filteredList);
        } else {
            setOnlineData(props.onlineData);
        }
    }, [modalVals, props.onlineData]); //eslint-disable-line react-hooks/exhaustive-deps
    // Disable eslint beacuse I don't want to trigger hook every time when onlineData changes
    // because it would spin in the inifite loop

    const countClicked = Math.max(clicked.length, 0);

    const saveClicked = () => {
        console.log(clicked);
        let tmp = clicked.reduce((akum, element) => [...akum, element.id], []);
        console.log(tmp);
        props.local.saveLocalData(tmp);
    }

    const buttonRowProps = { ...props, setShowModal, resetClicked, countClicked, saveClicked };
    const modalComponentProps = {
        show: showModal,
        title: "Filter settings",
        setShowModal,
        buttonOk: "Filter",
        initialVals: modalVals,
        range: { min: 0, max: 5000000 },
        setModalVals
    };
    const tableComponentProps = { list: onlineData, clicked, setClicked, localData: props.local.localData, isLoading: props.isLoading };

    return (
        <Container fluid>
            <ButtonRow {...buttonRowProps} />
            <Container style={{ height: 30 }} />
            <ModalComponent  {...modalComponentProps} />
            <Row className="justify-content-md-center">
                <TableComponent {...tableComponentProps} />
            </Row>
        </Container>
    );
}

export default LiveDataScreen;