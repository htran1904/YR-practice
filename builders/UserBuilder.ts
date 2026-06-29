import { faker } from '@faker-js/faker';
import { aliasEmail } from '../utils/fakeData';
import type { HostUser, GuestUser, LoginCredentials } from '../types';

export class UserBuilder {
  private data: HostUser;

  constructor() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    this.data = {
      email: aliasEmail('test'),
      password: 'Test@1234',
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      accountName: 'Canh Company',
    };
  }

  withEmailTag(tag: string): this {
    this.data.email = aliasEmail(tag);
    return this;
  }

  withPassword(password: string): this {
    this.data.password = password;
    return this;
  }

  withName(firstName: string, lastName: string): this {
    this.data.firstName = firstName;
    this.data.lastName = lastName;
    this.data.fullName = `${firstName} ${lastName}`;
    return this;
  }

  withAccountName(accountName: string): this {
    this.data.accountName = accountName;
    return this;
  }

  withCompany(companyName: string): this {
    this.data.companyName = companyName;
    return this;
  }

  asCredentials(): LoginCredentials {
    return {
      email: this.data.email,
      password: this.data.password,
      accountName: this.data.accountName,
    };
  }

  build(): HostUser {
    return { ...this.data };
  }

  // Pre-built credential sets for known test accounts
  static defaultHost(): LoginCredentials {
    return {
      email: 'canh.pham01@your.rentals',
      password: 'Canh1997',
      accountName: 'Canh Company',
    };
  }

  static guest(): GuestUser {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
      email: aliasEmail('guest'),
      password: 'Guest@1234',
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      phone: faker.phone.number(),
      nationality: faker.location.countryCode(),
    };
  }
}
