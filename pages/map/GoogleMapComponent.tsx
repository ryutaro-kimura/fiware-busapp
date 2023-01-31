import React, { useState } from 'react'
import { GoogleMap, InfoWindowF, LoadScript, MarkerF } from '@react-google-maps/api'
import { NgsiBusStop } from '../../src/utils/api'

const containerStyle = {
  height: '100vh',
  width: '100%'
}

// 佐賀市
const sagaCity = {
  lat: 33.27020698968795,
  lng: 130.30862396560102
}

// デモデータ
const busStop = {
  lat: 33.24492143016369,
  lng: 130.2926579474496
}

type Props = {
  busStops: NgsiBusStop[]
}

const GoogleMapComponent: React.FC<Props> = ({ busStops }) => {
  const [currentPos, setCurrentPos] = useState<google.maps.LatLngLiteral>()
  const [selectedId, setSelected] = useState<string>('')
  const [size, setSize] = useState<undefined | google.maps.Size>(undefined)
  const infoWindowOptions = {
    pixelOffset: size
  }
  const createOffsetSize = () => {
    return setSize(new window.google.maps.Size(0, -45))
  }

  const handleOnLoad = () => {
    // 現在地をセット
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

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!} onLoad={createOffsetSize}>
      <GoogleMap mapContainerStyle={containerStyle} center={sagaCity} zoom={14} onLoad={handleOnLoad}>
        {currentPos && <MarkerF position={currentPos} />}
        {busStops &&
          busStops.map((busStop: NgsiBusStop) => {
            const pos = {
              lat: busStop.location.coordinates[0],
              lng: busStop.location.coordinates[1]
            }
            const markerLabel = {
              color: 'black',
              fontFamily: 'sans-serif',
              fontSize: '15px',
              fontWeight: '100',
              text: String(busStop.name)
            }

            return (
              <>
                <MarkerF key={busStop.id} position={pos} label={markerLabel} onClick={() => setSelected(busStop.id)} />
                {selectedId === busStop.id && (
                  <InfoWindowF position={pos} options={infoWindowOptions} onCloseClick={() => setSelected('')}>
                    <div className="bg-white">
                      <div className=" text-[16px]">name:{busStop.name}</div>
                      <div className="text-[10px]">時刻表を見る</div>
                    </div>
                  </InfoWindowF>
                )}
              </>
            )
          })}
      </GoogleMap>
    </LoadScript>
  )
}

export default GoogleMapComponent
