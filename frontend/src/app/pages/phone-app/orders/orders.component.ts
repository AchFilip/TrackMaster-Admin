import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  userPath: string = "/assets/phone-app/user.png";
  iconsPath: string = "/assets/phone-app/";
  topIconPath: string = "available_orders.png";
  bottomIconPath: string = "delivery.png";
  constructor() { }

  ngOnInit(): void {
    this.topIconPath = this.iconsPath + this.topIconPath;
    this.bottomIconPath = this.iconsPath + this.bottomIconPath;

  }

  

}
