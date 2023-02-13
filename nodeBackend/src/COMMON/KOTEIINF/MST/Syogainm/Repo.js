module.exports = class Repo {
    constructor() { }

    async connectApi(apiRun) {
        // api接続
        return await apiRun.api().then(result => {
            return result;
        });
    }
    // POST
    async connectApiPost(apiRun) {
        return await apiRun.apiPost().then(result => {
            return result;
        });
    }
    // PUT
    async connectApiPut(apiRun) {
        return await apiRun.apiPut().then(result => {
            return result;
        });
    }
    // DELETE
    async connectApiDelete(apiRun) {
        return await apiRun.apiDelete().then(result => {
            return result;
        });
    }
}