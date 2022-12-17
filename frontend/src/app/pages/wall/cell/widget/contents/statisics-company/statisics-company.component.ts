import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js/auto';

@Component({
  selector: 'app-statisics-company',
  templateUrl: './statisics-company.component.html',
  styleUrls: ['./statisics-company.component.scss']
})
export class StatisicsCompanyComponent implements OnInit {

  constructor() { }

  RenderChart(){
    new Chart("orders", {
      type: 'bar',
      data: {
        labels: ['Delivered', 'Not Delivered', 'Ongoing'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  PieChart(){
    new Chart("piechart", {
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

  IncomeChart(){
    new Chart("income", {
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

  ngOnInit(): void {
    this.PieChart();
    this.RenderChart();
    this.IncomeChart();
  }

}
