export default class RestService {
  private HOST = "http://172.16.2.119:8096";

  getServiceURL(basePath: string, method: string): string {
    return this.HOST + basePath + method;
  }

  callRest(url: string, params: object): string {
    console.log("REST: " + url + " - par: " + params);
    return "{TODO json}";
  }
}
