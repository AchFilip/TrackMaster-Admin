import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    let headers = new HttpHeaders({
              'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
              'Pragma': 'no-cache',
              'Expires': '0'
          });
    return this.http
      .get<OrderModel[]>(`${this.hostURl}/api/orders/available`,{headers: headers})
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

  public updateOrder(data: OrderModel): Observable<OrderModel>{
    console.log(this.hostURl + "/api/orders/available/" + data["_id"]);
    return this.http
      .put<OrderModel>(`${this.hostURl}/api/orders/available/${data['_id']}`, data)
      .pipe(map(result => new OrderModel(result)));
  }

  public deleteOrder(id: string):any{
    console.log('delete? '+ `${this.hostURl}/api/orders/${id}`)
    this.http.delete(`${this.hostURl}/api/orders/63c4106e516c6733ba56aee8`).subscribe(res=>console.log(res));
  }
}
