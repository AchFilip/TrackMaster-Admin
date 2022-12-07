import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root'
})
export class SocketsService {

  constructor(private socket: Socket) {
  }

  // Pub/Sub functions supported with sockets.
  public publish(topic: string, data: any) {
    // Inform backend to broadcast socket event
    // Publish event needs to land on server and the server will publish it.
    this.socket.emit("c2s", { topic: topic, data: data });
  }
  public subscribe(topic: string, callback: Function) {
    this.socket.on(topic, (data: any) => {
      callback(data);
    })
  }
}
