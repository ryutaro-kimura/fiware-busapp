import type { NextPage } from 'next'
import { MapContent } from './Content'
import axios from 'axios'
import GtfsRealtimeBindings from 'gtfs-realtime-bindings'
import { GetServerSideProps } from 'next'
import request from 'request'
import { getOrionData, NgsiBusStop } from '../../src/utils/api'

type Props = {
  busStops: NgsiBusStop[]
}

const MapPage: NextPage<Props> = (props) => {
  return <MapContent busStops={props.busStops} />
}

export default MapPage

export const getServerSideProps: GetServerSideProps = async () => {
  const gtfsBusStops = await getOrionData('GtfsStop')
  console.log(gtfsBusStops)
  const props: Props = {
    busStops: gtfsBusStops
  }
  return { props: props }
}

// あとでこれ見て整理：https://www.sukerou.com/2022/02/nextjs-getserversideprops.html
