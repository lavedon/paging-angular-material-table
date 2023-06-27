import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Data } from '../types/i-data-model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataService } from '../data.service';

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
    this.dataService.getData(this.paginator.pageIndex, this.paginator.pageSize).subscribe(response => 
      {
        console.log(response);
        
        this.dataSource.data = response;
      })
  }

  applyFilter(filterValue: string) {
    this.dataService.getDataByFilter(filterValue).subscribe(response => 
      {
        console.log(response);
        this.dataSource.data = response;
      })
  }
}