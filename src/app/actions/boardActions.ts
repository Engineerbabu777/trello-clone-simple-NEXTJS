'use server'

import { authOptions } from '@/src/lib/authOptions'
import {
  getLiveblocksClient,
  liveblocksClient
} from '@/src/lib/liveblocksClient'
import { Liveblocks, RoomInfo } from '@liveblocks/node'
import { getServerSession } from 'next-auth'
import uniqid from 'uniqid'

export async function createBoard (name: string): Promise<false | RoomInfo> {
  const liveblocksClient = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY || ''
  })

  const session = await getServerSession(authOptions)

  const email = session?.user?.email || ''
  // Create a new room with the user as a writer
  if (email) {
    const roomId = uniqid.time()
    return await liveblocksClient.createRoom(roomId, {
      defaultAccesses: [],
      usersAccesses: {
        [email]: ['room:write']
      },
      metadata: {
        boardName: name
      }
    })
  }

  return false
}
