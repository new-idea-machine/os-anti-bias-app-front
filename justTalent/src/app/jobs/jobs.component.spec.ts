import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobsComponent } from './jobs.component';
import { Router } from '@angular/router';
import { EmployerService } from '../services/employer.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JobPost } from '../interfaces/job-post';

class MockEmployerService {
  getAllJobPosts() {
    return of([]);
  }
  filterJobs(filters: any) {
    return of([]);
  }
}

describe('JobsComponent', () => {
  let component: JobsComponent;
  let fixture: ComponentFixture<JobsComponent>;
  let employerService: EmployerService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterLink, FormsModule, JobsComponent], // Import JobsComponent as standalone
      providers: [
        { provide: EmployerService, useClass: MockEmployerService },
        { provide: Router, useValue: { navigate: jest.fn() } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsComponent);
    component = fixture.componentInstance;
    employerService = TestBed.inject(EmployerService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize jobs as an empty array', () => {
    expect(component.jobs).toEqual([]);
  });

  it('should update filters', () => {
    component.filters.country = 'USA';
    component.updateFilters();
    expect(component.filters.country).toBe('USA');
  });

  it('should call getAllJobPosts and update jobs on searchJobs', () => {
    const jobs: JobPost[] = [{
      job_post_id: '3360d95d-a3ae-4acb-ac20-880d5f692854',
      employer_id: employerId,
      start_date: new Date('2023-02-09T12:20:00.000Z'),
      end_date: new Date('2023-02-09T12:20:00.000Z'),
      job_title: "Data Scientist",
      description: "Analyzing and interpreting complex data sets",
      requirements: "Master's degree in Data Science, Python expertise",
      salary: 95000,
      type_of_salary: "Annual",
      country: "Canada",
      city: "Toronto",
      type_of_work: "Remote",
      location: "Anywhere",
      created_at: new Date('2023-02-09T12:20:00.000Z'),
      modified_at: new Date('2023-02-10T16:25:00.000Z'),
    }];
    jest.spyOn(employerService, 'getAllJobPosts').mockReturnValue(of(jobs));

    component.searchJobs();

    expect(employerService.getAllJobPosts).toHaveBeenCalled();
    expect(component.jobs).toEqual(jobs);
  });

  it('should call filterJobs with verified filters and update jobs on filteredSearch', () => {
    component.filters.country = 'USA';
    component.filters.type_of_work = 'Remote';

    const filteredJobs: JobPost[] = [{
      job_post_id: 2,
      employer_id: 1,
      start_date: '2024-02-01',
      end_date: '2024-11-30',
      job_title: 'Job 2',
      description: 'Job 2 Description',
      requirements: 'Requirements',
      salary: 60000,
      type_of_salary: 'Annual',
      country: 'USA',
      city: 'San Francisco',
      type_of_work: 'Remote',
      location: 'Home',
      created_at: '2024-02-01T00:00:00Z',
      modified_at: '2024-02-01T00:00:00Z'
    }];
    jest.spyOn(employerService, 'filterJobs').mockReturnValue(of(filteredJobs));

    component.filteredSearch();

    const expectedFilters = { country: 'USA', type_of_work: 'Remote' };
    expect(employerService.filterJobs).toHaveBeenCalledWith(expectedFilters);
    expect(component.jobs).toEqual(filteredJobs);
  });

  it('should navigate to job details on redirectToJobDetails', () => {
    const jobId = 123;
    component.redirectToJobDetails(jobId);
    expect(router.navigate).toHaveBeenCalledWith(['/job-details', jobId]);
  });
});
