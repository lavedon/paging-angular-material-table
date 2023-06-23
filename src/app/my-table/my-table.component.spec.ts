import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyTableComponent } from './my-table.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from '../data.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('MyTableComponent', () => {
  let component: MyTableComponent;
  let fixture: ComponentFixture<MyTableComponent>;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTableComponent ],
      imports: [ MatPaginatorModule ],
      providers: [
        {
          provide: DataService,
          useValue: {
            getData: () => of([{ Id: 1, Name: 'John', Occupation: 'Engineer', Age: 30, Email: 'johntheengineer@testemail.com' }])
          }
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTableComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
