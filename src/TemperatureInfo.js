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

class TemperatureInfo extends React.Component {
  constructor(props){
    super(props);
    
    this.state={
      timeOfDay: "morning"
    };
    
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);
  }
  
  handleClickNext(){
    this.setState({
      timeOfDay: "night"
    });
  }
  
  handleClickPrev(){
    this.setState({
      timeOfDay: "morning"
    });
  }
  
  render() {
    const data = this.props.hourlyData;
    let hourlyData;
    if (this.state.timeOfDay === "morning") {
      hourlyData = data.slice(0, data.length / 2);
    } else if (this.state.timeOfDay === "night"){
      hourlyData = data.slice(data.length / 2);
    }
    
    return(
      <div>
      <div className="btn-group">
        <button className="btn btn-primary" onClick={this.handleClickPrev}>&#x3C;</button>
        <button className="btn btn-primary" onClick={this.handleClickNext}>&#x3E;</button>
      </div>
      <ul className="list-unstyled">
        {hourlyData.map(hourData => {
          return (
            <HourlyTemperatureInfo 
              key={hourData.time}tempData={hourData} />
          );
        })}
      </ul>
      <button className="btn btn-primary float-left" onClick={this.handleClickPrev}>Ealier </button>
      <button className="btn btn-primary float-right" onClick={this.handleClickNext}>Later</button>
      </div>
    );
  }
}

export default TemperatureInfo