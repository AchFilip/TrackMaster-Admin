import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-resize',
  templateUrl: './resize.component.html',
  styleUrls: ['./resize.component.scss']
})
export class ResizeComponent implements OnInit {

  public buttons:any[] = [false,false,false,
    false,true,false,
    false,false,false];
  public arrowFolderPath: string = "assets\\wall\\cell\\widget\\arrows\\";
  @Input() public wallID: any;

  constructor() { }

  ngOnInit(): void {
  }
}
