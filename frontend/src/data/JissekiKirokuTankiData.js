export function getOriginalDetailData() {
	let data = {};
	data['status'] = "idle";
	data['riyo_inf'] = [];
	data['riyo_inf'].push(
		{
			sityoid: 12345,
			riid: 55555,
			keiyakuryo:"10日/月",
			dkbn:0,
			kiroku_mei:[]
		}
	)

	for(let i = 1; i < 31; i++){
		data['riyo_inf'][0]['kiroku_mei'].push(
			{
				rcnt:1,
				rymd:`202204${( '00' + i ).slice( -2 )}`,
				nissu:1,
				jyokyo: i % 10 == 0 ? "1:他サービス併給":"2:日中のみ",
				sou: i % 5 == 0 ? 1:0,
				gei: i % 4 == 0 ? 1:0,
				kasans:  i % 1 == 0 ? 1:0,
				iryo: i % 8 == 0 ? 1:0,
				kinkyu: i % 5 == 0 ? 1:0,
				jyudo: i % 6 == 0 ? 1:0,
				chokatk: i % 7 == 0 ? 1:0,
				biko:"手入力された文字列",
			},
		)
	}
	return JSON.stringify(data);
}