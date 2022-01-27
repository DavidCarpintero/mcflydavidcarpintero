import { Controller, Post, Get, Put, Res, HttpStatus, Body, Param, NotFoundException, Query, Delete } from '@nestjs/common';
import { CreateMessageDTO } from './dto/message.dto';
import { MessageService } from './message.service';



@Controller('message')
export class MessageController {

    constructor(private messageService: MessageService){}



@Post('/create')
async createPost(@Res() res, @Body() createMessageDTO: CreateMessageDTO ){
    console.log(createMessageDTO);
    
    
    const message_ = await this.messageService.createMessage(createMessageDTO);
    
    


    return res.status(HttpStatus.OK).json({
        message: 'Message Succesfully Created',
        message_


    });

}

@Get('/')
async getMessages(@Res() res){
    const messages = await this.messageService.getMessages();
    return res.status(HttpStatus.OK).json({
        messages
    })
}

@Get('/:messageID')
async getMessage(@Res() res, @Param('messageID') messageID){
    const message = await this.messageService.getMessage(messageID);
    if(!message) throw new NotFoundException('Message Does not exists');
    return res.status(HttpStatus.OK).json(message);
}

@Put('/update')
async updateMessage(@Res() res, @Body() createMessageDTO: CreateMessageDTO, @Query('messageID') messageID) {

    const updatedMessage = await this.messageService.updateMessage(messageID, createMessageDTO)
    if(!updatedMessage) throw new NotFoundException('Message Does not exists');
    return res.status(HttpStatus.OK).json({

        message: 'Message Updated SUccessdully',
        updatedMessage

    });
}

@Delete('/delete')
    async deleteMessage(@Res() res, @Query('messageID') messageID){
    const messageDeleted= await this.messageService.deleteMessage(messageID)
    if(!messageDeleted) throw new NotFoundException('Message Does not exists');
        return res.status(HttpStatus.OK).json({
            message:'Message deleted successfully',
            messageDeleted
        })
}



//listado de las caracterisiticas del usuario






}
