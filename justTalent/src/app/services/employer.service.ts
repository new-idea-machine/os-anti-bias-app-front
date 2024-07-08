import { Injectable } from '@angular/core';
// IMPORT HttpClient from @angular/common/http to make HTTP Requests
import { HttpClient } from '@angular/common/http';
// Observal and subscribe is a set
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employer } from '../interfaces/employer';
import { JobPost } from '../interfaces/job-post';


@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  private apiUrl = 'http://localhost:3000/api';

  protected jobPostList: JobPost[] =[
    {
      job_post_id: 1,
      employer_id: 1,
      start_date: "2023-01-10",
      end_date: '2023-01-31',
      job_title: 'Software Developer',
      description: 'Seeking a skilled software developer for exciting projects',
      requirements: 'Bachelor\'s degree in Computer Science, 3+ years of experience',
      salary: 80000,
      type_of_salary: 'Annual',
      country: 'United States',
      city: 'New York',
      type_of_work: 'Full-time',
      location: 'Office-based',
      created_at: '2023-01-15T10:30:00',
      modified_at: '2023-01-20T14:45:00',
    },
    {
      job_post_id: 2,
      employer_id: 2,
      start_date: '2023-02-05',
      end_date: '2023-02-28',
      job_title: 'Data Scientist',
      description: 'Analyzing and interpreting complex data sets',
      requirements: 'Master\'s degree in Data Science, Python expertise',
      salary: 95000,
      type_of_salary: 'Annual',
      country: 'Canada',
      city: 'Toronto',
      type_of_work: 'Remote',
      location: 'Anywhere',
      created_at: '2023-02-08T12:30:00',
      modified_at: '2023-02-15T09:10:00',
    },
    {
      job_post_id: 3,
      employer_id: 3,
      start_date: '2023-02-12',
      end_date: '2023-03-10',
      job_title: 'UX/UI Designer',
      description: 'Creating intuitive and visually appealing user interfaces',
      requirements: 'Bachelor\'s degree in Design, 4+ years of UX/UI experience',
      salary: 80000,
      type_of_salary: 'Annual',
      country: 'United Kingdom',
      city: 'London',
      type_of_work: 'Full-time',
      location: 'Office-based',
      created_at: '2023-02-15T15:45:00',
      modified_at: '2023-02-18T11:20:00',
    },
    {
      job_post_id: 4,
      employer_id: 2,
      start_date: '2023-03-01',
      end_date: '2023-03-15',
      job_title: 'Network Engineer',
      description: 'Designing and implementing computer networks',
      requirements: 'CCNA certification, 5+ years of networking experience',
      salary: 90000,
      type_of_salary: 'Annual',
      country: 'Australia',
      city: 'Sydney',
      type_of_work: 'Full-time',
      location: 'Office-based',
      created_at: '2023-02-25T09:30:00',
      modified_at: '2023-03-02T14:15:00',
    },
    {
      job_post_id: 5,
      employer_id: 1,
      start_date: '2023-03-10',
      end_date: '2023-04-05',
      job_title: 'Marketing Specialist',
      description: 'Developing and executing marketing strategies',
      requirements: 'Bachelor\'s degree in Marketing, 3+ years of marketing experience',
      salary: 75000,
      type_of_salary: 'Annual',
      country: 'Germany',
      city: 'Berlin',
      type_of_work: 'Remote',
      location: 'Anywhere',
      created_at: '2023-03-05T11:45:00',
      modified_at: '2023-03-08T16:20:00',
    },
    {
      job_post_id: 6,
      employer_id: 1,
      start_date: '2023-03-10',
      end_date: '2023-04-05',
      job_title: 'Marketing Specialist',
      description: 'Developing and executing marketing strategies',
      requirements: 'Bachelor\'s degree in Marketing, 3+ years of marketing experience',
      salary: 75000,
      type_of_salary: 'Annual',
      country: 'Germany',
      city: 'Berlin',
      type_of_work: 'Remote',
      location: 'Anywhere',
      created_at: '2023-03-05T11:45:00',
      modified_at: '2023-03-08T16:20:00',
    },
  ]
  constructor(private http: HttpClient) { }

  getEmployerById(id: string): Observable<Employer> {
    return this.http.get<Employer>(`${this.apiUrl}/employers/${id}`);
  }

  getJobPostsByEmployerId(id: string): Observable<JobPost[]> {
    return this.http.get<JobPost[]>(`${this.apiUrl}/jobPosts/by-employer/${id}`);
  }

  // MOVE TO JOB DETAILS SERVICE LATER?
  getJobPostByJobId(id: string): Observable<JobPost> {
    console.log(this.http.get<JobPost>(`${this.apiUrl}/jobPosts/${id}`));
    return this.http.get<JobPost>(`${this.apiUrl}/jobPosts/${id}`);
  }
  getAllJobPosts(): Observable<JobPost[]> {
    return this.http.get<JobPost[]>(`${this.apiUrl}/jobPosts/`);
}

filterJobs(filters: Partial<JobPost>): Observable<JobPost[]> {
  return this.http.get<JobPost[]>(`${this.apiUrl}/jobPosts/`).pipe(
      map(jobs => jobs.filter(job => 
          (Object.keys(filters) as (keyof JobPost)[]).every(key => 
              filters[key] === undefined || job[key] === filters[key]
          )
      ))
  );
}
    
filterJobs2(filters: Partial<JobPost>, searchString: string): Observable<JobPost[]> {
  return this.http.get<JobPost[]>(`${this.apiUrl}/jobPosts/`).pipe(
      map(jobs => 
        jobs
        .filter(job => job.description.toLowerCase().includes(searchString.toLowerCase()) || job.job_title.toLowerCase().includes(searchString.toLowerCase()) )
        .filter(job => 
          (Object.keys(filters) as (keyof JobPost)[]).every(key => 
              filters[key] === undefined || job[key] === filters[key]
          )
      )
    )
  );
}
    

}
