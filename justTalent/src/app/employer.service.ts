import { Injectable } from '@angular/core';
import { Employer } from './interfaces/employer';

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

  getEmployerById(id: number): Employer | undefined {
    return this.employerList.find((employer) => employer.employer_id === id);
  }

  constructor() { }
}
