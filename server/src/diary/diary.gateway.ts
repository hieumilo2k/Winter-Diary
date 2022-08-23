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
import { DiarySendChangesDto } from './dtos/diarySendChanges.dto';

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
    const userId = client.handshake.auth?.id;
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

  @SubscribeMessage('getDiary')
  async getDiary(
    @MessageBody() ident: string,
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.handshake.auth.id;
    const diary = await this.diaryService.findOrCreateDocument(ident, userId);
    client.join(ident);
    client.emit('loadDiary', diary.data);

    client.on('saveDiary', async (data) => {
      await this.diaryService.updateDiary(ident, data);
    });
  }

  @SubscribeMessage('sendChanges')
  sendChanges(
    @MessageBody() diarySendChangesDto: DiarySendChangesDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { ident, document } = diarySendChangesDto;
    client.join(ident);
    this.server.to(ident).emit('receiveChanges', document);
  }
}
