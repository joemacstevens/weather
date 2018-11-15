import React from 'react';
import moment from 'moment';

const Hourly = (props) => {

    function getTime(time){
        return moment.unix(time).format("ha")
    }

    function getFTemp(temp) {
        return Math.round((temp*1.8)+32)
    }

    function getIcon(weather){
        const sky = `icon wi wi-owm-${weather.icon.includes("d") ? "day" : "night"}-${weather.code}`;
        return <i className={sky}></i>;
    }

    function getDay(weather){
        const day = `${weather.icon.includes("d") ? "day" : "night"}`;
        return day;
    }

    const items = props.forecast.map(hour => 
        <div className={`hourly ${getDay(hour.weather)}`} key={hour.ts}>
            <span className="temp">{getFTemp(hour.temp)}</span>
            {getIcon(hour.weather)}
            <span className="hour">{getTime(hour.ts)}</span>
        </div>
    );

    return (
        <React.Fragment>
        {items}
       </React.Fragment>

    )
} 

export default Hourly