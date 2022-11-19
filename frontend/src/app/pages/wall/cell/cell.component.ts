import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CellModel } from 'src/app/global/models/cell/cell.model';

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  @Input() self!: CellModel;

  protected empty: boolean = true;
  
  constructor() { }

  ngOnInit(): void {
  }

  public onAddClick(){
    this.setWidgetState()
  }

  // Cell's state
  setEmptyState(){
    this.empty = true
  }

  setWidgetState(){
    this.empty = false
  }
}
