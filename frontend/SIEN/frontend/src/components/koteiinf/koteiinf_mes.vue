<template>
    <v-sheet id="message_id" class="sheet Mes" elevation="2">
        
        <!--ラベル-->
        <div id="mes_label" class="titlelabel"></div>

        <div style="padding: 8px 8px 8px 8px;">
            <!--タイトル-->
            <div class="areaMes title">
                <label class="clslabelMes"> {{ msg_ttl }} </label>
            </div>

            <!--内容-->
            <div v-show="visible_naiyo" class="areaMes naiyo" style="margin-top: 8px;">
                <label class="clslabelMes"> {{ msg_naiyo }} </label>
            </div>

            <!--データ-->
            <div v-show="visible_data" class="areaMes data" style="margin-top: 8px;">
                <label class="clslabelMes"> {{ msg_datattl }} </label>

                <textarea class="textarea mes" v-model ="msg_data"></textarea>

            </div>

            <div class="areaMes btn" style="margin-top: 20px;">
                <div class="areaMes Ok">
                    <v-btn class="btn def mes" v-show="flg_YesNo" @click="onClick_Massege(1)">
                        いいえ
                    </v-btn>
                </div>

                <div class="areaMes Ok">
                    <v-btn class="btn def mes" v-show="flg_YesNo == false" width="80" @click="onClick_Massege(0)">
                        O K
                    </v-btn>
                </div>

                <v-btn class="btn pri mes" v-show="flg_YesNo" @click="onClick_Massege(0)">
                    はい
                </v-btn>
            </div>
        </div>
    </v-sheet>
</template>

<script>

export default {
    data() {
        return {
            flg_YesNo: true,
            Dialog_Message: "",

            msg_ttl: "", //タイトル
            msg_naiyo: "", //内容
            msg_datattl: "", //データタイトル
            msg_data: "", //データ

            visible_naiyo: true,
            visible_data: true,
        }
    },

    methods: {

        //クリック時の処理
        onClick_Massege(kbn) {
            this.$emit('set_result', kbn);
        }

        //メッセージボックスの設定情報を受け取る
        //kbn: T:「はい、いいえ」F:OK
        //msg:表示するメッセージ
        //naiyo:内容
        //datatitle:データタイトル
        //data:データ
        , set_msginf(kbn, msg, naiyo = "", datatitle = "", data = "") {
            this.flg_YesNo = kbn;
            this.Dialog_Message = msg;

            this.msg_ttl = msg,              //タイトル
                this.msg_naiyo = naiyo,          //内容
                this.msg_datattl = datatitle,    //データタイトル
                this.msg_data = data,            //データ

                //表示設定
                this.visible_naiyo = true;  //内容エリア
            this.visible_data = true;   //データエリア
            if (naiyo.trim() == "" && datatitle.trim() == "" && data.trim() == "") {
                this.visible_data = false;
                this.visible_naiyo = false;
                document.getElementById("message_id").style.height = "100px";
            }
            else if (naiyo.trim() == "") {
                this.visible_naiyo = false;
                document.getElementById("message_id").style.height = "236px";
            }
            else if (datatitle.trim() == "" && data.trim() == "") {
                this.visible_data = false;
                document.getElementById("message_id").style.height = "152px";
            }

        }
    }
}

</script>

