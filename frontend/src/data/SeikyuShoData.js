export function getOriginalDetailData() {
	let data = {};
	data['dummy'] = [];
  for(let i = 0; i < 4; i++){
    data['dummy'].push(
      {
        sname: "東経市",
        svcname: getKubun(i),
        kensuA: i *10,
        tanisu:56211,
        hiyoA:562110,
        kyufuA:505899,
        riyo:26211,
        jichitai:i * 10000,
        kensuB: i == 1 ? 34:"",
        hiyoB: i == 1 ? 213400:"",
        kyufuB: i == 1 ? 163400:"",
        seikyu:3286158,
        print:""
      }
    )
  }
  for(let i = 0; i < 4; i++){
    data['dummy'].push(
      {
        sname: "西経市",
        svcname: getKubun(i),
        kensuA: i *10,
        tanisu:56211,
        hiyoA:562110,
        kyufuA:505899,
        riyo:26211,
        jichitai:i * 10000,
        kensuB: i == 1 ? 34:"",
        hiyoB: i == 1 ? 213400:"",
        kyufuB: i == 1 ? 163400:"",
        seikyu:3286158,
        print:""
      }
    )
  }
  for(let i = 0; i < 4; i++){
    data['dummy'].push(
      {
        sname: "南経市",
        svcname: getKubun(i),
        kensuA: i *10,
        tanisu:56211,
        hiyoA:562110,
        kyufuA:505899,
        riyo:26211,
        jichitai:i * 10000,
        kensuB: i == 1 ? 34:"",
        hiyoB: i == 1 ? 213400:"",
        kyufuB: i == 1 ? 163400:"",
        seikyu:3286158,
        print:""
      }
    )
  }
  for(let i = 0; i < 4; i++){
    data['dummy'].push(
      {
        sname: "北経市",
        svcname: getKubun(i),
        kensuA: i *10,
        tanisu:56211,
        hiyoA:562110,
        kyufuA:505899,
        riyo:26211,
        jichitai:i * 10000,
        kensuB: i == 1 ? 34:"",
        hiyoB: i == 1 ? 213400:"",
        kyufuB: i == 1 ? 163400:"",
        seikyu:3286158,
        print:""
      }
    )
  }
	return JSON.stringify(data);
}

function getKubun(num){
  let serviceNames = ["生活介護","施設入所支援","短期入所","就労継続支援A型"];
  return serviceNames[num];
}
