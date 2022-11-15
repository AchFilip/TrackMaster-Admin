import "reflect-metadata";
import http from 'http';
import { injectable } from 'inversify';
import { SocketServer } from './socket-server';


@injectable()
export class SocketsService {

  private socketServer!: SocketServer;

  constructor() { }

  /**
   * Init and start socket server
   *
   * @param {http.Server} server
   * @returns
   */
  public async start(server: http.Server) {
    if (this.socketServer) { return; }

    this.socketServer = new SocketServer();
    await this.socketServer.start(server);
  }

  public publish(event: string, data: any) {
    /** 
     * "server:event" is predefined channel for every server event.
     * Every socket-client in the frontend has subscribed in this event and
    */
    this.socketServer.io.emit(event, data);
  }

}
