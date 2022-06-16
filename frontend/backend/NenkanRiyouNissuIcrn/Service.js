const Repo = require('./Repo')
const repo = new Repo();
const ApiResponse = require('./ApiResponse')
const apiResponse = new ApiResponse();
module.exports = class Service {
    constructor() {
        
    }
    getData(){
        repo.connectApi();
        // let api = apiResponse.setResponse(repoData);
        //return api;
    }
}