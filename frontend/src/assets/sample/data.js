// generate some random data
export function getData() {
  var countries = 'アメリカ,ドイツ,イギリス,日本,イタリア,ギリシャ'.split(','),
    products = 'スマートフォン,パソコン,カメラ,オーディオ'.split(','),
    colors = '赤,緑,青,黒,白,黄'.split(','),
    data = [];
  for (var i = 0; i < 200; i++) {
    data.push({
      id: i,
      country: pickOne(countries),
      product: pickOne(products),
      color: pickOne(colors),
      downloads: Math.round(Math.random() * 20000),
      sales: Math.random() * 10000,
      expenses: Math.random() * 5000,
    });
  }
  return data;
}
function pickOne(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}