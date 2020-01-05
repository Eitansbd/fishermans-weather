import React from 'react';

class DayInfo extends React.Component {
  render() {
    const astronomyData = this.props.astronomyData;
    return(
      <div>
        <p>sunrise: {astronomyData.sunrise}, sunset: {astronomyData.sunset}</p>  
        <p>water temp: {this.props.waterTemp}</p>
      </div>
    );
  }
}

export default DayInfo;