let result = [];
module.exports = class ApiResponse {
  constructor() {
  }
  setResponse(res) {
    result = [];
    if(!res){
      return result;
    } 
    res.data.forEach(function(element){
      result.push({
        syokbnid: element.syokbnid,
        jyukyuid: element.jyukyuid,
        ntsymd: element.ntsymd,
        nteymd: element.nteymd,
        syogaikbn: element.syogaikbn,
        tkkyu: element.tkkyu,
        rysid: element.rysid,
        jkbn: element.jkbn,
      }
      );
    });
    return result;

    if(!res){
      return [];
    }else{

      result = [];
    
      result.push(
        {
          status: 'idle',
          skryoh4_inf:
          [
            {
              syokbnid: 1,
              jyukyuid: 1,
              ntsymd: '20220801',
              nteymd: '99991231',
              syogaikbn: 3,
              tkkyu: 1,
              rysid: 55000,
              jkbn: 0,
            },
            {
              syokbnid: 2,
              jyukyuid: 1,
              ntsymd: '20220401',
              nteymd: '20220731',
              syogaikbn: 2,
              tkkyu: 1,
              rysid: 55000,
              jkbn: 0,
            }
          ]
        }          
      )

      let returns = {
        result: result,
      };
      return returns;

    }
  }
}