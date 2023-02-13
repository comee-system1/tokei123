module.exports = class ApiResponse {
  constructor() {}
  setResponse(res) {
    if (!res) {
      return [];
    } else {
      return res.data;
    }
  }
}