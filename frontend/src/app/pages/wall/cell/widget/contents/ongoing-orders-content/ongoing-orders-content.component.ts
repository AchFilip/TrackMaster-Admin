import { Component, OnInit } from '@angular/core';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import {OrderModel} from "../../../../../../global/models/order/order.model";
import {OrdersService} from "../../../../../../global/services/orders/orders.service";

@Component({
  selector: 'app-ongoing-orders-content',
  templateUrl: './ongoing-orders-content.component.html',
  styleUrls: ['./ongoing-orders-content.component.scss']
})
export class OngoingOrdersContentComponent implements OnInit {

  protected fields = [
    'id','address','st. num.','zip code','driver','pick-up time'
  ];
  protected orders: any[][] = [];

  constructor(
    private orderService: OrdersService,
    private socketService: SocketsService
  ) { }

  ngOnInit(): void {
    this.getOrders();

    this.socketService.subscribe("order-state", (data: any) => {
      if(data.action === "reload-data") {
        this.getOrders();
      }else{
        console.log("Unknown action: " + data.action);
      }
    });
  }

  protected getOrders(){
    this.orders = [];
    this.orderService.getOngoing().subscribe((result) => {
      if(result.length == 0){
        console.warn('There are no available orders in db')
        return;
      }

      // Use timestamp->delivered as time
      let orders = result.map((order)=>{
        order.time = order.timestamp.picked_up;
        return order;
      });

      // Add all orders
      for(let i=0; i<orders.length; i++){
        orders[i]._id = orders[i]._id.substr(orders[i]._id.length-4);
        this.addOrder(orders[i])
      }
    });
  }

  protected addOrder(order: OrderModel){
    // TODO: do something with id size
    let d = new Date(order.timestamp.delivered);
    this.orders.push([
      order._id,order.address,order.street_number,
      order.zip_code,order.driver,d.toLocaleDateString("en-US")
    ])
  }
}
