export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  fullName: string;
}

export interface HostUser extends User {
  accountName: string;
  companyName?: string;
}

export interface GuestUser extends User {
  phone?: string;
  nationality?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  accountName?: string;
}
export interface LastUser extends User {
  location?: string;
}