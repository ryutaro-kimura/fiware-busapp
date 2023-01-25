import React, { useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const containerStyle = {
  height: '100vh',
  width: '100%'
}

// 佐賀市
const center = {
  lat: 33.27020698968795,
  lng: 130.30862396560102
}

// const busStop = {
//   lat: 33.27020698968795,
//   lng: 130.30862396560102
// }

const GoogleMapComponent: React.FC = () => {
  const [pin, setPin] = useState<google.maps.LatLngLiteral>()
  const [currentPos, setCurrentPos] = useState<google.maps.LatLngLiteral>()

  const handleOnLoad = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        setCurrentPos(pos)
      })
    }
  }

  const setLatLng = (props: any) => {
    const pos: any = {
      lat: props.latLng.lat(),
      lng: props.latLng.lng()
    }
    setPin(pos)
  }

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13} onClick={setLatLng} onLoad={handleOnLoad}>
        {pin && <Marker position={pin} />}
        {currentPos && <Marker position={currentPos} />}
      </GoogleMap>
    </LoadScript>
  )
}

export default GoogleMapComponent
