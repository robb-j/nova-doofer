export class InvalidBase64Notification extends NotificationRequest {
  constructor() {
    super("base64-invalid-decode");
    this.title = nova.localize("Invalid base64 string");
    this.body = nova.localize("The selected string is not base64 encoded");
  }
}
