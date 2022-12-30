import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ongoing-orders-content',
  templateUrl: './ongoing-orders-content.component.html',
  styleUrls: ['./ongoing-orders-content.component.scss']
})
export class OngoingOrdersContentComponent implements OnInit {

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
      'id','address','St. Num.','zip code','driver','pick-up time'
    ];

    // Extract values as rows
    this.orders = [[
        '352.', 'andreadaki', '79825', '76123','agapios volanakis', '25 august 1999, 23:23:23'
      ]
    ];
  }

}
