import { ICommentDocument } from "@/models/comment.model";
import ProfilePhoto from "./shared/ProfilePhoto"
import ReactTimeago from "react-timeago";

const Comment = ({ comment }: { comment: ICommentDocument }) => {
    return (
        <div className='flex gap-2 my-4'>
            <div className='mt-2'>
                <ProfilePhoto src={comment?.user.profilePhoto || "/default-avatar.png"} />
            </div>
            <div className='flex flex-1 justify-between p-3 bg-[#F2F2F2]'>
                <div>
                    <h1 className='text-sm font-medium'>{`${comment?.user?.userName} `}</h1>
                    {/* <p className='tex-xm text-gray-500'>@{comment?.user?.firstName}</p> */}
                    <p className='my-2'>{comment.textMessage}</p>
                </div>
                <div>
                    <p className='text-xs text-gray-500'>
                        <ReactTimeago date={new Date(comment.createdAt)} />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Comment