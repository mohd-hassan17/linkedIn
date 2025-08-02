import React, { useState } from 'react'
import { Button } from './ui/button'
import { MessageCircleMore, Repeat, Send, ThumbsUp } from 'lucide-react'
import { IPostDocument } from '@/models/post.model'
import { useSession } from "next-auth/react";
import axios from 'axios';
import CommentInput from './CommentInput';
import Comments from './Comments';
import { useRouter } from 'next/navigation';


const SocialOptions = ({ post }: { post: IPostDocument }) => {

    const { data: session } = useSession();
    const router = useRouter();

    const [liked, setLiked] = useState(false);
    const [postLikes, setPostlikes] = useState(post.likes);
    const [commentOpen, setCommentOpen] = useState(false)

    const likeOrDislikeHandler = async () => {
        if (!session?.user) {
            router.push('/login');
            return; // 
            // throw new Error(' User not athenticated');
        }
        const tempLiked = liked;
        const tempPostLikes = postLikes

        const dislike = postLikes?.filter((userId) => userId !== session.user.id);
        const like = [...(postLikes ?? []), session.user.id]
        const newLike = liked ? dislike : like

        setLiked(!liked);
        setPostlikes(newLike);

        try {
            await axios.post(`/api/posts/${post._id}${liked ? '/dislike' : '/like'}`,);

            const { data: updatedLikes } = await axios.get(`/api/posts/${post._id}/like`);
            setPostlikes(updatedLikes)
        } catch (error) {
            console.error("Like/dislike error:", error);
            // Rollback in case of error
            setLiked(tempLiked);
            setPostlikes(tempPostLikes);
        }
    }

    return (
        <div>
            <div className='text-sm mx-2 p-2 flex items-center justify-between border-b border-gray-300'>
                <div className='text-sm mx-2 p-2 flex items-center justify-between '>
                    {
                        (postLikes && postLikes.length > 0) && (<p className='text-xm text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer'>{postLikes.length} likes</p>)
                    }
                    {
                        (post.comment && post.comment.length > 0) && (<p onClick={() => setCommentOpen(!commentOpen)} className='text-xm  text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer'>{post.comment.length} message</p>)
                    }
                </div>
            </div>
            <div className='flex items-center m-1 justify-between'>

                <Button
                    onClick={likeOrDislikeHandler}
                    variant={'ghost'}
                    className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>
                    <ThumbsUp
                        className={`${liked && 'fill-[#378FE9]'}`}
                    />
                    <p className={`${liked && 'text-[#378FE9]'}`}>Like</p>
                </Button>
                <Button variant={'ghost'} className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>
                    <MessageCircleMore />
                    <p onClick={() => setCommentOpen(!commentOpen)}>Comment</p>
                </Button>
                <Button variant={'ghost'} className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>
                    <Repeat />
                    <p>Repost</p>
                </Button>
                <Button variant={'ghost'} className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>
                    <Send />
                    <p>Send</p>
                </Button>
            </div>

            {
                commentOpen &&
                <div className='p-4'>
                    <CommentInput postId={post._id as string} />
                    <Comments post={post} />
                </div>
            }
        </div>
    )
}

export default SocialOptions