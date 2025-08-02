'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { IUser } from '@/models/user.model';
import { Post } from '@/models/post.model';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
import dbConnection from './db';
import { Comment } from '@/models/comment.model';
import mongoose from 'mongoose';
import { redirect } from 'next/navigation';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// create a post
export const createPostAction = async (inputText: string, selectedFile: string) => {

    await dbConnection();
    const session = await getServerSession(authOptions);

    if (!session?.user) {
         redirect('/login');
    }
    

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
    } catch (error) {
            console.error(error);
            throw new Error("An error occurred");
        }
}

// get all post
export const getAllPosts = async () => {
    try {
        await dbConnection();
        const post = await Post.find().sort({ createdAt: -1 }).populate({ path: 'comment', options: { sort: { createdAt: -1 } } });
        if (!post) return [];
        return JSON.parse(JSON.stringify(post));
    } catch (error) {
        console.error(error);
    }
}

// delete post

export const deletePostAction = async (postId: string) => {
    await dbConnection();
    const session = await getServerSession(authOptions);
   if (!session?.user) {
         redirect('/login');
    }

    const post = await Post.findById(postId)
    if (!post) throw new Error('Post not found.');

    if (post.user.userId !== session?.user?.id) {
        throw new Error('You are not an owner of this Post.');
    }

    try {
        await Post.deleteOne({ _id: postId })
        revalidatePath("/")
    } catch (error) {
            console.error(error);
            throw new Error("An error occurred");
        }
}

// post comments

export const createCommentAction = async (postId: string, formData: FormData) => {

    try {
        await dbConnection();
        const session = await getServerSession(authOptions);
      if (!session?.user) {
         redirect('/login');
    }
        if (!postId) throw new Error("Post not found.")
        const inputText = formData.get('inputText') as string
        if (!inputText) throw new Error('input text is required');

        const databaseUser: IUser = {
            userName: session.user.name || "Hassan",
            userId: session.user.id,
            profilePhoto: session.user.image || "",
        }

        const post = await Post.findById({_id: postId})
        if(!post) throw new Error('Post not found.');

        const comment = await Comment.create({textMessage: inputText, user: databaseUser})
        post.comment?.push(comment._id as mongoose.Types.ObjectId);
        await post.save();
        revalidatePath('/')
    } catch (error) {
            console.error(error);
            throw new Error("An error occurred");
        }
} 