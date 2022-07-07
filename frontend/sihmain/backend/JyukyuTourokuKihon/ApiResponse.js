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
          'jyukyu_inf':
          [
            {
                kai:2,
                jyukyuid: 1,
                rysid: 55000,
                jkbn: 1,
                shichoson: 1,
                shichosonno: '000001',
                shichosonname: '東経市',
                kofuymd: '20220801',
                jyukyuno: '1234567890',
                jidoid: 0,
                jidopno1: '',
                jidopno2: '',
                jidoadd: '',
                ssyu1: 1,
                ssyu2: 0,
                ssyu3: 1,
                ssyu4: 0,
                zantei: 0,
                dcod: 0,
                jyukyuname: '',
            },
            {
              kai:1,
              jyukyuid: 1,
              rysid: 55000,
              jkbn: 1,
              shichoson: 1,
              shichosonno: '000001',
              shichosonname: '東経市',
              kofuymd: '20220401',
              jyukyuno: '1234567890',
              jidoid: 1,
              jidopno1: '',
              jidopno2: '',
              jidoadd: '',
              ssyu1: 1,
              ssyu2: 0,
              ssyu3: 1,
              ssyu4: 0,
              zantei: 0,
              dcod: '01',
              jyukyuname: '東経　父',
            },
          ]
        }          
      )

      console.log(result);
      let returns = {
        result: result,
      };
      return returns;

    }
  }
}