import axios from "axios";

export default class Dashboard {
  protected async doGet(path: string): Promise<any> {
    return new Promise(function(resolve, reject) {
      axios
        .get(path)
        .then(res => {
          // eslint-disable-next-line
          console.log(res);
          resolve(res.data);
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log(error);
          reject(error);
        });
    });
  }
}
