// React
import React, { useState, useEffect } from 'react';


const PlaceHolder = (props) => {
    const [width, setWidth] = useState(`${Math.floor(Math.random() * (props.max - props.min)) + props.min}%`);

    useEffect(() => {
        const interval = setTimeout(() => {
            const max = props.max;
            const min = props.min;
            let val = Math.floor(Math.random() * (max - min)) + min;
            if (`${val}%` === width) val += 2;
            setWidth(`${val}%`);
        }, 900);
        return (() => clearTimeout(interval));
    }, [width, props.max, props.min]);

    return (
        <div className='animation-placeholder'>
            <PlaceHolderDiv width={width} height={props.height} radius={props.radius} color={props.color}/>
        </div>
    );
}

const PlaceHolderDiv = (props) => {
    const color = props.color === undefined ? "#dee1ec" : props.color;
    return (
        <div style={{ backgroundColor: color, width: props.width, height: props.height, borderRadius: props.radius, transition: "width 700ms", display: "inline-block"}}></div>
    );
}

export default PlaceHolder;