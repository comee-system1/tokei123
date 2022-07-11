let result = [];
module.exports = class ApiResponse {
  constructor() {
  }
  setResponse(res) {
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