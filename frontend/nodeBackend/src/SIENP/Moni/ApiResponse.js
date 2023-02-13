let result = [];

module.exports = class ApiResponse {
  constructor() {}
  setResponse(res) {
    result = [];
    if (!res) {
      return result;
    }
    return res.data;
  }
}