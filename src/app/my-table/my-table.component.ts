import { Component, ViewChild } from '@angular/core';
import { Data } from '../types/i-data-model';
import { MOCK_DATA } from 'src/app/my-table/mock_data';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { filter } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent {
  displayedColumns: string[] = ['Id', 'Name', 'Occupation', 'Age', 'Email']
  records: Data[] = MOCK_DATA;
  dataSource = new MatTableDataSource(this.records);
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.records);
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}