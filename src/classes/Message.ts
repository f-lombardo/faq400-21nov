import IMessage from "@/interfaces/IMessage";

export default class Message {
  private text: string = "";
  private gravity: string = "";

  constructor(rawMessage: IMessage | null) {
    if (rawMessage != null) {
      this.text = rawMessage.text;
      if (rawMessage.gravity) {
        this.gravity = rawMessage.gravity;
      }
    }
  }

  getText(): string {
    return this.text;
  }

  isInfo(): boolean {
    return "INFO" == this.gravity || "" == this.gravity || null == this.gravity;
  }
  isError(): boolean {
    return "ERROR" == this.gravity;
  }
  isWarning(): boolean {
    return "WARNING" == this.gravity;
  }
}
