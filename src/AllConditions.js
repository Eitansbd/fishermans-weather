import React from 'react';
import DatesTab from './DatesTab.js';
import WeatherInfo from './WeatherInfo';

class AllConditions extends React.Component {
  constructor(props) {
    super(props);
    
    const data = props.weatherData;
    const date = data[0].date;
    
    this.state = {
      data: data,
      dataToShow: {
        hours: 4,
        date: date,
        timeOfDay: 1,
      },
      
      tempUnit: "F",
      windUnit: "MPH",
      mapMarker: null,
    };
    
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleHoursPerPageChange = this.handleHoursPerPageChange.bind(this);
  }
  
  handleDateChange(date){
    this.setState(state => ({
      dataToShow: {
        hours: state.dataToShow.hours,
        date: date,
        timeOfDay: state.dataToShow.timeOfDay,
      }
    }));
  }
  
  handleHoursPerPageChange(e) {
    const hours = parseInt(e.target.value);
    this.setState(state => ({
      dataToShow: {
        hours: hours,
        date: state.dataToShow.date,
        timeOfDay: state.dataToShow.timeOfDay,
      }
    }));
  }
  
  handleTimeChange(e) {
    let dateIndex = this.state.data.findIndex(data => data.date === this.state.dataToShow.date);
    let timeOfDay = this.state.dataToShow.timeOfDay;
    const numOfIntervals = 24 / this.state.dataToShow.hours;
    
    if (e.target.innerText === "Previous") {
      if (timeOfDay !== 1) {
        timeOfDay--;
      } else if (timeOfDay === 1) {
        timeOfDay = numOfIntervals;
        dateIndex--;
      }
    } else if (e.target.innerText === "Next") {
      if (timeOfDay !== numOfIntervals) {
        timeOfDay++;
      } else if (timeOfDay === numOfIntervals) {
        timeOfDay = 1;
        dateIndex++;
      }
    }
    
    if (dateIndex >= 0 && dateIndex < this.state.data.length) {
      const date = this.state.data[dateIndex].date;
      
      this.setState({
        dataToShow: {
          hours: this.state.dataToShow.hours,
          date: date,
          timeOfDay: timeOfDay,
        }
      });
    }
  }
  
  render() {
    const dates = this.state.data.map(data => data.date);
    const weatherData = this.state.data.find(weatherData => {
      return (weatherData.date === this.state.dataToShow.date);
    });
    
    const hoursPerPage = this.state.dataToShow.hours;
    const startingHour = (this.state.dataToShow.timeOfDay - 1) * hoursPerPage;
    const hourlyData = weatherData.hourly.slice(startingHour, (startingHour + hoursPerPage));
    
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
            astronomyData={weatherData.astronomy[0]}
            tideData={weatherData.tides[0].tide_data}
            hoursPerPage={hoursPerPage}
            hourlyData={hourlyData}
            handleTimeChange={this.handleTimeChange}
            handleHoursPerPageChange={this.handleHoursPerPageChange}/>  
        </div>  
      </div>
    );
  }
}

export default AllConditions;