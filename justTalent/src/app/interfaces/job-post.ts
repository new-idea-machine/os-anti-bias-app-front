export interface JobPost {
  job_post_id: number;
  employer_id: number;
  start_date: string;
  end_date: string;
  job_title: string;
  description: string;
  requirements: string;
  salary: number;
  type_of_salary: string;
  country: string;
  city: string;
  type_of_work: string;
  location: string;
  created_at: string;
  modified_at: string;
}

// data type above are for testing purpose. It will be modified once a backend API is built.
