import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-live-map',
  templateUrl: './live-map.component.html',
  styleUrls: ['./live-map.component.scss']
})
export class LiveMapComponent implements AfterViewInit {
  //todo: change element 'map' to be dynamically so that we can open multiple maps
  protected imageBasePath = 'assets\\wall\\cell\\widget\\';

  private map!: L.Map;
  private name!:string;
  private surname!:string;

  public closeInfo: boolean = true;
  public closeDriver: boolean = false;

  private initMap(): void {
    this.map = L.map('map').setView([35.34257, 25.13422], 13);

    // Add a tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Use the locate function to get the user's current location and display it on the map
    this.map.locate({ setView: true, maxZoom: 16 });
  }
  constructor() { }


  ngAfterViewInit(): void {
    this.initMap();
  }

  public closeCard(card: string): void{
    if(card === "info"){
      this.closeInfo = true;
    }else if(card === "driver"){
      this.closeDriver = true;
    }else{
      console.error("Wrong input!");
    }
  }

}
