import { DiaryService } from './diary.service';
import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UnauthorizedException } from '@nestjs/common';

@WebSocketGateway({ namespace: 'diary', cors: { origin: '*' } })
export class DiaryGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly diaryService: DiaryService) {}
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('DiaryGateway');

  afterInit() {
    this.logger.log('Initialized');
  }

  async handleConnection(client: Socket) {
    const clientId = client.id.toString();
    const accessToken = client.handshake.auth?.token;
    const userId = await this.diaryService.getCurrentUserId(accessToken);
    if (!userId) {
      return this.disconnect(client);
    }
    this.logger.log(`User connected ${clientId}`);
    this.diaryService.addNewConnectedUser(clientId, userId);
  }

  handleDisconnect(client: Socket) {
    const clientId = client.id.toString();
    this.logger.log(`User disconnected ${clientId}`);
    this.diaryService.removeConnectedUser(clientId);
  }

  private disconnect(client: Socket) {
    client.emit('Error', new UnauthorizedException());
    client.disconnect();
  }

  @SubscribeMessage('get-diary')
  async getDiary(
    @MessageBody() ident: string,
    @ConnectedSocket() client: Socket,
  ) {
    const diary = await this.diaryService.findOrCreateDocument(ident);
    client.join(ident);
    client.emit('load-diary', diary.data);

    client.on('send-changes', (delta) => {
      client.broadcast.to(ident).emit('receive-changes', delta);
    });

    client.on('save-diary', async (data) => {
      await this.diaryService.updateDiary(ident, data);
    });
  }
}
