import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/user.dto'




@Injectable()
export class UserService {

constructor(@InjectModel('User') private userModel: Model<User>){}

//all users
async getUsers(): Promise<User[]>{
    //userModel es la conexion a mongoose/mongodb
    const users = await this.userModel.find();
    return users;

}
//only 1 user
async getUser(userID: string): Promise<User>{
    const user= await this.userModel.findById(userID);
    return user;


}

async createUser(createUserDTO: CreateUserDTO): Promise<User>{
    const user = new this.userModel(createUserDTO);
    return await user.save();

}

async deleteUser(userID: string): Promise<User>{

    const deletedUser = await this.userModel.findByIdAndDelete(userID);
    return deletedUser;

}

async updateUser(userID: string , createUserDTO: CreateUserDTO): Promise<User>{
    const updatedUser = await this.userModel.findByIdAndUpdate(userID,createUserDTO, {new: true});
    return updatedUser;
}

async getUserActive(userID: string): Promise<User>{
    const user= await this.userModel.findById(userID);
    return user;


}


}
