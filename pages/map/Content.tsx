import dynamic from 'next/dynamic'
import { NgsiBusStop } from '../../src/utils/api'
import GoogleMapComponent from './GoogleMapComponent'

type Props = {
  busStops: NgsiBusStop[]
}

export const MapContent: React.FC<Props> = (props) => {
  // const GoogleMapComponent = dynamic(() => import('./GoogleMapComponent'), {
  //   ssr: false
  // })
  return (
    <div>
      <GoogleMapComponent busStops={props.busStops} />
    </div>
  )
}
