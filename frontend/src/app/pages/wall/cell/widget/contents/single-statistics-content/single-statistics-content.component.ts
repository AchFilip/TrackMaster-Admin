import { Component, OnInit } from '@angular/core';
import {Chart} from "chart.js/auto";

@Component({
  selector: 'app-single-statistics-content',
  templateUrl: './single-statistics-content.component.html',
  styleUrls: ['./single-statistics-content.component.scss']
})

export class SingleStatisticsContentComponent implements OnInit {

  protected driverInfo?: DriverInfos[];

  protected myLength?: number[];
  protected fields?: string[];
  protected orders?: string[][];

  protected name?: string;
  protected surname?: string;
  protected phone?: number;
  protected can?: boolean;
  constructor() { }

  ngOnInit(): void {
    this.name = "";
    this.surname = "";
    this.phone = 0;

    this.driverInfo = [
      {name: "Achilleas", surname:"Filippidis", age: 23, phone: 6969696969},
      {name: "George", surname:"Keladonakis", age: 23, phone: 696969696}
    ]

    this.myLength = [1,2,3,4,5,6,7,8,9,10,11,12];
    this.getOrders();
  }

  RenderChart(){
    new Chart("single-stats-1", {
      type: 'bar',
      data: {
        labels: ['Monday', 'Tuesday', 'Thursday', 'Wednesday', 'Friday'],
        datasets: [{
          label: 'Orders',
          data: [12, 19, 3,5,9],
          borderWidth: 0.5
        }]
      },
      options: {

      }
    });
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

  SetDriverToShow(index: number){
    this.name = this.driverInfo?.[index].name;
    this.surname = this.driverInfo?.[index].surname;
    this.phone = this.driverInfo?.[index].phone;
  }

}

class DriverInfos{
  public name?: string;
  public surname?: string;
  public age?: number;
  public phone?: number;
}

