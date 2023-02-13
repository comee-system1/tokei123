const apiRun = require('../../api/ApiRun');
const ApiResponse = require('./ApiResponse')
const apiResponse = new ApiResponse();
module.exports = class Repo {
  constructor() {}

  async connectApi() {
    // api接続
    return await apiRun.api().then(result => {
      return result;
    });
  }
  // POST
  async connectApiPost() {
    return await apiRun.apiPost().then(result => {
      return result;
    });
  }
  // PUT
  async connectApiPut() {
    return await apiRun.apiPut().then(result => {
      return result;
    });
  }
  // DELETE
  async connectApiDelete() {
    return await apiRun.apiDelete().then(result => {
      return result;
    });
  }
}