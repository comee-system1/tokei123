export function getHendoData2() {
  let rowColumn = {
    column1:'変動情報',
    column2:'加算情報'
  };
  let hendo = [
    {
      text:'利用日',
      type:'riyo',
      merge:3,
    },
    {
      text:'入院・退院日',
      type:'tyutai',
      merge:3,
    },
    {
      text:'外泊日',
      type:'gaihaku',
      merge:3,
    },
    {
      text:'食事',
      type:'meal',
      merge:2,
      data:[
      {
        text:'朝食',
        money:300
      },
      {
        text:'昼食',
        money:400
      },
      {
        text:'夕食',
        money:500
      }]
    },
    {
      text:'光熱水費',
      type:'shine',
      merge:2,
      data:[
        {
          text:'',
          money:100
        }
      ]
    }
  ];



  let returns = {
    rowColumn:rowColumn,
    hendo:hendo,
  };
  return returns;
}