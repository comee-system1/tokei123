let nenkanRiyouNissuData = [];
module.exports = class ApiResponse {
  constructor() {
  }
  setResponse(res) {
    console.log("apiResponse");
    console.log(res);
    nenkanRiyouNissuData.push(
      {
        code: '10000001',
        jyukyusyasyoBango: '100012358',
        riyosyamei: '東経太郎',
        kana: 'タロウトウケイ',
        syogaisienkubun: 3,
        kaisibi: '',
        syuryobi: '',
        month_1: 10,
        month_2: 14,
        month_3: 16,
        month_4: 18,
        month_5: 16,
        month_6: 19,
        month_7: 8,
        month_8: 12,
        month_9: 17,
        month_10: 20,
        month_11: 19,
        month_12: 2,
        gokei: 171,
        heikin: 14.25,
      }
    );
    return nenkanRiyouNissuData;
  }
}