import {Component, Input, OnInit} from '@angular/core';
import {OrdersService} from "../../../../../../global/services/orders/orders.service";
import {SocketsService} from "../../../../../../global/services/sockets/sockets.service";
import {OrderModel} from "../../../../../../global/models/order/order.model";

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  protected id!: string;
  public address: string = "";
  protected st_num: string = "";
  protected zip_code: string = "";
  protected floor: string = "";
  protected volume: string = "";
  protected fast: boolean = true;

  @Input() public wallID: any;
  @Input() public cellID: any;

  constructor(
    private orderService: OrdersService,
    private socketService: SocketsService
  ) { }

  ngOnInit(): void {
    this.socketService.publish("wall-state", {wallID: this.wallID,cellID: this.cellID,action:'getActiveWalls'});
    this.orderService.getAvailable().subscribe((result) => {
      if(result.length == 0){
        console.warn('There are no available orders in db')
        return;
      }

      // Use timestamp->delivered as time
      let orders = result.map((order)=>{
        order.time = order.timestamp.added;
        return order;
      });

      // Add all orders
      for(let i=0; i<orders.length; i++){
        this.id = orders[i]._id;
        orders[i]._id = orders[i]._id.substr(orders[i]._id.length-4);
        //todo: get the id from the selected order.
        if(orders[i]._id === "2809"){
          this.address = orders[i].address;
          this.st_num = String(orders[i].street_number);
          this.zip_code = String(orders[i].zip_code);
          this.volume = String(orders[i].volume);
          break;
        }
      }
    });
  }

  public delete(): void{
    this.socketService.publish("cell-state", {
      wallID: this.wallID,
      cellID: this.cellID,
      action:'close'})
  }

  public submit(): void{
    let test = new OrderModel();
    const adr = document.getElementById('adr') as HTMLInputElement;
    const st = document.getElementById('st') as HTMLInputElement;
    const zip = document.getElementById('zip') as HTMLInputElement;
    const vol = document.getElementById('vol') as HTMLInputElement;
    test.address = adr.value;
    test._id = this.id;
    test.street_number = Number(st.value);
    test.volume = Number(vol.value);
    test.floor_level = 5;//Number(this.floor);
    test.zip_code = Number(zip.value);
    test.status = "available";
    test.timestamp =  {};
    test.timestamp['added'] = new Date();
    test.time = new Date();
    this.orderService.updateOrder(test).subscribe(response => {console.log(response)});
    this.socketService.publish("cell-state", {wallID: this.wallID,cellID: this.cellID,action:'close'})
  }

  public canSubmit(): Boolean{
    const adr = document.getElementById('adr') as HTMLInputElement | null;
    const st = document.getElementById('st') as HTMLInputElement | null;
    const zip = document.getElementById('zip') as HTMLInputElement | null;
    const vol = document.getElementById('vol') as HTMLInputElement | null;
    if(adr?.value && st?.value && zip?.value && vol?.value && this.floor)
    {
      return true;
    }
    return false;
  }

  public canClear(): Boolean{
    const adr = document.getElementById('adr') as HTMLInputElement | null;
    const st = document.getElementById('st') as HTMLInputElement | null;
    const zip = document.getElementById('zip') as HTMLInputElement | null;
    const vol = document.getElementById('vol') as HTMLInputElement | null;
    if(adr?.value || st?.value || zip?.value || vol?.value || this.floor)
    {
      return true;
    }
    return false;
  }

}
