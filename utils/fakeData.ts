import { faker } from '@faker-js/faker';
import type { NotificationType, MessageStatus } from '../types';

// Unique alias email from a fixed base — e.g. canh.pham01+smoke_1234@your.rentals
export const aliasEmail = (tag: string, base = 'canh.pham01', domain = 'your.rentals'): string =>
  `${base}+${tag}_${Date.now()}@${domain}`;

// Traceable message body — identifiable in DB/logs by test name + timestamp
export const traceableMessage = (testName: string): string => {
  const tag = testName.toUpperCase().replace(/\s+/g, '_');
  return `[AUTO_${tag}_${Date.now()}]`;
};

export const randomStatus = (): MessageStatus => {
  const statuses: MessageStatus[] = [
    'inquiry',
    'booking_request',
    'upcoming_check_in',
    'currently_staying',
    'past_booking',
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

export const randomNotificationType = (): NotificationType => {
  const types: NotificationType[] = [
    'new_message',
    'booking_request',
    'booking_confirmed',
    'booking_expired',
    'inquiry',
    'review',
  ];
  return types[Math.floor(Math.random() * types.length)];
};

export const fakePastDate = (daysAgo: number): Date => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d;
};

export const fakeFutureDate = (daysFromNow: number): Date => {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d;
};

export const fakeGuestName = (): string => faker.person.fullName();

export const fakePropertyName = (): string =>
  `${faker.location.city()} ${faker.helpers.arrayElement(['Villa', 'Apartment', 'Studio', 'Cottage'])}`;
