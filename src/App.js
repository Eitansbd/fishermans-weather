import React from 'react';
import './App.css';
import SampleData from './sample_api_data.json';
import MapContainer from './Map.js';
import DatesTab from './DatesTab.js';
import TideChart from './TideChart.js';
import TemperatureInfo from './TemperatureInfo';
import DayInfo from './DayInfo';


class MarineInfo extends React.Component {
  
  render() {
    return(
      <div>
      
      </div>
    );
  }
}

class WeatherInfo extends React.Component {
  render() {
    const data = this.props.data;
    const astronomyData = data.astronomy[0];
    const hourlyData = data.hourly;
    return(
      <div className="col-12">
        <div className="row">
          <div className="col">
            <TemperatureInfo hourlyData={hourlyData}/>
          </div>
          <div className="col">
            <div className="row">
              <div className="col">
                <DayInfo astronomyData={astronomyData} waterTemp={hourlyData[0].waterTemp_F}/>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TideChart tideData={data.tides[0].tide_data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      tempUnit: "F",
      windUnit: "MPH",
      mapMarker: null,
      
    };
    
    this.getData = this.APICall.bind(this);
  }
  
  handleMapClick(clickEvent){
    const latLng = clickEvent.latLng;
    const lat = latLng.lat();
    const lng = latLng.lng();
    this.setState({
      mapMarker: {
        lat: lat,
        lng: lng,
      }
    });
    
    this.APICall(lat, lng);
  }
  
  APICall(lat, lng) {
    fetch(`http://api.worldweatheronline.com/premium/v1/marine.ashx?q=${lat},${lng}&key=95a5d8be77864b6e957144653193012&format=json&tp=1&tide=yes`)
      .then(res => res.json())
      .then(
        (result) => {
          const weatherData = result.data.weather;
          console.log(weatherData);
          console.log(weatherData[0]);
          this.setState({
            isLoaded: true, 
            data: weatherData,
            dateToShow: weatherData[0].date
          });
        },
        (error) => {
          this.setState({
            isLoaded: true, 
            error
          });
        }
      );
  }
  
  sampleData() {
    return SampleData.weather;
  }
  
  renderWeatherInfo() {
    if (!this.state.data){
      return false;
    }
    const dateToShowData = this.state.data.find(weatherData => weatherData.date === this.state.dateToShow);
    
    return(
      <WeatherInfo data={dateToShowData}/>  
    );
  }
  
  handleDateChange(date){
    this.setState({
      dateToShow: date
    });
  }
  
  renderDatesTab(){
    if (!this.state.data){
      return false;
    }
    
    const dates = this.state.data.map(data => data.date);
    
    return ( 
      <DatesTab
        dates={dates}
        activeDate={this.state.dateToShow}
        onClick={this.handleDateChange.bind(this)}/>
        );
  }
  
  render() {
    
    return (
      <div className="container">
        <div className="row">
          <h1>Fishing Data</h1>
        </div>
        <div className="row map-container" >
          <MapContainer mapMarker={this.state.mapMarker} onClick={this.handleMapClick.bind(this)} />
        </div>
        <div>
            <div className="row day-button-container">
              {this.renderDatesTab()}
            </div>
            <div className="row">
              {this.renderWeatherInfo()}
            </div>
        </div>
      </div>
    );
  }
}

export default App;
