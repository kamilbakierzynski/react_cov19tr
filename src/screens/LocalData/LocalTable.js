// React
import React, { useState, useEffect } from 'react';

// Navigation
import { useHistory, Link } from "react-router-dom";

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Helpers
import addCommas from '../../helpers/addCommas';
import sortBy from '../../helpers/sortBy';

// Components
import InfoBadge from '../../components/InfoBadge';


const LocalTable = (props) => {
    const [sortedList, setSorted] = useState({ list: [], params: { fieldName: 'New Cases', asc: false } });
    const history = useHistory();

    let listOfCountries = (props.list === "Ładowanie") ? [] : props.list;

    useEffect(() => {
        sortBy({ ...sortedList, list: listOfCountries }, sortedList.params.fieldName, setSorted, false);
    }, [listOfCountries]); // eslint-disable-line react-hooks/exhaustive-deps
    // I don't want to pass sortedList to avoid inifinite loop.

    const handleClicksDetails = (props) => {
        const id = props.country.id;
        const mode = 'show';
        history.push(`/local-data/${mode}/${id}`);
    }

    const handleDelete = (id, name) => {
        if (window.confirm(`Do you want to delete "${name}"?`)) props.local.deleteFromLocal([id]);
    }

    const columnHeaderProps = { sortedList, setSorted };
    return (
        <table className="table table-dark table-striped table-bordered table-hover scrollbar" style={{ position: "relative", width: "90vw", textAlign: "center" }}>
            {/* <caption>{listOfCountries[0] !== undefined ? listOfCountries[0].time : 'Ładowanie...'}</caption> */}
            <thead className='thead-light'>
                <tr>
                    <th scope="col" className='fixedHeader'>#</th>
                    <ColumnHeader text="Country" {...columnHeaderProps} />
                    <ColumnHeader text="New Cases" {...columnHeaderProps} />
                    <ColumnHeader text="Active" {...columnHeaderProps} />
                    <ColumnHeader text="Recovered" {...columnHeaderProps} />
                    <ColumnHeader text="Deaths" {...columnHeaderProps} />
                    <ColumnHeader text="Total" {...columnHeaderProps} />
                    <ColumnHeader text="Tests" {...columnHeaderProps} />
                    <ColumnHeader text="Actions" {...columnHeaderProps} />
                </tr>
            </thead>
            <tbody>
                {sortedList.list.map((country, index) => RowComponent({ country, index, local: props.local, handleClicksDetails, handleDelete }))}
            </tbody>
        </table>
    );
}

const ColumnHeader = (props) => {
    const mode = props.sortedList.params.fieldName === props.text;
    return (
        <th className='fixedHeader' style={{ cursor: "pointer" }}
            onClick={() => sortBy(props.sortedList, props.text, props.setSorted, mode)}>
            {props.text} {SortingIndicator(props.sortedList, props.text)}
        </th>
    );
}

const RowComponent = (props) => {
    const currentCountry = props.country;
    const styleMousePointer = { cursor: "pointer" };
    const styles = {
        "Default": '',
        "Green": "bg-success",
        "Red": "bg-danger",
        "Blue": "bg-primary",
        "Yellow": "bg-warning"
    }
    return (
        <tr key={currentCountry.id} id={currentCountry.id} className={styles[props.country.color]}>
            <th style={styleMousePointer} onClick={() => props.handleClicksDetails(props)}>{props.index + 1}</th>
            <td style={styleMousePointer} onClick={() => props.handleClicksDetails(props)}>{currentCountry.country}<InfoBadge country={currentCountry}/></td>
            <td style={styleMousePointer} onClick={() => props.handleClicksDetails(props)}>{addCommas(currentCountry.cases.new)}</td>
            <td style={styleMousePointer} onClick={() => props.handleClicksDetails(props)}>{addCommas(currentCountry.cases.active)}</td>
            <td style={styleMousePointer} onClick={() => props.handleClicksDetails(props)}>{addCommas(currentCountry.cases.recovered)}</td>
            <td style={styleMousePointer} onClick={() => props.handleClicksDetails(props)}>{addCommas(currentCountry.deaths.total)}</td>
            <td style={styleMousePointer} onClick={() => props.handleClicksDetails(props)}>{addCommas(currentCountry.cases.total)}</td>
            <td style={styleMousePointer} onClick={() => props.handleClicksDetails(props)}>{addCommas(currentCountry.tests.total)}</td>
            <td><Actions id={currentCountry.id} {...props.local} handleDelete={props.handleDelete} name={currentCountry.country}/></td>
        </tr>
    );
}

const Actions = (props) => {
    return (
        <Row className="justify-content-md-center">
            <Col md="auto">
                <Emoji label="edit" emoji="✏️" mode="edit" id={props.id} />
            </Col>
            <Col md="auto" style={{ cursor: "pointer" }} onClick={() => props.handleDelete(props.id, props.name)}>
                <Emoji label="delete" emoji="🗑️" />
            </Col>
        </Row>
    );
}

const Emoji = (props) => {
    if (props.mode === 'edit') {
        const address = `/local-data/${props.mode}/${props.id}`;
        return (
            <span className='emoji'
                role="img"
                aria-label={props.label ? props.label : ''}
                aria-hidden={props.label ? "false" : "true"}>
                <Link to={address} style={{ textDecoration: "none" }}>{props.emoji}</Link>
            </span>
        );
    } else {
        return (
            <span className='emoji'
                role="img"
                aria-label={props.label ? props.label : ''}
                aria-hidden={props.label ? "false" : "true"}>
                {props.emoji}
            </span>
        );
    }
}

const ArrowDown = () => Emoji({ label: "arrow-down", emoji: '⬇' });
const ArrowUp = () => Emoji({ label: "arrow-up", emoji: '⬆' })

const SortingIndicator = (props, fieldName) => {
    if (props.params === undefined) return '';
    if (props.params.fieldName === fieldName) {
        if (props.params.asc) {
            return ArrowUp();
        } else {
            return ArrowDown();
        }
    }
    return '';
}

export default LocalTable;