<template>
  <div id="connectSIENT">
    <h2>API接続テスト</h2>
    <h3>SIENT</h3>
    <v-card class="pl-2 d-flex" style="flex-wrap: wrap">
      <v-card class="pl-2 mb-2" style="width: 50%">
        <div class="mb-2">相談・対応項目マスタ取得接続=>{{ sodantaiou }}</div>
        <div class="d-block">
          <div>相談・対応項目マスタ新規登録=>{{ post_sodantaiou }}</div>
          <div class="d-flex">
            <v-text-field
              v-model="jigyoid_sodantaiou"
              label="jigyoid"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="postSodanTaiou" class="ml-3" small>登録</v-btn>
          </div>
        </div>
        <div class="mb-2 d-block">
          <div>相談・対応項目マスタ更新登録=>{{ put_sodantaiou }}</div>
          ※namesを更新
          <div class="d-flex">
            <v-text-field
              v-model="put_jigyoid_sodantaiou"
              label="jigyoid"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-text-field
              v-model="put_names"
              label="names"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="putSodanTaiou" class="ml-3" small>更新</v-btn>
          </div>
        </div>
        <div class="mb-2 d-block">
          <div>相談・対応項目マスタ削除=>{{ delete_sodantaiou }}</div>
          <div class="d-flex">
            <v-btn @click="deleteSodanTaiou" class="ml-3" small>削除</v-btn>
          </div>
        </div>
      </v-card>
      <v-card class="pl-2 mb-2" style="width: 50%">
        <div class="mb-2">方法マスタ取得=>{{ houhou }}</div>
        <div class="mb-2 d-block">
          <div>方法マスタ新規登録=>{{ post_houhou }}</div>
          ※:"sdnhouid": {{ post_sdnhouid_houhou }}で登録<br />
          ※:"mBunrui:1"、Jigyoid: 43<br />
          ※:まだ登録がないIDで登録をすれば成功する※推奨62<br />
          <div class="d-flex">
            <v-text-field
              v-model="post_sdnhouid_houhou"
              label="sdnhouid"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="postHouhou" class="ml-3" small>登録</v-btn>
          </div>
        </div>
        <div class="mb-2 d-block">
          <div>方法マスタ更新登録=>{{ put_houhou }}</div>
          ※sdnhounmを更新<br />
          ※sdnhounmを更新<br />
          ※sdnhouidを入力
          <div class="d-flex">
            <v-text-field
              v-model="put_sdnhouid_houhou"
              label="sdnhouid"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-text-field
              v-model="put_sdnhounm_houhou"
              label="sdnhounm"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="putHouhou" class="ml-3" small>更新</v-btn>
          </div>
        </div>
        <div class="mb-2 d-block">
          <div>方法マスタ削除=>{{ delete_houhou }}</div>
          ※削除するsdnhouidを入力
          <div class="d-flex">
            <v-text-field
              v-model="delete_sdnhouid_houhou"
              label="sdnhouid"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="deleteHouhou" class="ml-3" small>削除</v-btn>
          </div>
        </div>
      </v-card>
      <v-card class="pl-2 mb-2" style="width: 50%">
        <div class="mb-2">関係マスタ取得=>{{ kankei }}</div>
        <div class="d-block">
          <div>関係マスタ新規登録=>{{ post_kankei }}</div>
          ※:"mBunrui:1"、Jigyoid: 2
          <div class="d-flex">
            <v-text-field
              v-model="post_sdnkandaiid_kankei"
              label="sdnkandaiid"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="postKankei" class="ml-3" small>登録</v-btn>
          </div>
        </div>
        <div class="mb-2 d-block">
          <div>関係更新登録=>{{ put_kankei }}</div>
          ※sdnkannmを更新 ※:"mBunrui:1"、Jigyoid: 2
          <div class="d-flex">
            <v-text-field
              v-model="put_sdnkandaiid_kankei"
              label="sdnkandaiid"
              solo
              style="width: 120px; flex: none"
            ></v-text-field>
            <v-text-field
              v-model="put_sdnkannm_kankei"
              label="sdnkannm"
              solo
              style="width: 120px; flex: none"
            ></v-text-field>
            <v-btn @click="putKankei" class="ml-3" small>更新</v-btn>
          </div>
        </div>
        <div class="mb-2 d-block">
          ※:"mBunrui:1"、Jigyoid: 2、Sdnkanchuid:0
          <div>関係削除=>{{ delete_kankei }}</div>
          <div class="d-flex">
            <v-text-field
              v-model="delete_sdnkanid_kankei"
              label="jigyoid"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="deleteKankei" class="ml-3" small>削除</v-btn>
          </div>
        </div>
      </v-card>
      <v-card class="pl-2 mb-2" style="width: 50%">
        <div class="mb-2">時刻設定マスタ取得=>{{ jikoku }}</div>
        <div class="d-block">
          <div>時刻設定マスタ新規登録=>{{ post_jikoku }}</div>
          ※:"jigyoid": {{ post_jigyoid_jikoku }}で登録<br />
          ※:まだ登録がないIDで登録をすれば成功する<br />
          ※:返却が空だった場合接続成功（想定通りか質問中）
          <div class="d-flex">
            <v-text-field
              v-model="post_jigyoid_jikoku"
              label="jigyoid"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="postJikoku" class="ml-3" small>登録</v-btn>
          </div>
        </div>
        <div class="mb-2 d-block">
          <div>時刻設定更新登録=>{{ put_jikoku }}</div>
          ※:"jigyoid" = {{ put_jigyoid_jikoku }}のtimegozenjを更新<br />
          ※:返却が空だった場合接続成功（想定通りか質問中）
          <div class="d-flex">
            <v-text-field
              v-model="put_jigyoid_jikoku"
              label="jigyoid"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-text-field
              v-model="timegozenj"
              label="sdnkannm"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="putJikoku" class="ml-3" small>更新</v-btn>
          </div>
        </div>
        <div class="mb-2 d-block">
          <div>時刻設定削除=>{{ delete_jikoku }}</div>
          ※"jigyoid" = {{ delete_jigyoid_jikoku }}を削除
          <div class="d-flex">
            <v-text-field
              v-model="delete_jigyoid_jikoku"
              label="jigyoid"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="deleteJikoku" class="ml-3" small>削除</v-btn>
          </div>
        </div>
      </v-card>
      <v-card class="pl-2 mb-2" style="width: 50%">
        <div class="mb-2">検印マスタ取得=>{{ kenin }}</div>
        <div class="d-block">
          <div>検印マスタマスタ新規登録=>{{ post_kenin }}</div>
          ※:"jigyoid": {{ post_Jigyoid_kenin }}で登録<br />
          ※:まだ登録がないIDで登録をすれば成功する<br />
          <div class="d-flex">
            <v-text-field
              v-model="post_Jigyoid_kenin"
              label="jigyoid"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="postKenin" class="ml-3" small>登録</v-btn>
          </div>
        </div>
        <div class="mb-2 d-block">
          <div>検印マスタ更新登録=>{{ put_kenin }}</div>
          ※:"jigyoid" = {{ put_Jigyoid_kenin }}のkennam1を更新<br />
          <div class="d-flex">
            <v-text-field
              v-model="put_Jigyoid_kenin"
              label="jigyoid"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-text-field
              v-model="kennam1"
              label="sdnkannm"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="putKenin" class="ml-3" small>更新</v-btn>
          </div>
        </div>
      </v-card>
      <v-card class="pl-2 mb-2" style="width: 50%">
        <div class="mb-2">
          集計区分マスタ_サービス区分取得=>{{ syukeikbnren }}
        </div>
      </v-card>
      <v-card class="pl-2" style="width: 50%">
        <div class="mb-2">休日設定取得=>{{ kyujitu }}</div>
        <div>休日設定新規登録=>{{ post_kyujitu }}</div>
        <div class="d-flex">
          <v-btn @click="postKyujitu" class="ml-3" small>登録</v-btn>
        </div>
        <div class="mb-2 d-block">
          <div>休日設定更新登録=>{{ put_kyujitu }}</div>
          ※日付を更新
          <div class="d-flex">
            <v-text-field
              v-model="put_symd_kyujitu"
              label="symd"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="putKyujitu" class="ml-3" small>更新</v-btn>
          </div>
        </div>
      </v-card>
      <v-card class="pl-2" style="width: 50%">
        <div class="mb-2">
          集計条件マスタ取得=>{{ syukeijkn }}
          <div class="mb-2">集計条件取得=>{{ syukeijkn }}</div>
          <div>集計条件マスタ新規登録=>{{ post_syukeijkn }}</div>
          ※:"jigyoid": {{ post_Jigyoid_syukeijkn }}で登録<br />
          ※:まだ登録がないIDで登録をすれば成功する
          <div class="d-flex">
            <v-text-field
              v-model="post_Jigyoid_syukeijkn"
              label="jigyoid"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="postSyukeijkn" class="ml-3" small>登録</v-btn>
          </div>
          <div class="mb-2 d-block">
            <div>集計条件マスタ更新登録=>{{ put_syukeijkn }}</div>
            ※"jigyoid" = {{ put_Jigyoid_syukeijkn }}のvvalueを更新
            <div class="d-flex">
              <v-text-field
                v-model="put_Jigyoid_syukeijkn"
                label="jigyoid"
                solo
                style="width: 100px; flex: none"
              ></v-text-field>
              <v-text-field
                v-model="put_vvalue_syukeijkn"
                label="vvalue"
                solo
                style="width: 100px; flex: none"
              ></v-text-field>
              <v-btn @click="putSyukeijkn" class="ml-3" small>更新</v-btn>
            </div>
          </div>
        </div>
      </v-card>
      <v-card class="pl-2" style="width: 50%">
        <div class="mb-2">集計区分マスタ取得=>{{ syukeikbn }}</div>
        <div class="d-block">
          <div>集計区分マスタ新規登録=>{{ post_syukeikbn }}</div>
          ※:"jigyoid": {{ post_Jigyoid_syukeikbn }}で登録<br />
          ※:まだ登録がないIDで登録をすれば成功する<br />
          <div class="d-flex">
            <v-text-field
              v-model="post_Jigyoid_syukeikbn"
              label="jigyoid"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="postSyukeikbn" class="ml-3" small>登録</v-btn>
          </div>
        </div>
        <div class="mb-2 d-block">
          <div>集計区分更新登録=>{{ put_syukeikbn }}</div>
          ※:"jigyoid" = {{ put_Jigyoid_syukeikbn }}のnameを更新<br />
          <div class="d-flex">
            <v-text-field
              v-model="put_Jigyoid_syukeikbn"
              label="jigyoid"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-text-field
              v-model="put_name_syukeikbn"
              label="name"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="putSyukeikbn" class="ml-3" small>更新</v-btn>
          </div>
        </div>
        <div class="mb-2 d-block">
          <div>集計区分削除=>{{ delete_syukeikbn }}</div>
          ※"jigyoid" = {{ delete_jigyoid_syukeikbn }}を削除
          <div class="d-flex">
            <v-text-field
              v-model="delete_jigyoid_syukeikbn"
              label="jigyoid"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="deleteSyukeikbn" class="ml-3" small>削除</v-btn>
          </div>
        </div>
      </v-card>
      <v-card class="pl-2" style="width: 50%">
        <div class="mb-2">集計区分連結マスタ取得=>{{ syukeiren }}</div>
        <div class="d-block">
          <div>集計区分連結マスタ新規登録=>{{ post_syukeiren }}</div>
          ※:"jigyoid": {{ post_Jigyoid_syukeiren }}で登録<br />
          ※:まだ登録がないIDで登録をすれば成功する<br />
          <div class="d-flex">
            <v-text-field
              v-model="post_Jigyoid_syukeiren"
              label="jigyoid"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="postSyukeiren" class="ml-3" small>登録</v-btn>
          </div>
        </div>
        <div class="mb-2 d-block">
          <div>集計区分連結マスタ更新登録=>{{ put_syukeiren }}</div>
          ※:"jigyoid" = {{ put_Jigyoid_syukeiren }}のcskmkidを更新<br />
          <div class="d-flex">
            <v-text-field
              v-model="put_Jigyoid_syukeiren"
              label="jigyoid"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-text-field
              v-model="put_cskmkid_syukeiren"
              label="cskmkid"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="putSyukeiren" class="ml-3" small>更新</v-btn>
          </div>
        </div>
      </v-card>
      <v-card class="pl-2" style="width: 50%">
        <div class="mb-2">相談外業務マスタ取得=>{{ soudangai }}</div>
        <div class="d-block">
          <div>相談外業務マスタ新規登録=>{{ post_soudangai }}</div>
          ※:"jigyoid": 1かつsdngaiid（内部id） ={{
            post_sdngaiid_soudangai
          }}で登録<br />
          ※:まだ登録がないIDで登録をすれば成功する<br />
          <div class="d-flex">
            <v-text-field
              v-model="post_sdngaiid_soudangai"
              label="sdngaiid"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="postSoudangai" class="ml-3" small>登録</v-btn>
          </div>
        </div>
        <div class="mb-2 d-block">
          <div>相談外業務更新登録=>{{ put_soudangai }}</div>
          ※:"jigyoid" = 1かつsdngaiid（内部id） =
          {{ put_sdngaiid_soudangai }}のsdngainmを更新<br />
          <div class="d-flex">
            <v-text-field
              v-model="put_sdngaiid_soudangai"
              label="sdngaiid"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-text-field
              v-model="put_sdngainm_soudangai"
              label="sdngainm"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="putSoudangai" class="ml-3" small>更新</v-btn>
          </div>
        </div>
        <div class="mb-2 d-block">
          <div>相談外業務削除=>{{ delete_soudangai }}</div>
          ※:"jigyoid" = 1かつ"sdngaiid（内部id）" =
          {{ delete_sdngaiid_soudangai }}の値を削除
          <div class="d-flex">
            <v-text-field
              v-model="delete_sdngaiid_soudangai"
              label="sdngaiid（内部id）"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="deleteSoudangai" class="ml-3" small>削除</v-btn>
          </div>
        </div>
      </v-card>
      <v-card class="pl-2" style="width: 50%">
        <div class="mb-2">業務内容マスタ取得=>{{ gyoumu }}</div>
        <div class="d-block">
          <div>業務内容マスタ新規登録=>{{ post_gyoumu }}</div>
          ※:"jigyoid": 1かつgyonaiid（内部id） ={{
            post_gyonaiid_gyoumu
          }}で登録<br />
          ※:まだ登録がないIDで登録をすれば成功する<br />
          <div class="d-flex">
            <v-text-field
              v-model="post_gyonaiid_gyoumu"
              label="gyonaiid"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="postGyoumu" class="ml-3" small>登録</v-btn>
          </div>
        </div>
        <div class="mb-2 d-block">
          <div>業務内容更新登録=>{{ put_gyoumu }}</div>
          ※:"jigyoid" = 1かつgyonaiid =
          {{ put_gyonaiid_gyoumu }}のgyonainmを更新<br />
          <div class="d-flex">
            <v-text-field
              v-model="put_gyonaiid_gyoumu"
              label="gyonaiid"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-text-field
              v-model="put_gyonainm_gyoumu"
              label="gyonainm"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="putGyoumu" class="ml-3" small>更新</v-btn>
          </div>
        </div>
        <div class="mb-2 d-block">
          <div>業務内容削除=>{{ delete_gyoumu }}</div>
          ※:"jigyoid" = 1かつ"gyonaiid" =
          {{ delete_gyonaiid_gyoumu }}の値を削除
          <div class="d-flex">
            <v-text-field
              v-model="delete_gyonaiid_gyoumu"
              label="gyonaiid"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="deleteGyoumu" class="ml-3" small>削除</v-btn>
          </div>
        </div>
      </v-card>
      <v-card class="pl-2" style="width: 50%">
        <div class="mb-2">タイトルマスタ取得=>{{ title }}</div>
        <div class="d-block">
          <div>タイトルマスタ新規登録=>{{ post_title }}</div>
          ※"jigyoid": 1、kubun: 1 で登録<br />
          ※ bunkbn{{ post_bunkbn }}で登録<br />
          ※まだ登録がないbunkbnで登録をすれば成功する<br />
          <div class="d-flex">
            <v-text-field
              v-model="post_bunkbn"
              label="bunkbn"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="postTitle" class="ml-3" small>登録</v-btn>
          </div>
        </div>
        <div class="mb-2 d-block">
          <div>タイトルマスタ更新登録=>{{ put_title }}</div>
          ※"jigyoid": 1、kubun: 1 で登録<br />
          ※ titleを更新<br />
          <div class="d-flex">
            <v-text-field
              v-model="put_bunkbn"
              label="bunkbn"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-text-field
              v-model="put_title_title"
              label="title"
              solo
              style="width: 100px; flex: none"
            ></v-text-field>
            <v-btn @click="putTitle" class="ml-3" small>更新</v-btn>
          </div>
        </div>
      </v-card>
    </v-card>
  </div>
