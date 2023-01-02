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
  public buttons:any[] = ["SCREEN 1","SCREEN 2","SCREEN 3"];
  public available_screens:any[] = [true,true,true,true,true,true]
  public img_path:string = 'assets\\wall\\cell\\widget\\move\\';
  public screen?:number;
  @Input() public wallID: any;
  @Input() public cellID: any;

  constructor(private socketService: SocketsService) { }

  ngOnInit(): void {
    this.screen = -1;
    this.socketService.publish("wall-state", {wallID: this.wallID,cellID: this.cellID,action:'getEnabledGrid'});

    this.socketService.subscribe("wall-state",(data:any)=>{
      console.log(data.enabled_grid);
    })
  }

  SelectScreen(i:number){
    this.screen = i+1
    console.log("Selected: " + i+1);
  }
}
