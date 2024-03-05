export interface User {
  user_id: string;
  first_name?: string;
  last_name?: string;
  email: string;
  username: string;
  password: string;
  country?: string;
  city?: string;
  resume?: string;
  formatted_resume?: string;
  created_at: Date;
  modified_at: Date;
  token: string;
}
