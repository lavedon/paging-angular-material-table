import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ DataService, HttpTestingController ]
    });

    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data from the API via GET', () => {
    const mockData = [{ Id: 1, Name: 'John', Occupation: 'Engineer', Age: 30, Email: 'john@test.com' }];

    service.getData(0).subscribe(data => {
      expect(data.length).toBe(1);
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('http://localhost:5000/api/data/0');

    expect(req.request.method).toBe('GET');

    req.flush(mockData);
  });
});
