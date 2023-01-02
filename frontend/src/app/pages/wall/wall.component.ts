import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CellModel} from 'src/app/global/models/cell/cell.model';
import {SocketsService} from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {
  protected cells: CellModel[] = [];
  protected cells_size: {[index: string]:any}={};

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
    // console.log(this.cells_size[this.cells[0].id].colspan)
    let cell_id:number = this.cells[0].id;
  }

  getColSpan(cell_id:number):number{
    return this.cells_size[cell_id].colspan;
  }

  getRowSpan(cell_id:number):number{
    return this.cells_size[cell_id].rowspan;
  }

  ngOnDestroy(): void {
    this.socketService.publish("wall-unsubscribe", {id: this.id});
  }

  initCells(): void {

    this.cells_size[0] = {colspan: 1, rowspan: 1};
    this.cells_size[1] = {colspan: 1, rowspan: 1};
    this.cells_size[2] = {colspan: 1, rowspan: 1};
    this.cells_size[3] = {colspan: 1, rowspan: 1};
    this.cells_size[4] = {colspan: 1, rowspan: 1};
    this.cells_size[5] = {colspan: 1, rowspan: 1};

    for (let i = 0; i < 2 * 3; i++) {
      this.cells.push(new CellModel({
        id: i,
        wallID: this.id,
        selected: false
      }));
    }
  }

  resize(): void {
    let resized_grid = [0,0,2,3,4,5];

  }

  private initStateSocket(){
    this.socketService.subscribe("wall-state", (data: any) => {
      if(
        data.wallID === this.id
      ){
        if(data.action === "resize") {
          console.log(data)
        }else{
          console.log("Unknown action: "+data.action);
        }
      }
    });
  }
}

