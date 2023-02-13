//@ts-check
const Service = require('../../COMMON/TantokaigiKanryo/Service')
const service = new Service();
const ApiRun = require('../ApiRun');
const apiRun = new ApiRun();

/************
 * DELETE
 ***********/
exports.deleted = async function (query) {
    apiRun.setQuery(query);
    let url = apiRun.getDomain() + '/common/tantokaigi/v1/kanryo?' + apiRun.getQuery();
    apiRun.setURL(url);
    apiRun.setUniqID(query.uniqid);
    apiRun.setTraceID(query.traceid);
    return await service.deleteData(apiRun)
        .then(result => {
            return result.data;
        });
}