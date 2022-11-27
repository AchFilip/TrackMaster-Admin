import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-statistics-content',
  templateUrl: './single-statistics-content.component.html',
  styleUrls: ['./single-statistics-content.component.scss']
})
export class SingleStatisticsContentComponent implements OnInit {

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
      'name','surname','age','phone'
    ];

    // Extract values as rows
    this.orders = [[
      'alexandros the 2nd', 'mimirgkofagos', '45', '12345678912'
      ]
    ];
  }


}
