'use client'

import { createCommentAction } from "@/lib/serveractions";
import ProfilePhoto from "./shared/ProfilePhoto"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';


const CommentInput = ({ postId }: { postId: string }) => {
    const router = useRouter();

    const { data: session } = useSession();

    const handleCommentAction = async (formData: FormData) => {
        try {
            if (!session?.user) {
                router.push('/login');
                return;
            }
            const comment = formData.get("inputText")?.toString().trim();

            if (!comment) {
                alert("Comment cannot be empty.");
                return;
            }
            await createCommentAction(postId, formData);
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred");
        }
    }

    return (
        <form action={(formData) => handleCommentAction(formData)}>
            <div className='flex items-center gap-2'>
                <ProfilePhoto src={session?.user?.image || ""} />
                <Input
                    type="text"
                    name="inputText"
                    placeholder='Add a comment'
                    className='rounded-full'
                />
                <Button type='submit' variant={'outline'} className='rounded-full'>Send</Button>
            </div>
        </form>
    )
}

export default CommentInput