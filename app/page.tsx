
import News from "@/components/News";
import Sidebar from "@/components/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Feed from "@/components/Feed";

export default async function Home() {

  const session = await getServerSession(authOptions); // Fetch only ONCE

  return (
      <div className="pt-20">
      <div className="max-w-6xl mx-auto flex justify-between gap-8">
          {/* Sidebar  */}
          <Sidebar session = {session}/>
          {/* Feed  */}
          <Feed session = {session}/>
          {/* News  */}
          <News />
          
      </div>
     </div>
  );
}
