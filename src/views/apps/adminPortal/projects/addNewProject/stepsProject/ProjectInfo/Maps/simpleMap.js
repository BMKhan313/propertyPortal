// import React, { useState } from 'react'
// import GoogleMapReact from 'google-map-react'
// import Marker from './Marker'

// const SimpleMap = (props) => {
//   const getMapOptions = (maps) => {
//     return {
//       disableDefaultUI: true,
//       mapTypeControl: true,
//       streetViewControl: true,
//       styles: [
//         {
//           featureType: 'poi',
//           elementType: 'labels',
//           stylers: [{ visibility: 'on' }]
//         }
//       ]
//     }
//   }

//   const [center, setCenter] = useState({ lat: 33.6029168, lng: 73.0230449 })
//   const [zoom, setZoom] = useState(11)

//   return (
//     <div style={{ height: '100vh', width: '100%' }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: 'AIzaSyBUeiqwaZBbaaiyZEK7p_RW7q3LQEAGN3Y' }}
//         defaultCenter={center}
//         defaultZoom={zoom}
//         options={getMapOptions}
//         onClick={(e) => {
//           console.log(e.latLng.lat())
//           console.log(e.latLng.lng())
//         }}
//       >
//         <Marker
//           lat={33.6029168}
//           lng={73.0230449}
//           name='My Marker'
//           color='red'
//         />

//       </GoogleMapReact>
//     </div>
//   )
// }

// export default SimpleMap


// New
import React, { Component } from 'react'
import { Map, GoogleApiWrapper, InfoWindow, Marker  } from 'google-maps-react'
import CurrentLocation from './CurrentLocation'

const mapStyles = {
  position: 'relative', 
  width: '100vw',
  height: '100vh'
}

export class PlotFinder extends Component {

    state = {
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
      }

      onMarkerClick = (props, marker, e) =>
      setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      })
  
    onClose = props => {
      if (state.showingInfoWindow) {
        setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    }
  render() {
    return (
     <div style={mapStyles}>
         {/* specific lat and long result */}
               {/* <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: -1.2884,
            lng: 36.8233
          }
        }
      >
        <Marker
          onClick={this.onMarkerClick}
          name={'Kenyatta International Convention Centre'}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map> */}

     {/* Current Location */}

       <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
        <Marker onClick={this.onMarkerClick} name={'Current Location'} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>

     </div>
    )
  }
}

// export default PlotFinder

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg'
})(PlotFinder)

