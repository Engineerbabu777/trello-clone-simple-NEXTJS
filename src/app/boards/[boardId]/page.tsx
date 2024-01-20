'use server';

import Board from "@/src/components/Board";
import {liveblocksClient} from "@/src/lib/liveblocksClient";
import {getUserEmail} from "@/src/lib/userClient";

type PageProps = {
  params: {
    boardId: string;
  };
};

export default async function BoardPage(props: PageProps) {
  const boardId = props.params.boardId;
  const userEmail = await getUserEmail();
  const boardInfo = await liveblocksClient.getRoom(boardId);
  const userAccess = boardInfo.usersAccesses?.[userEmail];
  const hasAccess = userAccess && [...userAccess].includes('room:write');
  if (!hasAccess) {
    return (
      <div>Access denied</div>
    );
  }
  return (
    <div>
      <Board
        name={boardInfo.metadata.boardName.toString()}
        id={boardId} />
    </div>
  );
}