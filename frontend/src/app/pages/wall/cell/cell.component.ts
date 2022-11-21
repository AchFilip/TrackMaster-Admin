import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CellModel } from 'src/app/global/models/cell/cell.model';
import { Display } from 'src/app/global/models/cell/cell.enum.display';

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  @Input() self!: CellModel;

  

  protected DisplayEnum = Display;
  protected display?: Display;
  
  constructor() { }

  ngOnInit(): void {
    this.display = Display.widget;
  }

  public onAddClick(){
    this.toggleDisplay()
  }

  private toggleDisplay(){
    if(this.display===this.DisplayEnum.widget) 
      this.display=this.DisplayEnum.empty;
    else 
      this.display=this.DisplayEnum.widget;
  }
}
