import dbConnection from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // adjust path as needed

// get likes
export const GET = async (
  req: NextRequest,
  context: { params: { postId: string } }
) => {
  try {
    await dbConnection();

    const postId = await context.params.postId; // ✅ Access params safely
    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    return NextResponse.json(post.likes, { status: 200 });

  } catch (error) {
    console.error("Error fetching likes:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
};

// post likes
export const POST = async (
  req: NextRequest,
  context: { params: { postId: string } }
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    await dbConnection();

    const postId = context.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    await post.updateOne({ $addToSet: { likes: session.user.id } }); // prevents duplicates

    return NextResponse.json(
      { message: "Post liked successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error liking post:", error);
    return NextResponse.json(
      { error: "An error occurred." },
      { status: 500 }
    );
  }
};