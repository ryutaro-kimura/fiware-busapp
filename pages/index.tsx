import { useEffect, useState } from "react";
import { getGithubId } from "../src/utils/api";

export default function Home() {
  const [busEntity, setBusEntity] = useState<number>();
  useEffect(() => {
    // getOrionData;
    getGithubId().then(id => {
      setBusEntity(id);
    });
  }, []);

  return (
    <>
      <p>hoge</p>
      <p>{busEntity}</p>
    </>
  );
}
