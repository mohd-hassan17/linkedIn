import React, { useState } from 'react'
import { Button } from './ui/button'
import { MessageCircleMore, Repeat, Send, ThumbsUp } from 'lucide-react'
import { IPostDocument } from '@/models/post.model'
import { useSession } from "next-auth/react";


const SocialOptions = ({ post }: { post: IPostDocument }) => {

    const { data: session, status } = useSession();


    const likeOrDislikeHandler = async () => {
        if (status === 'loading') {
            return <p>Loading...</p>; // or skeleton
        }
        if (!session) throw new Error('user not authenticated');

    }

    return (
        <div>
            <div className='text-sm mx-2 p-2 flex items-center justify-between border-b border-gray-300'>

            </div>
            <div className='flex items-center m-1 justify-between'>
                <Button

                    variant={'ghost'}
                    className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>
                    <ThumbsUp
                    // className={`${'fill-[#378FE9]'}`}
                    />
                    <p
                    // className={`${ 'text-[#378FE9]'}`}
                    >
                        Like</p>
                </Button>
                <Button variant={'ghost'} className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>
                    <MessageCircleMore />
                    <p>Comment</p>
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
            {/* {
                commentOpen && (
                    <div className='p-4'>
                        <CommentInput postId = {post._id}/>
                        <Comments post = {post}/>
                    </div>
                )
            } */}
        </div>
    )
}

export default SocialOptions