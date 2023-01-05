import { Component, OnInit } from '@angular/core';
import {Chart} from "chart.js/auto";
import {DriversService} from "../../../../../../global/services/drivers/drivers.service";
import {OrderModel} from "../../../../../../global/models/order/order.model";
import {DriverModel} from "../../../../../../global/models/driver/driver.model";

@Component({
  selector: 'app-single-statistics-content',
  templateUrl: './single-statistics-content.component.html',
  styleUrls: ['./single-statistics-content.component.scss']
})

export class SingleStatisticsContentComponent implements OnInit {

  protected driverInfo!: DriverInfos[];
  protected myChart!: Chart;
  protected chartID!: string;
  protected selectedDriver: {
    [index: string]: string} = {
    'name': '',
    'surname': '',
    'age': '',
    'phone': ''
  }
  protected can?: boolean;

  constructor(
    private driversService: DriversService
  ) { }

  ngOnInit(): void {
    this.chartID = "";
    this.driverInfo = [];
    this.getDrivers();
  }

  RenderChart(){
    if(this.myChart != null){
      // @ts-ignore
      this.myChart.destroy()
    }

    this.chartID = String(Math.floor(Math.random() * 1000));
    console.log(this.chartID)
    this.myChart = new Chart("single-stats-1", {
      type: 'bar',
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        datasets: [{
          label: 'Orders',
          data: [12, 19, 3,5,9],
          borderWidth: 1,
          barThickness: 10
        }]
      },
      options: {
        scales:{
          x: {
            beginAtZero: true,
          },
          y:{
            beginAtZero: true
          }
        }
      }
    });
  }

  protected getDrivers(){
    this.driversService.getDrivers().subscribe((result) => {
      if(result.length == 0){
        console.warn('There are no available drivers in db')
        return;
      }

      // Use timestamp->delivered as time
      let drivers = result.map((driver)=>{
        return driver;
      });

      for(let i=0; i<drivers.length; i++){
        this.addDriver(drivers[i])
      }
    });
  }

  protected addDriver(driver: DriverModel){
    let tmp = new DriverInfos;
    tmp.name = driver.name;
    tmp.surname = driver.surname;
    tmp.age = 23;
    tmp.phone = driver.phone
    this.driverInfo.push(tmp)
  }

  SetDriverToShow(index: number){
    this.selectedDriver['name'] = <string>this.driverInfo?.[index].name;
    this.selectedDriver['surname'] = <string>this.driverInfo?.[index].surname;
    // @ts-ignore
    this.selectedDriver['phone'] = this.driverInfo?.[index].phone;
  }

  public getNumberOfSelected(): number{
    return Number(this.selectedDriver['phone']);
  }
}


class DriverInfos{
  public name?: string;
  public surname?: string;
  public age?: number;
  public phone?: number;
}

