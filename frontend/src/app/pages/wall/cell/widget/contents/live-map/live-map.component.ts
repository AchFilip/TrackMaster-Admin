import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {icon, marker} from "leaflet";
import 'leaflet-routing-machine';
import _default from "chart.js/dist/plugins/plugin.tooltip";
import opacity = _default.defaults.animations.opacity;
import {OrdersService} from "../../../../../../global/services/orders/orders.service";
import {DriversService} from "../../../../../../global/services/drivers/drivers.service";


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

  public infoCard: { [index:string]:number} = {
    'active_drivers': -1,
    'ongoing': -1
  }

  public selectedDriverInfo: { [index:string]: string} = {
    'name': "Achilleas",
    'surname': "Filippidis",
    'phone': "6976271951",
    'total_orders': "10",
    'distance': "10"
  }


  constructor(
    private orderService: OrdersService,
    private driverService: DriversService
  ) {
  }

  private myLocation(): void {
    // Map initialization
    let map = L.map('map',{
      zoomControl: false,
      dragging: false
    }).setView([14.0860746, 100.608406], 6);

    //osm layer
    let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    osm.addTo(map);

    if (!navigator.geolocation) {
      console.log("Your browser doesn't support geolocation feature!")
    } else {
      navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        let accuracy = position.coords.accuracy

        var marker = L.marker([lat, lng]).on('click', (e) => {
          this.closeDriver = false;
          this.closeInfo = true;
        });

        var iconTest = marker.options.icon;
        if(iconTest) {
          iconTest.options.iconSize = [100, 120];
          marker.setIcon(iconTest);
        }


        var circle = L.circle([lat, lng], {radius: accuracy})

        if (marker) {
          map.removeLayer(marker)
        }

        if (circle) {
          map.removeLayer(circle)
        }

        var featureGroup = L.featureGroup([marker]).addTo(map)
        map.fitBounds(featureGroup.getBounds())

        map.setView([position.coords.latitude, position.coords.longitude], 16);
      });
    }
  }

  private createRoute(): void {
    this.map = L.map('map').setView([28.2380, 83.9956], 11);
    let titleLayer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: "OSM"}).addTo(this.map);
    let marker = L.marker([35.340900,25.132150]).addTo(this.map);
    this.marker.push(L.marker([35.340900,25.132150]).addTo(this.map));
    var control = L.Routing.control({
      router: L.Routing.osrmv1({
        serviceUrl: `http://router.project-osrm.org/route/v1/`
      }),
      showAlternatives: false,
      show: false,
      addWaypoints: false,
      waypoints: [
        L.latLng(35.340900,25.132150),
        L.latLng(35.324510,25.133440)
      ]
    }).on('routesfound', function(e){
      console.log(e['routes'][0]['coordinates']);
    });
    control.addTo(this.map);
  }

  private setUpMap(): void{
    // Map initialization
    this.map = L.map('map',{
      zoomControl: false,
      dragging: false
    }).setView([35.34093,25.13219], 16);

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
        var marker = L.marker([35.34093,25.13219]).on('click', (e) => {
          this.closeDriver = false;
          this.closeInfo = true;
        });

        this.marker.push(marker)
      }

      for(let i =0; i <this.marker.length;i++){
      }
      this.marker[0].addTo(this.map);
      this.infoCard['active_drivers'] = drivers.length
    });
  }

  public updateMarker(id: number, lat:number, lng:number, deleteMarker: boolean): void{
    let myMarker = this.marker[id];
    myMarker.setLatLng([lat,lng]);
    if(deleteMarker)
      this.map.removeLayer(this.marker[id]);
  }

  ngAfterViewInit(): void {
    L.Icon.Default.imagePath = "assets\\wall\\cell\\widget\\leaflet\\";

    this.closeInfo = false;
    this.closeDriver = true;

    this.fillInfoCard();
    this.setUpMap();
    this.addDrivers();
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
    } else {
      console.error("Wrong input!");
    }
  }

}
