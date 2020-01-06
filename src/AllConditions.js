import React from 'react';
import DatesTab from './DatesTab.js';
import WeatherInfo from './WeatherInfo';

class AllConditions extends React.Component {
  constructor(props) {
    super(props);
    
    const data = props.weatherData;
    this.state = {
      data: data,
      dateToShow: data[0].date,
      tempUnit: "F",
      windUnit: "MPH",
      mapMarker: null,
    };
  }
  
  handleDateChange(date){
    this.setState({
      dateToShow: date
    });
  }
  
  render() {
    const dates = this.state.data.map(data => data.date);
    const dateToShowData = this.state.data.find(weatherData => weatherData.date === this.state.dateToShow);
    
    return(
      <div>
        <div className="row day-button-container">
          <DatesTab
            dates={dates}
            activeDate={this.state.dateToShow}
            onClick={this.handleDateChange.bind(this)}/>
        </div>
        <div className="row">
          <WeatherInfo data={dateToShowData}/>  
        </div>  
      </div>
    );
  }
}

export default AllConditions;