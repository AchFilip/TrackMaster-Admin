import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CellModel } from 'src/app/global/models/cell/cell.model';
import { Display } from 'src/app/global/models/cell/cell.enum.display';
import { BasicMenuOptions } from 'src/app/global/models/cell/menu.basic.options';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  @Input() self!: CellModel;


  protected DisplayEnum = Display;
  protected display?: Display;
  protected widgetDisplay!: string;
  protected audio!: any;

  constructor(
    private socketService: SocketsService
  ) { }

  ngOnInit(): void {
    this.display = Display.empty;
    this.audio = new Audio();
    this.audio.src = "assets/sounds/plop.wav";
    this.audio.load();
    this.initStateSocket();
  }

  public onAddClick(){
      this.openWidget()
    this.audio.play();
  }

  private openWidget(){
    this.socketService.publish("cell-state", {wallID: this.self.wallID,cellID: this.self.id,action:'open'})
  }

  private closeWidget(){
    this.socketService.publish("cell-state", {wallID: this.self.wallID,cellID: this.self.id,action:'close'})
  }

  private initStateSocket(){
    this.socketService.subscribe("cell-state", (data: any) => {
      if(
        data.wallID === this.self.wallID
        && data.cellID === this.self.id
      ){
        if(data.action === "close") {
          this.display=this.DisplayEnum.empty;
        }else{
          this.display=this.DisplayEnum.widget;
          this.widgetDisplay=data.display
          // put this as injector to widget
          // display = data.display;
        }
      }
    });
  }
}
