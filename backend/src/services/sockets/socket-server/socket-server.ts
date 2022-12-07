import http, { Server } from 'http';
import io from 'socket.io';
import { Logger } from '../../../api/shared/utils/logger';
import { config, getHostDomain } from '../../../config/environment';


export class SocketServer {
  private logger: Logger = new Logger();
  public io!: io.Server;
  private gridManager: GridManager;
  constructor() {
    this.gridManager = new GridManager();
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
    socket.on('c2s', (event: any) => {
      let topic: string = event.topic;
      let data: any = event.data;

      if(!this.hasHandler(topic)){
        this.logger.error('No handler for topic: ', topic);
        return;
      }
      this.handlers[topic](topic, data);
    });
  }
  //#endregion Private methods
  // --------------------------------
  
  /** WALL */
  private onWallSubscribe = (topic:string, data:any) => {
    this.gridManager.initWall(data.id);
  }
  /** CELLS */
  private handleCellState = (topic:string, data:any) => {
    let action: string = data.action;
    let wallID: number = data.wallID;
    let cellID: number = data.cellID;

    switch(action){
      case 'close':{
        this.gridManager.widgetClosed(wallID, cellID);
        break;
      }
      case 'open':{
        this.gridManager.widgetOpened(wallID, cellID);
        break;
      }
      default: {
        this.logger.error('Wrong action: ', action)
        break;
      }
    }

    this.io.emit(topic, data);
  }

  private hasHandler(topic: string){
    return Object.keys(this.handlers).some(e => e === topic);
  }
  protected handlers: { [key: string]: (topic:string, data:any) => void; } = {
    'wall-subscribe': this.onWallSubscribe,
    'cell-state': this.handleCellState
  }
}

class GridManager{
  // Shows current grid with cell's ids
  private grids: {[key: number]: {grid:number[], enabled_grid:boolean[]}};

  // Shows current cells that have opened a widget
  private enabled_grid: boolean[]= [];

  constructor(){
    this.grids = {};
  }

  public widgetOpened(wallID:number, cellID: number){
    this.grids[wallID].enabled_grid[cellID] = true;
  }

  public widgetClosed(wallID:number, cellID: number){
    this.grids[wallID].enabled_grid[cellID] = false;
  }

  public getEnabledGrid(){
    return this.enabled_grid;
  }

  public initWall(id: number){
    // Create new wall
    this.grids[id] = {
      grid: [],
      enabled_grid:[]
    }
    this.initGrid(id,2,3);
    this.initEnabledGrid(id,2,3);
  }

  private initGrid(wallID: number, rows: number, cols: number){
    for (let i = 0; i < rows*cols; i++) { 
      this.grids[wallID].grid.push(i);
    }
  }

  private initEnabledGrid(wallID: number, rows: number, cols: number){
    for (let i = 0; i < rows*cols; i++) { 
      this.grids[wallID].enabled_grid.push(false);
    }
  }
}