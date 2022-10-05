import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'

const GoogleMap = () => {
    return (
        <div>
          <Map
          google={google}
          style={{width: '90%', height: '90%'}}
          initialCenter={{
            lat: 33.684422,
            lng: 73.047882
          }}
          zoom={13}
          
        ></Map>
        </div>
    )
}
export default GoogleApiWrapper({
    apiKey: "AIzaSyCKH_3maFHCgFnmhmvnUUD8mRuYO1Zhvio"
  })(GoogleMap)