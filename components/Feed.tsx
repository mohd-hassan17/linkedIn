import { Session } from "next-auth";
import PostInput from "./PostInput";

type Props = {
  session: Session | null;
};

const Feed = async ({session}: Props) => {
    
  return (
    <div className='flex-1'>
        <PostInput session={session}/>
        {/* <Posts posts = {posts!}/> */}Posts
    </div>
  )
}

export default Feed