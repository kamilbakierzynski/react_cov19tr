// React
import React from 'react';

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Components
import PlaceHolder from '../../components/PlaceHolder';

const TablePlaceHolder = () => {
    const placeHolderHeader = (
        <Col>
            <PlaceHolder max={90} min={30} height={20} radius={1} color="#b4b8bc" />
        </Col>
    );

    const placeHolderRow = (
        <tr>
            <div style={{ height: 20, width: "100%" }} />
            <Row>
                <Col>
                    <PlaceHolder max={95} min={70} height={20} radius={1} color="#5f646a" />
                </Col>
            </Row>
            <div style={{ height: 10, width: "100%" }} />
        </tr>
    );

    return (
        <table className="table table-dark table-striped table-bordered table-hover scrollbar" style={{ position: "relative", width: "90vw", textAlign: "center" }}>
            <thead className='thead-light'>
                <tr style={{ backgroundColor: "#e9ecef" }}>
                    <div style={{ height: 20, width: "100%" }} />
                    <Row>
                        {placeHolderHeader}
                        {placeHolderHeader}
                        {placeHolderHeader}
                        {placeHolderHeader}
                        {placeHolderHeader}
                        {placeHolderHeader}
                        {placeHolderHeader}
                        {placeHolderHeader}
                    </Row>
                    <div style={{ height: 10, width: "100%" }} />
                </tr>
            </thead>
            <tbody>
                {placeHolderRow}
                {placeHolderRow}
                {placeHolderRow}
                {placeHolderRow}
            </tbody>
        </table>
    );
}

export default TablePlaceHolder;