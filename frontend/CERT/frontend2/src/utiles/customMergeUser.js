import * as wjGrid from "@grapecity/wijmo.grid";


var CustomMergeManager = (function(_super) {
 

  function CustomMergeManager() {
      return _super.call(this) || this;
  }
  
  CustomMergeManager.prototype.getMergedRange = function(panel, r, c, clip) {

      if (clip === void 0) {
          clip = true;
      }

      var rng = new wjGrid.CellRange(r, c);
      return rng;
  };
  return CustomMergeManager;
})(wjGrid.MergeManager);

export default CustomMergeManager;