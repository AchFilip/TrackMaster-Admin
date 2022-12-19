import { Component, OnInit } from '@angular/core';
import {Chart} from "chart.js/auto";

@Component({
  selector: 'app-single-statistics-content',
  templateUrl: './single-statistics-content.component.html',
  styleUrls: ['./single-statistics-content.component.scss']
})
export class SingleStatisticsContentComponent implements OnInit {

  protected myLength?: number[];
  protected fields?: string[];
  protected orders?: string[][];

  constructor() { }

  ngOnInit(): void {
    this.myLength = [1,2,3,4,5,6,7,8,9,10,11,12];
    this.getOrders();
    this.PieChart();
    this.RenderChart();
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

  PieChart(){
    new Chart("single-stats-2", {
      type: 'doughnut',
      data: {
        labels: ['Delivered', 'Not Delivered', 'Ongoing'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3],
          borderWidth: 1
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


}
