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
  
  constructor(
    private socketService: SocketsService
  ) { }

  ngOnInit(): void {
    this.display = Display.empty;

    this.initStateSocket();
  }

  public onAddClick(){
    this.toggleDisplay()
  }

  private toggleDisplay(){
    if(this.display===this.DisplayEnum.widget){ 
      this.display=this.DisplayEnum.empty;
    }else{
      this.display=this.DisplayEnum.widget;
    }
  }

  private initStateSocket(){
    this.socketService.subscribe("cell-state", (data: any) => {
      if(
        data.wallID === this.self.wallID
        && data.cellID === this.self.id
      ){
        this.toggleDisplay();
      }
    });
  }
}
