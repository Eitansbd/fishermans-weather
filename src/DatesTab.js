import React from 'react';

class DatesTab extends React.Component {
  formatDate(APIDate){
    const date = new Date(Date.parse(APIDate + 'T00:00:00'));
    return (date.toLocaleDateString());
  }
  render() {
    return(
      <ul className="nav nav-tabs nav-fill">
        {this.props.dates.map(date => {
          return(<li 
            key={date}
            className="nav-item"
            onClick={() => this.props.onClick(date)}
            >
              <a className={"nav-link " + (this.props.activeDate === date ? "active" : "")}>
                {this.formatDate(date)}
              </a>
            </li>);
        })}
      </ul>
    );
  }
}

export default DatesTab;