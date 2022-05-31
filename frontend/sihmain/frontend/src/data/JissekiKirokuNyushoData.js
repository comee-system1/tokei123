export function getOriginalDetailData() {
	let data = {};
	data['status'] = "idle";
	data['riyo_inf'] = [];
	data['riyo_inf'].push(
		{
			sityoid: 12345,
			riid: 55555,
			tkkfhi: 1111,
			tkkfhiumu:"2",
			dkbn: 0,
			tnka_syk_a: 350,
			tnka_syk_h: 400,
			tnka_syk_y: 550,
			tnka_syk_d: 1500,
			tnka_knskbn: 1,
			tnka_knshbt: 1,
			tnka_kns_d: 300,
			tnka_kns_m: 6000,
			tnka_kns_m2: 300,
			staymd: "20210401",
			ms2_kaisu: 10,
			taiymd:"20210424",
			ttymd:"20210424",
			tnymd:"20210424",
			tnymd2:"20210424",
			kiroku_mei:[]
		}
	)

	for(let i = 1; i < 31; i++){
		data['riyo_inf'][0]['kiroku_mei'].push(
			{
				rymd:`202204${( '00' + i ).slice( -2 )}`,
				jyokyo: i % 2 == 0 ? "外泊":"入院",
				kasan1: i % 4 == 0 ? 1:0,
				kasan2:i % 5 == 0 ? 1:0,
				kasan3: i % 6 == 0 ? 1:0,
				kasan4:i % 7 == 0 ? 1:0,
				kasantkn: i % 6 == 0 ? 1:0,
				kasanj: i % 5 == 0 ? 1:0,
				kasans: i % 4 == 0 ? 1:0,
				kasank: i % 3 == 0 ? 1:0,
				kasannc:i % 2 == 0 ? 1:0,
				kasani: i % 1 == 0 ? 1:0,
				kasanti:i % 2 == 0 ? 1:0,
				sasa:1,
				shiru:1,
				syuu:1,
				konetu: i % 6 == 0 ? 1:0,
				biko:"手入力された文字列",
			},
		)
	}
	return JSON.stringify(data);
}
