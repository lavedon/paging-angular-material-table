import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '../app/types/i-data-model';
import { DataResponse } from './types/i-data-response';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:5000/api/data';

  constructor(private http: HttpClient) { }

  getData(pageIndex: number, pageSize: number): Observable<DataResponse> {
    return this.http.get<DataResponse>(`${this.apiUrl}/${pageIndex}/${pageSize}`);
  }

  getDataByFilter(filter: string, pageIndex: number, pageSize: number): Observable<DataResponse> {
    return this.http.get<DataResponse>(`${this.apiUrl}/search/${filter}/${pageIndex}/${pageSize}`);
  }

}
