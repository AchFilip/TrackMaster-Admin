import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  public id: string = "-1.";
  public address: string = "Sample Address";
  public volume: string = "10%";
  public distance: string = "25KM";
  constructor() { }

  ngOnInit(): void {
  }

}
