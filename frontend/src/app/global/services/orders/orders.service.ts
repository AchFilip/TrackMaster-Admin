import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';
import { OrderModel } from '../../models/order/order.model';
import {ItemModel} from "../../models/items/item.model";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private hostURl: string;

  constructor(private http: HttpClient) {
    this.hostURl = environment.host;
  }

  public getCompleted(): Observable<OrderModel[]> {
    return this.http
      .get<OrderModel[]>(`${this.hostURl}/api/orders/completed`)
      .pipe(map(result => _.map(result, (t) => new OrderModel(t))));
  }

  public getAvailable(): Observable<OrderModel[]> {
    return this.http
      .get<OrderModel[]>(`${this.hostURl}/api/orders/available`)
      .pipe(map(result => _.map(result, (t) => new OrderModel(t))));
  }

  public getOngoing(): Observable<OrderModel[]> {
    return this.http
      .get<OrderModel[]>(`${this.hostURl}/api/orders/ongoing`)
      .pipe(map(result => _.map(result, (t) => new OrderModel(t))));
  }

  public addOrder(data: OrderModel): Observable<OrderModel>{
    return this.http
      .post<OrderModel>(`${this.hostURl}/api/orders/available`, data)
      .pipe(map(result => new OrderModel(result)));
  }
//   public create(resource: ItemModel): Observable<ItemModel> {
//     return this.http
//       .post<ItemModel>(`${this.hostURl}/api/item-shop`, resource)
//       .pipe(map(result => new ItemModel(result)));
//   }


}
