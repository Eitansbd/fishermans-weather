import React from 'react';
import './App.css';
import SampleData from './sample_api_data.json';
import MapContainer from './Map.js';
import AllConditions from './AllConditions';

class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      showMap: true,
      mapMarker: null,
    };
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
    
    this.fetchWeatherData(lat, lng);
    this.fetchLocation(lat, lng);
  }
  
  fetchLocation(lat, lng) {
    const mapApiKey = "AIzaSyAoGvJeAlvfIulWTeZyePXSIYBG1ZUBC_0";
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${mapApiKey}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            address: result.results[0].formatted_address
          });
        },
        (error) => {
          this.setState({
            LocationIsLoaded: false,
            error
          });
        }
      );
  }
  
  fetchWeatherData(lat, lng) {
    fetch(`https://api.worldweatheronline.com/premium/v1/marine.ashx?q=${lat},${lng}&key=95a5d8be77864b6e957144653193012&format=json&tp=1&tide=yes`)
      .then(res => res.json())
      .then(
        (result) => {
          const weatherData = result.data.weather;
          this.setState({
            showMap: false,
            dataIsLoaded: true, 
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
  
  revealMap() {
    this.setState({
      showMap: !this.state.showMap
    });
  }
  
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">
              Angler's Weather
            </h2>
          </div>
        </div>
          {this.state.showMap &&
            <div className="row map-container" >
              <MapContainer mapMarker={this.state.mapMarker} 
                            onClick={this.handleMapClick.bind(this)} />
            </div>
          }
          {this.state.dataIsLoaded? (
            <div className="location-container">
              <p class="text-muted text-center">
                Showing results for: {this.state.address}
                <button className="btn btn-sm btn-primary" onClick={this.revealMap.bind(this)}>
                  {this.state.showMap ? "Hide" : "Show"} map
                </button>
              </p>
            </div>
          ) : (
            <div className="location-container">
              <p class="text-muted text-center">
                Click a location on the map for the latest marine and weather information.
              </p>
            </div>
          )
          }
          {this.state.data &&
            <div className="all-conditions-container">
              <AllConditions weatherData={this.state.data}
                             key={this.state.mapMarker.lat + this.state.mapMarker.lng}/>
          </div>          }
      </div>
    );
  }
}

export default App;
