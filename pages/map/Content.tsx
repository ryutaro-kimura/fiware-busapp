import { useState } from "react";
import { Props } from "./index.page";

export const MapContent: React.FC<Props> = (props) => {
  const [isGet, setGet] = useState(false);

  return (
    <div>
      {isGet ? (
        <div>{props.FeedEntities}</div>
      ) : (
        <button onClick={() => setGet(true)}>表示する</button>
      )}
    </div>
  );
};
