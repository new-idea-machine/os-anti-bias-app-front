// import { TestBed } from '@angular/core/testing';
// import { EmployerService } from './employer.service';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { Employer } from '../interfaces/employer';
// import { JobPost } from '../interfaces/job-post';

// describe('Employer Service', () => {
//   let employerService: EmployerService;
//   let httpTestingController: HttpTestingController;

//   //TestBed.configureTestingModule creates a testing module environment
//   //this is an isolated environment from the main application
//   //HttpClientTestingModule creates a http request in isolation
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports:  [ HttpClientTestingModule ],
//       providers: [ EmployerService ],
//     });

//     employerService = TestBed.inject(EmployerService);
//     httpTestingController = TestBed.inject(HttpTestingController);
//   });

//   //this ensures that HTTP made all expected requests and has no extra requests
//   afterEach(() => {
//     httpTestingController.verify();
//   });

//   it('creates service', () => {
//     expect(employerService).toBeTruthy();
//   });

//   //TESTS
//   describe('getEmployerById', () => {
//     //test for getEmployerById
//     it('should return an employer by ID', () => {
//       const employerId = 'db0be91c-049a-4a7c-ba45-04a80bb95fdc';
//       const expectedEmployer: Employer = {
//         employer_id: employerId,
//         employer_name: 'Tech Innovators Ltd',
//         username: 'tech_innovators',
//         password: 'innovate2023',
//         description: 'Pioneering technology solutions for the future',
//         number_of_employees: 200,
//         contact_name: 'Mark Johnson',
//         contact_email: 'mark.johnson@techinnovators.com',
//         established_date: new Date('2018-07-10'),
//         created_at: new Date('2023-02-09T12:20:00.000Z'),
//         modified_at: new Date('2023-02-10T16:25:00.000Z'),
//       };

//       let receivedEmployer: Employer | undefined;

//       // Subscribe to the observable returned by getEmployerById
//       employerService.getEmployerById(employerId)
//         .subscribe((response) => {
//           receivedEmployer = response;
//       });

//       // Mock the HTTP request and provide a mock response
//       const req = httpTestingController.expectOne(`http://localhost:3000/api/employers/${employerId}`);
//       req.flush(expectedEmployer);

//       // Assert that the received employer matches the expected employer
//       expect(receivedEmployer).toEqual(expectedEmployer);
//     });





//   });

//   //test for getJobPostsByEmployerId
//   describe('getJobPostsByEmployerId', () => {
//     it('should return job postings of the specified employer', () =>{
//       const employerId = 'db0be91c-049a-4a7c-ba45-04a80bb95fdc';
//       const expectedJobPosts: JobPost[] = [
//         {
//           job_post_id: '9d3de8ed-9755-4139-8b65-557ed0d75ceb',
//           employer_id: employerId,
//           start_date: new Date('2023-02-09T12:20:00.000Z'),
//           end_date: new Date('2023-02-09T12:20:00.000Z'),
//           job_title: "Software Developer",
//           description: "Seeking a skilled software developer for exciting projects",
//           requirements: "Bachelor's degree in Computer Science, 3+ years of experience",
//           salary: 80000,
//           type_of_salary: "Annual",
//           country: "United States",
//           city: "New York",
//           type_of_work: "Full-time",
//           location: "Office-based",
//           created_at: new Date('2023-02-09T12:20:00.000Z'),
//           modified_at: new Date('2023-02-10T16:25:00.000Z'),
//         },
//         {
//           job_post_id: '3360d95d-a3ae-4acb-ac20-880d5f692854',
//           employer_id: employerId,
//           start_date: new Date('2023-02-09T12:20:00.000Z'),
//           end_date: new Date('2023-02-09T12:20:00.000Z'),
//           job_title: "Data Scientist",
//           description: "Analyzing and interpreting complex data sets",
//           requirements: "Master's degree in Data Science, Python expertise",
//           salary: 95000,
//           type_of_salary: "Annual",
//           country: "Canada",
//           city: "Toronto",
//           type_of_work: "Remote",
//           location: "Anywhere",
//           created_at: new Date('2023-02-09T12:20:00.000Z'),
//           modified_at: new Date('2023-02-10T16:25:00.000Z'),
//         },
//         {
//           job_post_id: '7163adc3-b532-41c5-bec5-bf180dc8e9a5',
//           employer_id: employerId,
//           start_date: new Date('2023-02-09T12:20:00.000Z'),
//           end_date: new Date('2023-02-09T12:20:00.000Z'),
//           job_title: "UX/UI Designer",
//           description: "Creating intuitive and visually appealing user interfaces",
//           requirements: "Bachelor's degree in Design, 4+ years of UX/UI experience",
//           salary: 80000,
//           type_of_salary: "Annual",
//           country: "United Kingdom",
//           city: "London",
//           type_of_work: "Full-time",
//           location: "Office-based",
//           created_at: new Date('2023-02-09T12:20:00.000Z'),
//           modified_at: new Date('2023-02-10T16:25:00.000Z'),
//         },

//       ];

//       let receivedJobPosts: JobPost[] | undefined;

//       employerService.getJobPostsByEmployerId(employerId)
//         .subscribe((response) => {
//           receivedJobPosts = response;
//         });

//       const req = httpTestingController.expectOne(`http://localhost:3000/api/jobPosts/by-employer/${employerId}`);
//       req.flush(expectedJobPosts);

//       expect(receivedJobPosts).toEqual(expectedJobPosts);


//     });
//   });

//   //test for getJobPostByJobId
//   describe('getJobPostByJobId', () => {
//     it('should return a job posting by ID', () => {
//       const jobPostId = '9d3de8ed-9755-4139-8b65-557ed0d75ceb';
//       const expectedJobPost: JobPost =  {
//         job_post_id: jobPostId,
//         employer_id: 'db0be91c-049a-4a7c-ba45-04a80bb95fdc',
//         start_date: new Date('2023-02-09T12:20:00.000Z'),
//         end_date: new Date('2023-02-09T12:20:00.000Z'),
//         job_title: "Software Developer",
//         description: "Seeking a skilled software developer for exciting projects",
//         requirements: "Bachelor's degree in Computer Science, 3+ years of experience",
//         salary: 80000,
//         type_of_salary: "Annual",
//         country: "United States",
//         city: "New York",
//         type_of_work: "Full-time",
//         location: "Office-based",
//         created_at: new Date('2023-02-09T12:20:00.000Z'),
//         modified_at: new Date('2023-02-10T16:25:00.000Z'),
//       }

//       let receivedJobPost: JobPost | undefined;

//       employerService.getJobPostByJobId(jobPostId)
//         .subscribe((response) => {
//           receivedJobPost = response;
//         });

//       const req = httpTestingController.expectOne(`http://localhost:3000/api/jobPosts/${jobPostId}`);
//       req.flush(expectedJobPost);

//       expect(receivedJobPost).toEqual(expectedJobPost);



//     });
//   });


// });
