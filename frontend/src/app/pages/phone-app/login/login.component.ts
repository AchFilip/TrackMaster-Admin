import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  logoPath: string = "/assets/phone-app/Logo.png";
  passCode: string = "INSERT THE SPECIAL CODE";

  constructor() { }


  btnClick(): void {
    console.log("Relocate to another URL");
  };

  ngOnInit(): void {
  }

}
