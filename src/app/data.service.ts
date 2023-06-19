import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from 'i-data-model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:5000/api/data/';

  constructor(private http: HttpClient) { }

  getData(page: number): Observable<Data[]> {
    return this.http.get<Data[]>(this.apiUrl + page);
  }
}
