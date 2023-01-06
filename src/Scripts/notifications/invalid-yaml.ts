export class InvalidYamlNotification extends NotificationRequest {
  constructor() {
    super("invalid-json");
    this.title = nova.localize("Invalid YAML string");
    this.body = nova.localize("The selected string is not valid YAML");
  }
}
