import React, { useState } from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api'

const containerStyle = {
  height: '100vh',
  width: '100%'
}

// 佐賀市
const center = {
  lat: 33.27020698968795,
  lng: 130.30862396560102
}

const busStop1 = {
  lat: 33.24492143016369,
  lng: 130.2926579474496
}

const markerLabel1 = {
  color: 'white',
  fontFamily: 'sans-serif',
  fontSize: '15px',
  fontWeight: '100',
  text: '佐賀大学正門前'
}

const busStop2 = {
  lat: 33.24564169502253,
  lng: 130.29307260872048
}

const busStop3 = {
  lat: 33.24414247037672,
  lng: 130.29370416973308
}
// デモデータ↑ー－－－－－－－－

const GoogleMapComponent: React.FC = () => {
  const [pin, setPin] = useState<google.maps.LatLngLiteral>()
  const [currentPos, setCurrentPos] = useState<google.maps.LatLngLiteral>()
  const [isSelected, setSelected] = useState<boolean>(false)

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
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={busStop1}
        zoom={18}
        onClick={setLatLng}
        onLoad={handleOnLoad}
      >
        {/* {pin && <Marker position={pin} />} */}
        {currentPos && <Marker position={currentPos} />}
        <Marker position={busStop1} onClick={() => setSelected(true)} />
        {isSelected && (
          <InfoWindow position={busStop1} onCloseClick={() => setSelected(false)}>
            <div className="bg-white">
              <div className=" text-[16px]">佐賀大学正門前</div>
              <div className="text-[10px]">時刻表を見る</div>
            </div>
          </InfoWindow>
        )}

        <Marker position={busStop2} />
        <Marker position={busStop3} />
      </GoogleMap>
    </LoadScript>
  )
}

export default GoogleMapComponent
