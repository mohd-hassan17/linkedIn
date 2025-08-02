import mongoose, {Schema, models, model, Document, Model} from "mongoose";
import { IUser } from "./user.model";
import { IComment } from "./comment.model";

export interface IPost {
    description: string;
    user: IUser;
    imageUrl?:string;
    likes?: string[];
    comment?: mongoose.Types.ObjectId[];
}

export interface IPostDocument extends IPost, Document {
    createdAt:Date,
    updatedAt:Date
} 

const postSchema = new Schema<IPostDocument>({
    description:{
        type: String,
        required: true
    },
    user:{
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
    },
    imageUrl:{
        type:String,
        default:"",
    },
    likes:{
        type: [String],
    },
    comment:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
},{timestamps: true})

export const Post: Model<IPostDocument> = models?.Post || model<IPostDocument>('Post', postSchema)

