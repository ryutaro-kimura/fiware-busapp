import { useEffect, useState } from "react";
import { getGithubId, getOrionData } from "../src/utils/api";

type Props = { data: Array<string> };

export default function Home({ ...props }: Props) {
  getOrionData();
  const [busEntity, setBusEntity] = useState<number>();
  useEffect(() => {
    getGithubId().then(id => {
      setBusEntity(id);
    });
  }, []);

  return (
    <>
      <p>hoge</p>
      <h1 className='text-3xl text-red-400 font-bold underline'>
        Hello world!
      </h1>
      <p>{busEntity}</p>
    </>
  );
}
