import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';

// Our Components
import { WallComponent } from './pages/wall/wall.component';
import { CellComponent } from './pages/wall/cell/cell.component';
import { PhoneAppComponent } from './pages/phone-app/phone-app.component';
import { OrderDetailsComponent } from './pages/phone-app/orders/order-details/order-details.component';

// Our Libraries
import { MatGridListModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { LoginComponent } from './pages/phone-app/login/login.component';
import { OrdersComponent } from './pages/phone-app/orders/orders.component';
import { WidgetComponent } from './pages/wall/cell/widget/widget.component';
import { CompletedOrdersContentComponent } from './pages/wall/cell/widget/contents/completed-orders-content/completed-orders-content.component';
import { SingleStatisticsContentComponent } from './pages/wall/cell/widget/contents/single-statistics-content/single-statistics-content.component';
import { AvailableOrdersContentComponent } from './pages/wall/cell/widget/contents/available-orders-content/available-orders-content.component';
import { OngoingOrdersContentComponent } from './pages/wall/cell/widget/contents/ongoing-orders-content/ongoing-orders-content.component';
import { ResizeComponent } from './pages/wall/cell/widget/contents/resize/resize.component';
import { MoveComponent } from './pages/wall/cell/widget/contents/move/move.component';
import { LiveMapComponent } from './pages/wall/cell/widget/contents/live-map/live-map.component';
import { CreateOrderComponent } from './pages/wall/cell/widget/contents/create-order/create-order.component';
import { StatisicsCompanyComponent } from './pages/wall/cell/widget/contents/statisics-company/statisics-company.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import { EditOrderComponent } from './pages/wall/cell/widget/contents/edit-order/edit-order.component';



const socketIoConfig: SocketIoConfig = { url: environment.host, options: {} };
@NgModule({
  declarations: [
    AppComponent,
    PhoneAppComponent,
    LoginComponent,
    OrdersComponent,
    WallComponent,
    CellComponent,
    WidgetComponent,
    OrderDetailsComponent,
    CompletedOrdersContentComponent,
    SingleStatisticsContentComponent,
    AvailableOrdersContentComponent,
    OngoingOrdersContentComponent,
    ResizeComponent,
    MoveComponent,
    LiveMapComponent,
    CreateOrderComponent,
    StatisicsCompanyComponent,
    EditOrderComponent
  ],
  imports: [
    SocketIoModule.forRoot(socketIoConfig),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
