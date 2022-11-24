import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  protected avOrders?: string[][];
  protected chosenOrders?: string[][];

  public avOrdersToggle!: boolean[];
  constructor() { }

  ngOnInit(): void {
    this.getOrders();
  }

  protected getOrders() {
    // Extract values as rows
    this.avOrders = [
      ['352.', 'paraskevopoulou kai ioanias', '1', '398'],
      ['500.', 'Arxagelou 2', '1', '398'],
      ['501.', 'Ti mas les', '1', '398']
    ];

    this.avOrdersToggle = [
      false,
      false,
      false
    ];
  }


  public Test(i: number) {
    if (this.avOrdersToggle[i] === false) {
      console.log("I am not selected " + i);
      this.avOrdersToggle[i] = true;
    }else if(this.avOrdersToggle[i]){
      console.log("I am selected! " + i);
      this.avOrdersToggle[i] = false;
    }
  }
}
