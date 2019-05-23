export default class Triad {
  component: string = "";
  service: string = "";
  method: string = "";

  constructor(content: string) {
    let splittedContent = content.split(";");
    this.component = splittedContent[0];
    this.service = splittedContent[1];
    this.method = splittedContent[2];
  }
}
