const Repo = require('./Repo')
const repo = new Repo();
const ApiResponse = require('./ApiResponse')
const apiResponse = new ApiResponse();
module.exports = class Service {
    constructor() {}
    async getData(apiRun) {
        return await repo.connectApi(apiRun).then(result => {
            let api = apiResponse.setResponse(result);
            return api;
        });
    }
    // POST
    async postData(apiRun) {
        return await repo.connectApiPost(apiRun).then(result => {
            return result;
        });
    }
    // PUT
    async putData(apiRun) {
        return await repo.connectApiPut(apiRun).then(result => {
            return result;
        });
    }
    // DELETE
    async deleteData(apiRun) {
        return await repo.connectApiDelete(apiRun).then(result => {
            return result;
        });
    }
}