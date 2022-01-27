import { Document } from 'mongoose'

export interface Message extends Document{
    email: String;
    message: String;
    read: Number;
}