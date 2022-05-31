export function getOriginalDetailData() {
	let data = {};
	data['status'] = "idle";
	data['riyo_inf'] = [];
	for(let i = 1; i < 10; i++){
		data['riyo_inf'].push(
			{
				riid: '5500' + i,
				riyocode: '123456' + (Math.floor(Math.random() * 9) + 1),
				names: "東経太郎" + i,
				kana: "トウケイタロウ" + i,
				jyukyuid: i * 10,
				jyukyuno: '876543210' + (Math.floor(Math.random() * 9) + 1),
				sityoid: i * 30,
				jidoid: i * 40,
				kzkname: '東経家族' + i,
				kakutei: i % 2 == 0 ? 2:0,
			}
		)
	}
	for(let i = 1; i < 10; i++){
		data['riyo_inf'].push(
			{
				riid: '5501' + i,
				riyocode: '234567' + (Math.floor(Math.random() * 9) + 1),
				names: "西経太郎" + i,
				kana: "セイケイタロウ" + i,
				jyukyuid: i * 10,
				jyukyuno: '076543210' + (Math.floor(Math.random() * 9) + 1),
				sityoid: i * 30,
				jidoid: i * 40,
				kzkname: '西経家族' + i,
				kakutei: i % 2 == 0 ? 2:0,
			}
		)
	}
	for(let i = 1; i < 10; i++){
		data['riyo_inf'].push(
			{
				riid: '5510' + i,
				riyocode: '876543' + (Math.floor(Math.random() * 9) + 1),
				names: "南経太郎" + i,
				kana: "ナンケイタロウ" + i,
				jyukyuid: i * 10,
				jyukyuno: '006543210' + (Math.floor(Math.random() * 9) + 1),
				sityoid: i * 30,
				jidoid: i * 40,
				kzkname: '南経家族' + i,
				kakutei: i % 2 == 0 ? 2:0,
			}
		)
	}
	return JSON.stringify(data);
}
