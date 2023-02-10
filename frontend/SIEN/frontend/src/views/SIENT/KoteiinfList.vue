<template>
  <!--<container class="KoteiinfList">-->
    <div class="KoteiinfList">
    <!-- ****利用者表示エリアstart**** -->
    <aside  class="aside">
      <user-list
            ref="user_list"
            :dispAddDaicho="false"
            @child-select="setUserSelectPoint">
          >
          </user-list>
    </aside>

    <!-- ****利用者表示エリアend**** -->
    <!--<centermenu   class="centermenu">-->
    <div class="centermenu">
      <!-- ****中間メニュー**** -->
      <div class="clsstitlecenter0 mt-3"><b>本 人</b></div>
    
      <v-btn class="clsbtnmenu mt-2" @click="get_scroll(0)">
        基本<br>情報
      </v-btn>
      <v-btn class="clsbtnmenu" @click="get_scroll(1)">
        生活歴
      </v-btn>
      <v-btn class="clsbtnmenu" @click="get_scroll(2)">
        病歴・<br>障害歴
      </v-btn>
      <v-btn class="clsbtnmenu" @click="get_scroll(3)">
        現在受<br>診状況
      </v-btn>
      <v-btn class="clsbtnmenu" @click="get_scroll(4)">
        医療<br>保険
      </v-btn>
      <v-btn class="clsbtnmenu" @click="get_scroll(5)">
        生活<br>状況
      </v-btn>
      <div class="clsstitlecenter0"><b>家 族</b></div>
      <v-btn class="clsbtnmenu"  @click="get_scroll(6)">
        家族<br>情報
      </v-btn>
      <v-btn class="clsbtnmenu" @click="get_scroll(7)">
        介護者<br>情報
      </v-btn>
      <v-btn class="clsbtnmenu" @click="get_scroll(8)">
        住環境
      </v-btn>
      <div class="clsstitlecenter0"><b>社 会</b></div>
      <v-btn class="clsbtnmenu" @click="get_scroll(9)">
        関係<br>機関
      </v-btn>
      <v-btn class="clsbtnmenu" @click="get_scroll(10)">
        手帳<br>情報
      </v-btn>
      <v-btn class="clsbtnmenu" @click="get_scroll(11)">
        福祉<br>サービス
      </v-btn>      
    </div>
    <main class="main">
      <v-sheet class="clssheet-dai0" color="#FFFFFF" elevation="2">
        <div class="RiyoLabel">
          <label class="clssdaititle0_a"><b>日付</b></label>
          <v-btn 
            class="btnymd_kotei ml-1"
            @click="inputCalendarClick()"
            tile
            width="150px"
            height="30px"
            >{{ getYm()}}
            <div class="float-right">
              <v-icon small>mdi-calendar-month</v-icon>
            </div>
          </v-btn>

          <!-- 年月日ダイアログ -->
          <v-dialog
            v-model="datepicker_dialog"
            width="300"
            class="datepicker_dialogs"
            >
            <v-date-picker
              id="Datepicker_head"
              v-model="picker"
              locale="jp-ja"
              :day-format="(date) => new Date(date).getDate()"
              @change="monthSelect"
            >
            </v-date-picker>
          </v-dialog>          
        </div>
        <br>
        <div class="RiyoLabel">
          <label class="clssdaititle0_a"><b>利用者名:</b></label>
          <label class="clssdaititle0_b" id="Riyocd_id"></label>
          <label class="clssdaititle0_c" id="Riyonm_id"></label>
        </div>
        <!-- ****障がい者本人の状況（基本情報）****-->
        <v-sheet id="area_dai" class="wrap001-dai1" color="#F4F6F9">
          <label class="clssdaititle0 mt-3"><b>◆障がい者本人の状況</b></label>
          <component :is="kotei001" ref="childkotei001"              @child-dataupd="get_data" @child-datasel="setUserSelectPoint" v-bind="{ymd: getYYYYMMDD(), uniqid:this.param_uniqid ,traceid:this.param_traceid,jigyoid:this.param_jigyoid,jigyoid_kotei:this.param_jigyoid_kotei,kotei_kbn:1 }"></component>
          <component class="mt-3" :is="kotei002" ref="childkotei002" @child-dataupd="get_data" @child-datasel="setUserSelectPoint" v-bind="{ymd: getYYYYMMDD(), uniqid:this.param_uniqid ,traceid:this.param_traceid,jigyoid:this.param_jigyoid,jigyoid_kotei:this.param_jigyoid_kotei,kotei_kbn:2 }"></component>
          <component class="mt-3" :is="kotei004" ref="childkotei004" @child-dataupd="get_data" @child-datasel="setUserSelectPoint" v-bind="{ ymd: getYYYYMMDD(), uniqid:this.param_uniqid ,traceid:this.param_traceid,jigyoid:this.param_jigyoid,jigyoid_kotei:this.param_jigyoid_kotei,kotei_kbn:3 }"></component>
          <component class="mt-3" :is="kotei006" ref="childkotei006" @child-dataupd="get_data" @child-datasel="setUserSelectPoint" v-bind="{ ymd: getYYYYMMDD(), uniqid:this.param_uniqid ,traceid:this.param_traceid,jigyoid:this.param_jigyoid,jigyoid_kotei:this.param_jigyoid_kotei,kotei_kbn:4 }"></component>
          <component class="mt-3" :is="kotei008" ref="childkotei008" @child-dataupd="get_data" @child-datasel="setUserSelectPoint" v-bind="{ ymd: getYYYYMMDD(), uniqid:this.param_uniqid ,traceid:this.param_traceid,jigyoid:this.param_jigyoid,jigyoid_kotei:this.param_jigyoid_kotei,kotei_kbn:5 }"></component>
          <component class="mt-3" :is="kotei009" ref="childkotei009" @child-dataupd="get_data"  @child-datasel="setUserSelectPoint" v-bind="{ ymd: getYYYYMMDD(), uniqid:this.param_uniqid ,traceid:this.param_traceid,jigyoid:this.param_jigyoid,jigyoid_kotei:this.param_jigyoid_kotei,kotei_kbn:6 }"></component>
          <label class="clssdaititle0 mt-3"><b>◆家族の状況</b></label>
          <component class="mt-1" :is="kotei010" ref="childkotei010" @child-dataupd="get_data" @child-datasel="setUserSelectPoint" v-bind="{ ymd: getYYYYMMDD() , uniqid:this.param_uniqid ,traceid:this.param_traceid,jigyoid:this.param_jigyoid,jigyoid_kotei:this.param_jigyoid_kotei,kotei_kbn:100}"></component>
          <component class="mt-3" :is="kotei012" ref="childkotei012" @child-dataupd="get_data" @child-datasel="setUserSelectPoint" v-bind="{ ymd: getYYYYMMDD() , uniqid:this.param_uniqid ,traceid:this.param_traceid,jigyoid:this.param_jigyoid,jigyoid_kotei:this.param_jigyoid_kotei,kotei_kbn:101}"></component>
          <component class="mt-3" :is="kotei014" ref="childkotei014" @child-dataupd="get_data" @child-datasel="setUserSelectPoint" v-bind="{ ymd: getYYYYMMDD() , uniqid:this.param_uniqid ,traceid:this.param_traceid,jigyoid:this.param_jigyoid,jigyoid_kotei:this.param_jigyoid_kotei,kotei_kbn:102}"></component>
          <label class="clssdaititle0 mt-3"><b>◆社会的支援</b></label>
          <component class="mt-1" :is="kotei015" ref="childkotei015" @child-dataupd="get_data" @child-datasel="setUserSelectPoint" v-bind="{ ymd: getYYYYMMDD() , uniqid:this.param_uniqid ,traceid:this.param_traceid,jigyoid:this.param_jigyoid,jigyoid_kotei:this.param_jigyoid_kotei,kotei_kbn:200}"></component>
          <component class="mt-3" :is="kotei017" ref="childkotei017" @child-dataupd="get_data" @child-datasel="setUserSelectPoint" v-bind="{ ymd: getYYYYMMDD() , uniqid:this.param_uniqid ,traceid:this.param_traceid,jigyoid:this.param_jigyoid,jigyoid_kotei:this.param_jigyoid_kotei,kotei_kbn:201}"></component>
          <component class="mt-3" :is="kotei018" ref="childkotei018" @child-dataupd="get_data" @child-datasel="setUserSelectPoint" v-bind="{ ymd: getYYYYMMDD() , uniqid:this.param_uniqid ,traceid:this.param_traceid,jigyoid:this.param_jigyoid,jigyoid_kotei:this.param_jigyoid_kotei,kotei_kbn:202}"></component>
        </v-sheet>
    </v-sheet>
    </main>
  </div>
  <!--</container>-->
