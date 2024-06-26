import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/phone-app/login/login.component';
import { OrdersComponent } from './pages/phone-app/orders/orders.component';
import { PhoneAppComponent } from './pages/phone-app/phone-app.component';
import { WallComponent } from './pages/wall/wall.component';
import {LiveMapComponent} from "./pages/wall/cell/widget/contents/live-map/live-map.component";
import {
  StatisicsCompanyComponent
} from "./pages/wall/cell/widget/contents/statisics-company/statisics-company.component";
import { TabletComponent } from './pages/tablet/tablet.component';

const routes: Routes = [
  // { path: 'socket-events', loadChildren: () => import('./pages/socket-events/socket-events.module').then(m => m.SocketEventsModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'phone-app', component: PhoneAppComponent},
  { path: 'phone-app/login', component: LoginComponent},
  { path: 'phone-app/orders', component: OrdersComponent},
  { path: 'wall/:id', component: WallComponent},
  { path: 'tablet', component: TabletComponent},
  { path: 'map', component: LiveMapComponent},
  { path: 'stats', component: StatisicsCompanyComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
