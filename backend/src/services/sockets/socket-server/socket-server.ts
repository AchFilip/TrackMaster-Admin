import http, { Server } from 'http';
import { interfaces } from 'inversify';
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
    this.logger.debug('Sunscribe wall: ', data.id);
    this.gridManager.initWall(data.id);
    this.gridManager.print();
  }
  private onWallunSubscribe = (topic:string, data:any) => {
    this.logger.debug('Unsubscribe wall: ', data.id);
    this.gridManager.deleteWall(data.id);
    this.gridManager.print();
  }
  //
  private onWallState= (topic:string, data:any) => {
    switch(data.action){
      case 'getEnabledGrid':{
        data.enabled_grid = this.gridManager.getEnabledGrid(data.wallID);
        break;
      }

      case 'getActiveWalls':{
        data.activeWallsState = this.gridManager.getActiveWallsState();
        break;
      }

      case 'move':{
        // Open widget to destination 
        let dest_data = {
          wallID: data.toWallID,
          cellID: data.toCellID,
          action: 'open',
          state: data.state
        }
        this.io.emit('cell-state', dest_data);
        this.gridManager.widgetOpened(data.toWallID, data.toCellID);

        // Inform wall to reorganize cell,
        // if the widget closed was resized
        let freed_cells = this.gridManager.widgetClosed(data.wallID, data.cellID);
        let wall_data = {
          wallID: String(data.wallID),
          action: 'close-widget',
          free: freed_cells
        }
        this.io.emit('wall-state', wall_data);

        // Close source widget 
        data.action = 'close';
        data.wallID = String(data.wallID);
        this.io.emit('cell-state', data);
        return;
      }

      case 'resize':{
        // inform manager 
        this.gridManager.widgetResize(data.wallID, data.cellID, data.expand);

        //inform wall
        //Happens with final emit
        data.wall = this.gridManager.getActiveWallsState()[data.wallID];

        //inform cell to change state
        let dest_data = {
          wallID: data.wallID,
          cellID: data.cellID,
          action: data.action,
          state: data.state
        }
        this.io.emit('cell-state', dest_data);
        break;
      }

      default:{
        this.logger.error('Wrong action for wall state: ', data.action);
      }
    }
    this.io.emit(topic, data);
  }
  /** CELLS */
  private handleCellState = (topic:string, data:any) => {
    let action: string = data.action;
    let wallID: number = data.wallID;
    let cellID: number = data.cellID;

    switch(action){
      case 'close':{
        // Inform wall to reorganize cell,
        // if the widget closed was resized
        let freed_cells = this.gridManager.widgetClosed(wallID, cellID);
        let dest_data = {
          wallID: data.wallID,
          action: 'close-widget',
          free: freed_cells
        }
        this.io.emit('wall-state', dest_data);

        this.gridManager.updateCellState(wallID, cellID, 'empty');
        console.log(this.gridManager.print());
        break;
      }

      case 'open':{
        this.gridManager.widgetOpened(wallID, cellID);
        break;
      }

      case 'update-state':{
        this.gridManager.updateCellState(wallID, cellID, data.state);
        console.log(this.gridManager.print());
        // let dest_data = {
        //   wallID: data.wallID,
        //   cellID: data.cellID,
        //   action: 'update',
        //   free: freed_cells
        // }
        // this.io.emit('tablet-state', dest_data);
        break;
      }

      case 'open-from-table':{
        console.log(data)
        let dest_data = {
          wallID: String(data.wallID),
          cellID: data.cellID,
          action: 'open',
          state: data.state
        }
        this.io.emit('cell-state', dest_data);
        return;
      }

      default: {
        this.logger.error('Wrong action: ', action)
        break;
      }
    }

    this.io.emit(topic, data);
  }

  handleTabletState = (topic:string, data:any) => {
    let action: string = data.action;

    switch(action){
      case 'get-wall':{
        data.wallState = this.gridManager.getWallState(data.wallID);
        this.io.emit(topic, data);
        break;
      }

      default: {
        this.logger.error('Wrong action: ', action)
        break;
      }
    }
  }
  
  private hasHandler(topic: string){
    return Object.keys(this.handlers).some(e => e === topic);
  }
  protected handlers: { [key: string]: (topic:string, data:any) => void; } = {
    'wall-subscribe': this.onWallSubscribe,
    'wall-unsubscribe': this.onWallunSubscribe,
    'wall-state': this.onWallState,
    'cell-state': this.handleCellState,
    'tablet-state': this.handleTabletState
  }
}

class GridManager{
  // Shows current grid with cell's ids
  private grids: {[key: number]: {grid:number[], enabled_grid:boolean[], state:string[]}};

  // Shows current cells that have opened a widget
  private enabled_grid: boolean[]= [];

  constructor(){
    this.grids = {};
  }

  public widgetOpened(wallID:number, cellID: number){
    this.grids[wallID].enabled_grid[cellID] = true;
  }

  public widgetClosed(wallID:number, cellID: number){
    let freed_cells= []
    // Find if this cell was resized    
    for(let i = 0; i < this.grids[wallID].grid.length; i++){
      if(this.grids[wallID].grid[i] === cellID){
        this.grids[wallID].enabled_grid[i] = false;
        this.grids[wallID].grid[i] = i;
        freed_cells.push(i);
      }
    }
    return freed_cells;
  }

  public widgetResize(wallID:number, cellID: number, expanded: number[]){
    for(let i = 0; i < expanded.length; i++){
      this.grids[wallID].grid[expanded[i]] = cellID;
      this.grids[wallID].enabled_grid[expanded[i]] = true;
    }
    console.log(this.grids)
  }

  public getEnabledGrid(wallID: number){
    return this.grids[wallID].enabled_grid;
  }

  public getActiveWallsState(){
    return this.grids;
  }

  public initWall(id: number){
    // Create new wall
    this.grids[id] = {
      grid: [],
      enabled_grid:[],
      state: []
    }
    this.initGrid(id,2,3);
    this.initEnabledGrid(id,2,3);
    this.initState(id,2,3);
  }

  public deleteWall(id: number){
    // Create new wall
    delete this.grids[id];
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

  private initState(wallID: number, rows: number, cols: number){
    for (let i = 0; i < rows*cols; i++) { 
      this.grids[wallID].state.push('empty');
    }
  }

  public updateCellState(wallID:number, cellID: number, state: string){
    this.grids[wallID].state[cellID] = state;
  }

  public getWallState(wallID: number){
    return this.grids[wallID];
  }

  public print(){
    console.log(this.grids)
  }
}