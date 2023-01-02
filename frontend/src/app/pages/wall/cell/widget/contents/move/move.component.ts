import {Component, Input, OnInit} from '@angular/core';
import {SocketsService} from "../../../../../../global/services/sockets/sockets.service";

@Component({
  selector: 'app-move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.scss']
})
export class MoveComponent implements OnInit {
  //todo: when selecting screen add id to the navbar path
  //todo: make button clickable if the screen is occupied
  //todo: change the icon to occupied and available respective.
  public buttons:any[] = [];
  public available_screens:any[] = []
  public img_path:string = 'assets\\wall\\cell\\widget\\move\\';
  public screens:string[] = [];
  public activeWallsState:any = {};
  public content:number = 0;
  public selected = {
    wallID:'0',
    cellID:0,
  }
  @Input() public wallID: any;
  @Input() public cellID: any;
  @Input() public state: any;

  constructor(private socketService: SocketsService) { }

  ngOnInit(): void {
    this.initStateSocket();
    this.socketService.publish("wall-state", {wallID: this.wallID,cellID: this.cellID,action:'getActiveWalls'});
  }

  SelectScreen(i:string){
    this.content = 1;

    this.selected.wallID = i;

    for(let j = 0; j < this.activeWallsState[i].enabled_grid.length; j++){
      this.available_screens.push(!this.activeWallsState[i].enabled_grid[j]);
    }
  }

  SelectCell(i:number){
    this.selected.cellID = i;
    this.socketService.publish("wall-state", {
      wallID: parseInt(this.wallID),
      cellID: this.cellID,
      action:'move',
      toWallID:this.selected.wallID,
      toCellID:this.selected.cellID,
      state:this.state
    });
  }

  private initStateSocket(){
    this.socketService.subscribe("wall-state", (data: any) => {
      if(
        data.wallID === this.wallID
        && data.cellID === this.cellID
      ){
        if(data.action === "getActiveWalls") {
          this.activeWallsState = data.activeWallsState;

          this.screens = Object.keys(data.activeWallsState);
          // NOTE: Keep in mind the order in the list, so far it is sorted
          for(let i = 0; i < this.screens.length; i++){
            this.buttons.push("SCREEN " + (this.screens[i]));
          }
          
        }else{
          console.log("Unknown action: " + data.action);
        }
      }
    });
  }
}
