import React from 'react';

function TideChartRow(props) {
  return (
    <tr>
      <th scope="row">{props.rowNumber}</th>
      <td>{props.data.tide_type}</td>
      <td>{props.data.tideTime}</td>
      <td>{props.data.tideHeight_mt}</td>
    </tr>
  )
}

class TideChart extends React.Component {
  render() {
    const tideData = this.props.tideData;
    return(
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Type</th>
              <th scope="col">Time</th>
              <th scope="col">Height</th>
            </tr>
          </thead>
          <tbody>
            {tideData.map((tide, index) => {
            return(<TideChartRow data={tide} rowNumber={index + 1}/>);
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TideChart;