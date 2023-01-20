import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";
// import '../../../../../frontend/node_modules/animate.css'
@Component({
  selector: 'app-phone-app',
  templateUrl: './phone-app.component.html',
  styleUrls: ['./phone-app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PhoneAppComponent implements OnInit {

  public logoPath: string = "/assets/phone-app/";

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(()=> {
      this.router.navigate(['/phone-app/login']);
    },3500)
  }

}
