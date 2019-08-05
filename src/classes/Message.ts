import IMessage from "@/interfaces/IMessage";

export default class Message {
  private text: string = "";
  private type: string = "";

  constructor(rawMessage: IMessage | null) {
    if (rawMessage != null) {
      this.text = rawMessage.text;
      this.type = rawMessage.type;
    }
  }

  getText(): string {
    return this.text;
  }

  isInfo(): boolean {
    return "INFO" == this.type || "" == this.type || null == this.type;
  }
  isError(): boolean {
    return "ERROR" == this.type;
  }
  isWarning(): boolean {
    return "WARNING" == this.type;
  }
}
