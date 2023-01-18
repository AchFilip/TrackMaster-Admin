import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {Draggable, icon, marker} from "leaflet";
import 'leaflet-routing-machine';
import _default from "chart.js/dist/plugins/plugin.tooltip";
import opacity = _default.defaults.animations.opacity;
import {OrdersService} from "../../../../../../global/services/orders/orders.service";
import {DriversService} from "../../../../../../global/services/drivers/drivers.service";
import {forEach} from "lodash";
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-live-map',
  templateUrl: './live-map.component.html',
  styleUrls: ['./live-map.component.scss']
})
export class LiveMapComponent implements AfterViewInit {
  protected imageBasePath = 'assets\\wall\\cell\\widget\\';

  protected botPath = 'assets\\BotDrivers\\AchilleasToGiorgos.txt';

  private map!: L.Map;
  private marker!: L.Marker[];
  public spinnerValue: number = 100; //0 to 100

  public closeInfo: boolean = false;
  public closeDriver: boolean = false;
  public coordinates: any;
  private locations:any ={};
  private updateInterval:any = null;
  public infoCard: { [index:string]:number} = {
    'active_drivers': -1,
    'ongoing': -1
  }

  public control:any ;
  public test:any = {};
  public driversLocationBenn:any = {};
  public selectedDriverInfo: { [index:string]: string} = {
    'name': "Sample",
    'surname': "Sample",
    'phone': "Sample",
    'total_orders': "Sample",
    'distance': "Sample"
  }

  constructor(
    private orderService: OrdersService,
    private driverService: DriversService,
    private socketService: SocketsService
  ) {
    // Request for location data from driver 1
    this.socketService.publish("cell-state", {
      action:'get-live-locations',
      id: 1});
    // Request for location data from driver 2
    this.socketService.publish("cell-state", {
      action:'get-live-locations',
      id: 2});

    this.socketService.subscribe("get-live-locations", (data: any) => {
      this.locations[data.id] = [];
      this.locations[data.id] = data.locations;
    });

  }

  private createRoute(locationsBeen:any): void {
    let customWaypoints = [];

    for(let i = 0;i < locationsBeen.length;i++){
      customWaypoints.push(L.latLng(locationsBeen[i]['lat'],locationsBeen[i]['lon']))
    }

    let j = L.Routing.plan(
      customWaypoints,
      {
        draggableWaypoints: false,
        addWaypoints: false,
      }
    );

    this.control = L.Routing.control({
      router: L.Routing.osrmv1({
        serviceUrl: `http://router.project-osrm.org/route/v1/`
      }),
      showAlternatives: false,
      show: true,
      addWaypoints: false,
      plan:j
      //waypoints: customWaypoints
    })
    this.control.addTo(this.map);
  }

  private setUpMap(): void{
    // Map initialization
    this.map = L.map('map',{
      zoomControl: false,
      dragging: true
    }).setView([35.333992,25.132460], 14);

    //osm layer
    let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    osm.addTo(this.map);
  }

  private addDrivers(): void{
    this.driverService.getDrivers().subscribe((result) => {
      if(result.length == 0){
        console.warn('There are no available drivers in db')
        return;
      }

      // Use timestamp->delivered as time
      let drivers = result.map((order)=>{

        return order;
      });

      this.marker = [];
      for(let i=0; i<drivers.length;i++){

        var marker = L.marker( [35.34093,25.13219],{
          draggable: false
        }).on('click', (e) => {

          this.selectedDriverInfo['name'] = this.test[i].name
          this.selectedDriverInfo['surname'] = this.test[i].surname
          this.selectedDriverInfo['phone'] = this.test[i].phone
          this.selectedDriverInfo['total_orders'] = this.test[i].total_orders
          this.selectedDriverInfo['distance'] = this.test[i].distance

          this.closeDriver = false;
          this.closeInfo = true;
          //this.createRoute(this.driversLocationBenn[i])
          this.updateInterval = setInterval(() => {
            this.map.setView(this.marker[i].getLatLng(), 16);
          },1000)
        });

        this.test[i] = {};
        this.test[i].name = drivers[i].name
        this.test[i].surname = drivers[i].surname
        this.test[i].phone = drivers[i].phone
        this.test[i].total_orders = drivers[i].ongoing_orders + drivers[i].delivered_orders + drivers[i].canceled_orders
        this.test[i].distance = 555;

        this.marker.push(marker)
        this.marker[i].options.title = String(i);
      }

      for(let i =0; i <this.marker.length;i++){
        this.marker[i].addTo(this.map);
      }
      this.infoCard['active_drivers'] = drivers.length
    });
  }

  public updateMarker(id: number, lat:number, lng:number, deleteMarker: boolean): void{
    let myMarker = this.marker[id];
    myMarker.setLatLng([lat,lng]);
    if(deleteMarker)
      this.map.removeLayer(this.marker[id]);
  }

  public driverCoroutine(id: number){
    (async () => {
      await this.delay(500)
      let driver = this.locations[id]
      for(let i = 0; i < driver.length;i++){
        let localPos = driver[i];
        this.updateMarker(id-1,localPos['lat'],localPos['lon'],false)
        this.driversLocationBenn[id-1].push({'lat': localPos['lat'],'lon': localPos['lon']})
        await this.delay(1000);
      }
    })();
  }

  public delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  ngAfterViewInit(): void {
    L.Icon.Default.imagePath = "assets\\wall\\cell\\widget\\leaflet\\";

    this.closeInfo = false;
    this.closeDriver = true;

    this.fillInfoCard();
    this.setUpMap();
    this.addDrivers();

    // this.createRoute();
    (async () => {
      await this.delay(2000)
      for(let i = 0; i < this.infoCard['active_drivers']; i++){
        this.driverCoroutine(i+1);
        this.driversLocationBenn[i] = [];
      }
    })();
  }

  public fillInfoCard(): void{
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

      this.infoCard['ongoing'] = orders.length;
      let drivers: string[] = [];
      for(let i=0; i<orders.length;i++){
        if(drivers.includes(orders[i].driver) === false){
          drivers.push(orders[i].driver);
        }
      }
    });
  }

  public closeCard(card: string): void {
    if (card === "info") {
      this.closeInfo = true;
    } else if (card === "driver") {
      this.closeDriver = true;
      this.map.setView([35.333992,25.132460], 14);
      //this.map.removeControl(this.control)
      clearInterval(this.updateInterval)
    }
  }
}
