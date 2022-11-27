import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  protected avOrders!: string[][];
  protected chosenOrders!: string[][];

  public avOrdersToggle!: boolean[];
  public chosenOrdersToggle!: boolean[];

  @Input() inAvailable!: boolean;
  @Output("GetChosenOrdersLength") selectedEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    this.inAvailable = true;
    this.getOrders();
  }

  protected getOrders() {
    // Extract values as rows
    this.avOrders = [
      ['352.', 'paraskevopoulou kai ioanias', '1', '398'],
      ['500.', 'Arxagelou 2', '1', '398'],
      ['501.', 'Ti mas les', '1', '398']
    ];

    this.chosenOrders = [
    ];

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
