import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapContainer extends React.Component {
  render() {
    const mapStyles = {
      width: '100%',
      height: '400px',
      
    };  
    return(
      <div className="map-container">
      <Map 
        google={this.props.google}
        zoom={8}
        initialCenter={{ lat: 40.846, lng: -73.7875 }}
        style={mapStyles}
        onClick={(mapProps, map, clickEvent) => this.props.onClick(clickEvent)}
      >
      {this.props.mapMarker && 
        <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'SOMA'}
          position={{lat: this.props.mapMarker.lat, lng: this.props.mapMarker.lng}} />
      }
    </Map>
    </div>
      
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAoGvJeAlvfIulWTeZyePXSIYBG1ZUBC_0"
})(MapContainer);