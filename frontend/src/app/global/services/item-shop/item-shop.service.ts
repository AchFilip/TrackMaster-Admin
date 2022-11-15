import { Injectable } from '@angular/core';
import { ItemModel } from '../../models/items/item.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private hostURl: string;

  constructor(private http: HttpClient) {
    this.hostURl = environment.host;
    // remove comment to delete all items
    // this.deleteAll();
  }

  public initializeItems(): Observable<ItemModel[]>{
    return this.http
      .get<ItemModel[]>(`${this.hostURl}/api/item-shop/initialize`)
      .pipe(map(result => _.map(result, (t) => new ItemModel(t))));
  }
  public getAll(): Observable<ItemModel[]> {
    return this.http
      .get<ItemModel[]>(`${this.hostURl}/api/item-shop`)
      .pipe(map(result => _.map(result, (t) => new ItemModel(t))));
  }
  public create(resource: ItemModel): Observable<ItemModel> {
    return this.http
      .post<ItemModel>(`${this.hostURl}/api/item-shop`, resource)
      .pipe(map(result => new ItemModel(result)));
  }
  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.hostURl}/api/item-shop/${id}`);
  }


  // Debug function for deleting all items
  private deleteAll() {
    this.getAll().subscribe((data: ItemModel[]) => {
      data.forEach((item: ItemModel) => {
        this.delete((item as any)._id).subscribe((data: any) => { });
      });
    });
  }

}
