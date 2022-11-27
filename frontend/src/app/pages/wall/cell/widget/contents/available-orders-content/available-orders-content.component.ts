import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-available-orders-content',
  templateUrl: './available-orders-content.component.html',
  styleUrls: ['./available-orders-content.component.scss']
})
export class AvailableOrdersContentComponent implements OnInit {

  protected fields?: string[];
  protected orders?: string[][];

  constructor() { }

  ngOnInit(): void {
    this.getOrders();
  }

  protected getOrders(){
    // DB will return [ {}, {}, ... ]
    
    // Extract keys -> fields
    this.fields = [
      'id','address','St. Num.','zip code','floor level','volume*','pick-up time'
    ];

    // Extract values as rows
    this.orders = [[
        '352.', 'paraskevopoulou kai ioanias', '1276', '71304',
        '1', '398', '25 august 1999, 23:23:23'
      ],[
        '352.', 'paraskevopoulou kai ioanias', '1276', '71304',
        '1', '398', '25 august 1999, 23:23:23'
      ]
    ];
  }

}
