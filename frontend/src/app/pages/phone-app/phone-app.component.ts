import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-phone-app',
  templateUrl: './phone-app.component.html',
  styleUrls: ['./phone-app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PhoneAppComponent implements OnInit {
  
  public logoPath: string = "/assets/phone-app/Logo.png";

  constructor() { }

  ngOnInit(): void {
  }

}
