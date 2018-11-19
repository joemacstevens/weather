import React, { Component } from 'react';
import Search from './components/Search';
import Today from './components/Today';
import Hourly from './components/Hourly';
import Daily from './components/Daily';
import {Motion, spring} from 'react-motion';
import './css/app.css';


const bitApiKey = "4834f949ab2c464cae3fac3dc7d4e84c";
const openWeatherApiKey = "5689c2a2ebdff84b5f35b6445ec0710f";
const openWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
const bitUrl = "https://api.weatherbit.io/v2.0/forecast/hourly?";
const forecastUrl = "https://api.weatherbit.io/v2.0/forecast/daily?";

class App extends Component {
  constructor(props){
    super(props)
      this.state = {
        search: false,
        current: null,
        hourly: null,
        daily: null,
        city_name: null,
        forecast: "hourly"
      }

      this.updateSearch = this.updateSearch.bind(this);
      this.updateLocation = this.updateLocation.bind(this);

  }

  updateSearch(){

    let searching = this.state.search === true ? false : true;
    this.setState({
      search: searching
    })

  }

  updateLocation(location){
    const current = `${openWeatherUrl}lat=${location.lat}&lon=${location.lng}&APPID=${openWeatherApiKey}`
    const hourly = `${bitUrl}lat=${location.lat}&lon=${location.lng}&key=${bitApiKey}`
    const daily = `${forecastUrl}lat=${location.lat}&lon=${location.lng}&key=${bitApiKey}`
    
    fetch(current)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          current: data,
          search: true,
        })
      })

      fetch(hourly)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          hourly : data.data.slice(0,12),
          city_name: data.city_name
        })
      })

      fetch(daily)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          daily : data.data.slice(1,13)
        })
      })

  }

  toggleForecast(){
    let forecast = (this.state.forecast === "hourly") ? "daily" : "hourly";
    this.setState({
      forecast: forecast
    })
  }

  showForecastToggle(){
    if(this.state.current){
      return <nav className="select_forecast">
        <button onClick={() => this.toggleForecast()} className={(this.state.forecast === "hourly") ? "selected" : ""}>Hourly</button>
        <button onClick={() => this.toggleForecast()} className={(this.state.forecast === "daily") ? "selected" : ""}>Daily</button>
        </nav>
    } else {
      return ""
    }
  }

  showCurrent(){
    if(this.state.current){
      return (
        <Motion defaultStyle={{opacity:0}}
        style={{ opacity: spring(1, { stiffness: 60, damping: 10 }) }}>
          {interpolatedStyle => <Today opacity={interpolatedStyle.opacity} current={this.state.current}/>}
        </Motion>);
    } else {
      return <Motion defaultStyle={{opacity:0}}
      style={{ opacity: spring(1, { stiffness: 60, damping: 10 }) }}>
          {interpolatedStyle => <div className="intro" style={{opacity:interpolatedStyle.opacity}}><h3><i className="fas fa-angle-left"></i> Simply Weather</h3></div>}
      </Motion>;
    }
  }

  showHourly(){
    if(this.state.hourly && this.state.forecast === "hourly"){
      return <Hourly forecast={this.state.hourly}/>;
    } else {
      return "";
    }
  }

  showDaily(){
    if(this.state.daily && this.state.forecast === "daily"){
      return <Daily forecast={this.state.daily}/>;
    } else {
      return "";
    }
  }

  render() {
    return (
      <div className="App app">
          <div className="container">
            <Search search={this.state.search} update={this.updateSearch} location={this.updateLocation} current={this.state.current} city={this.state.city_name}/>
            {this.showCurrent()}
            {this.showForecastToggle()}
            <section className="upcoming">
              {this.showHourly()}
              {this.showDaily()}
            </section>
          </div>
      </div>
    );
  }
}

export default App;
