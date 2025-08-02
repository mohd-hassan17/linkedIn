import mongoose, {Schema, models, model, Document, Model} from "mongoose";


export interface IUser {
    userName: string;
    userId: string;
    profilePhoto?: string;
    bio?: string;
}
export interface IUserDocument extends IUser, Document {
    createdAt:Date,
    updatedAt:Date
} 

const userSchema = new Schema<IUserDocument>({
    userName:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    profilePhoto:{
        type: String,
        default: ''
    },
    bio:{
        type: String,
        default: ''
    },
},{timestamps: true})

export const User: Model<IUserDocument> = models?.User || model<IUserDocument>('User', userSchema)

