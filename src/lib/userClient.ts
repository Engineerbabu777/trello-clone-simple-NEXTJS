import {authOptions} from "@/src/lib/authOptions";
import {getServerSession} from "next-auth";

export async function getUserEmail(): Promise<string> {
  const session = await getServerSession(authOptions);
  return session?.user?.email || '';
}