import { Component } from '@angular/core';
import { Data } from '../types/i-data-model'

@Component({
  selector: 'my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent {
  displayedColumns: string[] = ['Name', 'Occupation', 'Age', 'Email']



}

