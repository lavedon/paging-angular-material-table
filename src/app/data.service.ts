import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '../app/types/i-data-model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:5000/api/data/';

  constructor(private http: HttpClient) { }

  getData(page: number): Observable<Data[]> {
    console.count('getData in service was called.');
    console.assert(page !== undefined || page !== null, 'no page parameter was passed');
    console.log('Going to call this API', this.apiUrl + page.toString());
    return this.http.get<Data[]>(this.apiUrl + page.toString());
  }

  getDataByFilter(filter: string): Observable<Data[]> {
    console.count('getDataByFilter in service was called.');
    console.assert(filter !== undefined || filter !== null, 'no filter parameter was passed');
    console.log('Going to call this API', this.apiUrl + filter);
    return this.http.get<Data[]>(this.apiUrl + "search/" + filter);
  }

}
