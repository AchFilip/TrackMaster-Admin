import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {OrdersComponent} from "../orders/orders.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  logoPath: string = "/assets/phone-app/Logo.png";
  passCode: string = "INSERT THE SPECIAL CODE";
  test:string = "";


  constructor(private router: Router) { }


  btnClick(): void {
    const loginValue = document.getElementById('login') as HTMLInputElement | null;
    if(loginValue != null){
      if(loginValue.value === "VOLANAKIS123"){
        this.router.navigate(['/phone-app/orders']);
      }
    }
  };

  ngOnInit(): void {
  }

}
