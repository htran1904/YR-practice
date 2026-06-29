export type MessageStatus =
  | 'inquiry'
  | 'booking_request'
  | 'upcoming_check_in'
  | 'currently_staying'
  | 'past_booking'
  | 'cancelled';

export type MessageChannel = 'direct' | 'airbnb' | 'booking.com' | 'vrbo';

export interface Message {
  id?: string;
  guestName: string;
  content: string;
  status: MessageStatus;
  channel: MessageChannel;
  timestamp: Date;
  isUnread: boolean;
}

export interface Conversation {
  id: string;
  guestName: string;
  lastMessage: string;
  status: MessageStatus;
  lastActivityAt: Date;
  unreadCount: number;
}
