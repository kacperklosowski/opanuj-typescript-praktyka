/* Mamy system obsługujący różne typy powiadomień. Każde powiadomienie ma wspólne
pole 'type', ale różne pozostałe pola.

Obecna implementacja używa prostego type guard, który nie wykorzystuje pełni możliwości TypeScriptu.

Twoim zadaniem jest:
  1. Dodaj nowy typ powiadomienia: 'SystemNotification' z polem 'log: string'.
  2. Rozbuduj funkcję getNotificationText tak, aby zwracała odpowiedni tekst dla każdego typu powiadomienia.
  3. Zabezpiecz funkcję getNotificationText przed niewłaściwym typem powiadomienia, zwracając "Unknown notification"
*/

export enum NotificationType {
  Email = 'email',
  SMS = 'sms',
  System = 'system',
}

type EmailNotification = {
  type: NotificationType.Email;
  emailAddress: string;
  content: string;
};

type SMSNotification = {
  type: NotificationType.SMS;
  phoneNumber: number;
  message: string;
};

type SystemNotification = {
  type: NotificationType.System,
  log: string;
};

type Notification = EmailNotification | SMSNotification | SystemNotification;

// ❌ Ta funkcja wymaga poprawy:
export function getNotificationText(notification: Notification): string {
  if (notification.type === NotificationType.Email) {
    return notification.content;
  }

  if (notification.type === NotificationType.SMS) {
    return notification.message;
  }

  if (notification.type === NotificationType.System) {
    return notification.log;
  }

  return 'Unknown notification';
}
