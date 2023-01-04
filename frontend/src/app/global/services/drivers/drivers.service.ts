import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';
import {DriverModel} from "../../models/driver/driver.model";

@Injectable({
  providedIn: 'root'
})
export class DriversService {
  private hostURl: string;

  constructor(private http: HttpClient) {
    this.hostURl = environment.host;
  }

  public getDrivers(): Observable<DriverModel[]> {
    return this.http
      .get<DriverModel[]>(`${this.hostURl}/api/drivers`)
      .pipe(map(result => _.map(result, (t) => new DriverModel(t))));
  }

}
