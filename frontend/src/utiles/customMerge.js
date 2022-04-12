// //メソッドを定義
// var customMerge = ({A, B, x, y}) => {
//     //処理結果を代入する変数を定義
//     const _A = A * x
//     const _B = B * y
  
//     return {  //ここが重要！
//       //vue側で設定したプロパティにデータを入れる
//       A: _A,
//       B: _B
//     }
//   }
  
//   //外部ファイルに渡すメソッド
//   export default customMerge


import * as wjGrid from "@grapecity/wijmo.grid";


var __extends =
    (this && this.__extends) ||
    (function() {
        var extendStatics = function(d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function(d, b) {
                        d.__proto__ = b;
                    }) ||
                function(d, b) {
                    for (var p in b) if (b.hasOwnProperty.call(p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function(d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype =
                b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
        };
    })();

var CustomMergeManager = (function(_super) {
  __extends(CustomMergeManager, _super);

  function CustomMergeManager() {
      return _super.call(this) || this;
  }
  
  CustomMergeManager.prototype.getMergedRange = function(panel, r, c, clip) {
      if (clip === void 0) {
          clip = true;
      }

      var rng = new wjGrid.CellRange(r, c);
      
      if( rng.col >= 2 && rng.col2 >= 2){
        return rng;
      }
      for (var i = rng.col; i < panel.columns.length - 1; i++) {
          if (
              panel.getCellData(rng.row, i, true) !=
              panel.getCellData(rng.row, i + 1, true)
          )
              break;
          rng.col2 = i + 1;
      }
      for (var i2 = rng.col; i2 > 0; i2--) {
          if (
              panel.getCellData(rng.row, i2, true) !=
              panel.getCellData(rng.row, i2 - 1, true)
          )
              break;
          rng.col = i2 - 1;
      }
      for (var i3 = rng.row; i3 < panel.rows.length - 1; i3++) {
          if (
              panel.getCellData(i3, rng.col, true) !=
              panel.getCellData(i3 + 1, rng.col, true)
          )
              break;
          rng.row2 = i3 + 1;
      }
      for (var i4 = rng.row; i4 > 0; i4--) {
          if (
              panel.getCellData(i4, rng.col, true) !=
              panel.getCellData(i4 - 1, rng.col, true)
          )
              break;
          rng.row = i4 - 1;
      }

      return rng;
  };
  return CustomMergeManager;
})(wjGrid.MergeManager);

export default CustomMergeManager;