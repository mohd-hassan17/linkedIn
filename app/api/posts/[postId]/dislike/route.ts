

import dbConnection from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const POST = async (req: NextRequest, { params }: { params: { postId: string } }) => {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user.id;

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        await dbConnection();

        const post = await Post.findById(params.postId);
        if (!post) return NextResponse.json({ error: 'Post not found.' });

        await post.updateOne({ $pull: { likes: userId } });

        return NextResponse.json({ message: "Post disliked successfully." }, { status: 200 });
    } catch (error) {
        console.error("dislike error:", error);
        return NextResponse.json({ error: 'An error occurred.' }, { status: 500 });
    }
}