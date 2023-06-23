import { AfterViewInit, Component, ViewChild, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Data } from 'i-data-model';
import { MatPaginator } from '@angular/material/paginator';
import { catchError, map, Observable, of, switchMap, Subject, EMPTY } from 'rxjs';

@Component({
  selector: 'my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['Id', 'Name', 'Occupation', 'Age', 'Email'];

  constructor(private dataService: DataService) { }

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
  }

}
