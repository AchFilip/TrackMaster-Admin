import { Component, Input, OnInit } from '@angular/core';
import { throwIfEmpty, timeout } from 'rxjs';
import { OrderOptions, Statistics } from 'src/app/global/models/cell/orders.enum.options';
import { WidgetContentOptions } from 'src/app/global/models/cell/widget.enum.content.options';
import { WidgetOptions } from 'src/app/global/models/cell/widget.enum.options';
import { OrderModel } from 'src/app/global/models/order/order.model';
import { OrdersService } from 'src/app/global/services/orders/orders.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'Tablet-Widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class TabletWidgetComponent implements OnInit {
  @Input() self?: any;
  constructor(
    private orderService: OrdersService,
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

  protected db_live_menu_options = [
    'resize', 'move', 'close', 'staff', 'focus'
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
     'company': 'company.png',
     'staff': 'company.png',
     'focus': 'single.png'

   }

   protected widget = {
    'navbar': {
      'title_icon_path': '',
      'title': '',
      'menu_icon_path': '',
      'active': false,
      'open':false,
      'options': ['']
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

      if(this.self.state === 'completed'){
        this.initState('completed','completed')
      }if(this.self.state === 'live'){
        this.initState('live','live')
      }else{
        this.initState(WidgetContentOptions.widget_options, 'widget');
        console.log(this.widget.content.display)
      }

  }

  protected initState(display: string, name: string) {
    console.log(display, name, this.widget.content.display)
    switch (display) {

      /** WIDGET */
      case WidgetContentOptions.widget_options: {
        if(this.widget.content.display==='order_completed') break;

        this.initWidgetOptions(name);
        break;
      }
      case WidgetOptions.orders: {
        this.initOrderOptions(name);
        break;
      }
      case WidgetOptions.live: {
        this.initLiveMap(name);
        console.log(WidgetOptions.live,name)
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
        this.initCompleted(name);
        break;
      }
      case OrderOptions.ongoing: {
        // this.initOngoing(name);
        break;
      }
      case OrderOptions.add: {
        this.initCreateOrder(name);
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
        display: display,
        name: name
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

  protected onOrderOptionClicked(name: string) {
    if (!this.isValidOption(OrderOptions, name)) {
      console.error('Unkown order option selected: ', name);
      return
    }

    const pressed = (<any>OrderOptions)[name];
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

  initMenu() {
    this.widget.navbar.active = true;
    this.widget.navbar.options = this.getMenuOptions();
  }

  initLiveMenu() {
    this.widget.navbar.active = true;
    this.widget.navbar.options = this.db_live_menu_options;
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

  /** INIT ORDER OPTIONS */

  initOrderOptions(name: string) {
    // Update widget's icon
    // this.setNavbarIcon(name)

    // Update widget's title
    // this.addSubpathTitle(name)

    // Change widget's content display
    this.setContentDisplay(WidgetContentOptions.order_options);

    // Request for order options
    this.widget.content.options = this.getOrderOptions();
  }

  initLiveMap(name: string) {
    // Change widget's content display
    this.setContentDisplay(WidgetContentOptions.chosen_live_map);

    this.initLiveMenu();
  }

  initCreateOrder(name: string) {
    // Request for order options
    this.widget.content.options = this.getOrderOptions();

    // Update widget's icon
    // this.setNavbarIcon(name)

    // Update widget's title
    // this.changeTitle(name)

    // Change widget's content display
    this.setContentDisplay(WidgetContentOptions.create);

    // Store chosen option
    this.widget.chosen_option = OrderOptions.add;
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

  /** INIT ORDERS */

  initCompleted(name: string) {
    // Update widget's icon
    // this.setNavbarIcon(name)

    // Update widget's title
    // this.changeTitle(name)

    // Change widget's content display
    this.setContentDisplay(WidgetContentOptions.order_completed);

    // Store chosen option
    // this.widget.chosen_option = OrderOptions.completed;

    // this.content_component = CompletedOrdersContentComponent;
    this.initMenu();
  }

  // Get menu options based on state this widget was before
  protected getMenuOptions() {
    return this.db_menu_options;
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


  // ===============================
  //         CREATE ORDER
  // ===============================
  public address: string = "";
  protected st_num: string = "";
  protected zip_code: string = "";
  protected volume: string = "";
  protected floor: string = "";
  protected fast: boolean = false;

  // WHYYYYYY IT DOES NOT CHANGE THE FIRST TIME ????
  public checkboxClicked(): void {
    this.fast = !this.fast;
    this.onInput()
  }

  public updateWallWidget(order: any): void {
    this.socketService.publish("tablet-state", {
      wallID: this.self.wall,
      cellID: this.self.id,
      action:'update-order-text',
      order: order})
  }

  public onInput(): void {
    const adr = document.getElementById('adr') as HTMLInputElement | null;
    const st = document.getElementById('st') as HTMLInputElement | null;
    const zip = document.getElementById('zip') as HTMLInputElement | null;
    const vol = document.getElementById('vol') as HTMLInputElement | null;
    const fast = document.getElementById('delivery') as HTMLInputElement | null;

    let order ={
      address: adr?.value,
      street: st?.value,
      zip: zip?.value,
      volume: vol?.value,
      fast: this.fast,
      floor: this.floor
    }

    this.updateWallWidget(order)
  }

  public canSubmit(): Boolean{
    const adr = document.getElementById('adr') as HTMLInputElement | null;
    const st = document.getElementById('st') as HTMLInputElement | null;
    const zip = document.getElementById('zip') as HTMLInputElement | null;
    const vol = document.getElementById('vol') as HTMLInputElement | null;
    if(adr?.value && st?.value && zip?.value && vol?.value && this.floor)
    {
      return true;
    }
    return false;
  }

  public canClear(): Boolean{
    const adr = document.getElementById('adr') as HTMLInputElement | null;
    const st = document.getElementById('st') as HTMLInputElement | null;
    const zip = document.getElementById('zip') as HTMLInputElement | null;
    const vol = document.getElementById('vol') as HTMLInputElement | null;
    const fast = document.getElementById('delivery') as HTMLInputElement | null;

    if(adr?.value || st?.value || zip?.value || vol?.value || this.floor || this.fast)
    {
      return true;
    }
    return false;
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

    let order ={
      address: "",
      street: "",
      zip: "",
      volume: "",
      fast: "",
      floor: false
    }

    this.updateWallWidget(order)
  }

  public submit(): void{
    let test = new OrderModel();
    const adr = document.getElementById('adr') as HTMLInputElement;
    const st = document.getElementById('st') as HTMLInputElement;
    const zip = document.getElementById('zip') as HTMLInputElement;
    const vol = document.getElementById('vol') as HTMLInputElement;
    test.address = adr.value;
    test.street_number = Number(st.value);
    test.volume = Number(vol.value);
    test.floor_level = 5;//Number(this.floor);
    test.zip_code = Number(zip.value);
    test.status = "available";
    test.timestamp =  {};
    test.timestamp['added'] = new Date();
    test.time = new Date();
    // this.orderService.addOrder(test).subscribe(response => {console.log(response)});
    // this.socketService.publish("cell-state", {wallID: this.wallID,cellID: this.cellID,action:'close'})

    this.socketService.publish("tablet-state", {
      wallID: this.self.wall,
      cellID: this.self.id,
      action:'submit-order'})

    setTimeout(() => {
      this.socketService.publish("tablet-state", {
        wallID: this.self.wall,
        action:'get-wall'});
    }, 100);
  }

  protected toggleMenu(): void {
    this.widget.navbar.open = !this.widget.navbar.open;
  }

  protected onMenuOption(option: string):void{
    if(option == "close"){
      console.log("close")
      this.socketService.publish("cell-state", {
        wallID: String(this.self.wall),
        cellID: this.self.id,
        action:'close'})
    }else if(option === "focus"){
      console.log("focus to driver")
      this.widget.content.display = WidgetContentOptions.focus_driver;
      this.widget.navbar.active = false;
    }else if(option === 'backFromFocus'){
      console.log("back from focus");
    }
  }
}
