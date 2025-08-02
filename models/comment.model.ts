import mongoose, {model, models, Document, Schema, Model} from "mongoose";
import { IUser } from "./user.model";

export interface IComment {
    textMessage: string;
    user: IUser
}
export interface ICommentDocument extends IComment, Document {
    createdAt:Date,
    updatedAt:Date
}

const commentSchema = new Schema<ICommentDocument>({
    textMessage:{
        type: String,
        required: true
    },
    user: {
        userId:{
            type: String,
            required: true
        },
        profilePhoto: {
            type: String,
            default: ''
        },
        userName:{
            type: String,
            required: true
        }
    }
},{timestamps: true})

export const Comment: Model<ICommentDocument> = models?.Comment || model<ICommentDocument>('Comment', commentSchema)