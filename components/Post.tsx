"use client"

import React from 'react'
import { IPostDocument } from '@/models/post.model'
import ProfilePhoto from './shared/ProfilePhoto';
import { Badge } from './ui/badge';
import PostContent from './PostContent';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import SocialOptions from './SocialOptions';
import ReactTimeago from "react-timeago";
import { deletePostAction } from '@/lib/serveractions';
import { useSession } from "next-auth/react";

const Post = ({ post }: { post: IPostDocument }) => {

    const { data: session } = useSession();
    const loggedInUser = session?.user?.id == post?.user?.userId;

    return (
        <div className='bg-white my-2 mx-2 md:mx-0 rounded-lg border border-gray-300'>
            <div className=' flex gap-2 p-4'>
                <ProfilePhoto src={post?.user?.profilePhoto!} />
                <div className='flex items-center justify-between w-full'>
                    <div>
                        <h1 className='text-sm font-bold'>{post?.user?.userName}
                            {loggedInUser && (

                            <Badge variant={'secondary'} className='ml-2'>You</Badge>
                            )}
                            </h1>
                        <p className='text-xs text-gray-500'>@{post?.user?.userId.slice(0, 6)}</p>

                        <p className='text-xs text-gray-500'>
                            <ReactTimeago date={new Date(post.createdAt)} minPeriod={3600} />
                        </p>
                    </div>
                </div>
                <div>
                    {
                        loggedInUser && (
                            <Button onClick={() => {
                                const res = deletePostAction(post._id as string)
                            }}
                                size={'icon'} className='rounded-full' variant={'outline'}>
                                <Trash2 />
                            </Button>
                        )
                    }
                </div>
            </div>
            <PostContent post={post} />
            <SocialOptions post={post}/>
        </div>
    )
}

export default Post