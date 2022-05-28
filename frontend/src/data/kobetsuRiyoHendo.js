export function getHendoData(_self) {

  let hendo = [];
  let items = ['項目', '合計', '金額'];
  let columns = ['変動情報', '加算情報'];
  let define_taisei_kobetu = [
    {
      jyukyusyabango: '8765432100',
      name: '重度障害者支援加算Ⅱ2',
      date: {
        day1: 2,
        day2: 2,
        day3: 2,
        day4: 2,
        day14: 2,
        day15: 2,
        day16: 3,
      },
    },
    {
      jyukyusyabango: '8765432100',
      name: '重度障害者支援加算Ⅱ2',
      date: {
        day1: 2,
        day2: 2,
        day3: 2,
        day4: 2,
        day14: 2,
        day15: 2,
        day16: 3,
      },
    },
    {
      jyukyusyabango: '8765432100',
      name: '重度障害者支援加算Ⅱ3',
      date: {
        day11: 2,
        day12: 2,
        day13: 2,
        day14: 2,
        day24: 2,
        day25: 2,
        day26: 3,
      },
    },
    {
      jyukyusyabango: '8765432100',
      name: '栄養マネジメント加算',
      date: {},
    },
    {
      jyukyusyabango: '8765432100',
      name: '療養食加算',
      date: {},
    },
    {
      jyukyusyabango: '8765432100',
      name: '口腔衛生管理加算',
      date: {
        day1: 1,
        day2: 1,
        day3: 1,
        day4: 1,
      },
    },
  ];
  let define_kobetu = [
    {
      jyukyusyabango: '8765432100',
      name: '入院・外泊時加算',
      date: {},
    },
    {
      jyukyusyabango: '8765432100',
      name: '地域移行加算',
      date: {
        day1: 2,
        day2: 2,
        day14: 2,
        day18: 2,
        day24: 2,
      },
    },
  ];

  // 選択された受給者番号のデータのみ対象にする
  // apiが利用されたら不要
  let define_taisei_kobetu_data = define_taisei_kobetu;
  define_taisei_kobetu = [];
  for (let i = 0; i < define_taisei_kobetu_data.length; i++) {
    if (
      _self.userDataSelect[0]['jyukyusyabango'] ==
      define_taisei_kobetu_data[i]['jyukyusyabango']
    ) {
      define_taisei_kobetu.push(define_taisei_kobetu_data[i]);
    }
  }
  let define_kobetu_data = define_kobetu;
  define_kobetu = [];
  for (let i = 0; i < define_kobetu_data.length; i++) {
    if (
      _self.userDataSelect[0]['jyukyusyabango'] ==
      define_kobetu_data[i]['jyukyusyabango']
    ) {
      define_kobetu.push(define_kobetu_data[i]);
    }
  }

  if (_self.teikyoCode == '34') {
    hendo = [
      {
        heads: items,
        column: columns,
        shisetsuNyusho: [
          { name: '利用日' },
          { name: '入院・退院日' },
          { name: '外泊日' },
          { name: '食事', mealFlag: true },
        ],
        meals: ['朝食', '夕食'],
        mealsKey: ['breakfast', 'dinner'],
        taisei_kobetu: define_taisei_kobetu,
        kobetu: define_kobetu,
        kasanRow: define_taisei_kobetu.length + define_kobetu.length,
        taisei_kobetu_name: ['体制+個別', '個別'],
        mealsCount: [300, 500],
      },
    ];
  } else if (_self.teikyoCode == '33') {
    hendo = [
      {
        heads: items,
        column: columns,
        shisetsuNyusho: [
          { name: '利用日' },
          { name: '入院・退院日' },
          { name: '外泊日' },
          { name: '住居外利用', jyukyogairiyoFlag: true },
          { name: '家賃', yatinFlag: true },
        ],
        meals: ['朝食', '昼食', '夕食'],
        mealsKey: ['breakfast', 'lunch', 'dinner'],
        taisei_kobetu: define_taisei_kobetu,
        kobetu: define_kobetu,
        kasanRow: define_taisei_kobetu.length + define_kobetu.length,
        taisei_kobetu_name: ['体制+個別', '個別'],
        mealsCount: [300, 400, 500],
        kounetsuSuihi: [{ count: 100 }],
      },
    ];
  } else if (_self.teikyoCode == '32') {
    hendo = [
      {
        heads: items,
        column: columns,
        shisetsuNyusho: [
          { name: '利用日' },
          { name: '入院・退院日' },
          { name: '外泊日' },
          { name: '食事', mealFlag: true },
          { name: '光熱水費', kounetsuSuihiFlag: 'kounetsuSuihiFlag' },
        ],
        meals: ['朝食', '昼食', '夕食'],
        mealsKey: ['breakfast', 'lunch', 'dinner'],
        taisei_kobetu: define_taisei_kobetu,
        kobetu: define_kobetu,
        kasanRow: define_taisei_kobetu.length + define_kobetu.length,
        taisei_kobetu_name: ['体制+個別', '個別'],
        mealsCount: [300, 400, 500],
        kounetsuSuihi: [{ count: 100 }],
      },
    ];
  } else {
    console.log(
      'you cannot select service this one . Please Select other Service. '
    );
  }
  return hendo;
}