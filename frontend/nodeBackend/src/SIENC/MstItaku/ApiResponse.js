let result = [];
module.exports = class ApiResponse {
  constructor() {}
  setResponse(res) {
    result = [];
    if (!res) {
      return result;
    }
    res.data.forEach(function (el) {
      result.push({
        id: el.id,
        code: el.code,
        name: el.name,
        ryaku: el.ryaku,
      });
    });
    return result;
  }
}