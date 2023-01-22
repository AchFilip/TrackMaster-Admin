import { Component, OnInit } from '@angular/core';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import {SmartSpeakerService} from "../../smart-speaker.service";

interface CellModel {
  id: number;
  wall: number;
  selected: boolean;
  state: string;
}

@Component({
  selector: 'Tablet',
  templateUrl: './tablet.component.html',
  styleUrls: ['./tablet.component.scss']
})
export class TabletComponent implements OnInit {

  protected imageBasePath = 'assets\\wall\\cell\\widget\\';

  protected cells: CellModel[] = [];
  protected cells_size: {[index: string]:any}={};

  protected selectedScreen: number = 2;
  constructor(
    private socketService: SocketsService,
    private smartSpeaker: SmartSpeakerService
  ) { }

  ngOnInit(): void {
    this.initStateSocket();
    this.getWallState();
    this.voiceCommands();
  }

  getWallState(){
    this.socketService.publish("tablet-state", {
      wallID: this.selectedScreen,
      action:'get-wall'});
  }

  getActiveCells(): CellModel[] {
    let active_cells = this.cells.filter((cell: CellModel) => {
      let id = cell.id;
      return this.cells_size[id].colspan > 0 && this.cells_size[id].rowspan > 0;
    });
    return active_cells;
  }

  getColSpan(cell_id:number):number{
    return this.cells_size[cell_id].colspan;
  }

  getRowSpan(cell_id:number):number{
    return this.cells_size[cell_id].rowspan;
  }

  initCells(wallState:any): void {
    // If state is available let it be 
    if(this.cells[0] !== undefined){
      let state = ''
      console.log('Careful about available state')
      for (let i = 0; i < 2 * 3; i++) {
        if(this.cells[i].state === 'available'){
          wallState.state[i] = 'available'
          console.log('FOUND AVAILABALE STATE')
        }
      }
    }

    this.cells_size[0] = {colspan: 1, rowspan: 1};
    this.cells_size[1] = {colspan: 1, rowspan: 1};
    this.cells_size[2] = {colspan: 1, rowspan: 1};
    this.cells_size[3] = {colspan: 1, rowspan: 1};
    this.cells_size[4] = {colspan: 1, rowspan: 1};
    this.cells_size[5] = {colspan: 1, rowspan: 1};
    console.log(wallState)
    this.cells = [];
    for (let i = 0; i < 2 * 3; i++) {
      this.cells.push(<CellModel>({
        id: i,
        wall: this.selectedScreen,
        selected: false,
        state: wallState.state[i]
      }));
    }
  }

  updateState(wallState:any){
    if(this.cells[0] === undefined){
      this.initCells(wallState)
      return
    }
    let state = ''
    for (let i = 0; i < 2 * 3; i++) {
      if(this.cells[i].state === 'available'){
        state = 'available'
      }else{
        state = wallState.state[i]
      }
      console.log('old: ' + this.cells[i].state)
      console.log('new: ' + state)
      this.cells = []
      this.cells.push(<CellModel>({
        id: i,
        wall: this.selectedScreen,
        selected: false,
        state: wallState.state[i]
      }));
    }
  }

  public isSelectedScreen(screen: number): boolean{
    return this.selectedScreen === screen;
  }

  public selectScreen(oldScreen: number): void{
    this.selectedScreen = oldScreen;
    this.getWallState();
  }

  // private initWall(wallState: any): void {
  //   console.log(wallState)
  //   for(let i = 0; i < wallState.state.length; i++){
  //     this.cells[i].state = wallState.state[i];
  //   }
  // }

  public initStateSocket(): void {
    this.socketService.subscribe("tablet-state", (data: any) => {
        if(data.action === "get-wall") {
          if(data.wallState === undefined){
            console.warn("Wall state is undefined");
            return;
          }
          // this.updateState(data.wallState)
          this.initCells(data.wallState);
        }else{
          console.log("Unknown action: " + data.action);
        }
      });
  }

  

  protected voiceCommands(): void{
    this.smartSpeaker.addCommand("Select Screen One", () => {
      this.selectScreen(1);
    });
    this.smartSpeaker.addCommand("Go to Screen One", () => {
      this.selectScreen(1);
    });
    this.smartSpeaker.addCommand("Select Screen Two", () => {
      this.selectScreen(2);
    });
    this.smartSpeaker.addCommand("Go to Screen Two", () => {
      this.selectScreen(2);
    });
    this.smartSpeaker.addCommand("Select Screen Three", () => {
      this.selectScreen(3);
    });
    this.smartSpeaker.addCommand("Go to Screen Three", () => {
      this.selectScreen(3);
    });
    this.smartSpeaker.addCommand("Do something", () => {
      console.log("Doing something");
      //this.smartSpeaker.speak("Dont tell me what to do");
    });
    this.smartSpeaker.addCommand("hello", () => {
      this.smartSpeaker.speak("GURU EISAI TRELA MAKARI NA EIXES MALLIA ");
    });
    this.smartSpeaker.addCommand("Do it", () => {
      
      this.socketService.publish("cell-state", {
        wallID: '1',
        cellID: 3,
        action:'open-from-table', 
        state: { 
          display: 'completed', 
          name: 'completed'
        }});

      this.selectScreen(1);

      setTimeout(() => {
        this.getWallState();
      }, 50);

    });
    this.smartSpeaker.initialize();

    this.smartSpeaker.start();
  }
}
