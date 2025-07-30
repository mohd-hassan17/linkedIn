import Image from 'next/image'
import React from 'react'
import { Session } from "next-auth";
import ProfilePhoto from './shared/ProfilePhoto';

type Props = {
  session: Session | null;
};

const Sidebar = async ({ session }:Props) => {

    return (
        <div className='hidden md:block w-[20%] h-fit border bordergray-300 bg-white rounded-lg'>
            <div className='flex relative flex-col items-center'>
                <div className='w-full h-16 overflow-hidden'>
                    {
                        session && (
                            <Image
                                src={"/banner.png"}
                                alt="Banner"
                                width={200}
                                height={200}
                                className='w-full h-full rounded-t'
                            />
                        )
                    }
                </div>
                <div className='my-1 absolute top-10 left-[40%]'>
                    <ProfilePhoto src={session?.user.image!} />
                 
                </div>
                <div className='border-b border-b-gray-300'>
                    <div className='p-2 mt-5 text-center'>
                        <h1 className='font-bold hover:underline cursor-pointer'>{session ? `${session?.user.name}` : "Mohd Hassan"}</h1>
                        <p className='text-xs'>@{session ? `${session?.user?.email}` : 'username'}</p>
                    </div>
                </div>
            </div>
            <div className='text-xs'>
                <div className='w-full flex justify-between items-center px-3 py-2 hover:bg-gray-200 cursor-pointer'>
                    <p>Post Impression</p>
                    <p className='text-blue-500 font-bold'>38</p>
                </div>
                <div className='w-full flex justify-between items-center px-3 py-2 hover:bg-gray-200 cursor-pointer'>
                    <p>Posts</p>
                    {/* <p className='text-blue-500 font-bold'>{posts.length}</p> */}
                    <p className='text-blue-500 font-bold'>0</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar