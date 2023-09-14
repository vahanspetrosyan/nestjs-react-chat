import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import {Logger} from '@nestjs/common';
import {UserService} from "../user/user.service";

interface IMessage {
  username: string;
  timestamp: number
  message: string
}

@WebSocketGateway({
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayInit {
  constructor(private users: UserService) {
  }
  @WebSocketServer() wss: Server;
  private messages: IMessage[] = []; // Array to store chat messages
  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: any) {
    this.logger.log('Initialized!');
  }

  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('joinChat')
  handleJoinChat(client: any, username: string) {
    // Store the username and client ID
    this.users.create(client, username);

    // Send chat message history to the newly joined user
    client.emit('messageHistory', this.messages);
    const chatMessage = {  username: 'system', message: `${username}  joined to the chat`, timestamp: new Date().getTime() };
    this.messages.push(chatMessage);
    this.wss.emit('newMessage', chatMessage);
  }

  @SubscribeMessage('chatMessage')
  handleChatMessage(client: any, message: string) {
    const username = this.users.find(client);
    const timestamp = new Date().getTime();
    const chatMessage = { username, message, timestamp };

    // Store the message in the messages array
    this.messages.push(chatMessage);

    // Broadcast the message to all clients
    this.wss.emit('newMessage', chatMessage);
  }

  @SubscribeMessage('disconnect')
  handleDisconnect(client: any) {
    const username = this.users.find(client);
    if(typeof username !== 'undefined') {
      const chatMessage = { username: 'system', message: `${username} left the chat`, timestamp: new Date().getTime() };
      this.messages.push(chatMessage);
      this.wss.emit('newMessage', chatMessage);
    }
    console.log(`Client disconnected: ${client.id}`);
  }
}