</template>

<script>
import UserList from '../../components/UserList.vue';
import KoteiinfList001 from '../../components/KoteiinfList-001.vue';
import KoteiinfList002 from '../../components/KoteiinfList-002.vue';
import KoteiinfList004 from '../../components/KoteiinfList-004.vue';
import KoteiinfList006 from '../../components/KoteiinfList-006.vue';
import KoteiinfList008 from '../../components/KoteiinfList-008.vue';
import KoteiinfList009 from '../../components/KoteiinfList-009.vue';
import KoteiinfList010 from '../../components/KoteiinfList-010.vue';
import KoteiinfList012 from '../../components/KoteiinfList-012.vue';
import KoteiinfList014 from '../../components/KoteiinfList-014.vue';
import KoteiinfList015 from '../../components/KoteiinfList-015.vue';
import KoteiinfList017 from '../../components/KoteiinfList-017.vue';
import KoteiinfList018 from '../../components/KoteiinfList-018.vue';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import '@grapecity/wijmo.touch';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import '@grapecity/wijmo.vue2.input';
import { getConnect } from '../../connect/getConnect';
import dayjs from '../../../node_modules/dayjs';
import * as wjCore from '@grapecity/wijmo';
let uniqid = 3; //テスト3を使用
let traceid = 123;
let jigyoid = 99999;
let jigyoid_kotei  = 99999;


