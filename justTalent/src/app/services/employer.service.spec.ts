import { TestBed } from '@angular/core/testing';
import { EmployerService } from './employer.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Employer } from '../interfaces/employer';

describe('Employer Service', () => {
  let employerService: EmployerService;
  let httpTestingController: HttpTestingController;

  //TestBed.configureTestingModule creates a testing module environment
  //this is an isolated environment from the main application
  //HttpClientTestingModule creates a http request in isolation
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:  [ HttpClientTestingModule ],
      providers: [ EmployerService ],
    });

    employerService = TestBed.inject(EmployerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  //this ensures that HTTP made all expected requests and has no extra requests
  afterEach(() => {
    httpTestingController.verify();
  });

  it('creates service', () => {
    expect(employerService).toBeTruthy();
  });

  describe('getEmployerById', () => {
    it('should return an employer by ID', () => {
      const employerId = 'db0be91c-049a-4a7c-ba45-04a80bb95fdc';
      const expectedEmployer: Employer = {
        employer_id: employerId,
        employer_name: 'Tech Innovators Ltd',
        username: 'tech_innovators',
        password: 'innovate2023',
        description: 'Pioneering technology solutions for the future',
        number_of_employees: 200,
        contact_name: 'Mark Johnson',
        contact_email: 'mark.johnson@techinnovators.com',
        established_date: new Date('2018-07-10'),
        created_at: new Date('2023-02-09T12:20:00.000Z'),
        modified_at: new Date('2023-02-10T16:25:00.000Z'),
      };

      let receivedEmployer: Employer | undefined;

      // Subscribe to the observable returned by getEmployerById
      employerService.getEmployerById(employerId)
        .subscribe((response) => {
          receivedEmployer = response;
      });

      // Mock the HTTP request and provide a mock response
      const req = httpTestingController.expectOne(`http://localhost:3000/api/employers/${employerId}`);
      req.flush(expectedEmployer);

      // Assert that the received employer matches the expected employer
      expect(receivedEmployer).toEqual(expectedEmployer);
    });
  });

});
