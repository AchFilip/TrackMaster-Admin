import { Component, OnInit } from '@angular/core';
import { CellModel } from 'src/app/global/models/cell/cell.model';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {
  protected cells: CellModel[] = [];
  // TODO: change this dynamically
  protected id: number = 1;
  constructor(
    private socketService: SocketsService
  ) { 
  }

  ngOnInit(): void {
    this.initCells()
    // TODO: get rid of hardcoded values
    this.socketService.publish("wall-subscribe", {id: 1});
  }

  initCells(): void{
    for (let i = 0; i < 2*3; i++) { 
      this.cells.push(new CellModel({
        id:i, 
        wallID: this.id,
        selected: false
      }));
    }
  }
}

