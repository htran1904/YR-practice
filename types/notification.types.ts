export type NotificationType =
  | 'new_message'
  | 'booking_request'
  | 'booking_confirmed'
  | 'booking_cancelled'
  | 'booking_expired'
  | 'inquiry'
  | 'review';

export type NotificationStatus = 'unread' | 'read';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  status: NotificationStatus;
  createdAt: Date;
  linkUrl?: string;
  guestName?: string;
  propertyName?: string;
}

export interface NotificationFilter {
  status?: NotificationStatus;
  type?: NotificationType;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface NotificationBadge {
  count: number;
  hasUnread: boolean;
  displayText: string;
}
