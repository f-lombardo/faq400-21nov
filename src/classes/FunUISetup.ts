export default class FunUIsetup {
  private confirmationRequired: boolean = false;
  private msg: string = "";
  private msg2: string = "";

  setConfirmationRequired(b: boolean): FunUIsetup {
    this.confirmationRequired = b;
    return this;
  }
  setMsg(msg: string): FunUIsetup {
    this.msg = msg;
    return this;
  }
  setMsg2(msg: string): FunUIsetup {
    this.msg2 = msg;
    return this;
  }

  public isConfirmationRequired(): boolean {
    return this.confirmationRequired;
  }

  public getMsg(): string {
    return this.msg;
  }

  public getMsg2(): string {
    return this.msg2;
  }
}