export default {
  props: {
    selectedData: Object, // 検索条件等
  },
  components: {
    UserList,
    KoteiinfList001,
    KoteiinfList002,
    KoteiinfList004,
    KoteiinfList006,
    KoteiinfList008,
    KoteiinfList009,
    KoteiinfList010,
    KoteiinfList012,
    KoteiinfList014,
    KoteiinfList015,
    KoteiinfList017,
    KoteiinfList018,
  },
  data() {    
    return {
      // ****利用者表示エリアstart****
      userListComponentDatas: [], // ユーザー一覧データ
      userInfo: {}, // ユーザ一覧から選択した値
      filter: {},
      selintcode:0,

      //カレンダー
      picker: '',
      datepicker_dialog:false,
      KoteiYmd:"",

      //Getパラメータ
      GetSelInf:[],                  //API取得データ(本人)
      GetSelInf_kzk:[],              //API取得データ(家族)
      GetSelInf_syakai:[],           //API取得データ(社会)

      //基本パラメータ
      param_uniqid:uniqid,
      param_traceid:traceid,
      param_jigyoid:jigyoid,
      param_jigyoid_kotei:jigyoid_kotei,

      kotei001: 'KoteiinfList001' , //基本情報用パラメータ
      kotei002: 'KoteiinfList002' , //生活歴用パラメータ
      kotei004: 'KoteiinfList004' , //病歴用パラメータ
      kotei006: 'KoteiinfList006' , //既往歴用パラメータ
      kotei008: 'KoteiinfList008' , //医療保険パラメータ
      kotei009: 'KoteiinfList009' , //住環境パラメータ
      kotei010: 'KoteiinfList010' , //家族情報パラメータ
      kotei012: 'KoteiinfList012' , //介護者パラメータ
      kotei014: 'KoteiinfList014' , //住環境パラメータ
      kotei015: 'KoteiinfList015' , //関係機関パラメータ
      kotei017: 'KoteiinfList017' , //手帳情報パラメータ
      kotei018: 'KoteiinfList018' , //福祉ｻｰﾋﾞｽパラメータ
    };

  },

  methods:{
    get_data(wintcode) 
    {
      //API取得
      let _self = this;
      let params = [];
      let ymd = "";   //仮データ
      let intcode = wintcode;        //仮データ

      ymd = this.getYm();
      ymd = ymd.replace("年","");
      ymd = ymd.replace("月","");
      ymd = ymd.replace("日","");


      //パラメータ
      params = {
        uniqid: uniqid,
        traceid: traceid,    
        ymd: ymd,
        intcode: intcode,               

        Jigyoid: jigyoid_kotei,
        Kbn: 0,    
        Dataid: 0,
        Modeflg: 0,        
      };

      getConnect('/Koteiinf_HONNIN', params,'KOTEIINF').then((result) => {
        _self.GetSelInf = result;
        this.$refs.childkotei001.setUserData(intcode,_self.GetSelInf); //子要素の処理を実行 基本情報        
        this.$refs.childkotei002.setUserData(intcode,_self.GetSelInf); //子要素の処理を実行 生活歴
        this.$refs.childkotei004.setUserData(intcode,_self.GetSelInf); //子要素の処理を実行 既往歴
        this.$refs.childkotei006.setUserData(intcode,_self.GetSelInf); //子要素の処理を実行 受診状況
        this.$refs.childkotei008.setUserData(intcode,_self.GetSelInf); //子要素の処理を実行 医療保険
        this.$refs.childkotei009.setUserData(intcode,_self.GetSelInf); //子要素の処理を実行 生活状況
      })

      //家族情報
      getConnect('/Koteiinf_KAZOKU', params,'KOTEIINF').then((result_kzk) => {
        _self.GetSelInf_kzk = result_kzk;
        this.$refs.childkotei010.setUserData(intcode,_self.GetSelInf_kzk); //子要素の処理を実行 家族情報
        this.$refs.childkotei012.setUserData(intcode,_self.GetSelInf_kzk); //子要素の処理を実行 介護情報
        this.$refs.childkotei014.setUserData(intcode,_self.GetSelInf_kzk); //子要素の処理を実行 住環境
      });

      //社会情報
      getConnect('/Koteiinf_SYAKAI', params,'KOTEIINF').then((result_syakai) => {
        _self.GetSelInf_syakai = result_syakai;
        this.$refs.childkotei015.setUserData(intcode,_self.GetSelInf_syakai); //子要素の処理を実行 関係機関
        this.$refs.childkotei017.setUserData(intcode,_self.GetSelInf_syakai); //子要素の処理を実行 手帳情報
        this.$refs.childkotei018.setUserData(intcode,_self.GetSelInf_syakai); //子要素の処理を実行 介護サービス
      });      
    },
      setUserSelectPoint(row) {
        // ユーザ選択処理はここで行う

        //####登録チェック####

        //本人
        let flg = true;
        if(flg == true) flg = this.$refs.childkotei001.Chk_insdata(row); //子要素の処理を実行 基本情報
        if(flg == true) flg = this.$refs.childkotei002.Chk_insdata(row); //子要素の処理を実行 生活歴
        if(flg == true) flg = this.$refs.childkotei004.Chk_insdata(row); //子要素の処理を実行 既往歴
        if(flg == true) flg = this.$refs.childkotei006.Chk_insdata(row); //子要素の処理を実行 受診歴
        if(flg == true) flg = this.$refs.childkotei008.Chk_insdata(row); //子要素の処理を実行 医療保険
        if(flg == true) flg = this.$refs.childkotei009.Chk_insdata(row); //子要素の処理を実行 生活状況

        //家族
        if(flg == true) flg = this.$refs.childkotei012.Chk_insdata(row); //子要素の処理を実行 介護者情報
        if(flg == true) flg = this.$refs.childkotei014.Chk_insdata(row); //子要素の処理を実行 住環境

        //社会
        if(flg == true) flg = this.$refs.childkotei017.Chk_insdata(row); //子要素の処理を実行 手帳情報

        let winter = setInterval(() => {
              if(flg == true)
              {
                clearInterval(winter);
                this.userInfo = row;
                document.getElementById("Riyocd_id").innerHTML = wjCore.escapeHtml(this.userInfo.riyocode);
                document.getElementById("Riyonm_id").innerHTML = wjCore.escapeHtml(this.userInfo.names);
                this.get_data(this.userInfo.riid);                
              }
          }, 1000);
      },
      getSelectUserChildComponent(data) {
        this.userListComponentDatas = data;
      },
      get_scroll(kbn){
        //スクロールの位置
        var aera = document.getElementById("area_dai");        
        
        switch(kbn)
        {
          case 0: //基本情報
            aera.scrollTop = 0;
            break;
          case 1: //生活歴
            aera.scrollTop = 560;
            break;
          case 2: //既往歴
            aera.scrollTop = 1060;
            break;          
          case 3: //受診歴
            aera.scrollTop = 1820;
            break;          
          case 4: //医療保険
            aera.scrollTop = 2620;
            break;            
          case 5: //生活状況
            aera.scrollTop = 3400;
            break;            
          case 6: //家族情報
            aera.scrollTop = 4190;
            break;            
          case 7: //介護者情報
            aera.scrollTop = 4950;
            break;              
          case 8: //住環境
            aera.scrollTop = 5620;
            break;          
          case 9: //関係機関
            aera.scrollTop = 6310;
            break;            
          case 10: //手帳情報
            aera.scrollTop = 7085;
            break;            
          case 11: //福祉サービス
            aera.scrollTop = 7890;
            break;                                                                                                    
        }

      }

      ,getYm() 
      {
        //#####カレンダーセット#####
        if (!this.Ym) 
        {
            this.Ym = dayjs();
            this.picker = this.Ym.year() + '-' + this.Ym.format('MM');
        }
        return (
          this.Ym.format('YYYY') + '年' + this.Ym.format('MM') + '月' + this.Ym.format('DD') + '日'
        );
      }
      ,getYYYYMMDD() 
      {
        //#####カレンダーをYYYYMMDD形式で返す#####
        let ymd = "";

        ymd = this.getYm();
        ymd = ymd.replace("年","");
        ymd = ymd.replace("月","");
        ymd = ymd.replace("日","");
        return ymd;
      }

      ,inputCalendarClick(){
        this.picker =
        this.Ym.format('YYYY') +
        '-' +
        this.Ym.format('MM') +
        '-' +
        this.Ym.format('DD');
        this.datepicker_dialog = true; 
      }
      ,monthSelect() 
      {
        this.Ym = dayjs(this.picker);
        this.datepicker_dialog = false;
        this.get_data(this.userInfo.riid);
      }
  }

};

