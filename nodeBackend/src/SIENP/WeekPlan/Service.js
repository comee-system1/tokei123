const Repo = require('./Repo')
const repo = new Repo();
const ApiResponse = require('./ApiResponse')
const apiResponse = new ApiResponse();
module.exports = class Service {
    constructor() {

    }
    async getData() {
        return await repo.connectApi().then(result => {
            let api = apiResponse.setResponse(result);
            return api;
        });
    }
    // POST
    async postData() {
        return await repo.connectApiPost().then(result => {
            return result;
        });
    }
    // PUT
    async putData() {
        return await repo.connectApiPut().then(result => {
            return result;
        });
    }
    // DELETE
    async deleteData() {
        return await repo.connectApiDelete().then(result => {
            return result;
        });
    }
}