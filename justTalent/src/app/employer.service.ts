import { Injectable } from '@angular/core';
import { Employer } from './interfaces/employer';
import { JobPost } from './interfaces/job-post';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  protected employerList: Employer[] = [
    {
      employer_id: 1,
      employer_name: 'ABC Company',
      username: 'abc_company',
      password: 'password123',
      description: 'A leading company in the industry',
      number_of_employees: 100,
      contact_name: 'John Doe',
      contact_email: 'john.doe@abccompany.com',
      established_date: '2020-01-01',
      created_at: '2023-01-01T12:00:00',
      modified_at: '2023-01-02T08:30:00',
    },
    {
      employer_id: 2,
      employer_name: 'XYZ Corporation',
      username: 'xyz_corp',
      password: 'securepassword456',
      description: 'Innovative solutions for a changing world',
      number_of_employees: 500,
      contact_name: 'Jane Smith',
      contact_email: 'jane.smith@xyzcorp.com',
      established_date: '2015-03-20',
      created_at: '2023-02-01T09:15:00',
      modified_at: '2023-02-05T11:20:00',
    },
    {
      employer_id: 3,
      employer_name: 'Tech Innovators Ltd',
      username: 'tech_innovators',
      password: 'innovate2023',
      description: 'Pioneering technology solutions for the future',
      number_of_employees: 200,
      contact_name: 'Mark Johnson',
      contact_email: 'mark.johnson@techinnovators.com',
      established_date: '2018-07-10',
      created_at: '2023-02-10T14:00:00',
      modified_at: '2023-02-12T16:45:00',
    },
  ]

  protected jobPostList: JobPost[] =[
    {
      job_post_id: 1,
      employer_id: 1,
      start_date: '2023-01-10',
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
  ]

  getEmployerById(id: number): Employer | undefined {
    return this.employerList.find((employer) => employer.employer_id === id);
  }

  getJobPostsByEmployerId(id: number): JobPost[] | undefined {
    return this.jobPostList.filter(jobPost => jobPost.employer_id === id);
  }

  constructor() { }
}
