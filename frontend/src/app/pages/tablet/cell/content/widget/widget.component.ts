import { Component, Input, OnInit } from '@angular/core';
import { OrderOptions, Statistics } from 'src/app/global/models/cell/orders.enum.options';
import { WidgetContentOptions } from 'src/app/global/models/cell/widget.enum.content.options';
import { WidgetOptions } from 'src/app/global/models/cell/widget.enum.options';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'Tablet-Widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class TabletWidgetComponent implements OnInit {
  @Input() self?: any;
  constructor(
    private socketService: SocketsService
  ) { }
  protected db_widget_options = [
    'orders', 'live', 'statistics'
  ];

  protected db_order_options = [
    'completed', 'available', 'ongoing', 'add', 'edit'
  ];

  protected db_completed_order_fields = [
    'id', 'address', 'St. Num.', 'zip code', 'floor level', 'volume*', 'time listed'
  ];

  protected db_menu_options = [
    'resize', 'move', 'close'
  ];

  //Statistics
  protected db_statistics_options = [
    'single', 'company'
  ];

   /** DELETE UNTIL HERE */
   protected imageBasePath = 'assets\\wall\\cell\\widget\\';
   protected imagePaths: { [index: string]: string } = {
     'snackbar': 'snackbar.png',
     'cross': 'cross.png',
     'menu': 'menu.png',
 
     'widget': 'widgets.png',
     // Widget options
     'orders': 'completed.png',
     'live': 'live.png',
     'statistics': 'statistics.png',
     // Order options
     'completed': 'completed.png',
     'available': 'available.png',
     'ongoing': 'ongoing.png',
     'add': 'add.png',
     'edit': 'edit.png',
     // Menu options
     'resize': 'resize.png',
     'move': 'move.png',
     'close': 'close.png',
     // Statistics options
     'single': 'single.png',
     'company': 'company.png'
   }

   protected widget = {
    'navbar': {
      'title_icon_path': '',
      'title': '',
      'menu_icon_path': '',
    },

    'content': {
      'display': '',
      'options': ['']
    },

    'prev_content': {
      'display': '',
      'title': '',
      'name': ''
    },

    chosen_option: ''
  }

  protected WidgetContentOptionsEnum = WidgetContentOptions;
  
  ngOnInit(): void {
    // this.initState(this.initStateOn.display, this.initStateOn.name)
    this.initState(WidgetContentOptions.widget_options, 'widgets');
  }

  protected initState(display: string, name: string) {
    switch (display) {

      /** WIDGET */
      case WidgetContentOptions.widget_options: {
        this.initWidgetOptions(name);
        break;
      }
      case WidgetOptions.orders: {
        // this.initOrderOptions(name);
        break;
      }
      case WidgetOptions.live: {
        // this.initLiveMap(name);
        break;
      }
      case WidgetOptions.statistics: {
        // this.initStatisticsOptions(name);
        break;
      }

      /** ORDERS */
      case WidgetContentOptions.order_options: {
        // this.initOrderOptions(name);
        break;
      }
      case OrderOptions.available: {
        // this.initAvailable(name);
        break;
      }
      case OrderOptions.completed: {
        // this.initCompleted(name);
        break;
      }
      case OrderOptions.ongoing: {
        // this.initOngoing(name);
        break;
      }
      case OrderOptions.add: {
        // this.initCreateOrder(name);
        break;
      }
      case OrderOptions.edit: {
        // this.initEditOrder(name);
        break;
      }

      /** STATISTICS */
      case WidgetContentOptions.statistics_options: {
        // this.initStatisticsOptions(name);
        break;
      }
      case Statistics.single: {
        // this.initStatisticsSingle(name);
        break;
      }
      case Statistics.company: {
        // this.initStatisticsCompany(name);
        break;
      }

      default: {
        console.error('Not such state', display);
      }
    }

    this.socketService.publish("cell-state", {
      wallID: this.self.wall,
      cellID: this.self.id,
      action:'open-from-table', 
      state: { 
        display: 'widget_options', 
        name: 'widgets'
      }})
  }

  protected onWidgetOptionClicked(name: string) {
    if (!this.isValidOption(WidgetOptions, name)) {
      console.error('Unkown widget option selected: ', name);
      return
    }

    const pressed = (<any>WidgetOptions)[name];
    this.initState(pressed, name);
  }

  // Checks if name is in given enum
  protected isValidOption(EnumToCheck: any, name: string): boolean {
    let res: string = (<any>EnumToCheck)[name];
    if (res == undefined) return false;
    else return true;
  }

   // Return's the icon path base on the name given
   protected getIconPath(name: string) {
    let icon: string = this.imagePaths[name];
    if (icon == undefined) {
      console.log('Not such icon for widget title!');
      icon = 'default_widget_title_icon.png'
    }
    return this.imageBasePath + icon;
  }

  initWidgetOptions(name: string) {
    // Init navbar
    this.widget.navbar.title = name;
    // this.setNavbarIcon('widget');
    // this.setMenuIcon('snackbar');

    // Init content state
    this.widget.content.display = WidgetContentOptions.widget_options

    // Init content options
    this.widget.content.options = this.getWidgetOptions();
  }



  protected getWidgetOptions(): string[] {
    return this.db_widget_options;
  }

  protected getOrderOptions(): string[] {
    return this.db_order_options;
  }

  protected getStatisticsOptions(): string[] {
    return this.db_statistics_options;
  }

  // Get menu options based on state this widget was before
  protected getMenuOptions(state: WidgetContentOptions) {
    return this.db_menu_options;
  }

}
