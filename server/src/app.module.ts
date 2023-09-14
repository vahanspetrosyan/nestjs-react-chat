import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import {UserService} from "./user/user.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ChatGateway, UserService],
})
export class AppModule {}
