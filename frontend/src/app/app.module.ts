import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { ItemShopComponent } from './pages/item-shop/item-shop.component';
import { ItemPreviewComponent } from './pages/item-shop/item-preview/item-preview.component';

// Our Components
import { WallComponent } from './pages/wall/wall.component';
import { CellComponent } from './pages/wall/cell/cell.component';
import { PhoneAppComponent } from './pages/phone-app/phone-app.component';
import { OrderDetailsComponent } from './pages/phone-app/orders/order-details/order-details.component';

// Our Libraries
import { MatGridListModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './pages/phone-app/login/login.component';
import { OrdersComponent } from './pages/phone-app/orders/orders.component';
import { WidgetComponent } from './pages/wall/cell/widget/widget.component';
import { CompletedOrdersContentComponent } from './pages/wall/cell/widget/contents/completed-orders-content/completed-orders-content.component';



const socketIoConfig: SocketIoConfig = { url: environment.host, options: {} };
@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    ItemShopComponent,
    ItemPreviewComponent,
    PhoneAppComponent,
    LoginComponent,
    OrdersComponent,
    WallComponent,
    CellComponent,
    WidgetComponent,
    OrderDetailsComponent
    CompletedOrdersContentComponent
  ],
  imports: [
    SocketIoModule.forRoot(socketIoConfig),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
