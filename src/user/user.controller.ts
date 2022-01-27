import { Controller, Post, Get, Put, Res, HttpStatus, Body, Param, NotFoundException, Query, Delete } from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { UserService } from './user.service';



@Controller('user')
export class UserController {

    constructor(private userService: UserService){}



@Post('/create')
async createPost(@Res() res, @Body() createUserDTO: CreateUserDTO ){
    console.log(createUserDTO);
    
    const usersRegistrados = await this.userService.getUsers();
    const user = await this.userService.createUser(createUserDTO);
    
    
    if(usersRegistrados.includes(user)) throw new NotFoundException('User exists, Cant create this user');


    return res.status(HttpStatus.OK).json({
        meesage: 'User Succesfully Created',
        user


    });

}

@Get('/')
async getUsers(@Res() res){
    const users = await this.userService.getUsers();
    return res.status(HttpStatus.OK).json({
        users
    })
}

@Get('/:userID')
async getUser(@Res() res, @Param('userID') userID){
    const user = await this.userService.getUser(userID);
    if(!user) throw new NotFoundException('User Does not exists');
    return res.status(HttpStatus.OK).json(user);
}

@Put('/update')
async updateUser(@Res() res, @Body() createUserDTO: CreateUserDTO, @Query('userID') userID) {

    const updatedUser = await this.userService.updateUser(userID, createUserDTO)
    if(!updatedUser) throw new NotFoundException('User Does not exists');
    return res.status(HttpStatus.OK).json({

        message: 'User Updated SUccessdully',
        updatedUser

    });
}

@Delete('/delete')
    async deleteUser(@Res() res, @Query('userID') userID){
    const userDeleted= await this.userService.deleteUser(userID)
    if(!userDeleted) throw new NotFoundException('User Does not exists');
        return res.status(HttpStatus.OK).json({
            message:'User deleted successfully',
            userDeleted
        })
}



//listado de las caracterisiticas del usuario
@Get('/:userID/:active')
async getUserActive(@Res() res, @Param('userID') userID){
    const user = await this.userService.getUserActive(userID);
    return res.status(HttpStatus.OK).json(user);
}





}
