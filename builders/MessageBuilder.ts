import { faker } from '@faker-js/faker';
import type { Message, MessageStatus, MessageChannel, Conversation } from '../types';

export class MessageBuilder {
  private data: Message;

  constructor() {
    this.data = {
      guestName: faker.person.fullName(),
      content: faker.lorem.sentence(),
      status: 'inquiry',
      channel: 'direct',
      timestamp: new Date(),
      isUnread: true,
    };
  }

  withGuest(name: string): this {
    this.data.guestName = name;
    return this;
  }

  withContent(content: string): this {
    this.data.content = content;
    return this;
  }

  withStatus(status: MessageStatus): this {
    this.data.status = status;
    return this;
  }

  withChannel(channel: MessageChannel): this {
    this.data.channel = channel;
    return this;
  }

  withTimestamp(date: Date): this {
    this.data.timestamp = date;
    return this;
  }

  daysAgo(days: number): this {
    const date = new Date();
    date.setDate(date.getDate() - days);
    this.data.timestamp = date;
    return this;
  }

  asRead(): this {
    this.data.isUnread = false;
    return this;
  }

  asUnread(): this {
    this.data.isUnread = true;
    return this;
  }

  build() {
    return { ...this.data };
  }

  static inquiry(): Message {
    return new MessageBuilder()
      .withStatus('inquiry')
      .withContent('Hi, I have a question about availability for next month.')
      .build();
  }

  static bookingRequest(): Message {
    return new MessageBuilder()
      .withStatus('booking_request')
      .withContent('I would like to book your property for 5 nights.')
      .build();
  }

  static pastBooking(): Message {
    return new MessageBuilder()
      .withStatus('past_booking')
      .withContent('Thank you for a wonderful stay!')
      .asRead()
      .daysAgo(10)
      .build();
  }

  static upcomingCheckIn(): Message {
    return new MessageBuilder()
      .withStatus('upcoming_check_in')
      .withContent('Looking forward to staying at your property!')
      .daysAgo(1)
      .build();
  }

  static toConversation(message: Message, id?: string): Conversation {
    return {
      id: id ?? faker.string.uuid(),
      guestName: message.guestName,
      lastMessage: message.content,
      status: message.status,
      lastActivityAt: message.timestamp,
      unreadCount: message.isUnread ? 1 : 0,
    };
  }
}
