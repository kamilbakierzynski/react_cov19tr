// React
import React, { useState, useEffect } from 'react';

// Navigation
import { Link, useHistory } from 'react-router-dom';

// API Calls
import axios from 'axios';

// Bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Helpers
import addCommas from '../../helpers/addCommas';
import timeFormatter from '../../helpers/timeFormatter';

//Components
import PlaceHolder from '../../components/PlaceHolder';


const DetailsScreen = (props) => {
    const [onlineData, setOnlineData] = useState('Ładowanie');
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [borders, setBorders] = useState(['Loading...']);
    const history = useHistory();

    useEffect(() => {
        if (loading) {
            // Token for canceling requests
            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();

            // Get country info (another api)
            const timerInfo = setTimeout(() => {
                source.cancel('Can\'t get information about country.\nThis operation was taking too long. Try again later.');
            }, 20000);

            axios.get(`https://restcountries.eu/rest/v2/name/${encodeURIComponent(props.country.replace(/-/g, ' '))}`,
                { cancelToken: source.token })
                .then(result => {

                    // Clear timeout for countryInfo
                    clearTimeout(timerInfo);

                    if (result.data.length > 1) {
                        setLoading(false);
                        return;
                    }
                    setOnlineData(result.data[0]);
                    const address = result.data[0].borders.reduce((akum, element) =>
                        akum + `${element};`, '');

                    const timerBorders = setTimeout(() => {
                        source.cancel('Can\'t get information about borders.\nThis operation was taking too long. Try again later.');
                    }, 20000);

                    axios.get(`https://restcountries.eu/rest/v2/alpha?codes=${address}`,
                        { cancelToken: source.token })
                        .then(result => {
                            clearTimeout(timerBorders);
                            const borders = result.data.reduce((akum, element) =>
                                [...akum, element.name], []);
                            setBorders(borders);
                        }).catch((thrown) => {
                            // Clear timeout for timerBorders (just in case)
                            clearTimeout(timerBorders);
                            if (axios.isCancel(thrown)) {
                                props.alertProps.displayAlert('Oh snap! You got an error!', thrown.message);
                                setBorders(['Oh no... An error!']);
                            } else {
                                console.log(thrown.message);
                                if (thrown.message !== 'Request failed with status code 404') {
                                    props.alertProps.displayAlert('Oh snap! You got an error!', thrown.message === 'Network Error' ? 'Check your internet connection.\nAre you sure you have fresh internet?' : thrown.message);
                                }
                            }
                        });
                })
                .catch((thrown) => {
                    // Clear timeout for timerInfo (just in case)
                    clearTimeout(timerInfo);
                    if (axios.isCancel(thrown)) {
                        props.alertProps.displayAlert('Oh snap! You got an error!', thrown.message);
                    } else {
                        if (thrown.message !== 'Request failed with status code 404') {
                            props.alertProps.displayAlert('Oh snap! You got an error!', thrown.message === 'Network Error' ? 'Check your internet connection.\nAre you sure you have fresh internet?' : thrown.message);
                        }
                    }
                })
                .finally(() => {
                    // Get chart data (historical)
                    const timerChart = setTimeout(() => {
                        source.cancel('Can\'t get chart information.\nThis operation was taking too long. Try again later.');
                    }, 30000);

                    axios.get('https://covid-193.p.rapidapi.com/history',
                        {
                            cancelToken: source.token,
                            headers: { 'x-rapidapi-host': 'covid-193.p.rapidapi.com', 'x-rapidapi-key': process.env.REACT_APP_API_KEY },
                            params: { "country": props.country.replace(/ /g, '-') }
                        })
                        .then(result => {
                            const output = result.data.response.reduce((akum, element) => {
                                if (akum[element.day] === undefined) {
                                    akum[element.day] = element.cases.active;
                                    return akum;
                                }
                                if (akum[element.day] < element.cases.active) {
                                    akum[element.day] = element.cases.active;
                                    return akum;
                                }
                                return akum;
                            }, {});
                            setChartData(output);
                        })
                        .catch((thrown) => {
                            // Clear timeout for timerChart (just in case)
                            clearTimeout(timerChart);
                            if (axios.isCancel(thrown)) {
                                props.alertProps.displayAlert('Oh snap! You got an error!', thrown.message);
                            } else {
                                props.alertProps.displayAlert('Oh snap! You got an error!', thrown.message === 'Network Error' ? 'Check your internet connection.\nAre you sure you have fresh internet?' : thrown.message);
                            }
                            setLoading(false);
                        })
                        .finally(() => setLoading(false));
                });
        }
    }, [loading, props.country, props.alertProps]);



    useEffect(() => {
        setLoading(true);
        setOnlineData('Ładowanie');
    }, [props.country]);

    const handleDelete = () => {
        console.log('delete')
        if (window.confirm(`Do you want to delete "${props.country}"?`)) {
            props.delete(props.id);
            history.push('/local-data');
        }
    }

    const title = onlineData !== "Ładowanie" ? `${props.country.replace('-', ' ')} (${onlineData.nativeName})  `
        : `${props.country.replace('-', ' ')}`;
    const flag = <img alt={`${onlineData.alpha2Code}-flag`} src={`https://www.countryflags.io/${onlineData.alpha2Code}/flat/64.png`} />;

    return (
        <>
            <Jumbotron style={{ marginLeft: 30, marginRight: 30 }}>
                <h1>
                    {title}
                    {onlineData !== 'Ładowanie' ? flag : null}
                </h1>
                {onlineData !== "Ładowanie" && !loading
                    ? (
                        <p>
                            Subregion: {onlineData.subregion}<br />
                                Region: {onlineData.region}<br />
                                Capital: {onlineData.capital}<br />
                                Population: <b>{addCommas(onlineData.population)}</b><br />
                                Borders: {borders.join(', ')}<br />
                                Last actualization: {timeFormatter(props.time)}<br />
                        </p>
                    )
                    : loading
                        ? <><PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                            <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                            <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                            <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                            <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                            <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                            <p>Last actualization: {timeFormatter(props.time)}</p></>
                        : <p>Last actualization: {timeFormatter(props.time)}</p>
                }
                <Row>
                    <Col md="auto">
                        <Link to={`/local-data/edit/${props.id}`}><Button variant="primary">Edit</Button></Link>
                    </Col>
                    <Col md="auto">
                        <Button variant="danger" onClick={handleDelete}>Remove</Button>
                    </Col>
                </Row>
            </Jumbotron>
            {
                props.note !== undefined && props.note !== ''
                    ? <Jumbotron style={{ marginLeft: 30, marginRight: 30 }}>
                    <h1>Note</h1>
                    <i>{props.username}:</i><br />
                    {props.note.replace(/\n/g, '<br />')}
                        </Jumbotron>
                    : null
            }
            <Jumbotron style={{ marginLeft: 30, marginRight: 30 }}>
                <Row className="justify-content-md-center">
                    <Col lg="3">
                        <h1>Cases:</h1>
                        <p>
                            New: <b>{props.cases.new}</b><br />
                                Active: <b>{addCommas(props.cases.active)}</b><br />
                                Critical: <b>{addCommas(props.cases.critical)}</b><br />
                                Recovered: <b>{addCommas(props.cases.recovered)}</b><br />
                                Total: <b>{addCommas(props.cases.total)}</b><br />
                        </p>
                    </Col>
                    <Col lg="3" />
                    <Col lg="3">
                        <h1>Deaths:</h1>

                                New: <b>{props.deaths.new}</b><br />
                                Total: <b>{addCommas(props.deaths.total)}</b><br />

                    </Col>
                </Row>
            </Jumbotron>
            <Jumbotron style={{ marginLeft: 30, marginRight: 30 }}>
                <h1>Active cases</h1><br />
                {chartData.length !== 0
                    ? Object.entries(chartData).reverse().map(([key, value]) => {
                        const max = Math.max.apply(null, Object.values(chartData));
                        return (
                            <Row key={`Row-${key}`}>
                                <Col md='auto' key={`Date-Col-${key}`}>
                                    <i>{key}</i>
                                </Col>
                                <Col key={`Chart-Col-${key}`}>
                                    <div id={key} style={{ height: "20px", width: `${(value / max) * 100}%`, backgroundColor: "#574b90", borderRadius: 5 }}></div>
                                </Col>
                                <Col md="auto" key={`Val-Col-${key}`}>
                                    <strong>{addCommas(value)}</strong>
                                </Col>
                            </Row>

                        );
                    }
                    )
                    : <>
                        <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                        <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                        <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                        <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                        <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                        <PlaceHolder max={30} min={5} height={15} radius={1} /><br />
                    </>
                }
            </Jumbotron>
        </>
    );
}

export default DetailsScreen;