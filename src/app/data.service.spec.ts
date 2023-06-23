import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ DataService ]
    });

    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
    console.log('httpMock: ', httpMock);
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
    httpMock.verify();
  });
  it('should fetch multiple records from the API via GET', () => {
    const mockData = [{ Id: 1, Name: 'John', Occupation: 'Engineer', Age: 30, Email: 'john@test.com' },
    { Id: 2, Name: 'Paul', Occupation: 'Doctor', Age: 49, Email: 'paul@test.com' }];

    service.getData(0).subscribe(data => {
      expect(data.length).toBe(2);
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('http://localhost:5000/api/data/0');

    expect(req.request.method).toBe('GET');

    req.flush(mockData);
    httpMock.verify();
  });

  it('should handle errors', () => {
    const mockError = new ErrorEvent('Network error');

    service.getData(0).subscribe({
      next: data => fail('should have failed with the network error'),
      error: error => expect(error.error).toBe(mockError),
      complete: () => console.log('completed')
    });

      const req = httpMock.expectOne('http://localhost:5000/api/data/0');

      expect(req.request.method).toBe('GET');

      req.error(mockError);
  });
});
