<template>
    <!--履歴ダイアログ-->
    <v-sheet id="rireki_id" class="sheet reki" elevation="2">
        <div class="areaReki title">
            <label class="label titleReki">作成履歴
                <v-btn elevation="2" icon small top class="winbtn close" style="margin-left: 88px;" color="red"
                    @click="Click_colse_Reki">
                    <v-icon dark small> mdi-close </v-icon>
                </v-btn>
            </label>
        </div>

        <div style="padding: 8px 8px 8px 8px;">
            <div class="areaReki naiyo">
                <wj-flex-grid id="GrdReki_id" class="grid reki" :headersVisibility="'Column'" :autoGenerateColumns="false"
                    :allowAddNew="false" :allowDelete="false" :allowPinning="false" :allowMerging="'AllHeaders'"
                    :allowResizing="true" :allowSorting="false" :allowDragging="false" :selectionMode="'Row'"
                    :isReadOnly="true" :initialized="onInitializeIcrnGrid" :itemsSourceChanged="onItemsSourceChanged"
                    :itemsSource="viewdata">

                    <!--列-->
                    <wj-flex-grid-column header="作成年月日" binding="head_mymd" :width="175" :wordWrap=true
                        :allowResizing=false></wj-flex-grid-column>
                    <wj-flex-grid-column header="担当者" binding="head_sryaku" :width="100" :wordWrap=true
                        :allowResizing=false></wj-flex-grid-column>
                    <wj-flex-grid-column header="" binding="head_dataid" :width="0" :wordWrap=true
                        :allowResizing=false></wj-flex-grid-column>
                    <wj-flex-grid-column header="" binding="head_kbn" :width="0" :wordWrap=true
                        :allowResizing=false></wj-flex-grid-column>
                    <wj-flex-grid-column header="" binding="head_siid" :width="0" :wordWrap=true
                        :allowResizing=false></wj-flex-grid-column>

                </wj-flex-grid>
            </div>

            <v-btn id="clsbtnmenu-del-id" class="btn alt" style="margin-top: 9px;" @click="onClickdel">
                削 除
            </v-btn>
        </div>
    </v-sheet>
</template>

<script>
import * as wjGrid from '@grapecity/wijmo.grid';

export default {
    data() {
        return {
            viewdata: [],    //履歴のリスト
        }

    },

    methods: {
        //グリッドの初期化
        onInitializeIcrnGrid(flexGrid) {
            flexGrid.beginUpdate();
            // ヘッダの追加と設定
            flexGrid.columnHeaders.rows[0].allowMerging = true;
            flexGrid.columnHeaders.rows[0].height = 30;
            flexGrid.columnHeaders.rows[0].cssClassAll = 'column-Reki'
            flexGrid.cells.rows.defaultSize = 30;
            flexGrid.alternatingRowStep = 0;
            flexGrid.endUpdate();
            this.flex = flexGrid;
            flexGrid.hostElement.addEventListener("click", function (e) { this.grid_click(e) }.bind(this));
        }

        //データソースチェンジイベント
        , onItemsSourceChanged(flexGrid) {
            // 初期選択を解除
            flexGrid.selection = new wjGrid.CellRange(-1, -1, -1, -1);
        }

        //グリッドクリック処理
        , grid_click: function (e) {
            var ht = this.flex.hitTest(e);
            if (ht.row >= 0) {
                //##データの取得処理を追加
                //this.get_data();
                this.$emit('viewupd', this.viewdata[ht.row].head_dataid); //画面更新
            }
        }

        , Click_colse_Reki() {
            //閉じるボタン
            this.$emit('rekiclose'); //画面更新
        }
        ,onClickdel(){
            //削除ボタン
            this.$emit('rekidel'); //画面更新
        }

        ,set_rekidata(data_list){
            //履歴データをセットする
            this.viewdata = data_list.concat();
        }
    }

}



</script>

<style  lang="scss">
@import '../../assets/scss/common.scss';
#GrdReki_id {
    .wj-header {
        // ヘッダのみ縦横中央寄せ
        color: $font_color;
        font-size: 12px;
        // 下の4つはセット
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .wj-cell-maker {
        width: 15px;
        height: 15px;
    }

    .wj-cell:not(.wj-header) {
        background: $white;
    }

    .wj-cells .wj-row:hover .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) {
        transition: all 0s;
        background: $grid_hover_background;
    }


    .wj-cells .wj-cell.wj-state-multi-selected {
        background: $grid_selected_background;
        color: $grid_selected_color;
    }

    .wj-cells .wj-cell.wj-state-selected {
        background: $grid_selected_background;
        color: $grid_selected_color;
    }

}
</style>

