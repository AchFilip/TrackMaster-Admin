import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  protected address!: string;
  protected st_num!: number;
  protected zip_code!: number;
  protected floor!: string;
  protected volume!: number;

  constructor() { }

  ngOnInit(): void {
    this.address="Sample Address";
    this.st_num= 999;
    this.zip_code= 999;
    this.floor="Sample Address";
    this.volume = 999;
  }

}
