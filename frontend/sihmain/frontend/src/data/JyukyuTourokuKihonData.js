import moment from 'moment';
export function getJyukyuTourokuKihonData(riyosyaid) {
	let jdata = {};
	jdata['status'] = "idle";
	jdata['jyukyu_inf'] = [];

	if(riyosyaid === '55000'){
		jdata['jyukyu_inf'].push(
			{
				jyukyuid: 1,
				rysid: 55000,
				jkbn: 1,
				shichoson: 1,
				kofuymd: '20220801',
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
				dcod: 1234,
				jyukyuname: '東経　決定',
			},
			{
				jyukyuid: 1,
				rysid: 55000,
				jkbn: 1,
				shichoson: 1,
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
				dcod: 1234,
				jyukyuname: '東経　決定',
			},
		)
	}
	else if(riyosyaid === '55001'){
		jdata['jyukyu_inf'].push(
			{
				jyukyuid: 1,
				rysid: 55001,
				jkbn: 1,
				shichoson: 1,
				kofuymd: '20211001',
				jyukyuno: '2222233333',
				jidoid: 0,
				jidopno1: '',
				jidopno2: '',
				jidoadd: '',
				ssyu1: 0,
				ssyu2: 1,
				ssyu3: 0,
				ssyu4: 1,
				zantei: 1,
				dcod: 0,
				jyukyuname: '',
			},
		)
	}

	let result = [];
	
	for(let i = 0; i < jdata['jyukyu_inf'].length; i++){
		result.push({
			jyukyuid: jdata['jyukyu_inf'][i]['jyukyuid'],
			rysid: jdata['jyukyu_inf'][i]['rysid'],
			jkbn: jdata['jyukyu_inf'][i]['jkbn'],
			shichoson: jdata['jyukyu_inf'][i]['shichoson'],
			//todo shichosonマスタから取得
			shichosonno: '000001',
			shichosonname: '東経市',
			kofuymd: jdata['jyukyu_inf'][i]['kofuymd'],
			kofuymdDisp: moment(jdata['jyukyu_inf'][i]['kofuymd']).format('YYYY.MM.DD'),
			jyukyuno: jdata['jyukyu_inf'][i]['jyukyuno'],
			jidoid: jdata['jyukyu_inf'][i]['jidoid'],
			jido: jdata['jyukyu_inf'][i]['jidoid'] > 0 ? '児' : '',
			jidopno1: jdata['jyukyu_inf'][i]['jidopno1'],
			jidopno2: jdata['jyukyu_inf'][i]['jidopno2'],
			jidoadd: jdata['jyukyu_inf'][i]['jidoadd'],
			ssyu1: jdata['jyukyu_inf'][i]['ssyu1'],
			ssyu2: jdata['jyukyu_inf'][i]['ssyu2'],
			ssyu3: jdata['jyukyu_inf'][i]['ssyu3'],
			ssyu4: jdata['jyukyu_inf'][i]['ssyu4'],
			zantei: jdata['jyukyu_inf'][i]['zantei'],
			dcod: jdata['jyukyu_inf'][i]['dcod'],
			dcodDisp: jdata['jyukyu_inf'][i]['dcod'] > 0 ? jdata['jyukyu_inf'][i]['dcod'] : '',
			jyukyuname: jdata['jyukyu_inf'][i]['jyukyuname'],
		});
	}
	//３行以下はダミーデータ作成
	if(result.length < 3){
		while(result.length < 3){
			result.push({
				jyukyuid: 0,
				rysid: 0,
				jkbn: 0,
				shichoson: 0,
				shichosonno: '',
				shichosonname: '',
				kofuymd: '',
				kofuymdDisp: '',
				jyukyuno: '',
				jidoid: 0,
				jido: '',
				jidopno1: '',
				jidopno2: '',
				jidoadd: '',
				ssyu1: 0,
				ssyu2: 0,
				ssyu3: 0,
				ssyu4: 0,
				zantei: 0,
				dcod: 0,
				jyukyuname: '',
			});
		}
	}
	
	return result;
}
