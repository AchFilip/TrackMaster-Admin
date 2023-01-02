import { Component, OnInit } from '@angular/core';
import {MatCheckbox, MatCheckboxBase} from "@angular/material/checkbox";

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  public address: string = "assdasd";
  protected st_num!: string;
  protected zip_code!: string;
  protected floor!: string;
  protected volume!: string;
  protected fast: boolean = true;
  constructor() { }

  ngOnInit(): void {
    this.st_num= "999";
    this.zip_code= "999";
    this.volume = "999";
    this.floor = "Ground Floor";
  }

  public clearAll(): void{
    const adr = document.getElementById('adr') as HTMLInputElement | null;
    adr!.value = "";
    const st = document.getElementById('st') as HTMLInputElement | null;
    st!.value = "";
    const zip = document.getElementById('zip') as HTMLInputElement | null;
    zip!.value = "";
    const vol = document.getElementById('vol') as HTMLInputElement | null;
    vol!.value = "";

    this.floor = "";
    this.fast = false;
  }

  public submit(): void{
    const input = document.getElementById('adr') as HTMLInputElement | null;
    //input?.value = '';
    console.log(input?.value)
  }
}
