import React from 'react';
import HourlyTemperatureInfo from './HourlyTemperatureInfo.js';


class TemperatureInfo extends React.Component {
  
  render() {
    const hourlyData = this.props.hourlyData;
    
    
    return(
      <div>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={(e) => this.props.handleTimeChange(e)}>&#x3C;</button>
          <button className="btn btn-primary" onClick={(e) => this.props.handleTimeChange(e)}>&#x3E;</button>
        </div>
        <ul className="list-unstyled">
          {hourlyData.map(hourData => {
            return (
              <HourlyTemperatureInfo 
                key={hourData.time}tempData={hourData} />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default TemperatureInfo