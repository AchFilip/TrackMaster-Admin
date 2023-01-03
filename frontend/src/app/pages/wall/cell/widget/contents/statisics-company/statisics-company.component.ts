import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js/auto';
import {OrdersService} from "../../../../../../global/services/orders/orders.service";

@Component({
  selector: 'app-statisics-company',
  templateUrl: './statisics-company.component.html',
  styleUrls: ['./statisics-company.component.scss']
})
export class StatisicsCompanyComponent implements OnInit {

  protected delivered: number = 0;
  protected ongoing: number = 0;
  protected available: number = 0;

  constructor(
    private orderService: OrdersService
  ) { }

  RenderChart(){
    new Chart("orders", {
      type: 'bar',
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday'],
        datasets: [{
          label: 'Orders',
          data: [10, 19, 3],
          borderWidth: 1
        }]
      },
      options: {

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
          data: [this.delivered, this.available, this.ongoing],
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
          data: [this.delivered, this.available, this.ongoing],
          borderWidth: 1
        }]
      },
      options: {

      }
    });
  }

  ngOnInit(): void {
    this.orderService.getCompleted().subscribe((result) => {
      if(result.length == 0){
        console.warn('There are no available orders in db')
        return;
      }

      // Use timestamp->delivered as time
      let orders = result.map((order)=>{
        order.time = order.timestamp.delivered;
        return order;
      });
      this.delivered = orders.length;
    });

    this.orderService.getOngoing().subscribe((result) => {
      if(result.length == 0){
        console.warn('There are no available orders in db')
        return;
      }

      // Use timestamp->delivered as time
      let orders = result.map((order)=>{
        order.time = order.timestamp.picked_up;
        return order;
      });
      this.ongoing = orders.length;
    });

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

      this.available = orders.length;
      this.PieChart();
      this.RenderChart();
      this.IncomeChart();
    });

    //todo: add ongoing
  }

}
