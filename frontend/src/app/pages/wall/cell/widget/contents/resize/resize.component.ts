import {Component, Input, OnInit} from '@angular/core';
import {SocketsService} from "../../../../../../global/services/sockets/sockets.service";

@Component({
  selector: 'app-resize',
  templateUrl: './resize.component.html',
  styleUrls: ['./resize.component.scss']
})
export class ResizeComponent implements OnInit {

  public buttons:any[] = [true,true,true, true,true,true, true,true,true];
  public arrowFolderPath: string = "assets\\wall\\cell\\widget\\arrows\\";
  public rotated:boolean = false;
  @Input() public wallID: any;
  @Input() public cellID: any;
  @Input() public state: any;

  constructor(private socketService: SocketsService) { }

  ngOnInit(): void {
    this.socketService.publish("wall-state", {wallID: this.wallID,cellID: this.cellID,action:'getEnabledGrid'});

    this.positionCases();

    this.socketService.subscribe("wall-state",(data:any)=>{
      if(data.wallID == this.wallID && data.cellID == this.cellID && data.action == 'getEnabledGrid'){
        this.checkWidgetsPositions(data.enabled_grid);
      }
    })

  }

  onResize(i:number){
    this.socketService.publish("wall-state", {
      wallID: this.wallID,
      cellID: this.cellID,
      action:'resize',
      expand: this.expand(i),
      state:this.state
    });
  }

  expand(pressed: number){
    let expand = [];
    switch (pressed) {
      case 0:{
        expand = this.expandTopLeft(pressed);
        break;
      }
      case 1:{
        expand = [this.expandTop(pressed)];
        break;
      }
      case 2:{
        expand = this.expandTopRight(pressed);
        break;
      }
      case 3:{
        expand = [this.expandLeft(pressed)];
        break;
      }
      case 4:{
        // Change arrow direction
        break;
      }
      case 5:{
        expand = [this.expandRight(pressed)];
        break;
      }
      case 6:{
        expand = this.expandBottomLeft(pressed);
        break;
      }
      case 7:{
        expand = [this.expandBottom(pressed)];
        break;
      }
      case 8:{
        expand = this.expandBottomRight(pressed);
        break;
      }
    }

    return expand;
  }

  expandTop(pressed: number){
    return this.cellID-3;
  }

  expandBottom(pressed: number){
    return this.cellID+3;
  }

  expandLeft(pressed: number){
    return this.cellID-1;
  }

  expandRight(pressed: number){
    return this.cellID+1;
  }

  expandTopLeft(pressed: number){
    return [this.cellID-4, this.expandTop(pressed), this.expandLeft(pressed)];
  }

  expandTopRight(pressed: number){
    return [this.expandTop(pressed), this.cellID-2, this.expandRight(pressed)];
  }

  expandBottomLeft(pressed: number){
    return [this.expandLeft(pressed), this.cellID+2, this.expandBottom(pressed)];
  }

  expandBottomRight(pressed: number){
    return [this.expandRight(pressed), this.expandBottom(pressed), this.cellID+4];
  }

  positionCases(): void{
    if(this.cellID >= 0 && this.cellID <= 2){ //Common disables
      this.buttons[0] = false;
      this.buttons[1] = false;
      this.buttons[2] = false;
    }else{
      this.buttons[6] = false;
      this.buttons[7] = false;
      this.buttons[8] = false;
    }

    switch (this.cellID) { //Strict disables
      case 0:
        this.buttons[3] = false;
        this.buttons[6] = false;
        break;
      case 2:
        this.buttons[5] = false;
        this.buttons[8] = false;
        break;
      case 3:
        this.buttons[0] = false;
        this.buttons[3] = false;
        break;
      case 5:
        this.buttons[2] = false;
        this.buttons[5] = false;
        break;
      default:
        break;
    }
  }

  checkWidgetsPositions(currentGrid: number[]): void{
    for (let i = 0; i < currentGrid.length; i++) {
      if(i === this.cellID){
        continue;
      }

      if(currentGrid[i]) {
        if (i === (this.cellID - 1)) {
          this.buttons[3] = false;
          if(i>=0 && i <=2){
            this.buttons[6] = false;
          }else{
            this.buttons[0] = false;
          }
        } else if (i === (this.cellID + 1)) {
          this.buttons[5] = false;
          if(i>=0 && i <=2){
            this.buttons[8] = false;
          }else{
            this.buttons[2] = false;
          }
        }else if(i === (this.cellID -3)){
          this.buttons[1] = false;
          if(i>=0 && i <=2){
            this.buttons[6] = false;
            this.buttons[8] = false;
          }else{
            this.buttons[0] = false;
            this.buttons[2] = false;
          }
        }else if(i === (this.cellID + 3)){
          this.buttons[7] = false;
          if(i>=0 && i <=2){
            this.buttons[6] = false;
            this.buttons[8] = false;
          }else{
            this.buttons[0] = false;
            this.buttons[2] = false;
          }
        }else if(i === (this.cellID + 4)){
          this.buttons[8] = false;
        }else if(i===(this.cellID-4)){
          this.buttons[0] = false;
        }else if(i===(this.cellID+2)){
          this.buttons[6] = false;
        }else if(i===(this.cellID-2)){
          this.buttons[2] = false;
        }
      }
    }
  }
}
