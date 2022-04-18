export function getOriginalDetailData() {
	let data = {};
	data['status'] = "idle";
	data['riyo_inf'] = [];
	for(let i = 1; i < 15; i++){
		data['riyo_inf'][i].push(
			{
				riid: 55555,
				riyocode: 1234,
				names: "東経太郎" + i,
				kana: "トウケイタロウ" + i,
				jyukyuid: 10000 + i,
				jyukyuno: 20202 + i,
				sityoid: 556677,
				jidoid: 5,
				kzkname: "東経一郎",
				kakutei: 0
			}
		)
	}
	return JSON.stringify(data);
}
