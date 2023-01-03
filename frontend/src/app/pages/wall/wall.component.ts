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

    this.initStateSocket();
  }

  getActiveCells(): CellModel[] {
    let active_cells = this.cells.filter((cell: CellModel) => {
      let id = cell.id;
      return this.cells_size[id].colspan > 0 && this.cells_size[id].rowspan > 0;
    });
    return active_cells;
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

  // BUG: if resize is done from bottom-up,
  // the grid puts the top cells and then their is no 
  // right place from the resized cell
  // USE: only TOP>BOTTOM resize
  resize(id:number, expand:number[], wall:any): void {
    console.log(expand)
    // can only expand one col/row
    let expanded_row = false;
    let expanded_col = false;
    for(let i=0; i<expand.length; i++){
      let cell_id = expand[i];
      if(this.sameRow(id, cell_id)){
        if(!expanded_col){
          this.cells_size[id].colspan += 1;
          expanded_col = true;
        }
        
      }else{
        if(!expanded_row){
          this.cells_size[id].rowspan += 1;
          expanded_row = true;
        }
      }

      this.cells_size[cell_id].colspan = 0;
      this.cells_size[cell_id].rowspan = 0;
    }
    console.log(wall)
  }

  private sameRow(a:number, b:number):boolean{
    return Math.floor(a/3) == Math.floor(b/3);
  }

  private free(cells: number[]){
    for(let i=0; i<cells.length; i++){
      this.cells_size[cells[i]].colspan = 1;
      this.cells_size[cells[i]].rowspan = 1;
    }
  }

  private initStateSocket(){
    this.socketService.subscribe("wall-state", (data: any) => {
      console.log(this.id, data)
      if(
        data.wallID === this.id
      ){
        if(data.action === "resize") {
          this.resize(data.cellID, data.expand, data.wall);
        }else if(data.action === 'close-widget') {
          this.free(data.free)
        }else{
          console.log("Unknown action: "+data.action);
        }
      }
    });
  }
}

