import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'Widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {

  protected imageBasePath = 'assets\\wall\\cell\\widget\\';
  protected imagePaths: {[index: string]: string} ={
    'widget': 'widgets.png',
    'menu': 'menu.png'
  }

  protected widget = {
    'title_icon_path': '',
    'title': '',
    'menu_icon_path':''
  }

  constructor() { }

  ngOnInit(): void {
    this.widget.title = 'WIDGETS';
    this.widget.title_icon_path = this.getIconPath('widget');
    this.widget.menu_icon_path = this.getIconPath('menu');
  }

  protected getIconPath(name: string){
    let icon: string = this.imagePaths[name];
    if (icon == undefined){
      console.log('Not such icon for widget title!');
      icon = 'default_widget_title_icon.png'
    }
    return this.imageBasePath + icon;
  }
}
