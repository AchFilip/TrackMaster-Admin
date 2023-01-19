import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CellModel } from 'src/app/global/models/cell/cell.model';
import { Display } from 'src/app/global/models/cell/cell.enum.display';
import { BasicMenuOptions } from 'src/app/global/models/cell/menu.basic.options';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

import {WidgetContentOptions} from 'src/app/global/models/cell/widget.enum.content.options';

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
  protected initWidgetState ={display: WidgetContentOptions.widget_options, name: 'widgets'};

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
      this.openWidget(this.initWidgetState);
    this.audio.play();
  }

  private openWidget(state:any){
    this.socketService.publish("cell-state", {wallID: this.self.wallID,cellID: this.self.id,action:'open', state: state})
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
        }else if(data.action === "open"){
          this.display=this.DisplayEnum.widget;
          this.widgetDisplay=data.state
        }else if(data.action === "resize"){
          this.display=this.DisplayEnum.empty;
          this.openWidget(data.state);
        }else if(data.action === "open-on"){
          this.display=this.DisplayEnum.empty;
          this.openWidget(data.state);
        }else{
          console.log("Unknown action: " + data.action);
        }
      }
    });
  }
}
