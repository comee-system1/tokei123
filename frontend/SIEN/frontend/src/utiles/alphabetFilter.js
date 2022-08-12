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
        if (value[search].match(/^[ア-オ]/)) {
          get.push(value);
        }
        break;
      case 2:
        if (value[search].match(/^[カ-コ]/)) {
          get.push(value);
        }
        break;
      case 3:
        if (value[search].match(/^[サ-ソ]/)) {
          get.push(value);
        }
        break;
      case 4:
        if (value[search].match(/^[タ-ト]/)) {
          get.push(value);
        }
        break;
      case 5:
        if (value[search].match(/^[ナ-ノ]/)) {
          get.push(value);
        }
        break;
      case 6:
        if (value[search].match(/^[ハ-ホ]/)) {
          get.push(value);
        }
        break;
      case 7:
        if (value[search].match(/^[マ-モ]/)) {
          get.push(value);
        }
        break;
      case 8:
        if (value[search].match(/^[ヤ-ヨ]/)) {
          get.push(value);
        }
        break;
      case 9:
        if (value[search].match(/^[ラ-ロ]/)) {
          get.push(value);
        }
        break;
      case 10:
        if (value[search].match(/^[ワ-ン]/)) {
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