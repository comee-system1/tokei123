export function getHendoData2() {
  let rowColumn = {
    column1: '変動情報',
    column2: '加算情報'
  };
  let hendo = [
    {
      text: '利用日',
      type: 'riyo',
      merge: 3,
    },
    {
      text: '入院・退院日',
      type: 'nyutai',
      merge: 3,
    },
    {
      text: '外泊日',
      type: 'gaihaku',
      merge: 3,
    },
    {
      text: '食事',
      type: 'meal',
      merge: 2,
      data: [
        {
          text: '朝食',
          money: 300
        },
        {
          text: '昼食',
          money: 400
        },
        {
          text: '夕食',
          money: 500
        }]
    },
    {
      text: '光熱水費',
      type: 'shine',
      merge: 2,
      data: [
        {
          text: '',
          money: 100
        }
      ]
    }
  ];

  let taisei =
  {
    key: 1,
    text: '体制+個別',
    data: [
      {
        key: 1,
        text: "重度障害者支援加算Ⅱ2",
        day1: 2,
        day2: 2,
        day3: 2,
        day4: 2,
        day5: 2,
        day6: 2,
      },
      {
        key: 2,
        text: "重度障害者支援加算Ⅱ3",
      },
      {
        key: 3,
        text: "栄養マネジメント加算"
      },
      {
        key: 4,
        text: "療養食加算"
      },
      {
        key: 5,
        text: "口腔衛生管理加算"
      },
    ]
  };

  let kobetu =
  {
    key: 1,
    text: '個別',
    data: [
      {
        key: 6,
        text: "入院・外泊時加算Ⅰ",
        day1: 2,
        day2: 2,
        day3: 2,
        day4: 2,
        day5: 2,
        day8: 2,
      },
      {
        key: 7,
        text: "地域移行加算"
      },
    ]
  };

  let returns = {
    rowColumn: rowColumn,
    hendo: hendo,
    taisei: taisei,
    kobetu: kobetu,
  };
  return returns;
}