import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ProfilePhoto from "./shared/ProfilePhoto"
import { Textarea } from "./ui/textarea"
import { Images } from "lucide-react"
import { useRef, useState } from "react"
import { readFileAsDataUrl } from "@/lib/utils"
import Image from "next/image"
import { createPostAction } from "@/lib/serveractions"

export function DialogDemo({ setOpen, open, src }: { setOpen: any, open: boolean, src: string }) {

    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<string>("");
    const [inputText, setInputText] = useState<string>("");

    const handleInputText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(e.target.value);
    }

    const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const data = e.target.files?.[0];
        if (data) {
            const dataUrl = await readFileAsDataUrl(data);
            setSelectedFile(dataUrl)
        }
    }

    const postActionHandler = async (formData: FormData) => {
        const inputText = formData.get('inputText') as string;
        if (!inputText || inputText.trim() === '') {
            alert("Please enter some text before posting.");
            return;
        }
        try {
            await createPostAction(inputText, selectedFile);
        } catch (error) {
            console.log(error, 'Failed to post');
        }
        setInputText('');
        setOpen(false);
    }

    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setOpen(false)} className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex gap-2">
                        <ProfilePhoto src={src} />
                        <div>
                            <h1>Mohd Hassan</h1>
                            <p className="text-xs">Post to anyone</p>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <form action={postActionHandler}>
                    <div className="flex flex-col">
                        <Textarea
                            id="name"
                            name="inputText"
                            value={inputText}
                            onChange={handleInputText}
                            className="border-none text-lg focus-visible:ring-0"
                            placeholder="Type your message here."
                        />
                        <div className="my-4">
                            {selectedFile && (
                                <Image src={selectedFile}
                                    alt="preview-image"
                                    width={400}
                                    height={400} />
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <div className="flex items-center gap-4">
                            <input ref={inputRef} onChange={fileChangeHandler} type="file" name="image" className="hidden" accept="image/*" />
                            <Button type="submit">Post</Button>
                        </div>
                    </DialogFooter>
                </form>
                <Button onClick={() => inputRef?.current?.click()} className="gap-2" variant={'ghost'}>
                    <Images className="text-blue-500" />
                    <p>Media</p>
                </Button>
            </DialogContent>
        </Dialog>
    )
}
