import React from 'react';

import Badge from 'react-bootstrap/Badge';

const InfoBadge = (props) => {
    // Check if country was passed
    if (!props.country) return null;

    let badgeArr = [];

    // Check if id dont match online id
    if (props.country.localEntry) {
        badgeArr = [<Badge key='badge-local' style={{marginLeft: 4}} pill variant="warning">Local entry</Badge>];
    }

    // Check for continent
    const continentList = ['All', 'South America', 'North America', 'Asia', 'Europe', 'Africa', 'Australia'];
    if (continentList.includes(props.country.country)) {
        badgeArr = [...badgeArr, <Badge key='badge-continent' style={{marginLeft: 4}} pill variant="danger">Continent</Badge>];
    }

    // Check if notification enabled
    if (props.country.notify) {
        badgeArr = [...badgeArr, <Badge key='badge-notify' style={{marginLeft: 4}} pill variant="light">Notify</Badge>];
    }

    // Check if blocked sync enabled
    if (props.country.blockSync) {
        badgeArr = [...badgeArr, <Badge key='badge-sync' style={{marginLeft: 4}} pill variant="info">Blocked Sync</Badge>]
    }

    return badgeArr;
};

export default InfoBadge;