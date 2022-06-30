const config = require('../api/ApiRun');
const ApiResponse = require('./ApiResponse')
const apiResponse = new ApiResponse();
module.exports = class Repo {
  constructor() {
  }

  async connectApi() {
    // api接続
    return await config.api().then(result => {
      return result;
    });
  }
}
