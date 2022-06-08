export function getReceptJijyogenData() {
  let data = [];
  let array1 = ['1121000011', '1125000233', '1125000256'];
  let array2 = ['ひまわり園', 'たんぽぽ就労事業', 'さくら訪問介護'];
  let array3 = ['32施設入所', '46就労継続', '11居宅介護'];
  let array4 = [98500, '', '']
  let array5 = [9300, '', '']
  for (let i = 0; i < 3; i++) {
    data.push({
      sityoson: '東経市',
      jyukyusyaBango: '1100012358',
      code: 10000000,
      riyousyamei: '東経 きなこ',
      kana: 'キナコトウケイ',
      jyougenicon: '自',
      jyougengakuJigyosyo: 'ひまわり園',
      riyosyafutanGetsugaku: 9300,
      jyougengakukanrikeisan: '',
      koban: i + 1,
      jigyosyobango: array1[i],
      jigyosyomei: array2[i],
      teikyoservice: array3[i],
      souhiyougaku: array4[i],
      riyosyafutangaku: array5[i],
      hensyu: '',
      kanrikekkafutangaku: '',
      kanrikekka: '',
      resekakutei: '',
      print: '',
      complateFlag: false,
      nyukyo: 1,
      taikyo: 1,
      viewflag: 1, //表示状態
      fixFlag: i == 0 ? true : 0, //変更不可データ
    });
  }
  array1 = ['1121000011', '1125000233', '1125000256'];
  array2 = ['ひまわり園', 'たんぽぽ就労事業', 'さくら訪問介護'];
  array3 = ['24短期入所', '46就労継続', '11居宅介護'];
  array4 = [327364, '', '']
  array5 = [32736, '', '']
  for (let i = 0; i < 3; i++) {
    data.push({
      sityoson: '西経市',
      jyukyusyaBango: '1100012359',
      code: 10000001,
      riyousyamei: '東経 静香',
      kana: 'シズカトウケイ',
      jyougenicon: '自',
      jyougengakuJigyosyo: 'ひまわり園',
      riyosyafutanGetsugaku: 37200,
      jyougengakukanrikeisan: '',
      koban: i + 1,
      jigyosyobango: array1[i],
      jigyosyomei: array2[i],
      teikyoservice: array3[i],
      souhiyougaku: array4[i],
      riyosyafutangaku: array5[i],
      hensyu: '',
      kanrikekkafutangaku: '',
      kanrikekka: '',
      resekakutei: '',
      print: '',
      complateFlag: false,
      nyukyo: 1,
      taikyo: 0,
      viewflag: 1, //表示状態
      fixFlag: i == 0 ? true : 0, //変更不可データ

    });
  }
  array1 = ['1121000011', '11250002399'];
  array2 = ['ひまわり園', 'あさがお就労事業'];
  array3 = ['24短期入所', '46就労継続'];
  array4 = [148392, '']
  array5 = [14839, '']
  for (let i = 0; i < 2; i++) {
    data.push({
      sityoson: '東経市',
      jyukyusyaBango: '1100012360',
      code: 10000002,
      riyousyamei: '東経 弘子',
      kana: 'ヒロコトウケイ',
      jyougenicon: '自',
      jyougengakuJigyosyo: 'ひまわり園',
      riyosyafutanGetsugaku: 37200,
      jyougengakukanrikeisan: '',
      koban: i + 1,
      jigyosyobango: array1[i],
      jigyosyomei: array2[i],
      teikyoservice: array3[i],
      souhiyougaku: array4[i],
      riyosyafutangaku: array5[i],
      hensyu: '',
      kanrikekkafutangaku: '',
      kanrikekka: '',
      resekakutei: '',
      print: '',
      complateFlag: false,
      nyukyo: 1,
      taikyo: 0,
      viewflag: 1, //表示状態
      fixFlag: i == 0 ? true : 0, //変更不可データ

    });
  }
  array1 = ['1121000011', '1125000012', '1125000256'];
  array2 = ['ひまわり園', 'すみれ介護センター', 'さくら訪問介護'];
  array3 = ['32施設入所', '11居宅介護', '11居宅介護'];
  array4 = [148392, 123400, '']
  array5 = [9300, 0, '']
  for (let i = 0; i < 3; i++) {
    data.push({
      sityoson: '東経市',
      jyukyusyaBango: '1100012367',
      code: 10000003,
      riyousyamei: '東経 健二',
      kana: 'ケンジトウケイ',
      jyougenicon: '自',
      jyougengakuJigyosyo: 'ひまわり園',
      riyosyafutanGetsugaku: 9300,
      jyougengakukanrikeisan: '',
      koban: i + 1,
      jigyosyobango: array1[i],
      jigyosyomei: array2[i],
      teikyoservice: array3[i],
      souhiyougaku: array4[i],
      riyosyafutangaku: array5[i],
      hensyu: '',
      kanrikekkafutangaku: '',
      kanrikekka: '',
      resekakutei: '',
      print: '',
      complateFlag: false,
      nyukyo: 0,
      taikyo: 0,
      viewflag: 1, //表示状態
      fixFlag: i == 0 ? true : 0, //変更不可データ

    });
  }

  return data;
}