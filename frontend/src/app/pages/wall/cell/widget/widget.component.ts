import { Component, OnInit } from '@angular/core';
import { WidgetOptions } from 'src/app/global/models/cell/widget.enum.options';
import { OrderOptions, Statistics } from 'src/app/global/models/cell/orders.enum.options';
import { WidgetContentOptions } from 'src/app/global/models/cell/widget.enum.content.options';

// Content Views
import { CompletedOrdersContentComponent } from './contents/completed-orders-content/completed-orders-content.component';

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
    'orders','live','statistics'
  ];

  protected db_order_options = [
    'completed','available','ongoing','add'
  ];

  protected db_completed_order_fields = [
    'id','address','St. Num.','zip code','floor level','volume*','time listed'
  ];

  protected db_menu_options = [
    'resize', 'move', 'close'
  ];

  //Statistics
  protected db_statistics_options = [
    'single driver','company'
  ];

  protected orders = [[
      '352.', 'paraskevopoulou kai ioanias', '1276', '71304',
      '1', '398', '25 august 1999, 23:23:23'
    ],[
      '352.', 'paraskevopoulou kai ioanias', '1276', '71304',
      '1', '398', '25 august 1999, 23:23:23'
    ]
  ]

  /** DELETE UNTIL HERE */
  protected imageBasePath = 'assets\\wall\\cell\\widget\\';
  protected imagePaths: {[index: string]: string} ={
    'snackbar': 'snackbar.png',
    'cross': 'cross.png',
    'menu': 'menu.png',

    'widget': 'widgets.png',
    // Widget options
    'orders': 'orders.png',
    'live': 'live.png',
    'statistics': 'statistics.png',
    // Order options
    'completed': 'orders.png',
    'available': 'available.png',
    'ongoing': 'ongoing.png',
    'add': 'add.png',
    // Menu options
    'resize': 'resize.png',
    'move': 'move.png',
    'close': 'close.png',
    // Statistics options
    'single driver': 'single driver.png',
    'company': 'company.png'
  }

  protected widget = {
    'navbar':{
      'title_icon_path': '',
      'title': '',
      'menu_icon_path':'',
    },

    'content':{
      'display':'',
      'options':[''],

      'content_component':CompletedOrdersContentComponent
    }
  }
  protected WidgetContentOptionsEnum = WidgetContentOptions;

  constructor() { }

  ngOnInit(): void {
    // Init navbar
    this.widget.navbar.title = 'widgets';
    this.setNavbarIcon('widget');
    this.setMenuIcon('snackbar');

    // Init content state
    this.widget.content.display = WidgetContentOptions.widget_options
    
    // Init content options
    this.widget.content.options = this.getWidgetOptions();
  }

  

  /**  
   * On click actions
  */
  protected onMenuClicked(){
    if(this.getContentDisplay()==WidgetContentOptions.menu){
      // Update menu's icon 
      this.setMenuIcon('snackbar');

      console.warn('implemet to route back, after exiting the menu')
      // TODO: find previous state and go to it 
    }else{
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
  }

  protected onMenuOptionClicked(name: string){
    console.warn('menu option on click is not implemented yet')
  }

  protected onWidgetOptionClicked(name: string){
    if(!this.isValidOption(WidgetOptions, name)){
      console.error('Unkown widget option selected: ',name);
      return 
    }

    const pressed = (<any>WidgetOptions)[name];

    switch(pressed){
      case WidgetOptions.orders :{

        // Update widget's icon 
        this.setNavbarIcon(name)

        // Update widget's title 
        this.addSubpathTitle(name)

        // Change widget's content display
        this.setContentDisplay(WidgetContentOptions.order_options);

        // Request for order options 
        this.widget.content.options = this.getOrderOptions();
        break;
      }
      case WidgetOptions.statistics:{

        console.log("sadsd");
        // Update widget's title 
        this.addSubpathTitle(name)

        // Change widget's content display
        this.setContentDisplay(WidgetContentOptions.statistics_options);

        // Request for order options 
        this.widget.content.options = this.getStatisticsOptions();

        break;
      }
      default:{
        console.error('Missing widget option a case bro!')
      }
    }
  }

  protected onOrderOptionClicked(name: string){
    if(!this.isValidOption(OrderOptions, name)){
      console.error('Unkown order option selected: ',name);
      return 
    }

    const pressed = (<any>OrderOptions)[name];

    switch(pressed){
      case OrderOptions.completed :{
        
        // Request for order options 
        // this.widget.content.options = this.getOrderOptions();

        // Update widget's title 
        this.addSubpathTitle(name)

        // Change widget's content display
        this.setContentDisplay(WidgetContentOptions.chosen);
        break;
      }
      default:{
        console.error('Missing an order option case bro!')
      }
    }
  }

  protected onStatisticsOptionClicked(name: string){
    if(!this.isValidOption(Statistics, name)){
      console.error('Unkown order option selected: ',name);
      return 
    }

    const pressed = (<any>Statistics)[name];

    switch(pressed){
      case Statistics.test :{
        
        // Request for order options 
        //this.widget.content.options = this.getStatisticsOptions();

        // Update widget's title 
        this.addSubpathTitle(name)

        // Change widget's content display
        this.setContentDisplay(WidgetContentOptions.chosen);
        break;
      }
      default:{
        console.error('Missing an order option case bro!')
      }
    }
  }


  
  /**
   * Manipulate Widget
   */
  
  // Manipulate Title
  protected addSubpathTitle(name: string){
    this.widget.navbar.title = this.widget.navbar.title + '>' + name 
  }

  // Set Menu icon
  protected setMenuIcon(name: string){
    this.widget.navbar.menu_icon_path = this.getIconPath(name);
  }

  // Manipulate display's state 
  protected setContentDisplay(type: WidgetContentOptions){
    if(!this.isValidOption(WidgetContentOptions, type)){
      console.error('Unkown display type: ',type);
      return 
    }
    console.info('Widget display set to: ',type)
    this.widget.content.display=type;
  }

  // Get display's state
  protected getContentDisplay(): WidgetContentOptions{
    return (<any>this.widget.content).display
  }

  // Set navbar's icon
  protected setNavbarIcon(name: string){
    this.widget.navbar.title_icon_path = this.getIconPath(name);
  }

  /**
   * Service functions
   * */ 
   protected getWidgetOptions(): string[]{
    return this.db_widget_options;
  }

  protected getOrderOptions(): string[]{
    return this.db_order_options;
  }

  protected getStatisticsOptions(): string[]{
    return this.db_statistics_options;
  }

  // Get menu options based on state this widget was before 
  protected getMenuOptions(state: WidgetContentOptions){
    return this.db_menu_options;
  }

  /**
   *  Utils
   */

  // Return's the icon path base on the name given
  protected getIconPath(name: string){
    let icon: string = this.imagePaths[name];
    if (icon == undefined){
      console.log('Not such icon for widget title!');
      icon = 'default_widget_title_icon.png'
    }
    return this.imageBasePath + icon;
  }

  // Checks if name is in given enum
  protected isValidOption(EnumToCheck: any, name: string ): boolean{
    let res: string = (<any>EnumToCheck)[name];
    if(res==undefined) return false;
    else return true;
  }
}
