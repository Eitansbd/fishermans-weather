import React from 'react';
import './App.css';
import SampleData from './sample_api_data.json';
import MapContainer from './Map.js';
import AllConditions from './AllConditions';

class MarineInfo extends React.Component {
  
  render() {
    return(
      <div>
      
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      mapMarker: null,
    };
    
    this.getData = this.APICall.bind(this);
  }
  
  handleMapClick(clickEvent){
    console.log("here")
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
    fetch(`https://api.worldweatheronline.com/premium/v1/marine.ashx?q=${lat},${lng}&key=95a5d8be77864b6e957144653193012&format=json&tp=1&tide=yes`)
      .then(res => res.json())
      .then(
        (result) => {
          const weatherData = result.data.weather;
          this.setState({
            isLoaded: true, 
            data: weatherData,
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
  
  
  
  render() {
    
    return (
      <div className="container">
        <div className="row">
          <h1>Fishing Data</h1>
        </div>
        <div className="row map-container" >
          <MapContainer mapMarker={this.state.mapMarker} onClick={this.handleMapClick.bind(this)} />
        </div>
        {this.state.data &&
          <div>
            <AllConditions weatherData={this.state.data}
                           key={this.state.mapMarker.lat + this.state.mapMarker.lng}/>
          </div>}
      </div>
    );
  }
}

export default App;
