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

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('JobsComponent', () => {
  let component: JobsComponent;
  let fixture: ComponentFixture<JobsComponent>;
  let employerService: EmployerService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobsComponent],
      imports: [CommonModule, RouterLink, FormsModule],
      providers: [
        { provide: EmployerService, useClass: MockEmployerService },
        { provide: Router, useClass: MockRouter }
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
      job_post_id: 1,
      employer_id: 1,
      start_date: '2024-01-01',
      end_date: '2024-12-31',
      job_title: 'Job 1',
      description: 'Job 1 Description',
      requirements: 'Requirements',
      salary: 50000,
      type_of_salary: 'Annual',
      country: 'USA',
      city: 'New York',
      type_of_work: 'Remote',
      location: 'Home',
      created_at: '2024-01-01T00:00:00Z',
      modified_at: '2024-01-01T00:00:00Z'
    }];
    spyOn(employerService, 'getAllJobPosts').and.returnValue(of(jobs));

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
    spyOn(employerService, 'filterJobs').and.returnValue(of(filteredJobs));

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