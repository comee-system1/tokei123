let result = [];
module.exports = class ApiResponse {
  constructor() {}
  setResponse(res) {
    result = [];
    if (!res) {
      return result;
    }
    let index = 0;
    res.data.kbn.forEach(function (el) {

      result.push({
        kbn: el,
        title_list1: res.data.title_list1[index],
        title_list2: res.data.title_list2[index],
        kaisu_list: res.data.kaisu_list[index],
        ninzu_list: res.data.ninzu_list[index],
      });
      index++;
    });
    return result;
  }
}