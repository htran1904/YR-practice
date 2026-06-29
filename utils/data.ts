import { faker } from '@faker-js/faker';

export const propertyManagerData = {
  'Enter company name': 'Test Company',
  'name@email.com': 'canh.pham01+Mar@your.rentals',
  'Enter reference name': 'canh.pham01',
}
export const createUserFactory = (overrides = {}) => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      ...overrides,
});