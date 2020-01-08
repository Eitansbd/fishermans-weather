import React from 'react';
import HourlyTemperatureInfo from './HourlyTemperatureInfo.js';


class TemperatureInfo extends React.Component {
  
  render() {
    const hourlyData = this.props.hourlyData;
    
    
    return(
      <div>
        <div className="hours-per-page">
          <div className="form-inline float-right">
          <div className="float-right form-group">
            <label className="control-label">Hours per page: 
              <select value={this.props.hoursPerPage} 
                      onChange={(e) => this.props.handleHoursPerPageChange(e)}
                      className="form-control hours-selection">
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
                <option value="12">12</option>
              </select>
            </label>
          </div>
          </div>
        </div>
        <ul className="list-unstyled hourly-data">
          {hourlyData.map(hourData => {
            return (
              <HourlyTemperatureInfo 
                key={hourData.time}tempData={hourData} />
            );
          })}
        </ul>
        <div>
            <button className="btn btn-default float-left" onClick={(e) => this.props.handleTimeChange(e)}>Previous</button>
            <button className="btn btn-default float-right" onClick={(e) => this.props.handleTimeChange(e)}>Next</button>
        </div>
      </div>
    );
  }
}

export default TemperatureInfo