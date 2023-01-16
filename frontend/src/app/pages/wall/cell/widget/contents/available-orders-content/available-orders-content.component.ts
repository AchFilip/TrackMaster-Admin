import { Component, OnInit } from '@angular/core';
import {OrdersService} from "../../../../../../global/services/orders/orders.service";
import {OrderModel} from "../../../../../../global/models/order/order.model";
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-available-orders-content',
  templateUrl: './available-orders-content.component.html',
  styleUrls: ['./available-orders-content.component.scss']
})
export class AvailableOrdersContentComponent implements OnInit {

  protected fields = [
    'id','address','st. num.','zip code','floor','volume','time'
  ];
  protected orders: any[][] = [];

  constructor(
    private orderService: OrdersService,
    private socketService: SocketsService
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  protected getOrders(){
    this.clearOrders()

    this.orderService.getAvailable().subscribe((result) => {
      if(result.length == 0){
        console.warn('There are no available orders in db')
        return;
      }

      let orders = result.map((order)=>{
        order.time = order.timestamp.added;
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
    let d = new Date(order.timestamp.added);
    this.orders.push([
      order._id,order.address,order.street_number,
      order.zip_code,order.floor_level,order.volume,d.toLocaleDateString("en-US")
    ])
  }

  protected clearOrders(){
    this.orders = [];
  }

  onClick(event:any){
    this.orderService.deleteOrder(event[0])
    this.getOrders()
  }
}
