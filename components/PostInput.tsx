'use client';

import React, { useState } from 'react'
import ProfilePhoto from './shared/ProfilePhoto'
import { Input } from './ui/input'
import { Session } from "next-auth";
import { DialogDemo } from './PostDialog';

type Props = {
  session: Session | null;
};

const PostInput = ({ session }: Props) => {

    const [open, setOpen] = useState<boolean>(false);

    const handleToggle = () => {
        setOpen(true);
    }
    
    return (
        <div className='bg-white p-4 m-2 md:m-0 border border-gray-300 rounded-lg'>
            <div className='flex items-center gap-3'>
               
                <ProfilePhoto src={session?.user.image|| "/default-avatar.png"} />
                <Input
                    type="text"
                    placeholder='Create a post'
                    className='rounded-full hover:bg-gray-100 h-12 cursor-pointer'
                    onClick={handleToggle}
                />
                <DialogDemo setOpen={setOpen} open={open} src={session?.user.image || ""}/>
            </div>
        </div>
    )
}

export default PostInput