import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  protected id?: any;
  constructor(
    private socketService: SocketsService,
    private route: ActivatedRoute
  ) { 
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.initCells()
    this.socketService.publish("wall-subscribe", {id: this.id});
    this.socketService.publish("wall-state", {wallID: this.id, action: 'getEnabledGrid'});
    this.socketService.subscribe("wall-state", (data: any) => {
      console.log(data);
    });
  }

  ngOnDestroy(): void{
    this.socketService.publish("wall-unsubscribe", {id: this.id});
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

