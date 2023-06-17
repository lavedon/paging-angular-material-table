import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Data } from 'i-data-model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent {
  dataSource: Data[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData(1).subscribe(data => {
      this.dataSource = data;
    });
  }


}
