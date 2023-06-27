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

  getData(pageIndex: number, pageSize: number, sortColumn?: string, sortDirection: 'asc' | 'desc' = 'asc'): Observable<DataResponse> {
    let requestUrl = `${this.apiUrl}/${pageIndex}/${pageSize}`;
    if(sortColumn) {
      requestUrl += `?sortColumn=${sortColumn}&sortDirection=${sortDirection}`;
    }
    return this.http.get<DataResponse>(requestUrl);
  }

  getDataByFilter(filter: string, pageIndex: number, pageSize: number, sortColumn?: string, sortDirection: 'asc' | 'desc' = 'asc'): Observable<DataResponse> {
    let requestUrl = `${this.apiUrl}/search/${pageIndex}/${pageSize}?searchTerm=${filter}`;
    if(sortColumn) {
      requestUrl += `&sortColumn=${sortColumn}&sortDirection=${sortDirection}`;
    }
    return this.http.get<DataResponse>(requestUrl);
  }
}