</template>
<script>
// ApiConnectフォルダで使用の場合
import { getConnect } from '../../../../connect/getConnect';
import { postConnect } from '../../../../connect/postConnect';
import { putConnect } from '../../../../connect/putConnect';
import { deleteConnect } from '../../../../connect/deleteConnect';
// viewsフォルダのファイルでは以下を使用
// import { getConnect } from '@connect/getConnect';
// import { postConnect } from '@connect/postConnect';
// import { putConnect } from '@connect/putConnect';
// import { deleteConnect } from '@connect/deleteConnect';

let uniqid = 1; // 現在は1のみapiが実行する
let traceid = 123;
let pJigyoid = 43;
let jigyoid = 1;
let pSymd = '20000101';
let pEymd = '20001231';
let pKbn = 1;
let syurui = 1;
let bunruni = 1;
let nen = 2020;

export default {
  data() {
    return {
      // SIENT
      // 相談対応
      sodantaiou: '未接続',
      post_sodantaiou: '未接続',
      jigyoid_sodantaiou: '',
      put_sodantaiou: '未接続',
      put_jigyoid_sodantaiou: '',
      put_names: '',
      delete_sodantaiou: '未接続',
      // 方法
      houhou: '未接続',
      post_houhou: '未接続',
      put_houhou: '未接続',
      delete_houhou: '未接続',
      post_sdnhouid_houhou: '',
      put_sdnhouid_houhou: '',
      put_sdnhounm_houhou: '',
      delete_sdnhouid_houhou: '',
      // 関係
      kankei: '未接続',
      post_kankei: '未接続',
      put_kankei: '未接続',
      delete_kankei: '未接続',
      post_sdnkandaiid_kankei: '',
      put_sdnkandaiid_kankei: '',
      put_sdnkannm_kankei: '',
      delete_sdnkanid_kankei: '',
      // 検印
      kenin: '未接続',
      post_kenin: '未接続',
      put_kenin: '未接続',
      kennam1: 'kennam1',
      post_Jigyoid_kenin: '',
      put_Jigyoid_kenin: '',
      // 集計条件
      syukeijkn: '未接続',
      post_syukeijkn: '未接続',
      put_syukeijkn: '未接続',
      post_Jigyoid_syukeijkn: '',
      put_Jigyoid_syukeijkn: '',
      put_vvalue_syukeijkn: '',
      // 集計区分
      syukeikbn: '未接続',
      post_syukeikbn: '未接続',
      put_syukeikbn: '未接続',
      delete_syukeikbn: '未接続',
      post_Jigyoid_syukeikbn: '',
      put_Jigyoid_syukeikbn: '',
      put_name_syukeikbn: '',
      delete_jigyoid_syukeikbn: '',
      // 集計区分連結
      syukeiren: '未接続',
      post_syukeiren: '未接続',
      put_syukeiren: '未接続',
      delete_syukeiren: '未接続',
      post_Jigyoid_syukeiren: '',
      put_Jigyoid_syukeiren: '',
      put_cskmkid_syukeiren: '',
      // 相談外業務
      soudangai: '未接続',
      post_soudangai: '未接続',
      put_soudangai: '未接続',
      delete_soudangai: '未接続',
      post_sdngaiid_soudangai: '',
      put_sdngaiid_soudangai: '',
      put_sdngainm_soudangai: '',
      delete_sdngaiid_soudangai: '',
      // 業務内容
      gyoumu: '未接続',
      post_gyoumu: '未接続',
      put_gyoumu: '未接続',
      delete_gyoumu: '未接続',
      post_gyonaiid_gyoumu: '',
      put_gyonaiid_gyoumu: '',
      put_gyonainm_gyoumu: '',
      delete_gyonaiid_gyoumu: '',
      // 時刻
      jikoku: '未接続',
      post_jikoku: '未接続',
      put_jikoku: '未接続',
      delete_jikoku: '未接続',
      timegozenj: '09:00',
      post_jigyoid_jikoku: '',
      put_jigyoid_jikoku: '',
      delete_jigyoid_jikoku: '',
      // 休日
      kyujitu: '未接続',
      post_kyujitu: '未接続',
      put_kyujitu: '未接続',
      put_symd_kyujitu: '',
      syukeikbnren: '未接続',
      // タイトル
      title: '未接続',
      post_title: '未接続',
      put_title: '未接続',
      delete_title: '未接続',
      post_bunkbn: '',
      put_bunkbn: '',
      put_title_title: '',
    };
  },
  mounted() {
    /**
     * SIENT
     */
    // params の違いごとにgetDataでコンソールログ表示
    // GET
    this.getSientData1();
    // 時刻設定マスタ取得;
    this.getSientData2();
    // 休日設定を取得
    this.getSientData3();
    // 集計区分マスタ_サービス区分の取得
    this.getSientData4();
    //  タイトルマスタを取得
    this.getSientData5();
  },
  methods: {
    /**
     * GET
     */
    async getSientData1() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        pJigyoid: pJigyoid,
      };
      // 相談・対応項目マスタ取得
      getConnect('/MstSodanTaiou', params, 'SIENT').then((result) => {
        console.log('相談・対応項目マスタ取得:/sodan/v1/mst/sodantaiou ');
        console.log(result);
        if (result !== undefined) {
          this.sodantaiou = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
      // 方法マスタ取得
      getConnect('/MstHouhou', params, 'SIENT').then((result) => {
        console.log('方法マスタ取得:/sodan/v1/mst/houhou/');
        console.log(result);
        if (result !== undefined) {
          this.houhou = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
      // 関係マスタ取得
      getConnect('/MstKankei', params, 'SIENT').then((result) => {
        console.log('関係マスタ取得:/sodan/v1/mst/kankei/');
        console.log(result);
        if (result !== undefined) {
          this.kankei = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
      // 検印マスタを取得
      getConnect('/MstKenin', params, 'SIENT').then((result) => {
        console.log('検印マスタを取得:/sodan/v1/mst/kenin/');
        console.log(result);
        if (result !== undefined) {
          this.kenin = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
      // 集計条件マスタ取得
      getConnect('/MstSyukeijkn', params, 'SIENT').then((result) => {
        console.log('集計条件マスタ取得:/sodan/v1/mst/syukeijkn/');
        console.log(result);
        if (result !== undefined) {
          this.syukeijkn = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
      // 集計区分マスタ取得
      getConnect('/MstSyukeikbn', params, 'SIENT').then((result) => {
        console.log('集計区分マスタ取得:/sodan/v1/mst/syukeikbn/');
        console.log(result);
        if (result !== undefined) {
          this.syukeikbn = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
      // 集計区分連結マスタ取得
      getConnect('/MstSyukeiren', params, 'SIENT').then((result) => {
        console.log('集計区分連結マスタ取得:/sodan/v1/mst/syukeiren/');
        console.log(result);
        if (result !== undefined) {
          this.syukeiren = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
      // 相談外業務マスタを取得
      getConnect('/MstSoudangai', params, 'SIENT').then((result) => {
        console.log('相談外業務マスタを取得:/sodan/v1/mst/soudangai/');
        console.log(result);
        if (result !== undefined) {
          this.soudangai = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
      //  業務内容マスタを取得
      getConnect('/MstGyoumu', params, 'SIENT').then((result) => {
        console.log(' 業務内容マスタを取得:/sodan/v1/mst/gyoumu/');
        console.log(result);
        if (result !== undefined) {
          this.gyoumu = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    async getSientData2() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        jigyoid: jigyoid,
      };
      // 時刻設定マスタ取得
      getConnect('/MstJikoku', params, 'SIENT').then((result) => {
        console.log('時刻設定マスタ取得:/sodan/v1/mst/jikoku/');
        console.log(result);
        if (result !== undefined) {
          this.jikoku = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    async getSientData3() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        pJigyoid: 1,
        pSymd: pSymd,
        pEymd: pEymd,
      };
      // 休日設定を取得
      getConnect('/MstKyujitu', params, 'SIENT').then((result) => {
        console.log('休日設定を取得:/sodan/v1/mst/kyujitu/');
        console.log(result);
        if (result !== undefined) {
          this.kyujitu = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    async getSientData4() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
      };
      // 集計区分マスタ_サービス区分の取得
      getConnect('/MstSyukeikbnren', params, 'SIENT').then((result) => {
        console.log(
          '集計区分マスタ_サービス区分の取得:/sodan/v1/mst/syukeikbnren/'
        );
        console.log(result);
        if (result !== undefined) {
          this.syukeikbnren = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    async getSientData5() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        pJigyoid: pJigyoid,
        pKbn: pKbn,
      };
      // タイトルマスタを取得
      getConnect('/MstTitle', params, 'SIENT').then((result) => {
        console.log('タイトルマスタを取得:/sodan/v1/mst/title/');
        console.log(result);
        if (result !== undefined) {
          this.title = '接続OK';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },

    /**
     * POST/PUT/DELETE
     */

    // 相談・対応項目マスタ新規登録
    async postSodanTaiou() {
      let params = {
        uniqid: 1,
        traceid: 123,
        syurui: syurui,
        bunruni: bunruni,
      };
      let inputParams = {
        jigyoid: 1,
        cskmkid: 1,
        code: 1,
        names: '名称テストテスト ',
        ryaku: '略称テストテスト',
        csjknid: 0,
        koteiflg: 0,
        daicskmk: 1,
        color: 1,
        syukflg: 1,
        yukoflg: 1,
        nikeiflg: 1,
        cssaiid: 1,
        r1: 0,
        r2: 0,
        r3: 0,
        r4: 0,
        r5: 0,
      };
      postConnect('/MstSodanTaiou', params, 'SIENT', inputParams).then(
        (result) => {
          console.log(
            ' 相談・対応項目マスタ新規登録:/sodan/v1/mst/sodanTaiou/'
          );
          console.log(result);
          if (result !== undefined) {
            this.post_sodantaiou = result;
          } else {
            this.post_sodantaiou = 'failed';
          }
          console.log('---------------------------------------------------');
          return result;
        }
      );
    },
    // 相談・対応項目マスタ更新登録
    async putSodanTaiou() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        syurui: syurui,
        bunruni: bunruni,
      };
      let inputParams = {
        jigyoid: 1,
        cskmkid: 1,
        code: 1,
        names: this.put_names,
        ryaku: '略称テストテスト2',
        csjknid: 0,
        koteiflg: 0,
        daicskmk: 1,
        color: 1,
        syukflg: 1,
        yukoflg: 1,
        nikeiflg: 1,
        cssaiid: 1,
        r1: 0,
        r2: 0,
        r3: 0,
        r4: 0,
        r5: 0,
      };
      putConnect('/MstSodanTaiou', params, 'SIENT', inputParams).then(
        (result) => {
          console.log(
            ' 相談・対応項目マスタ更新登録:/sodan/v1/mst/sodanTaiou/'
          );
          console.log(result);
          if (result !== undefined) {
            this.put_sodantaiou = result;
          } else {
            this.put_sodantaiou = 'failed';
          }
          console.log('---------------------------------------------------');
          return result;
        }
      );
    },
    // 相談・対応項目マスタ削除
    async deleteSodanTaiou() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        syurui: syurui,
        bunruni: bunruni,
      };
      let inputParams = {
        jigyoid: 1,
        cskmkid: 1,
        cssaiid: 1,
      };
      deleteConnect('/MstSodanTaiou', params, 'SIENT', inputParams).then(
        (result) => {
          console.log(result);
          if (result !== undefined) {
            this.delete_sodantaiou = result;
          } else {
            this.delete_sodantaiou = 'failed';
          }
        }
      );
    },
    // 方法マスタ新規登録
    async postHouhou() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        mBunrui: 1,
      };
      let inputParams = {
        Jigyoid: 43,
        sdnhouid: Number(this.post_sdnhouid_houhou),
        sdnhoucd: Number(this.post_sdnhouid_houhou),
        sdnhounm: 'Test項目222',
        sdnhourk: 'T略',
        yukoflg: 0,
        nikeiflg: 0,
        sdnhourk2: 'T略2',
        sdnhoukigo: 'T',
        scaflg: 1,
      };
      postConnect('/MstHouhou', params, 'SIENT', inputParams).then((result) => {
        console.log('  方法マスタの新規登録:/sodan/v1/mst/houhou/');
        console.log(result);
        if (result !== undefined) {
          this.post_houhou = result;
        } else {
          this.post_houhou = 'Fail';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    // 方法マスタ更新登録
    async putHouhou() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        mBunrui: 1,
      };
      let inputParams = {
        jigyoid: 43,
        sdnhoudaiid: 1,
        sdnhouid: Number(this.put_sdnhouid_houhou),
        sdnhoucd: Number(this.put_sdnhouid_houhou),
        sdnhounm: this.put_sdnhounm_houhou,
        sdnhourk: '略称①',
        yukoflg: 1,
        nikeiflg: 1,
        sdnhourk2: '略称2①',
        sdnhoukigo: '記号①',
        scaflg: 1,
      };
      putConnect('/MstHouhou', params, 'SIENT', inputParams).then((result) => {
        console.log(' 方法マスタの更新登録:/sodan/v1/mst/houhou/');
        console.log(result);
        if (result !== undefined) {
          this.put_houhou = result;
        } else {
          this.put_houhou = 'Fail';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    // 方法マスタ削除
    async deleteHouhou() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        mBunrui: 1,
        Jigyoid: 43,
        sdnhouid: Number(this.delete_sdnhouid_houhou),
        sdnhouchuid: 0,
      };
      deleteConnect('/MstHouhou', params, 'SIENT').then((result) => {
        console.log(result);
        if (result !== undefined) {
          this.delete_houhou = result;
        } else {
          this.delete_houhou = 'failed';
        }
      });
    },

    // 関係マスタ新規登録
    async postKankei() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        mBunrui: 1,
      };
      let inputParams = {
        jigyoid: 2,
        // (中分類登録時1)
        sdnkandaiid: 0,
        sdnkancd: Number(this.post_sdnkandaiid_kankei),
        sdnkannm: '登録テストkankei',
        sdnkanrk: '家族',
        //  中分類登録時未使用
        honninflg: 2,
        // 中分類登録時未使用
        nikeiflg: 1,
      };
      postConnect('/MstKankei', params, 'SIENT', inputParams).then((result) => {
        console.log('  関係マスタの新規登録:/sodan/v1/mst/kankei/');
        console.log(result);
        if (result !== undefined) {
          this.post_kankei = result;
        } else {
          this.post_kankei = 'Fail';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    // 関係マスタ更新登録
    async putKankei() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        mBunrui: 1,
      };
      let inputParams = {
        jigyoid: 2,
        sdnkandaiid: 0,
        sdnkanid: Number(this.put_sdnkandaiid_kankei),
        sdnkancd: 2,
        sdnkannm: this.put_sdnkannm_kankei,
        sdnkanrk: '家族',
        honninflg: 2,
        nikeiflg: 1,
      };
      putConnect('/MstKankei', params, 'SIENT', inputParams).then((result) => {
        console.log('  関係マスタの更新登録:/sodan/v1/mst/kankei/');
        console.log(result);
        if (result !== undefined) {
          this.put_kankei = result;
        } else {
          this.put_kankei = 'Fail';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    // 関係マスタ削除
    async deleteKankei() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        mBunrui: 1,
        Jigyoid: 2,
        Sdnkanid: Number(this.delete_sdnkanid_kankei),
        // 中分類削除時は下記をIDに変更
        Sdnkanchuid: 0,
      };
      deleteConnect('/MstKankei', params, 'SIENT').then((result) => {
        console.log(result);
        if (result !== undefined) {
          this.delete_kankei = result;
        } else {
          this.delete_kankei = 'failed';
        }
      });
    },
    //  休日設定新規登録
    async postKyujitu() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        nen: nen,
      };
      let inputParams = {
        jigyoid: 1,
        kyujituList: [
          {
            symd: '20000101',
          },
        ],
      };
      postConnect('/MstKyujitu', params, 'SIENT', inputParams).then(
        (result) => {
          console.log('  休日設定新規登録:/sodan/v1/mst/kyujitu/');
          console.log(result);
          if (result !== undefined) {
            this.post_kyujitu = result;
          } else {
            this.post_kyujitu = 'Fail';
          }
          console.log('---------------------------------------------------');
          return result;
        }
      );
    },
    //  休日設定更新
    async putKyujitu() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        nen: nen,
      };
      let inputParams = {
        jigyoid: 1,
        kyujituList: [
          {
            symd: this.put_symd_kyujitu,
          },
        ],
      };
      putConnect('/MstKyujitu', params, 'SIENT', inputParams).then((result) => {
        console.log('  休日設定マスタの更新登録:/sodan/v1/mst/kyujitu/');
        console.log(result);
        if (result !== undefined) {
          this.put_kyujitu = result;
        } else {
          this.put_kyujitu = 'Fail';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    //  時刻設定マスタ新規登録
    async postJikoku() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
      };
      let inputParams = {
        jigyoid: Number(this.post_jigyoid_jikoku),
        timegozenj: '09:00',
        timegozeni: '12:00',
        timegozend: '09:00',
        gozenkinmflg: 1,
        timegogoj: '12:00',
        timegogoi: '18:00',
        timegogod: '12:00',
        gogokinmflg: 1,
        timeyakanj: '18:00',
        timeyakani: '22:00',
        timeyakand: '18:00',
        yakankinmflg: 2,
        timesinyaj: '22:00',
        timesinyai: '04:00',
        timesinyad: '22:00',
        sinyakinmflg: 2,
        timesotyoj: '04:00',
        timesotyoi: '09:00',
        timesotyod: '04:00',
        sotyokinmflg: 2,
        hstime: '10:00',
        hetime: '15:00',
      };
      postConnect('/MstJikoku', params, 'SIENT', inputParams).then((result) => {
        console.log('   時刻設定マスタの新規登録:/sodan/v1/mst/jikoku/');
        console.log(result);
        if (result !== undefined) {
          this.post_jikoku = result;
        } else {
          this.post_jikoku = 'Fail';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    //  時刻設定マスタ更新登録
    async putJikoku() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        jigyoid: Number(this.put_jigyoid_jikoku),
      };
      let inputParams = {
        jigyoid: Number(this.put_jigyoid_jikoku),
        timegozenj: this.timegozenj,
        timegozeni: '12:00',
        timegozend: '09:00',
        gozenkinmflg: 1,
        timegogoj: '12:00',
        timegogoi: '18:00',
        timegogod: '12:00',
        gogokinmflg: 1,
        timeyakanj: '18:00',
        timeyakani: '22:00',
        timeyakand: '18:00',
        yakankinmflg: 2,
        timesinyaj: '22:00',
        timesinyai: '04:00',
        timesinyad: '22:00',
        sinyakinmflg: 2,
        timesotyoj: '04:00',
        timesotyoi: '09:00',
        timesotyod: '04:00',
        sotyokinmflg: 2,
        hstime: '10:00',
        hetime: '15:00',
      };
      putConnect('/MstJikoku', params, 'SIENT', inputParams).then((result) => {
        console.log(' 時刻設定マスタの更新登録:/sodan/v1/mst/jikoku/');
        console.log(result);
        if (result !== undefined) {
          this.put_jikoku = result;
        } else {
          this.put_jikoku = 'Fail';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    //  時刻設定マスタ削除
    async deleteJikoku() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        jigyoid: Number(this.delete_jigyoid_jikoku),
      };
      deleteConnect('/MstJikoku', params, 'SIENT').then((result) => {
        console.log(result);
        if (result !== undefined) {
          this.delete_jikoku = result;
        } else {
          this.delete_jikoku = 'failed';
        }
      });
    },
    // 検印マスタ新規登録
    async postKenin() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
      };
      let inputParams = {
        jigyoid: Number(this.post_Jigyoid_kenin),
        kennam1: '検印項目名1',
        kennam2: '検印項目名2',
        kennam3: '検印項目名3',
        kennam4: '検印項目名4',
        kennam5: '検印項目名5',
        kennam6: '検印項目名6',
      };
      postConnect('/MstKenin', params, 'SIENT', inputParams).then((result) => {
        console.log('  検印マスタの新規登録:/sodan/v1/mst/kenin/');
        console.log(result);
        if (result !== undefined) {
          this.post_kenin = result;
        } else {
          this.post_kenin = 'Fail';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    // 検印マスタ更新登録
    async putKenin() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
      };
      let inputParams = {
        jigyoid: Number(this.put_Jigyoid_kenin),
        kennam1: this.kennam1,
        kennam2: '検印項目名2',
        kennam3: '検印項目名3',
        kennam4: '検印項目名4',
        kennam5: '検印項目名5',
        kennam6: '検印項目名6',
      };
      putConnect('/MstKenin', params, 'SIENT', inputParams).then((result) => {
        console.log('  検印マスタの更新登録:/sodan/v1/mst/kenin/');
        console.log(result);
        if (result !== undefined) {
          this.put_kenin = result;
        } else {
          this.put_kenin = 'Fail';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    //  集計条件新規登録
    async postSyukeijkn() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
      };
      let inputParams = [
        {
          cuser: 'PC1',
          jigyoid: Number(this.post_Jigyoid_syukeijkn),
          ctrlindex: 200,
          nvalue: 1,
          vvalue: '空白',
        },
      ];
      postConnect('/MstSyukeijkn', params, 'SIENT', inputParams).then(
        (result) => {
          console.log('  集計条件新規登録:/sodan/v1/mst/syukeijkn/');
          console.log(result);
          if (result !== undefined) {
            this.post_syukeijkn = result;
          } else {
            this.post_syukeijkn = 'Fail';
          }
          console.log('---------------------------------------------------');
          return result;
        }
      );
    },
    //  集計条件更新
    async putSyukeijkn() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
      };
      let inputParams = [
        {
          cuser: 'PC1',
          jigyoid: Number(this.put_Jigyoid_syukeijkn),
          ctrlindex: 200,
          nvalue: 1,
          vvalue: this.put_vvalue_syukeijkn,
        },
      ];
      putConnect('/MstSyukeijkn', params, 'SIENT', inputParams).then(
        (result) => {
          console.log('  集計条件マスタの更新登録:/sodan/v1/mst/syukeijkn/');
          console.log(result);
          if (result !== undefined) {
            this.put_syukeijkn = result;
          } else {
            this.put_syukeijkn = 'Fail';
          }
          console.log('---------------------------------------------------');
          return result;
        }
      );
    },
    //   集計区分マスタ新規登録
    async postSyukeikbn() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
      };
      let inputParams = {
        jigyoid: Number(this.post_Jigyoid_syukeikbn),
        id: 1,
        code: 1,
        name: '基本相談',
        ryaku: '基相談',
        kigo: '記',
        svckbn: 1,
        syoki: 1,
      };
      postConnect('/MstSyukeikbn', params, 'SIENT', inputParams).then(
        (result) => {
          console.log('    集計区分マスタの新規登録:/sodan/v1/mst/syukeikbn/');
          console.log(result);
          if (result !== undefined) {
            this.post_syukeikbn = result;
          } else {
            this.post_syukeikbn = 'Fail';
          }
          console.log('---------------------------------------------------');
          return result;
        }
      );
    },
    //   集計区分マスタ更新登録
    async putSyukeikbn() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
      };
      let inputParams = {
        jigyoid: Number(this.put_Jigyoid_syukeikbn),
        id: 1,
        code: 1,
        name: this.put_name_syukeikbn,
        ryaku: '基相談',
        kigo: '記',
        svckbn: 1,
        syoki: 1,
      };
      putConnect('/MstSyukeikbn', params, 'SIENT', inputParams).then(
        (result) => {
          console.log('  集計区分マスタの更新登録:/sodan/v1/mst/syukeikbn/');
          console.log(result);
          if (result !== undefined) {
            this.put_syukeikbn = result;
          } else {
            this.put_syukeikbn = 'Fail';
          }
          console.log('---------------------------------------------------');
          return result;
        }
      );
    },
    //   集計区分マスタ削除
    async deleteSyukeikbn() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
      };
      let inputParams = {
        jigyoid: this.delete_jigyoid_syukeikbn,
        id: 1,
      };
      deleteConnect('/MstSyukeikbn', params, 'SIENT', inputParams).then(
        (result) => {
          console.log(result);
          if (result !== undefined) {
            this.delete_syukeikbn = result;
          } else {
            this.delete_syukeikbn = 'failed';
          }
        }
      );
    },
    //   集計区分連結マスタ新規登録
    async postSyukeiren() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
      };
      let inputParams = [
        {
          jigyoid: Number(this.post_Jigyoid_syukeiren),
          cskmkid: 1,
          sykid: 1,
        },
      ];
      postConnect('/MstSyukeiren', params, 'SIENT', inputParams).then(
        (result) => {
          console.log(
            '    集計区分連結マスタの新規登録:/sodan/v1/mst/syukeiren/'
          );
          console.log(result);
          if (result !== undefined) {
            this.post_syukeiren = result;
          } else {
            this.post_syukeiren = 'Fail';
          }
          console.log('---------------------------------------------------');
          return result;
        }
      );
    },
    //   集計区分連結マスタ更新登録
    async putSyukeiren() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
      };
      let inputParams = [
        {
          jigyoid: Number(this.put_Jigyoid_syukeiren),
          cskmkid: Number(this.put_cskmkid_syukeiren),
          sykid: 1,
        },
      ];
      putConnect('/MstSyukeiren', params, 'SIENT', inputParams).then(
        (result) => {
          console.log(
            '  集計区分連結マスタの更新登録:/sodan/v1/mst/syukeiren/'
          );
          console.log(result);
          if (result !== undefined) {
            this.put_syukeiren = result;
          } else {
            this.put_syukeiren = 'Fail';
          }
          console.log('---------------------------------------------------');
          return result;
        }
      );
    },
    // 相談外業務マスタ新規登録
    async postSoudangai() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
      };
      let inputParams = {
        // 表示ID(sdngaicd)も重複でエラーがでる
        jigyoid: 1,
        sdngaicd: Number(this.post_sdngaiid_soudangai),
        sdngainm: '研修及び視察',
        sdngairk: '研修・視察',
      };
      postConnect('/MstSoudangai', params, 'SIENT', inputParams).then(
        (result) => {
          console.log('  相談外業務マスタの新規登録:/sodan/v1/mst/soudangai/');
          console.log(result);
          if (result !== undefined) {
            this.post_soudangai = result;
          } else {
            this.post_soudangai = 'Fail';
          }
          console.log('---------------------------------------------------');
          return result;
        }
      );
    },
    // 相談外業務マスタ更新登録
    async putSoudangai() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
      };
      let inputParams = {
        jigyoid: 1,
        // 表示ID(sdngaicd)も重複でエラーがでる
        sdngaiid: Number(this.put_sdngaiid_soudangai),
        // sdngaicdがput_sdngaiid_soudangaiと同一の値なのは暫定的
        sdngaicd: Number(this.put_sdngaiid_soudangai),
        sdngainm: this.put_sdngainm_soudangai,
        sdngairk: '研修・視察',
      };
      putConnect('/MstSoudangai', params, 'SIENT', inputParams).then(
        (result) => {
          console.log('相談外業務マスタの更新登録:/sodan/v1/mst/soudangai/');
          console.log(result);
          if (result !== undefined) {
            this.put_soudangai = result;
          } else {
            this.put_soudangai = 'Fail';
          }
          console.log('---------------------------------------------------');
          return result;
        }
      );
    },
    // 相談外業務マスタ削除
    async deleteSoudangai() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        pJigyoid: 1,
        pSdngaiid: this.delete_sdngaiid_soudangai,
      };
      deleteConnect('/MstSoudangai', params, 'SIENT').then((result) => {
        console.log(result);
        if (result !== undefined) {
          this.delete_soudangai = result;
        } else {
          this.delete_soudangai = 'failed';
        }
      });
    },
    // 業務内容マスタ新規登録
    async postGyoumu() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
      };
      let inputParams = {
        // 表示ID(sdngaicd)も重複でエラーがでる
        jigyoid: 1,
        gyonaicd: Number(this.post_gyonaiid_gyoumu),
        gyonainm: 'テスト2',
      };
      postConnect('/MstGyoumu', params, 'SIENT', inputParams).then((result) => {
        console.log('業務内容マスタの新規登録:/sodan/v1/mst/gyoumu/');
        console.log(result);
        if (result !== undefined) {
          this.post_gyoumu = result;
        } else {
          this.post_gyoumu = 'Fail';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    // 業務内容マスタ更新登録
    async putGyoumu() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
      };
      let inputParams = {
        jigyoid: 1,
        gyonaiid: this.put_gyonaiid_gyoumu,
        gyonaicd: 1,
        gyonainm: this.put_sdngainm_gyoumu,
      };
      putConnect('/MstGyoumu', params, 'SIENT', inputParams).then((result) => {
        console.log('業務内容マスタの更新登録:/sodan/v1/mst/gyoumu/');
        console.log(result);
        if (result !== undefined) {
          this.put_gyoumu = result;
        } else {
          this.put_gyoumu = 'Fail';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    // 業務内容マスタ削除
    async deleteGyoumu() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
        pJigyoid: 1,
        pGyonaiid: this.delete_gyonaiid_gyoumu,
      };
      deleteConnect('/MstGyoumu', params, 'SIENT').then((result) => {
        console.log(result);
        if (result !== undefined) {
          this.delete_gyoumu = result;
        } else {
          this.delete_gyoumu = 'failed';
        }
      });
    },
    //   タイトルマスタ新規登録
    async postTitle() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
      };
      let inputParams = {
        jigyoid: 1,
        kbn: 1,
        titleList: [
          {
            bunkbn: Number(this.post_bunkbn),
            title: '利用目的',
          },
        ],
      };
      postConnect('/MstTitle', params, 'SIENT', inputParams).then((result) => {
        console.log('    タイトルマスタの新規登録:/sodan/v1/mst/title/');
        console.log(result);
        if (result !== undefined) {
          this.post_title = result;
        } else {
          this.post_title = 'Fail';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
    //   タイトルマスタ更新登録
    async putTitle() {
      let params = {
        uniqid: uniqid,
        traceid: traceid,
      };
      let inputParams = {
        jigyoid: 1,
        kbn: 1,
        titleList: [
          {
            bunkbn: Number(this.put_bunkbn),
            title: this.put_title_title,
          },
        ],
      };
      putConnect('/MstTitle', params, 'SIENT', inputParams).then((result) => {
        console.log('  タイトルマスタの更新登録:/sodan/v1/mst/title/');
        console.log(result);
        if (result !== undefined) {
          this.put_title = result;
        } else {
          this.put_title = 'Fail';
        }
        console.log('---------------------------------------------------');
        return result;
      });
    },
  },
};
</script>
