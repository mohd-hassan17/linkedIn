import { IPostDocument } from "@/models/post.model"
import Comment from "./Comment"



const Comments = ({post}:{post:IPostDocument}) => {
  return (
    <div> 
        {
           post?.comment?.map((comment) => {
            return (

                <Comment key={comment._id.toString()}  comment={comment}/>
            )
           })
        }
    </div>
  )
}

export default Comments