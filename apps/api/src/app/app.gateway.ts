import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'ws';

@WebSocketGateway(3000)
export class AppGateway {
  @WebSocketServer()
  server: Server;

  /**
   * Example body:

   {
    "event": "events",
    "data": "test"
   }

   * @param client
   * @param data: o valor que está dentro do campo "data" do payload, no caso do exemplo será "test"
   */
  @SubscribeMessage('events')
  onEvent(client: any, data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }
}
