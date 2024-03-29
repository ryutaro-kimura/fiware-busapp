import type { NextPage } from "next";
import { MapContent } from "./Content";
import axios from "axios";
import GtfsRealtimeBindings from "gtfs-realtime-bindings";
import { GetServerSideProps } from "next";
import request from "request";

export type Props = {
  FeedEntities: Object;
};

// type FeedEntity = {
//   id: string
//   vehicle: VehiclePosition {
//     trip: [TripDescriptor],
//     vehicle: [VehicleDescriptor],
//     position: [Position],
//     currentStopSequence: 3,
//     timestamp: [Long]
//   }
// }

const MapPage: NextPage<Props> = (props) => {
  return <MapContent FeedEntities={props.FeedEntities} />;
};

export default MapPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const url = "http://opendata.sagabus.info/vehicle.pb";
  const FeedEntities = await axios
    .get(url, { responseType: "arraybuffer" })
    .then((res) => {
      const vehicles = new Array<any>();
      const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
        new Uint8Array(res.data)
      );
      feed.entity.forEach((entity: any) => {
        // entityの型はデフォのvehicleオブジェクト
        vehicles.push(entity);
      });
      return vehicles;
    })
    .catch((error) => {
      console.log("error----", error);
      return [];
    });
  console.log(FeedEntities[0].id);

  const props: Props = {
    FeedEntities: JSON.stringify(FeedEntities),
  };
  return { props: props };
};

// あとでこれ見て整理：https://www.sukerou.com/2022/02/nextjs-getserversideprops.html
