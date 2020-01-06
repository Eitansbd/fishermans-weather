import React from 'react';

class HourlyTemperatureInfo extends React.Component{
  timeFormat(time){
  
  const timeInt = parseInt(time) / 100;
  let hour = timeInt % 12;
  if (hour === 0) {
    hour = 12;
  }
  let dayOrNight;
  if ((timeInt / 12) < 1) {
    dayOrNight = "AM";
  } else {
    dayOrNight = "PM";
  }
  
  return (hour + ":00 " + dayOrNight);
}
  
  render() {
    const tempData = this.props.tempData;
    return(
      <li className="media hourly-weather">
        <img src={tempData.weatherIconUrl[0].value} className="mr-3 align-self-center" alt="weather-icon" />
        <div class="media-body">
          <h5 className="mt-0 mb-1">{this.timeFormat(tempData.time)}</h5>
          <p className="hourly-weather-description">{tempData.tempF} °F, winds {tempData.winddir16Point} at {tempData.windspeedMiles} MPH with gusts up to {tempData.
          WindGustMiles} MPH</p>
          <p className="hourly-weather-description">Waves around {tempData.swellHeight_ft} feet, visiblity {tempData.visibilityMiles} Miles</p>
        </div>
      </li>
    );
  }
}

export default HourlyTemperatureInfo;
