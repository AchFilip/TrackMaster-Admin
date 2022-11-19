import { Component, OnInit } from '@angular/core';
import { CellModel } from 'src/app/global/models/cell/cell.model';

@Component({
  selector: 'wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {
  protected cells: CellModel[] = [];
  constructor() { }

  ngOnInit(): void {
    this.initCells()
  }

  initCells(): void{
    for (let i = 0; i < 6; i++) { 
      this.cells.push( new CellModel({
          id:i, 
          selected: false
        })
      )
    }
  }
}
