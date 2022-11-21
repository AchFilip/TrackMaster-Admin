import { Component, OnInit } from '@angular/core';
import { List } from 'lodash';

@Component({
  selector: 'Widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {

  protected imageBasePath = 'assets\\wall\\cell\\widget\\';
  protected imagePaths: {[index: string]: string} ={
    'widget': 'widgets.png',
    'menu': 'menu.png',
    'orders': 'orders.png',
    'live': 'live.png',
    'statistics': 'statistics.png'
  }

  protected widget = {
    'title_icon_path': '',
    'title': '',
    'menu_icon_path':''
  }

  protected widget_options?: string[];

  constructor() { }

  ngOnInit(): void {
    this.widget.title = 'WIDGETS';
    this.widget.title_icon_path = this.getIconPath('widget');
    this.widget.menu_icon_path = this.getIconPath('menu');

    // This is supposed to come from db
    // Remember that the title must be the same 
    // with the name of the icon
    this.widget_options = [
      'orders','live','statistics'
    ]
  }

  protected getIconPath(name: string){
    let icon: string = this.imagePaths[name];
    if (icon == undefined){
      console.log('Not such icon for widget title!');
      icon = 'default_widget_title_icon.png'
    }
    return this.imageBasePath + icon;
  }

  protected onWidgetOptionClicked(name: string){
    console.log(name)
  }
}
