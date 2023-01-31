import { NgsiBusStop } from '../../src/utils/api'
import GoogleMapComponent from './GoogleMapComponent'

type Props = {
  busStops: NgsiBusStop[]
}

export const MapContent: React.FC<Props> = (props) => {
  return (
    <div>
      <GoogleMapComponent busStops={props.busStops} />
    </div>
  )
}
