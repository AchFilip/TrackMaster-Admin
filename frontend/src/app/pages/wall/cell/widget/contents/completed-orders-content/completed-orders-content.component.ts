import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { OrderModel } from 'src/app/global/models/order/order.model';
import { OrdersService } from 'src/app/global/services/orders/orders.service';

@Component({
  selector: 'app-completed-orders-content',
  templateUrl: './completed-orders-content.component.html',
  styleUrls: ['./completed-orders-content.component.scss']
})
export class CompletedOrdersContentComponent implements OnInit {

  protected dataLoaded: boolean = false;

  protected fields = [
    'id','address','st. num.','zip code','floor','volume','time'
  ];

  protected orders: any[][] = [];

  constructor(
    private orderService: OrdersService
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  protected getOrders(){
    // clear orders
    this.clearOrders()

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
        orders[i]._id = orders[i]._id.substr(orders[i]._id.length-4);
        this.addOrder(orders[i])
      }
    });
  }

  protected clearOrders(){
    this.orders = [];
  }

  protected addOrder(order: OrderModel){
    // TODO: do something with id size
    let d = new Date(order.timestamp.delivered);
    this.orders.push([
      order._id,order.address,order.street_number,
      order.zip_code,order.floor_level,order.volume,d.toLocaleDateString("en-US")
    ])
  }
}
