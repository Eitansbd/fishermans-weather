import React from 'react';
import TideChart from './TideChart.js';
import TemperatureInfo from './TemperatureInfo';
import DayInfo from './DayInfo';

class WeatherInfo extends React.Component {
  render() {
    const data = this.props.data;
    const astronomyData = data.astronomy[0];
    const hourlyData = data.hourly;
    return(
      <div className="col-12">
        <div className="row">
          <div className="col">
            <TemperatureInfo hourlyData={hourlyData}/>
          </div>
          <div className="col">
            <div className="row">
              <div className="col">
                <DayInfo astronomyData={astronomyData} waterTemp={hourlyData[0].waterTemp_F}/>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
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