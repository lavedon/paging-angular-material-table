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
  dataSource$: Observable<Data[]> = EMPTY;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  private destroy$ = new Subject<void>();

  constructor(private dataService: DataService) { }

  ngAfterViewInit(): void {
    if (this.paginator) {
    this.dataSource$ = this.paginator.page.pipe(
      switchMap((pageIndex) => this.loadData(pageIndex.pageIndex))
    );
    this.loadData(0).subscribe(data => this.dataSource$ = of(data));
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadData(pageIndex: number): Observable<Data[]> {
    return this.dataService.getData(pageIndex)
      .pipe(
        map((data) => {
          return data;
        }),
        catchError(() => of([])) // In case of error, return an empty array
      );
  }
}
