import { Component, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Data } from 'i-data-model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';


@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent {
  dataSource: MatTableDataSource<Data>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData(1).subscribe(data => {
    this.dataSource = new MatTableDataSource<Data>();
    this.loadPage();
    });
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.loadPage())
      )
      .subscribe();
  }

  private loadPage() {
    this.dataService.fetchData(this.paginator.pageIndex, this.paginator.pageSize)
      .subscribe(data => {
        this.dataSource.data = data;
      });
  }


}
