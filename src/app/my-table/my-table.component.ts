import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Data } from '../types/i-data-model';
import { DataResponse } from '../types/i-data-response';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataService } from '../data.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'occupation', 'age', 'email']
  dataSource = new MatTableDataSource<Data>();
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  private currentFilter: string = '';

  constructor(private dataService: DataService) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.paginator.page.subscribe(() =>
      this.loadPage()
    );

    this.loadPage();  
  }

  loadPage() {
    this.dataService.getData(this.paginator.pageIndex, this.paginator.pageSize).subscribe(response => {
        console.log(response);
        this.dataSource.data = response.data;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.length = response.totalCount;
        }
    });
}


    applyFilter(filterValue: string) {
    this.currentFilter = filterValue;
    this.dataService.getDataByFilter(filterValue, this.paginator.pageIndex, this.paginator.pageSize).subscribe(response => 
    {
        this.dataSource.data = response.data;
        if (this.dataSource.paginator)
          this.dataSource.paginator.length = response.totalCount;
    });
}

sortData(sort: Sort) {
  const sortDirection = sort.direction || 'asc';
  if (this.currentFilter) {
    this.dataService.getDataByFilter(this.currentFilter, this.paginator.pageIndex, this.paginator.pageSize, sort.active, sortDirection).subscribe(response => {
      this.dataSource.data = response.data;
      if (this.dataSource.paginator) {
          this.dataSource.paginator.length = response.totalCount;
      }
    });
  } else {
    this.dataService.getData(this.paginator.pageIndex, this.paginator.pageSize, sort.active, sortDirection).subscribe(response => {
      this.dataSource.data = response.data;
      if (this.dataSource.paginator) {
          this.dataSource.paginator.length = response.totalCount;
      }
    });
  }
}

 
}