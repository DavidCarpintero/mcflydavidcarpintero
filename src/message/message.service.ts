import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Message } from './interfaces/message.interface';
import { CreateMessageDTO } from './dto/message.dto';




@Injectable()
export class MessageService {

constructor(@InjectModel('Message') private messageModel: Model<Message>){}

//all messages
async getMessages(): Promise<Message[]>{
    //userModel es la conexion a mongoose/mongodb
    const messages = await this.messageModel.find();
    return messages;

}
//only 1 message
async getMessage(messageID: string): Promise<Message>{
    const message= await this.messageModel.findById(messageID);
    return message;


}

async createMessage(createMessageDTO: CreateMessageDTO): Promise<Message>{
    const message = new this.messageModel(createMessageDTO);
    return await message.save();

}

async deleteMessage(messageID: string): Promise<Message>{

    const deletedMessage = await this.messageModel.findByIdAndDelete(messageID);
    return deletedMessage;

}

async updateMessage(messageID: string , createMessageDTO: CreateMessageDTO): Promise<Message>{
    const updatedMessage = await this.messageModel.findByIdAndUpdate(messageID,createMessageDTO, {new: true});
    return updatedMessage;
}




}
