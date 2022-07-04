const Repo = require('./Repo')
const repo = new Repo();
const ApiResponse = require('./ApiResponse')
const apiResponse = new ApiResponse();
module.exports = class Service {
    constructor() {

    }
    async getData(isSeikyugaku) {

        return await repo.connectApi().then(result => {
            let api = apiResponse.setResponse(result,isSeikyugaku);
            return api;
        });
    }
}