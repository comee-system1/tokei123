let riyo_inf = [];
let nengetu_inf = {};
let gokei_inf = {};
let kaisyo_inf = {};
module.exports = class ApiResponse {
  constructor() {}
  setResponse(res) {
    // console.log("apiResponse");
    // console.log(res.data);
    riyo_inf = [];
    nengetu_inf = {};
    gokei_inf = {};
    kaisyo_inf = {};
    riyo_inf = res.data.riyo_inf;


    // 利用日数計
    for (let i = 1; i <= 12; i++) {
      let key = "keinissu" + i;
      gokei_inf[key] = res.data[key];
    }
    gokei_inf['keinissukei'] = res.data.keinissukei;
    gokei_inf['keitukisu'] = res.data.keitukisu;
    gokei_inf['keiavg'] = res.data.keiavg;

    for (let i = 1; i <= 12; i++) {
      let key = "kainissu" + i;
      kaisyo_inf[key] = res.data[key];
    }
    kaisyo_inf['kainissukei'] = res.data.kainissukei;
    kaisyo_inf['kaitukisu'] = res.data.kaitukisu;
    kaisyo_inf['kaiavg'] = res.data.kaiavg;

    let returns = {
      riyo_inf: riyo_inf,
      nengetu_inf: nengetu_inf,
      gokei_inf: gokei_inf,
      kaisyo_inf: kaisyo_inf

    };

    return returns;

  }
}