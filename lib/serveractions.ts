'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { IUser } from '@/models/user.model';
import { Post } from '@/models/post.model';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
import dbConnection from './db';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// create a post
export const createPostAction = async (inputText: string, selectedFile: string) => {

    await dbConnection();
    const session = await getServerSession(authOptions);

    if (!session) throw new Error('Unauthorized user');

    if (!inputText) throw new Error('input text is required');

    const image = selectedFile;

    const databaseUser: IUser = {
        userName: session.user.name || "Hassan",
        userId: session.user.id,
        profilePhoto: session.user.image || "",
    }
    let uploadResponse;
    try {
        if (image) {
            uploadResponse = await cloudinary.uploader.upload(image);
            await Post.create({
                description: inputText,
                user: databaseUser,
                imageUrl: uploadResponse?.secure_url //yha pr image url ayega from cloudinary
            })
        } else {
            await Post.create({
                description: inputText,
                user: databaseUser,
            })
        }
        revalidatePath('/')
    } catch (error: any) {
        throw new Error(error);
    }
}

// get all post
export const getAllPosts = async () => {
    try {
        await dbConnection();
        const post = await Post.find().sort({ createdAt: -1 })
        if (!post) return [];
        return JSON.parse(JSON.stringify(post));
    } catch (error) {
        console.log(error);
    }
}

// delete post

export const deletePostAction = async (postId: string) => {
    await dbConnection();
    const session = await getServerSession(authOptions);
    if (!session) throw new Error('Unauthorized user');

    const post = await Post.findById(postId)
    if(!post) throw new Error('Post not found.');

    if(post.user.userId !== session?.user?.id){
        throw new Error('You are not an owner of this Post.');
    }

    try {
        await Post.deleteOne({_id: postId})
        revalidatePath("/")
    } catch (error: any) {
        throw new Error('An error occurred', error);
    }
}