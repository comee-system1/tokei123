import moment from 'moment';
export function getJyukyuTourokuSyogaiKubunData(riyosyaid) {
	let jdata = {};
	jdata['status'] = "idle";
	jdata['skryoh4_inf'] = [];

	if(riyosyaid === '55000'){
		jdata['skryoh4_inf'].push(
			{
				syokbnid: 1,
				jyukyuid: 1,
				ntsymd: '20220801',
				nteymd: '99991231',
				syogaikbn: 3,
				tkkyu: 1,
				rysid: 55000,
				jkbn: 0,
			},
			{
				syokbnid: 2,
				jyukyuid: 1,
				ntsymd: '20220401',
				nteymd: '20220731',
				syogaikbn: 2,
				tkkyu: 1,
				rysid: 55000,
				jkbn: 0,
			}
		)
	}

	let result = [];
	
	for(let i = 0; i < jdata['skryoh4_inf'].length; i++){
		result.push({
			kai: jdata['skryoh4_inf'][i]['kai'],
			syokbnid: jdata['skryoh4_inf'][i]['syokbnid'],
			jyukyuid: jdata['skryoh4_inf'][i]['jyukyuid'],
			ntsymd: jdata['skryoh4_inf'][i]['ntsymd'],
			ntsymdDisp: moment(jdata['skryoh4_inf'][i]['ntsymd']).format('YYYY.MM.DD'),
			nteymd: jdata['skryoh4_inf'][i]['nteymd'],
			nteymdDisp: jdata['skryoh4_inf'][i]['nteymd']==='99991231'?'':moment(jdata['skryoh4_inf'][i]['nteymd']).format('YYYY.MM.DD'),
			syogaikbn: jdata['skryoh4_inf'][i]['syogaikbn'],
			syogaikbnDisp :jdata['skryoh4_inf'][i]['syogaikbn']===2?'区分２':'区分３',
			tkkyu: jdata['skryoh4_inf'][i]['tkkyu'],
			rysid: jdata['skryoh4_inf'][i]['rysid'],
			jkbn: jdata['skryoh4_inf'][i]['jkbn'],
		});
	}
	//３行以下はダミーデータ作成
	while(result.length < 3){
		result.push({
			kai: '',
			syokbnid: 0,
			jyukyuid: 0,
			ntsymd: '',
			ntsymdDisp: '',
			nteymd: '',
			nteymdDisp: '',
			syogaikbn: 0,
			syogaikbnDisp :'',
			tkkyu: 0,
			rysid: 0,
			jkbn: 0,
		});
	}
	
	return result;
}
