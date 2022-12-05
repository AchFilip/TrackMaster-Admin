import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {OrdersService} from "../../../../global/services/orders/orders.service";
import {OrderModel} from "../../../../global/models/order/order.model";
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  protected avOrders: any[][] = [];
  protected chosenOrders!: string[][];

  public avOrdersToggle!: boolean[];
  public chosenOrdersToggle!: boolean[];

  @Input() inAvailable!: boolean;
  @Output("GetChosenOrdersLength") selectedEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(    private orderService: OrdersService
  ) { }

  ngOnInit(): void {
    this.inAvailable = true;
    this.getOrders();
  }

  protected getOrders() {
    this.initOrders();

    this.orderService.getCompleted().subscribe((result) => {
      if(result.length == 0){
        console.warn('There are no available orders in db')
        return;
      }

      // Use timestamp->delivered as time
      let orders = result.map((order)=>{
        order.time = order.timestamp.delivered;
        return order;
      });

      // Add all orders
      for(let i=0; i<orders.length; i++){
        this.addOrder(orders[i])
      }
    });
  }

  protected initOrders(){
    this.avOrders = [ ];

    this.chosenOrders = [ ];

    this.avOrdersToggle = [
      false,
      false,
      false
    ];

    this.chosenOrdersToggle = [
      false,
      false,
      false
    ];
  }

  protected addOrder(order: OrderModel){
    // TODO: do something with id size
    this.avOrders.push([
      order._id,order.address,order.street_number,
      order.zip_code,order.floor_level,order.volume,order.time
    ])
  }

  public SelectOrder(i: number) {
    if (this.avOrdersToggle[i] === false) {
      //Push the order to our current orders
      this.chosenOrders?.push(this.avOrders[i]);
      this.avOrdersToggle[i] = true;
    }else if(this.avOrdersToggle[i]){
      //Find index of order
      var index = this.chosenOrders.indexOf(this.avOrders[i]);
      if (index !== -1) {
        this.chosenOrders.splice(index, 1); //remove it from current orders list
      }
      this.avOrdersToggle[i] = false;
    }

    this.GetChosenOrdersLength();
  }

  //todo: change name
  public GetChosenOrdersLength(){
    this.selectedEmitter.emit(this.chosenOrders.length > 0);
  }

  public RemoveOrder(i: number) {
    if (this.chosenOrdersToggle[i] === false) {
      console.log("I am not selected " + i);
      this.chosenOrdersToggle[i] = true;
    }else if(this.chosenOrdersToggle[i]){
      console.log("I am selected! " + i);
      this.chosenOrdersToggle[i] = false;
    }
  }

}
