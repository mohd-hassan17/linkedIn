import { NextRequest, NextResponse } from "next/server";
import { Post } from "@/models/post.model";
import dbConnection from "@/lib/db";

export const GET = async (
  req: NextRequest,
  context: { params: { postId: string } }
) => {
  try {
    await dbConnection();

    const postId = context.params.postId;

    const post = await Post.findById(postId).populate({
      path: "comment", // 👈 match your schema here
      options: { sort: { createdAt: -1 } },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    return NextResponse.json({ comments: post.comment }, { status: 200 });
  } catch (error) {
    console.error("Error fetching post comments:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
};
