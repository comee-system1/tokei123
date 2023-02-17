module.exports = class Repo {
  constructor() {}

  async connectApi(apiRun) {
    // api接続
    return await apiRun.api().then(result => {
      return result;
    });
  }
}