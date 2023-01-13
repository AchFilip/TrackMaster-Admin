import { Component, OnInit } from '@angular/core';

interface CellModel {
  id: number;
  selected: boolean;
}

@Component({
  selector: 'Tablet',
  templateUrl: './tablet.component.html',
  styleUrls: ['./tablet.component.scss']
})
export class TabletComponent implements OnInit {

  protected imageBasePath = 'assets\\wall\\cell\\widget\\';

  protected cells: CellModel[] = [];
  protected cells_size: {[index: string]:any}={};

  protected selectedScreen: number = 2;
  constructor() { }

  ngOnInit(): void {
    this.initCells()
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

  initCells(): void {

    this.cells_size[0] = {colspan: 1, rowspan: 1};
    this.cells_size[1] = {colspan: 1, rowspan: 1};
    this.cells_size[2] = {colspan: 1, rowspan: 1};
    this.cells_size[3] = {colspan: 1, rowspan: 1};
    this.cells_size[4] = {colspan: 1, rowspan: 1};
    this.cells_size[5] = {colspan: 1, rowspan: 1};

    for (let i = 0; i < 2 * 3; i++) {
      this.cells.push(<CellModel>({
        id: i,
        selected: false
      }));
    }
  }

  public isSelectedScreen(screen: number): boolean{
    return this.selectedScreen === screen;
  }

  public selectScreen(oldScreen: number): void{
    this.selectedScreen = oldScreen;
  }
}
