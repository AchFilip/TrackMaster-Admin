import {Component, Input, OnInit, Output, SimpleChanges} from '@angular/core';
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
  public audio: any;
  @Input() inAvailable!: boolean;
  @Input() clearPressed!: boolean;
  @Input() startPressed!: boolean;

  @Output("GetChosenOrdersLength") selectedEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(    private orderService: OrdersService
  ) { }

  ngOnChanges(){
    if(this.clearPressed){
      this.ClearOrders();
      this.clearPressed = false;
    }else if(this.startPressed){
      this.startPressed = false;
      this.startWork();
    }
  }

  ngOnInit(): void {
    this.inAvailable = true;
    this.getOrders();
    this.audio = new Audio();
    this.audio.src = "assets/sounds/click.wav";
    this.audio.load();
  }

  protected getOrders() {
    this.avOrders = [ ];
    this.chosenOrders = [ ];
    this.avOrdersToggle = [ ];
    this.chosenOrdersToggle = [ ];

      this.orderService.getAvailable().subscribe((result) => {
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
        var tmp = new OrderModel();
        tmp._id = orders[i]._id.substr(orders[i]._id.length-4);
        tmp.address = orders[i].address + " " + orders[i].street_number
        tmp.volume = orders[i].volume;
        tmp.timestamp = "5 KM";
        this.addOrder(tmp);
        this.avOrdersToggle.push(false);
        this.chosenOrdersToggle.push(false);
      }
    });
    this.initOrders();

  }

  protected initOrders(){

  }

  protected addOrder(order: OrderModel){
    this.avOrders.push([
      order._id,order.address,order.volume,order.timestamp
    ])
  }

  public SelectOrder(i: number) {
    this.audio.play();
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

  public ClearOrders(): void{
    for(let i = 0; i < this.avOrdersToggle.length; i++){
      this.avOrdersToggle[i] = false;
    }
    this.chosenOrders.splice(0,this.chosenOrders.length)
    this.selectedEmitter.emit(this.chosenOrders.length > 0);
  }

  public startWork(): void{
    console.log("started work!!!");
    this.orderService.getAvailable().subscribe((result) => {
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
        for(let j = 0; j < this.chosenOrders.length; j++){
          if(orders[i]._id.substr(orders[i]._id.length-4) === this.chosenOrders[j][0]){
            let newOrder = new OrderModel();
            newOrder = orders[i];
            newOrder.driver = "George Keladonakis";
            newOrder.status = "ongoing";
            newOrder.timestamp['picked_up'] = new Date();
            this.orderService.updateOrder(newOrder).subscribe(response => {console.log(response)});
          }
        }
      }

      this.chosenOrders = [];
    });
  }
}
