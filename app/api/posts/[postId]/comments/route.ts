import dbConnection from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest, { params }: { params: { postId: string } }) => {
    try {
        await dbConnection();
        const post = await Post.findById(params.postId);
        if (!post) {
            return NextResponse.json({ error: "Post not found." }, { status: 404 });
        }

        const postWithComments = await post.populate({
            path: 'comments',
            options: { sort: { createdAt: -1 } },
        });

        return NextResponse.json(postWithComments, { status: 200 });
    } catch (error) {
        console.error("Error fetching post comments:", error);
        return NextResponse.json({ error: 'An error occurred.' }, { status: 500 });
    }
};