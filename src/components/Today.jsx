import React from 'react';
import moment from 'moment';
import {Motion, spring} from 'react-motion';


const Today = (props) => {
    
    let styles = {
        opacity: props.opacity
    }

    function getTime(time){
        return moment.unix(time).format("h:mm")
    }

    function getFTemp(temp) {
        return Math.round(((temp-273.15)*1.8)+32)
    }

    function getIcon(){
        const sky = `icon wi wi-owm-${props.current.weather[0].icon.includes("d") ? "day" : "night"}-${props.current.weather[0].id}`;
        return <i className={sky}></i>;
    }

    const day = `${props.current.weather[0].icon.includes("d") ? "day" : "night"}`;

    return (
        <React.Fragment>
        <div className="date" style={styles}>
        <div className="weather-type-name">
        {getIcon()}
        <span className="weather-type-name">{props.current.weather[0].main}</span>
        </div>
            </div>
            <div className={`now ${day}`} style={styles}>
            <span className="temp">{getFTemp(props.current.main.temp)}</span>
        </div>

        <div className={`conditions ${day}`}>

        <div className="high range">
        <i className="icon wi wi-direction-up"></i
        ><span className="temp">{getFTemp(props.current.main.temp_max)}</span>
        </div>
        <div className="low range">
        <i className="icon wi wi-direction-down"></i>
        <span className="temp">{getFTemp(props.current.main.temp_min)}</span>
        </div>

        <div className="sunrise range">
        <i className="icon wi wi-sunrise"></i>
        <span>{getTime(props.current.sys.sunrise)}</span>
        </div>

        <div className="sunset range">
        <i className="icon wi wi-sunset"></i>
        <span>{getTime(props.current.sys.sunset)}</span>
        </div>

        </div>
        </React.Fragment>
    )
}

export default Today