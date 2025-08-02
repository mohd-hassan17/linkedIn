import { Session } from "next-auth";
import PostInput from "./PostInput";
import Posts from "./Posts";
import { getAllPosts } from "@/lib/serveractions";

type Props = {
  session: Session | null;
};

const Feed = async ({session}: Props) => {
  
  const posts = await getAllPosts();

  return (
    <div className='flex-1'>
        <PostInput session={session}/>
        <Posts posts={posts}/>
    </div>
  )
}

export default Feed