import {Component, Input, OnInit} from '@angular/core';
import {WidgetOptions} from 'src/app/global/models/cell/widget.enum.options';
import {OrderOptions, Statistics} from 'src/app/global/models/cell/orders.enum.options';
import {WidgetContentOptions} from 'src/app/global/models/cell/widget.enum.content.options';

// Content Views
import {CompletedOrdersContentComponent} from './contents/completed-orders-content/completed-orders-content.component';
import {AvailableOrdersContentComponent} from './contents/available-orders-content/available-orders-content.component';
import {OngoingOrdersContentComponent} from "./contents/ongoing-orders-content/ongoing-orders-content.component";
import {
  SingleStatisticsContentComponent
} from "./contents/single-statistics-content/single-statistics-content.component";
import {BasicMenuOptions} from 'src/app/global/models/cell/menu.basic.options';
import {SocketsService} from 'src/app/global/services/sockets/sockets.service';
import {CreateOrderComponent} from "./contents/create-order/create-order.component";
import {StatisicsCompanyComponent} from "./contents/statisics-company/statisics-company.component";

@Component({
  selector: 'Widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  /**
   * Dump data
   * These will be erased, when db is implemented
   */

  protected db_widget_options = [
    'orders', 'live', 'statistics'
  ];

  protected db_order_options = [
    'completed', 'available', 'ongoing', 'add'
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
    // Menu options
    'resize': 'resize.png',
    'move': 'move.png',
    'close': 'close.png',
    // Statistics options
    'single': 'single.png',
    'company': 'company.png'
  }
  @Input() wallID!: number;
  @Input() cellID!: number;

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
    }
  }
  protected WidgetContentOptionsEnum = WidgetContentOptions;
  protected content_component: any;

  constructor(
    private socketService: SocketsService
  ) {
  }

  ngOnInit(): void {
    this.initState(WidgetContentOptions.widget_options, 'widgets')
  }

  /**
   * On click actions
   */
  protected onMenuClicked() {
    if (this.getContentDisplay() == WidgetContentOptions.menu) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  protected onMenuOptionClicked(name: string) {
    if(this.isValidOption(BasicMenuOptions, name)){
      console.log('basic menu option pressed: ', name);
      // this.clickMenuEmitter.emit(name);
      if(name === BasicMenuOptions.close){
        this.socketService.publish("cell-state", {wallID: this.wallID, cellID: this.cellID, action: 'close'});
      }else if(name === BasicMenuOptions.resize){
        this.setContentDisplay(WidgetContentOptions.resize);
        this.addSubpathTitle("resize");
        this.setNavbarIcon("resize");
      }else if(name === BasicMenuOptions.move){
        this.setContentDisplay(WidgetContentOptions.move);
        this.addSubpathTitle("move");
        this.setNavbarIcon("move");
      }
    }
  }

  protected onWidgetOptionClicked(name: string) {
    if (!this.isValidOption(WidgetOptions, name)) {
      console.error('Unkown widget option selected: ', name);
      return
    }

    const pressed = (<any>WidgetOptions)[name];
    this.initState(pressed, name);
  }

  protected onOrderOptionClicked(name: string) {
    if (!this.isValidOption(OrderOptions, name)) {
      console.error('Unkown order option selected: ', name);
      return
    }

    const pressed = (<any>OrderOptions)[name];

    this.initState(pressed, name);
  }

  protected onStatisticsOptionClicked(name: string) {
    if (!this.isValidOption(Statistics, name)) {
      console.error('Unkown statistics option selected: ', name);
      return
    }

    const pressed = (<any>Statistics)[name];

    this.initState(pressed, name);
  }


  /**
   * Manipulate Widget
   */

  // Manipulate Title
  protected addSubpathTitle(name: string) {
    this.widget.navbar.title = this.widget.navbar.title + '>' + name
  }

  protected changeTitle(name: string) {
    this.widget.navbar.title = name;
  }

  // Set Menu icon
  protected setMenuIcon(name: string) {
    this.widget.navbar.menu_icon_path = this.getIconPath(name);
  }

  // Manipulate display's state
  protected setContentDisplay(type: WidgetContentOptions) {
    if (!this.isValidOption(WidgetContentOptions, type)) {
      console.error('Unkown display type: ', type);
      return
    }
    console.info('Widget display set to: ', type)
    this.widget.content.display = type;
  }

  // Get display's state
  protected getContentDisplay(): WidgetContentOptions {
    return (<any>this.widget.content).display
  }

  // Set navbar's icon
  protected setNavbarIcon(name: string) {
    this.widget.navbar.title_icon_path = this.getIconPath(name);
  }

  /**
   * Service functions
   * */
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

  /**
   *  Utils
   */

  // Return's the icon path base on the name given
  protected getIconPath(name: string) {
    let icon: string = this.imagePaths[name];
    if (icon == undefined) {
      console.log('Not such icon for widget title!');
      icon = 'default_widget_title_icon.png'
    }
    return this.imageBasePath + icon;
  }

  // Checks if name is in given enum
  protected isValidOption(EnumToCheck: any, name: string): boolean {
    let res: string = (<any>EnumToCheck)[name];
    if (res == undefined) return false;
    else return true;
  }

  protected setPrevState() {
    this.widget.content.display = this.widget.prev_content.display;
  }

  protected storeCurState(display: string) {
    this.widget.prev_content.display = display;

    // Array of sections in the title
    let sections = this.widget.navbar.title.split('>')

    let last_section = sections.pop();
    this.widget.prev_content.name = last_section !== undefined ? last_section : '';

    this.widget.prev_content.title = sections.join(">");
  }

  protected initPrevState() {
    this.widget.navbar.title = this.widget.prev_content.title;

    const prev_state = this.widget.prev_content.display;
    const prev_name = this.widget.prev_content.name;
    this.initState(prev_state, prev_name);
  }

  // For each new state/view add it's init function here
  protected initState(display: string, name: string) {
    switch (display) {

      /** WIDGET */
      case WidgetContentOptions.widget_options: {
        this.initWidgetOptions(name);
        break;
      }
      case WidgetOptions.orders: {
        this.initOrderOptions(name);
        break;
      }
      case WidgetOptions.live: {
        console.warn('Implement live option')
        break;
      }
      case WidgetOptions.statistics: {
        this.initStatisticsOptions(name);
        break;
      }

      /** ORDERS */
      case WidgetContentOptions.order_options: {
        this.initOrderOptions(name);
        break;
      }
      case OrderOptions.available: {
        this.initAvailable(name);
        break;
      }
      case OrderOptions.completed: {
        this.initCompleted(name);
        break;
      }
      case OrderOptions.ongoing: {
        this.initOngoing(name);
        break;
      }
      case OrderOptions.add: {
        this.initCreateOrder(name);
        break;
      }

      /** STATISTICS */
      case WidgetContentOptions.statistics_options: {
        this.initStatisticsOptions(name);
        break;
      }
      case Statistics.single: {
        this.initStatisticsSingle(name);
        break;
      }
      case Statistics.company: {
        this.initStatisticsCompany(name);
        break;
      }

      default: {
        console.error('Not such state', display);
      }
    }
  }

  /** INIT WIDGET OPTIONS */

  initWidgetOptions(name: string) {
    // Init navbar
    this.widget.navbar.title = name;
    this.setNavbarIcon('widget');
    this.setMenuIcon('snackbar');

    // Init content state
    this.widget.content.display = WidgetContentOptions.widget_options

    // Init content options
    this.widget.content.options = this.getWidgetOptions();
  }

  /** INIT ORDER OPTIONS */

  initOrderOptions(name: string) {
    // Update widget's icon
    this.setNavbarIcon(name)

    // Update widget's title
    this.addSubpathTitle(name)

    // Change widget's content display
    this.setContentDisplay(WidgetContentOptions.order_options);

    // Request for order options
    this.widget.content.options = this.getOrderOptions();
  }

  /** INIT ORDERS */

  initCompleted(name: string) {
    // Update widget's icon
    this.setNavbarIcon(name)

    // Update widget's title
    this.changeTitle(name)

    // Change widget's content display
    this.setContentDisplay(WidgetContentOptions.chosen);

    this.content_component = CompletedOrdersContentComponent;
  }

  initAvailable(name: string) {
    // Request for order options
    this.widget.content.options = this.getOrderOptions();

    // Update widget's icon
    this.setNavbarIcon(name)

    // Update widget's title
    this.changeTitle(name)

    // Change widget's content display
    this.setContentDisplay(WidgetContentOptions.chosen);

    this.content_component = AvailableOrdersContentComponent;
  }

  initOngoing(name: string) {
    // Request for order options
    this.widget.content.options = this.getOrderOptions();

    // Update widget's icon
    this.setNavbarIcon(name)

    // Update widget's title
    this.changeTitle(name)

    // Change widget's content display
    this.setContentDisplay(WidgetContentOptions.chosen);

    this.content_component = OngoingOrdersContentComponent;
  }

  initCreateOrder(name: string) {
    // Request for order options
    this.widget.content.options = this.getOrderOptions();

    // Update widget's icon
    this.setNavbarIcon(name)

    // Update widget's title
    this.changeTitle(name)

    // Change widget's content display
    this.setContentDisplay(WidgetContentOptions.chosen);

    this.content_component = CreateOrderComponent;
  }

  /** INIT STATISTICS OPTIONS */
  initStatisticsOptions(name: string) {
    // Update widget's title
    this.addSubpathTitle(name)

    // Change widget's content display
    this.setContentDisplay(WidgetContentOptions.statistics_options);

    // Request for order options
    this.widget.content.options = this.getStatisticsOptions();
  }

  protected initStatisticsSingle(name: string) {

    // Request for order options
    //this.widget.content.options = this.getStatisticsOptions();

    // Update widget's icon
    this.setNavbarIcon(name)

    // Update widget's title
    this.changeTitle(name)

    // Change widget's content display
    this.setContentDisplay(WidgetContentOptions.chosen);

    this.content_component = SingleStatisticsContentComponent;
  }

  protected initStatisticsCompany(name: string) {
    // Request for order options
    //this.widget.content.options = this.getStatisticsOptions();

    // Update widget's icon
    this.setNavbarIcon(name)

    // Update widget's title
    this.changeTitle(name)

    // Change widget's content display
    this.setContentDisplay(WidgetContentOptions.chosen);

    this.content_component = StatisicsCompanyComponent;

  }

  /** Menu  */
  protected openMenu() {
    // Store previus state
    this.storeCurState(this.widget.content.display);

    // Update menu's icon
    this.setMenuIcon('cross');

    // Update widget's icon
    this.setNavbarIcon('menu');

    // Update widget's title
    this.addSubpathTitle('menu');

    // Request for order options
    this.widget.content.options = this.getMenuOptions(this.getContentDisplay());

    // Change widget's content display
    this.setContentDisplay(WidgetContentOptions.menu);
  }

  protected closeMenu() {
    // Update menu's icon
    this.setMenuIcon('snackbar');

    if (this.widget.prev_content.display === 'chosen') {
      this.widget.content.display = 'chosen';

      var nameComponent = this.widget.navbar.title.substr(0, this.widget.navbar.title.indexOf('>'));
      this.changeTitle(nameComponent);
      this.setNavbarIcon(nameComponent);
    } else {
      this.initPrevState();
    }
  }

}
