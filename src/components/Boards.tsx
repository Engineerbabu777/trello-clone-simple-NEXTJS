'use server';

import BoardsTiles from "@/src/components/BoardsTiles";
import {liveblocksClient} from "@/src/lib/liveblocksClient";
import {getUserEmail} from "@/src/lib/userClient";

export default async function Boards() {
  const email = await getUserEmail();
  const {data:rooms} = await liveblocksClient.getRooms({userId: email});
  return (
    <BoardsTiles boards={rooms} />
  );
}