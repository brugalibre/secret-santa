export class AlertSendNotificationDto {
  constructor(title: string, msg: string, receivers: string[]) {}

  title: string;
  msg: string;
  receivers: string[];
}
