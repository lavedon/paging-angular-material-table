import { AfterViewInit, Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Data } from 'i-data-model';
import { MatPaginator } from '@angular/material/paginator';
import { catchError, Observable, of, switchMap, startWith } from 'rxjs';

@Component({
  selector: 'my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['Id', 'Name', 'Occupation', 'Age', 'Email'];
  dataSource$!: Observable<Data[]>;

  constructor(private dataService: DataService) { }

  ngAfterViewInit(): void {
    this.paginator.pageIndex = 0;
    this.dataSource$ = this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        return this.dataService.getData(this.paginator.pageIndex + 1);
      }),
      catchError(() => {
        return of([]);
      })
    );

    console.count('About to call next on paginator');
    this.paginator.page.next({});
  }

  ngOnDestroy() {
  }
}