//スクロールジャンク対策
document.addEventListener('wheel', function(){}, {passive: true});
document.addEventListener('mousewheel', function(){}, {passive: true});

</script>

<style  lang="scss">

  .main {
    background-color: #F4F6F9;
  }
  .KoteiinfList {
    display: grid;
    grid-template-columns: 272px 70px 1000px 10px;
    grid-template-rows: 0px 1fr;
  }
  //枠組み
  .aside {
    grid-column-start: 1;
    grid-column-end: auto;
    grid-row-start: 2;
    grid-row-end: 2;
  }
  .centermenu {
    display: block;
    background-color: #F4F6F9;
    grid-column-start: 2;
    grid-column-end: auto;
    grid-row-start: 2;
    grid-row-end: 2;
  }
  .main {
    display: block;
    grid-column-start: 3;
    grid-column-end: auto;
    grid-row-start: 2;
    grid-row-end: 2;
  }
  //右側利用者表示
  .clssheet-dai0{
    padding: 7px 7px;
    margin: 3px 5px;
    height:  67px;
   }
   .clssdaititle0{
    margin-left: 10px;
    font-size: large;
    color:#1d5c81;
   }
  //中央ボタン
  .clsbtnmenu{
    margin-top: 3px;
    margin-left: 7px;
    height: 50px !important;
    width: 50px !important;
    background-color: #ffffff !important;
    color:#0081eb !important;
    border: thin solid #a5a5a5;
  }
  .clssdaititle-center{
    margin-left: 10px;
    font-size: medium;
    color:#000000;
   }
   .clsstitlecenter0{
    margin-left: 20px;
    margin-top: 5px;
    font-size: 16px;
    color:#1d5c81;
   }
   //固定情報メイン
   .wrap001-dai1{
    display:block;
    margin-bottom: 20px;
    margin-top: 10px;
    margin-left: -6px;
    height:84vh;
    overflow-y: scroll;
  }
  .cls001{
    margin-left: 0px;
  }

  .RiyoLabel{
    display:inline-flex;
  }

  //利用者名ラベル  
  .clssdaititle0_a{
    //利用者コード
    font-size: large;
    //color:#1d5c81;
    color:#fff;

    background-color: #27904d;
    //background-color: #dffae0;
    margin-left: 0px;
    height: 25px;
    width: 90px;
    line-height:25px;
    text-align: center;
    border: 1px solid;
    border-color: #27904d;
  }
  .clssdaititle0_b{
    //利用者コード
    background-color: #fffeee;
    margin-left: 0px;
    height: 25px;
    width: 110px;
    line-height:25px;
    text-align: center;
    border: 1px solid;
    //border-color: #8ffd7a;
    border-color: #27904d;
    font-size: large;
  }
  .clssdaititle0_c{
    //利用者名
    background-color: #fffeee;
    margin-left: -1px;
    height: 25px;
    width: 300px;
    line-height:25px;
    text-align: left;
    border: 1px solid;
    //border-color: #8ffd7a;
    border-color: #27904d;
    font-size: large;
  }



</style>
