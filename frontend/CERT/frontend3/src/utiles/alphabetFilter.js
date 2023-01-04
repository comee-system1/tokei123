/**************************
 * アルファベットのフィルタリング
 * array : データ配列
 * select : 選択数値
 * search : 検索したいキー(string)
 */
import ls from '@/utiles/localStorage';

function alphabetFilter(array, select, search = "") {
  if (!select) {
    select = parseInt(ls.getlocalStorageEncript(ls.KEY.Alphabet));
  }
  let get = [];
  array.forEach(function (value) {
    switch (select) {
      case 0:
        get.push(value);
        break;
      case 1:
        if (value[search].match(/^[ｱ-ｵ]/)) {
          get.push(value);
        }
        break;
      case 2:
        if (value[search].match(/^[ｶ-ｺ]/)) {
          get.push(value);
        }
        break;
      case 3:
        if (value[search].match(/^[ｻ-ｿ]/)) {
          get.push(value);
        }
        break;
      case 4:
        if (value[search].match(/^[ﾀ-ﾄ]/)) {
          get.push(value);
        }
        break;
      case 5:
        if (value[search].match(/^[ﾅ-ﾉ]/)) {
          get.push(value);
        }
        break;
      case 6:
        if (value[search].match(/^[ﾊ-ﾎ]/)) {
          get.push(value);
        }
        break;
      case 7:
        if (value[search].match(/^[ﾏ-ﾓ]/)) {
          get.push(value);
        }
        break;
      case 8:
        if (value[search].match(/^[ﾔ-ﾖ]/)) {
          get.push(value);
        }
        break;
      case 9:
        if (value[search].match(/^[ﾗ-ﾛ]/)) {
          get.push(value);
        }
        break;
      case 10:
        if (value[search].match(/^[ﾜ-ﾝ]/)) {
          get.push(value);
        }
        break;
    }
  });
  return get;

}

export default {
  alphabetFilter,
};