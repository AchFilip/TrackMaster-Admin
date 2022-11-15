import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemModel } from 'src/app/global/models/items/item.model';


@Component({
  selector: 'item-preview',
  templateUrl: './item-preview.component.html',
  styleUrls: ['./item-preview.component.scss']
})
export class ItemPreviewComponent implements OnInit {
  @Input() self!: ItemModel;
  @Output("onClick") clickEmitter: EventEmitter<ItemModel> = new EventEmitter<ItemModel>();

  protected imagePath: string = "\assets\\";

  constructor() { }

  ngOnInit(): void {

  }

  public onClick() {
    this.clickEmitter.emit(this.self);
  }
}
