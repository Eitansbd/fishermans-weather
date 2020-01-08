import React from 'react';
import TideChart from './TideChart.js';
import TemperatureInfo from './TemperatureInfo';
import DayInfo from './DayInfo';

class WeatherInfo extends React.Component {
  render() {
    return(
      <div className="col-12">
        <div className="row">
          <div className="col-md-6 temperature-container">
            <TemperatureInfo hourlyData={this.props.hourlyData}
                             hoursPerPage={this.props.hoursPerPage}
                             handleTimeChange={this.props.handleTimeChange}
                             handleHoursPerPageChange={this.props.handleHoursPerPageChange}/>
          </div>
          <div className="col offset-md-1">
            <div className="row border-fill">
              <div className="col">
                <DayInfo astronomyData={this.props.astronomyData} waterTemp={this.props.hourlyData[0].waterTemp_F}/>
              </div>
            </div>
            <div className="row border-fill tide-data-container">
              <div className="col">
                <TideChart tideData={this.props.tideData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherInfo;