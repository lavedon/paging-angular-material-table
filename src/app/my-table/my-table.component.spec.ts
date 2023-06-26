import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { MyTableComponent } from './my-table.component';
import { DataService } from '../data.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';

describe('MyTableComponent', () => {
  let component: MyTableComponent;
  let fixture: ComponentFixture<MyTableComponent>;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTableComponent ],
      imports: [ MatPaginatorModule, BrowserAnimationsModule, MatTableModule ],
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

  it('should have a table', fakeAsync(() => {
    tick();
    const table = fixture.debugElement.nativeElement.querySelector('mat-table');
    expect(table).toBeTruthy();
  }));


  fit('should populate table with data', fakeAsync(() => {
    // Arrange
    const mockData = [{ Id: 1, Name: 'John', Occupation: 'Engineer', Age: 30, Email: 'johntheengineer@testemail.com' }];
    spyOn(dataService, 'getData').and.returnValue(of(mockData));

    // Act
    fixture.detectChanges(); // trigger initial data binding
    tick(); // simulate passage of time until all async activities finish

    fixture.detectChanges(); // trigger data binding again after async activities

    // Assert
    const tableRows = fixture.debugElement.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBeGreaterThan(1); // There should be more than one row: the header row + data rows

    const firstRowColumns = tableRows[1].querySelectorAll('td');
    expect(firstRowColumns[0].textContent).toContain(mockData[0].Id.toString());
    expect(firstRowColumns[1].textContent).toContain(mockData[0].Name);
    expect(firstRowColumns[2].textContent).toContain(mockData[0].Occupation);
    expect(firstRowColumns[3].textContent).toContain(mockData[0].Age.toString());
    expect(firstRowColumns[4].textContent).toContain(mockData[0].Email);
  }));

  it('should have column headers named, Id, Name, Occupation, Age, Email', fakeAsync(() => {
    tick();
    const tableHeaders = fixture.debugElement.nativeElement.querySelectorAll('mat-header-cell');
    debugger;
    expect(tableHeaders[0].textContent.trim()).toContain('Id');
    expect(tableHeaders[1].textContent.trim()).toContain('Name');
    expect(tableHeaders[2].textContent.trim()).toContain('Occupation');
    expect(tableHeaders[3].textContent.trim()).toContain('Age');
    expect(tableHeaders[4].textContent.trim()).toContain('Email');
    }));

});
