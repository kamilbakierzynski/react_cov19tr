// React
import React from 'react';

const timeFormatter = (timeString) => {
    if (!timeString) return 'Error';
    const date = timeString.split('T')[0];
    const time = timeString.split('T')[1].split('+')[0];
    let [year, month, day] = date.split('-');
    let [hours, minutes] = time.split(':');
    if (+hours + 2 > 24) {
        day = +day + 1;
        if (day < 10) day = `0${day}`;
        hours = +hours + 2 - 24;
    } else {
        hours = +hours + 2;
    }
    return <><i>{`${year}-${month}-${day}`}</i> | {`${hours}:${minutes}`}</>;
}

export default timeFormatter;