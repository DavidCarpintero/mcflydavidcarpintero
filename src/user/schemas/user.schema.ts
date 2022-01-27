import { model, Schema } from 'mongoose';

export const UserSchema = new Schema({

email: String,
password: String,
active: Number

});

