import { Component, Input, OnInit } from '@angular/core';
import { Display } from 'src/app/global/models/cell/cell.enum.display';

interface CellModel {
  id: number;
  selected: boolean;
}

@Component({
  selector: 'Cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class TabletCellComponent implements OnInit {
  @Input() self!: CellModel;

  protected DisplayEnum = Display;
  protected display?: Display;
  protected imageBasePath = 'assets\\wall\\cell\\widget\\';

  constructor() { }

  ngOnInit(): void {
    this.display = Display.orders;
  }

  public onAddClick(){
}

}
