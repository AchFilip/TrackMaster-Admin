import {Component, Input, OnInit} from '@angular/core';
import {MatCheckbox, MatCheckboxBase} from "@angular/material/checkbox";
import {OrdersService} from "../../../../../../global/services/orders/orders.service";
import {ItemModel} from "../../../../../../global/models/items/item.model";
import {OrderModel} from "../../../../../../global/models/order/order.model";
import {WidgetContentOptions} from "../../../../../../global/models/cell/widget.enum.content.options";
import {SocketsService} from "../../../../../../global/services/sockets/sockets.service";

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

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
  }

  public clearAll(): void{
    const adr = document.getElementById('adr') as HTMLInputElement | null;
    adr!.value = "";
    const st = document.getElementById('st') as HTMLInputElement | null;
    st!.value = "";
    const zip = document.getElementById('zip') as HTMLInputElement | null;
    zip!.value = "";
    const vol = document.getElementById('vol') as HTMLInputElement | null;
    vol!.value = "";

    this.floor = "";
    this.fast = false;
  }

  public submit(): void{
    let test = new OrderModel();
    test.address = this.address;
    test.street_number = Number(this.st_num);
    test.volume = Number(this.volume);
    test.floor_level = 1;
    test.zip_code = Number(this.zip_code);
    test.status = "available";
    test.timestamp = "skata";
    test.time = new Date();
    this.orderService.addOrder(test).subscribe(response => {console.log(response)});
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
