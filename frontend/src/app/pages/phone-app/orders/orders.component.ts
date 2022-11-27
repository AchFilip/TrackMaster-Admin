import { Component, OnInit } from '@angular/core';
import { OrderDetailsComponent } from './order-details/order-details.component';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  userPath: string = "/assets/phone-app/user.png";
  iconsPath: string = "/assets/phone-app/";
  avOrdersPath: string = "available_orders.png";
  delPath: string = "delivery.png";

  topIconPath: string = "";
  bottomIconPath: string = "";

  topDescription: string = "";
  bottomDescription: string = "";

  inAvailable: boolean = true;
  constructor() { }

  ngOnInit(): void {
    this.topIconPath = this.iconsPath + this.avOrdersPath;
    this.bottomIconPath = this.iconsPath + this.delPath;

    this.topDescription = "AVAILABLE ORDERS";
    this.bottomDescription = "SELECTED ORDERS";
  }

  changeOrders(): void {
    if (this.topIconPath.includes(this.avOrdersPath)) {
      this.topIconPath = this.iconsPath + this.delPath;
      this.bottomIconPath = this.iconsPath + this.avOrdersPath;

      this.topDescription = "SELECTED ORDERS";
      this.bottomDescription = "AVAILABLE ORDERS";
      this.inAvailable = false;
    } else {
      this.topIconPath = this.iconsPath + this.avOrdersPath;
      this.bottomIconPath = this.iconsPath + this.delPath;

      this.topDescription = "AVAILABLE ORDERS";
      this.bottomDescription = "SELECTED ORDERS";
      this.inAvailable = true;
    }
  }

  clearSelectedOrders() {
    console.log("Clearing orders..");
  }

  startWork() {
    console.log("Start working..");
  }

}
