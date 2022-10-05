import React, { useState } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
const GoogleMapComponent = props => {
  const markersList = [
    { lat: 23.024, lng: 72.580276 },
    { lat: 23.0063, lng: 72.6026 }
  ]
  const [markers, setMarkers] = useState(markersList)
  const mapStyles = {
    width: '400px',
    height: '400px'
  }

  const onMarkerDragEnd = (coord, index, markers) => {
    const { latLng } = coord
    const lat = latLng.lat()
    const lng = latLng.lng()
    markers[index] = { lat, lng }
    setMarkers(markers)
  }

  const myMarkers =
    markers &&
    Object.entries(markers).map(([key, val]) => (
      <Marker
        key={key}
        id={key}
        position={{
          lat: val.lat,
          lng: val.lng
        }}
        onClick={() => console.log('Clicked')}
        draggable={true}
        onDragend={(t, map, coord) => onMarkerDragEnd(coord, key, markers)}
      />
    ))
  return (
    <>
      <div>
        <div className='row d-flex justify-content-center text-center'>
          <h1>
            React Google{' '}
            <a href='https://technostuf.com/how-to-implement-google-recaptcha-v2-react/'>
              Recaptcha
            </a>{' '}
            V3 example - technostuf.com
          </h1>
          <Map
            google={props.google}
            zoom={14}
            style={mapStyles}
            initialCenter={{
              lat: 23.033863,
              lng: 72.585022
            }}
          >
            {myMarkers}
          </Map>
        </div>
      </div>
    </>
  )
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBUeiqwaZBbaaiyZEK7p_RW7q3LQEAGN3Y'
})(GoogleMapComponent)
