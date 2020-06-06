// React
import React from 'react';

// Navigation
import { useHistory } from 'react-router-dom';

// Screens
import DetailsScreen from '../DetailsScreen/DetailsScreen';
import EditScreen from '../EditScreen/EditScreen';
import AddScreen from '../AddScreen/AddScreen';

const DataDetails = (props) => {
    const { params } = props.match;
    const element = props.local.localData.find((element) => element.id === params.id);
    const history = useHistory();

    if (params.mode === 'show') {
        if (!element) {
            history.push('/404#no-country');
            return null;
        }
        return <DetailsScreen {...element} delete={props.local.deleteFromLocal} alertProps={props.alert}/>
    }
    if (params.mode === 'add') {
        return <AddScreen />;
    }
    if (params.mode === 'edit') {
        return <EditScreen {...element} local={props.local} />;
    }
    history.push('/404#wrong-code');
    return null;
    // return (<h1 style={{color: "white"}} onClick={() => props.history.goBack()}>{props.match.params.mode + " " + props.match.params.id}</h1>);
}

export default DataDetails;