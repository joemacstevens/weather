import React from 'react';
import moment from 'moment';

const Daily = (props) => {

    function getTime(time){
        return moment.unix(time).format("ddd")
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

    return (
        <React.Fragment>
            {props.forecast.map(daily => 
                <div className={`daily ${getDay(daily.weather)}`} key={daily.ts}>
                    <span className="temp">{getFTemp(daily.temp)}</span>
                    {getIcon(daily.weather)}
                    <span className="hour">{getTime(daily.ts)}</span>
                </div>
            )}
       </React.Fragment>
    )
} 

export default Daily