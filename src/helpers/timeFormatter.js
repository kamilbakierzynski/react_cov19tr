// React
import React from 'react';

const timeFormatter = (timeString) => {
    if (!timeString) return 'Error';
    const date = timeString.split('T')[0];
    const time = timeString.split('T')[1].split('+')[0];
    const [hours, minutes] = time.split(':');
    return <><i>{date}</i> | {`${+hours + 2}:${minutes}`}</>;
}

export default timeFormatter;