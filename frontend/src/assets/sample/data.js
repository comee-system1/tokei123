export function getData() {
    var data = [];
    var products = 'ウィジェット,ガジェット,ツール'.split(',');
    var year = new Date().getFullYear() - 1;
    for (let i = 0; i < 100; i++) {
      let item = {
        id: i,
        product: products[i % products.length]
      };
      for (let yr = year; yr <= year + 1; yr++) {
        let total = 0;
        for (let q = 1; q <= 9; q++) {
          let key = yr + ' Q' + q;
          let value = Math.round(Math.random() * 50);
          item[key] = value;
          total += value;
        }
        item[yr + ' Total'] = total;
      }
      data.push(item);
    }
    return data;
}