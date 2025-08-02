

import dbConnection from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest, { params }: { params: { postId: string } }) => {
    try {
        await dbConnection();
        const { userId } = await req.json();
        if (!userId) return NextResponse.json({ error: 'User ID is required' }, { status: 400 });

        const post = await Post.findById(params.postId);
        if (!post) return NextResponse.json({ error: 'Post not found.' });

        await post.updateOne({ $pull: { likes: userId } });

        return NextResponse.json({ message: "Post disliked successfully." }, { status: 200 });
    } catch (error) {
        console.error("dislike error:", error);
        return NextResponse.json({ error: 'An error occurred.' }, { status: 500 });
    }
}