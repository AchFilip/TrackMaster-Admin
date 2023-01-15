import { Component, InjectionToken, Injector, Input, OnInit, ReflectiveInjector, SimpleChanges } from '@angular/core';
import { Display } from 'src/app/global/models/cell/cell.enum.display';
import { EmptyComponent } from './content/empty/empty.component';

interface CellModel {
  id: number;
  wall: number;
  selected: boolean;
  state: string;
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
    this.setState(this.self.state);
  }

  private setState(state:string){
    this.display = (this.DisplayEnum as any)[state];
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log(changes);
  // }

  public openWidget(){
    this.setState('widget');
  }

}
