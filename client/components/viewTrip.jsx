import React from 'react';

export default class ViewTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itinerary: {
        locations: []
      }
    };
  }

  componentDidMount() {
    fetch('/api/travelPlanner/itineraries')
      .then(res => res.json())
      .then(itineraries => {
        if (!this.props.trip) {
          this.setState({ itinerary: itineraries[(itineraries.length - 1)] });
        } else {
          for (let i = 0; i < itineraries.length; i++) {
            if (itineraries[i].tripId === this.props.trip) {
              this.setState({
                itinerary: itineraries[i]
              });
            }
          }
        }
      });
  }

  render() {
    const { itinerary } = this.state;
    const tripName = itinerary.tripName;
    const locationsList = itinerary.locations.map(location => {
      return (
        <li className="trip-list-item" key={location.name.split(',')[0]} >
          <a href={'#location'} onClick={() => this.props.toggleView(location)}>
            <div>
              {location.name}
              <i className="fas fa-arrow-right list-arrow"></i>
            </div>
            <div className="icons">
              {location.restaurants.length} <i className="fas fa-utensils"></i>
              {location.poi.length} <i className="fas fa-map-marker-alt"></i>
            </div>
          </a>
        </li>
      );
    });
    return (
      <>
        <div className="main">
          <div className="name">
            <i className="fas fa-arrow-left back-arrow"></i>
            {tripName}
          </div>
          <ul>{locationsList}</ul>
        </div>
      </>
    );
  }
}
