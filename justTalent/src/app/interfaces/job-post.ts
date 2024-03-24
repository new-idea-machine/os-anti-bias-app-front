export interface JobPost {
  job_post_id: string;
  employer_id: number;
  start_date: Date;
  end_date: Date;
  job_title: string;
  description: string;
  requirements: string;
  salary: number;
  type_of_salary: string;
  country: string;
  city: string;
  type_of_work: string;
  location: string;
  created_at: Date;
  modified_at: Date;
}

// data type above are for testing purpose. It will be modified once a backend API is built.
