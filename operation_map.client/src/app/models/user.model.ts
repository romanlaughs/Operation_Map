export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  projects?: Project[];
}

export interface Project {
  id?: string;
  name?: string;
  description?: string;
}
