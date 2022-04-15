export function getOriginalDetailData() {
	let data = {};
	data['status'] = "idle";
	data['riyo_inf'] = [];
	data['riyo_inf'].push(
		{
			sityoid: 12345,
			riid: 55555,
      sikyuryo:"10日/月",
			dkbn: 0,
      staymd: "20220401",
      ms2_kaisu: 7,
      ttymd:"20210424",
			tnymd:"20210424",
      ksnruikei:3,
			kiroku_mei:[]
		}
	)

	for(let i = 1; i < 31; i++){
		data['riyo_inf'][0]['kiroku_mei'].push(
			{
				rymd:`202204${( '00' + i ).slice( -2 )}`,
				jyokyo: i % 10 == 0 ? "欠席":"",
				keitai: 1,
				jstime:i % 10 == 0 ? "":"09:00",
				jetime:i % 10 == 0 ? "":"16:00",
				gei: i % 7 == 0 ? 1:0,
				sou: i % 7 == 0 ? 1:0,
				kasanh_mn: i % 5 == 0 ? 1:0,
				kasank_mn:5.75,
				kasans:  i % 10 == 0 ? "":1,
				kasantkn: i % 15 == 0 ? 1:0,
				kasanj:i % 14 == 0 ? 1:0,
				kasanks:i % 3 == 0 ? 1:0,
				kasant: i % 4 == 0 ? 1:0,
				kasani: i % 1 == 0 ? 1:0,
				kasantu: i % 1 == 0 ? 1:0,
				kasankai: i % 1 == 0 ? 1:0,
				kasang: i % 1 == 0 ? 1:0,
				kasankdo: i % 1 == 0 ? 1:0,
				kasantkt: i % 1 == 0 ? 1:0,
				kasantren: i % 1 == 0 ? 1:0,
				kasandk: i % 1 == 0 ? 1:0,
				kasansyo: i % 1 == 0 ? 1:0,
				kasanknk: i % 1 == 0 ? 1:0,
				kasankk: i % 1 == 0 ? 1:0,
				kasanjt: i % 1 == 0 ? 1:0,
				kasansdn: i % 1 == 0 ? 1:0,
				biko:"手入力された文字列",
			},
		)
	}
	return JSON.stringify(data);
}