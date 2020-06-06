// React
import React, { useState, useEffect } from 'react';

// Helpers
import addCommas from '../../helpers/addCommas';
import sortBy from '../../helpers/sortBy';
import timeFormatter from '../../helpers/timeFormatter';

// Components
import TablePlaceHolder from './TablePlaceHolder';

const TableComponent = (props) => {
    const [sortedList, setSorted] = useState({ list: [], params: { fieldName: 'New Cases', asc: false } });
    let listOfCountries = props.list === "Ładowanie" ? [] : props.list;

    useEffect(() => {
        sortBy({ ...sortedList, list: listOfCountries }, sortedList.params.fieldName, setSorted, false);
    }, [listOfCountries]); // eslint-disable-line react-hooks/exhaustive-deps
    // I don't want to pass sortedList to avoid inifinite loop.

    const columnHeaderProps = { sortedList, setSorted };
    if (!props.isLoading) {
        return (
            <table className="table table-dark table-striped table-bordered table-hover scrollbar" style={{ position: "relative", width: "90vw", textAlign: "center" }}>
                <caption>{listOfCountries[0] !== undefined ? timeFormatter(listOfCountries[0].time) : 'No data to show'}</caption>
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
                    </tr>
                </thead>
                <tbody>
                    {sortedList.list.map((country, index) => RowComponent({ country, index, setClicked: props.setClicked, clicked: props.clicked, localData: props.localData }))}
                </tbody>
            </table>
        );
    } else {
        return <TablePlaceHolder />;
    }

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

const handleClicks = (props) => {
    if (!props.clicked.includes(props.country)) {
        props.setClicked([...props.clicked, props.country]);
    } else {
        props.setClicked(props.clicked.filter(elem => elem !== props.country));
    }
}

const RowComponent = (props) => {
    const currentCountry = props.country;
    let clickedClass = '';
    let clickable = true;
    for (let i = 0; i < props.localData.length; i++) {
        if (props.localData[i].id === currentCountry.id) {
            clickedClass = 'bg-success';
            clickable = false;
            break;
        }
    }
    if (props.clicked.includes(currentCountry)) {
        clickedClass = 'bg-primary';
    }
    const styleMousePointer = { cursor: "pointer" };
    return (
        <tr className={clickedClass} key={currentCountry.id} onClick={clickable ? () => handleClicks(props) : null}>
            <th style={styleMousePointer}>{props.index + 1}</th>
            <td style={styleMousePointer}>{currentCountry.country}</td>
            <td style={styleMousePointer}>{currentCountry.cases.new}</td>
            <td style={styleMousePointer}>{addCommas(currentCountry.cases.active)}</td>
            <td style={styleMousePointer}>{addCommas(currentCountry.cases.recovered)}</td>
            <td style={styleMousePointer}>{addCommas(currentCountry.deaths.total)}</td>
            <td style={styleMousePointer}>{addCommas(currentCountry.cases.total)}</td>
            <td style={styleMousePointer}>{addCommas(currentCountry.tests.total)}</td>
        </tr>
    );
}

const Emoji = (props) => (
    <span className='emoji'
        role="img"
        aria-label={props.label ? props.label : ''}
        aria-hidden={props.label ? "false" : "true"}>
        {props.emoji}
    </span>
)

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

export default TableComponent;