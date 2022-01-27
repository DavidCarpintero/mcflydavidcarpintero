import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageModule } from './message/message.module';

@Module({
  imports: [UserModule, MongooseModule.forRoot('mongodb://localhost/mcflydavidcarpintero'), MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
