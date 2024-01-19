import clientPromise from '@/src/lib/mongoClient'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { AuthOptions, SessionStrategy } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import GoogleProvider from 'next-auth/providers/google'



export const authOptions:AuthOptions = {
    providers: [
        GoogleProvider({
          clientId: process.env.CLIENT_ID as string,
          clientSecret: process.env.CLIENT_SECRET as string
        })
      ],
      secret: process.env.NEXTAUTH_SECRET,
      adapter: MongoDBAdapter(clientPromise) as Adapter,
      session: {
        strategy: 'jwt' as SessionStrategy,
      },
}