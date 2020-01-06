import React from 'react';
import DatesTab from './DatesTab.js';
import WeatherInfo from './WeatherInfo';

class AllConditions extends React.Component {
  constructor(props) {
    super(props);
    
    const data = props.weatherData;
    const date = data[0].date;
    const currentData = data[0];
    
    this.state = {
      data: data,
      dataToShow: {
        date: date,
        timeOfDay: "AM",
        weatherData: currentData, 
      },
      
      tempUnit: "F",
      windUnit: "MPH",
      mapMarker: null,
    };
    
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }
  
  handleDateChange(date){
    const weatherData = this.state.data.find(weatherData => {
      return (weatherData.date === date);
    });
    
    this.setState({
      dataToShow: {
        date: date,
        timeOfDay: "AM",
        weatherData: weatherData,
      }
    });
  }
  
  handleTimeChange(e) {
    let dateIndex = this.state.data.findIndex(data => data.date === this.state.dataToShow.date);
    
    let timeOfDay;
    if (this.state.dataToShow.timeOfDay === "AM") {
      timeOfDay = "PM";
      if (e.target.innerText === "<") {
        dateIndex--;
      }
    } else if (this.state.dataToShow.timeOfDay === "PM") {
      timeOfDay = "AM";
      if (e.target.innerText === ">") {
        dateIndex++;
      }
    }

    const weatherData = this.state.data[dateIndex];
    
    if (weatherData) {
      const date = this.state.data[dateIndex].date;
      
      this.setState({
        dataToShow: {
          date: date,
          timeOfDay: timeOfDay,
          weatherData: weatherData,
        }
      });
    }
  }
  
  render() {
    const dates = this.state.data.map(data => data.date);
    
    return(
      <div>
        <div className="row day-button-container">
          <DatesTab
            dates={dates}
            activeDate={this.state.dataToShow.date}
            onClick={this.handleDateChange.bind(this)}/>
        </div>
        <div className="row">
          <WeatherInfo 
            handleTimeChange={this.handleTimeChange}
            dataToShow={this.state.dataToShow}/>  
        </div>  
      </div>
    );
  }
}

export default AllConditions;