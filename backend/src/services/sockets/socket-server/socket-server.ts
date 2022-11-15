import http, { Server } from 'http';
import io from 'socket.io';
import { Logger } from '../../../api/shared/utils/logger';
import { config, getHostDomain } from '../../../config/environment';


export class SocketServer {
  private logger: Logger = new Logger();
  public io!: io.Server;

  constructor() {
  }

  /**
   * Start the Socket Server.
   *
   * @param {http.Server} server
   */
  public async start(server: http.Server) {
    try {
      // create socket io server
      this.io = new io.Server(server, { path: "", cors: { origin: "*" } });

      // register events on connect
      this.onConnect();

      this.logger.success(`Sockets are established on path: ${getHostDomain()}`);

    } catch (e) {
      this.logger.error('Socket server failed to start', e);
    }
  }

  //#region Private methods

  /**
   * On server connection.
   */
  private onConnect() {
    this.io.on('connection', socket => {
      this.logger.debug('Connection event triggered');
      this.logger.debug("New client has connected");
      //emit welcome message from server to user
      // handshake verify function
      socket.emit("welcome", {
        message: "connection was successful",
      });
      this.onSubscribe(socket);
      this.onUnsubscribe(socket);
      this.onDisconnecting(socket);
      this.onClientEvent(socket);
    });
  }

  /**
   * On subscribe to a channel.
   *
   * @param {io.Socket} socket
   */
  private onSubscribe(socket: io.Socket): void {
    socket.on('subscribe', (data: any) => {
      this.logger.debug('subscribe');
    });
  }

  /**
   * On unsubscribe from a channel.
   *
   * @param {io.Socket} socket
   */
  private onUnsubscribe(socket: io.Socket): void {
    socket.on('unsubscribe', (data: any) => {
      this.logger.debug('unsubscribe');
    });
  }

  /**
   * On socket disconnecting.
   *
   * @param {io.Socket} socket
   */
  private onDisconnecting(socket: io.Socket): void {
    socket.on('disconnecting', (reason: any) => {
      this.logger.debug('disconnecting');
    });
  }

  /**
   * On client events.
   *
   * @param {io.Socket} socket
   */
  private onClientEvent(socket: io.Socket): void {
    socket.on('client:event', (data: any) => {
      this.logger.debug('client event');
      this.io.emit(data.event, data.data);
    });
  }
  //#endregion Private methods
  // --------------------------------

}

