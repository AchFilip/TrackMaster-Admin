import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {marker} from "leaflet";
import 'leaflet-routing-machine';
import _default from "chart.js/dist/plugins/plugin.tooltip";
import opacity = _default.defaults.animations.opacity;


@Component({
  selector: 'app-live-map',
  templateUrl: './live-map.component.html',
  styleUrls: ['./live-map.component.scss']
})
export class LiveMapComponent implements AfterViewInit {
  //todo: change element 'map' to be dynamically so that we can open multiple maps
  protected imageBasePath = 'assets\\wall\\cell\\widget\\';

  private map!: L.Map;
  private marker!: L.Marker[];
  public spinnerValue: number = 50; //0 to 100
  private lat!: any;
  private lng!: any;

  public closeInfo: boolean = true;
  public closeDriver: boolean = false;
  public coordinates: any;
  constructor() {
  }

  private myLocation(): void {
    // Map initialization
    let map = L.map('map').setView([14.0860746, 100.608406], 6);

    //osm layer
    let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    osm.addTo(map);

    if (!navigator.geolocation) {
      console.log("Your browser doesn't support geolocation feature!")
    } else {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        let accuracy = position.coords.accuracy

        var marker = L.marker([this.lat, this.lng]);
        var circle = L.circle([this.lat, this.lng], {radius: accuracy})

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


  public updateMarker(id: number, lat:number, lng:number, deleteMarker: boolean): void{
    let myMarker = this.marker[id];
    myMarker.setLatLng([lat,lng]);
    if(deleteMarker)
      this.map.removeLayer(this.marker[id]);
  }

  ngAfterViewInit(): void {
    L.Icon.Default.imagePath = "assets\\wall\\cell\\widget\\leaflet\\";
    this.createRoute();
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
