import React from 'react';
import TideChart from './TideChart.js';
import TemperatureInfo from './TemperatureInfo';
import DayInfo from './DayInfo';

class WeatherInfo extends React.Component {
  render() {
    const data = this.props.dataToShow.weatherData;
    const astronomyData = data.astronomy[0];
    let hourlyData;
    const timeOfDay = this.props.dataToShow.timeOfDay;
    const startingIndex = (timeOfDay - 1) * 4;
    hourlyData = data.hourly.slice(startingIndex, startingIndex + 4);
    
    return(
      <div className="col-12">
        <div className="row">
          <div className="col-md-7 temperature-container">
            <TemperatureInfo hourlyData={hourlyData} 
                             timeOfDay={timeOfDay}
                             handleTimeChange={this.props.handleTimeChange}/>
          </div>
          <div className="col">
            <div className="row">
              <div className="col">
                <DayInfo astronomyData={astronomyData} waterTemp={hourlyData[0].waterTemp_F}/>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <TideChart tideData={data.tides[0].tide_data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherInfo;