import { model, Schema } from 'mongoose';

export const MessageSchema = new Schema({

email: String,
message: String,
read: Number

});

