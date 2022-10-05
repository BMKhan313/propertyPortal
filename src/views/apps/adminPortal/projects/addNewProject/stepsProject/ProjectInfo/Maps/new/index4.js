import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

class GoogleMaps extends Component {
  loadMap = (map, maps) => {
    // const cityCircle = new google.maps.Circle({
    //   strokeColor: '#FF0000',
    //   strokeOpacity: 0.8,
    //   strokeWeight: 2,
    //   fillColor: '#FF0000',
    //   fillOpacity: 0.35,
    //   map,
    //   center: { lat: 40.756795, lng: -73.954298 },
    //   radius: 10000,
    //   draggable: true
    // })

    const marker = new maps.Marker({
      position: { lat: 40.856795, lng: -73.954298 },
      map,
      draggable: true
    })
  }
  render() {
    return (
      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBUeiqwaZBbaaiyZEK7p_RW7q3LQEAGN3Y' }}
          defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
          defaultZoom={10}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.loadMap(map, maps)}
        />
      </div>
    )
  }
}

export default GoogleMaps
