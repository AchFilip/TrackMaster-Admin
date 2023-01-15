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
  canClear: boolean = false;
  clearPressed: boolean = false;

  public audio: any;

  constructor() { }

  ngOnInit(): void {
    this.topIconPath = this.iconsPath + this.avOrdersPath;
    this.bottomIconPath = this.iconsPath + this.delPath;

    this.topDescription = "AVAILABLE ORDERS";
    this.bottomDescription = "SELECTED ORDERS";

    this.audio = new Audio();
    this.audio.src = "assets/sounds/click.wav";
    this.audio.load();
  }

  changeOrders(): void {
    this.audio.play();
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


  setCanClear(event: boolean){
    this.canClear = event;
    if(this.canClear === false)
    {
      this.clearPressed = false
    }
    console.log("Can clear: ",this.canClear)
  }

  clearSelectedOrders() {
    this.clearPressed = true;
  }

  startWork() {
    console.log("Start working..");
  }

}
