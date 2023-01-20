<template>
  <div class="pa-1" id="accountsData">
    <v-row no-gutters class="d-flex pt-1 pb-1" id="subTitle">
      <h2>{{ $route.meta.title }}</h2>
      <label>{{ $route.meta.sub }}</label>
    </v-row>
    <v-row no-gutters class="mt-2">
      <v-col>
        <label class="labeled">所属事業所</label>
        <select
          v-model="syozokuGroup"
          class="selectBox ml-1"
          @change="onSyozokuGroupChange()"
        >
          <option v-for="val in groupArray" :key="val.id" :value="val.id">
            {{ val.value }}
          </option>
        </select>
      </v-col>
      <v-col class="text-end">
        <v-btn height="24" :to="`/allStoreList/${query}`"
          >全事業所一覧参照</v-btn
        >
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-1">
      <label class="labeled">アカウントID</label>
      <div class="ml-1 boarderArea d-flex">
        <v-card
          class="d-flex ml-1"
          v-for="(item, syokuinKey) in accountsArray"
          :key="`syokuin-${syokuinKey}`"
          elevation="0"
        >
          <input
            type="radio"
            :id="'syokuin_' + item.id"
            :value="item.id"
            name="syokuin"
            v-model="selAccount"
            @change="onSelAccount()"
          />
          <label :for="'syokuin_' + item.id" class="mt-1 ml-1 mr-2">{{
            item.value
          }}</label>
        </v-card>
      </div>

      <label class="labeled ml-1">利用状況</label>
      <div class="ml-1 boarderArea d-flex">
        <v-card
          class="ml-1 d-flex"
          v-for="(filters, filterIndex) in filterArray"
          :key="`filter-${filterIndex}`"
          elevation="0"
        >
          <input
            type="checkbox"
            :id="'filter_' + filters.id"
            :value="filters.id"
            v-model="selFilter"
            v-if="filters.id <= 3"
            @change="onSelFilter()"
          />
          <label
            :for="'filter_' + filters.id"
            class="mt-1 ml-1 mr-2"
            v-if="filters.id <= 3"
            >{{ filters.value }}</label
          >
        </v-card>
      </div>

      <label class="labeled ml-1">その他絞込</label>
      <div class="ml-1 boarderArea wMdle d-flex">
        <v-card
          class="d-flex ml-1"
          v-for="(item, otherKey) in otherArray"
          :key="`other-${otherKey}`"
          elevation="0"
        >
          <input
            type="radio"
            :id="'other_' + item.id"
            :value="item.id"
            name="other"
            v-model="selOther"
            @change="onSelOther()"
          />
          <label :for="'other_' + item.id" class="mt-1 ml-1 mr-2">{{
            item.value
          }}</label>
        </v-card>
      </div>
    </v-row>

    <v-row no-gutters class="mt-3 filterHeight">
      <v-col>
        <alphabet-button
          id="alpCommon"
          ref="alp"
          @onAlphabetical="onAlphabetical"
        >
        </alphabet-button>
      </v-col>
      <v-col>
        <label class="accountConfLabel"
          >アカウント発行要確認新規職員:<span>{{ accountCount }}</span
          >名</label
        >
      </v-col>
      <v-col class="justify-end d-flex">
        <label class="labeled pinked min ml-1">権限入力</label>
        <v-btn
          v-for="val in authItem"
          :key="val.id"
          height="24"
          @click="authClick(val.id)"
          :class="{ isActive: authBtnActive[val.id], 'ml-1 border': true }"
          :elevation="authBtnActive[val.id] ? 0 : 1"
          >{{ val.text }}</v-btn
        >
        <label class="labeled pinked min ml-1">その他</label>
        <v-btn small class="ml-1" height="24" @click="authCopyDialog()"
          >権限コピー</v-btn
        >
        <v-btn
          small
          class="ml-1"
          height="24"
          @mouseover="onsignExplain(1)"
          @mouseleave="onsignExplain(0)"
        >
          <v-icon small color=""> mdi-message-text </v-icon>
          記号説明
        </v-btn>
        <v-card id="signExplain" v-show="signExplainFlag">
          <div v-for="(value, index) in explainArray" :key="index">
            <v-row no-gutters>
              <div :class="`left ${value.bk}`">{{ value.icon }}</div>
              <div class="right">:{{ value.text }}</div>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-1">
      <wj-flex-grid
        id="syokuinListGrid"
        :autoSearch="false"
        :headersVisibility="'Column'"
        :selectionMode="0"
        :alternating-row-step="0"
        :initialized="onInitialized"
        :itemsSourceChanged="onItemsSourceChanged"
        :itemsSource="syokuinViewData"
        :allowResizing="false"
        :allowDragging="false"
        :allowSorting="false"
        :allowMerging="'AllHeaders'"
        :showMarquee="false"
        :formatItem="onFormatItem"
        :style="styles"
      >
        <wj-flex-grid-column
          v-for="columns in columnArray"
          :key="`columns-${columns.id}`"
          :binding="columns.binding"
          :width="columns.width"
          :word-wrap="false"
          :allowResizing="false"
          :allowDragging="true"
          :isReadOnly="true"
          align="center"
        ></wj-flex-grid-column>

        <wj-flex-grid-column
          v-for="columnsAuth in columnAuthArray"
          :key="`columnsAuth-${columnsAuth.id}`"
          :binding="columnsAuth.binding"
          :width="48"
          :word-wrap="false"
          :allowResizing="false"
          :allowDragging="true"
          :isReadOnly="true"
          align="center"
        ></wj-flex-grid-column>
        <wj-flex-grid-filter
          :initialized="filterInitialized"
        ></wj-flex-grid-filter>
        <v-card
          elevation="0"
          v-if="syokuinViewDataFlag"
          id="syokuinViewDataNone"
        >
          <div id="noListLogo"></div>
          <p>
            選択された所属事業所に勤務する職員が登録されていません。<br />
            <a href="">職員マスタ</a
            >にて、勤務情報を設定した職員を登録してください。
          </p>
        </v-card>
      </wj-flex-grid>
    </v-row>
    <v-row class="mt-3 bottomButtonArea" no-gutters>
      <div class="text-end">
        <label class="message"
          >変更内容を保存する場合は登録を行ってください</label
        >
        <v-btn
          class="ml-2"
          height="24"
          elavation="1"
          :disabled="activateCancel"
          @click="cancelDialogType = 1"
          >キャンセル</v-btn
        >
      </div>
      <div class="text-end">
        <v-btn color="blue" height="24">権限登録</v-btn>
      </div>
    </v-row>

    <ConfirmDialog
      :message="`編集内容を破棄しますか？`"
      :width="300"
      color="red"
      :leftButton="'キャンセル'"
      :rightButton="'削除'"
      v-if="cancelDialogType == 1"
      args="editCancel"
      @dialogConfirmMethod="dialogConfirmMethod"
      @dialogConfirmCancelMethod="dialogConfirmCancelMethod"
    />
    <AlertDialog
      v-if="cancelDialogType == 2"
      :message="`破棄しました。`"
      :width="300"
    />

    <ConfirmDialog
      :message="`既に権限が設定されている職員が選択されている場合、内容が上書きされますが実行しますか？`"
      :width="400"
      :leftButton="'キャンセル'"
      :rightButton="'実行'"
      v-if="authCopyType == 2"
      args="editCancel"
      @dialogConfirmMethod="dialogConfirmMethod"
      @dialogConfirmCancelMethod="dialogConfirmCancelMethod"
    />

    <AlertDialog
      v-if="authCopyType == 3"
      :message="`コピー完了しました。`"
      :width="300"
    />

    <v-dialog
      width="500"
      v-model="authCopyDialogFlag"
      id="authCopyDialog"
      persistent
      no-click-animation
    >
      <v-card>
        <v-card-title class="dialog_title">
          権限コピー
          <v-btn class="closeButton pa-0" @click="dialogAuthClose()">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card class="pa-2" elevation="0">
          <p>コピー元職員から選択した職員に権限をコピーします。</p>
          <div class="mt-3 pb-2 borderbottom">
            <label>
              コピー元職員
              <v-tooltip :text="`${dialogAuthFrom}`" max-width="420">
                <template v-slot:activator="{ props }">
                  <v-icon class="questionIcon" v-bind="props">mdi-help</v-icon>
                </template>
              </v-tooltip>
            </label>
            <select
              v-model="authCopySyokuinFrom"
              @change="onSelectAuthCopySyokuinFrom()"
            >
              <option value="" disabled selected style="display: none">
                職員を選択
              </option>
              <option
                v-for="val in syokuinSelectCopyData"
                :key="val.syokuinCode"
                :value="val.syokuinCode"
              >
                {{ val.syokuinName }}
              </option>
            </select>
          </div>
          <div class="mt-3">
            <label>
              コピー先職員
              <v-tooltip :text="`${dialogAuthTo}`" max-width="420">
                <template v-slot:activator="{ props }">
                  <v-icon class="questionIcon" v-bind="props">mdi-help</v-icon>
                </template>
              </v-tooltip>
            </label>
            <wj-flex-grid
              id="syokuinCopyGrid"
              :headersVisibility="'Column'"
              :selectionMode="0"
              :alternating-row-step="0"
              :initialized="onInitializedCopy"
              :itemsSource="syokuinAuthCopyData"
              :formatItem="onFormatItemCopy"
              :allowResizing="false"
              :allowDragging="false"
              :allowSorting="false"
            >
              <wj-flex-grid-filter
                :initialized="filterInitializedCopy"
              ></wj-flex-grid-filter>
              <wj-flex-grid-column
                :width="40"
                header="選"
                binding="copySelected"
                align="center"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                :width="100"
                header="コード"
                binding="syokuinCode"
                align="center"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                width="1*"
                header="職員名"
                binding="syokuinName"
                align="center"
              ></wj-flex-grid-column>
              <wj-flex-grid-column
                width="1*"
                header="アカウントID"
                binding="accountID"
                align="center"
              ></wj-flex-grid-column>
            </wj-flex-grid>
          </div>
          <v-row no-gutters class="mt-3 bottombutton">
            <v-col
              ><v-btn height="24" @click="authCancelCopy()"
                >クリア</v-btn
              ></v-col
            >
            <v-col class="text-end"
              ><v-btn
                height="24"
                class="doButton"
                @click="authCopyType = 2"
                :disabled="copyActiveFlag"
                >実行</v-btn
              ></v-col
            >
          </v-row>
        </v-card>
      </v-card>
    </v-dialog>

    <ConfirmDialog
      :message="dialogSyokuinName + `さんの職員アカウントを削除しますか？`"
      :submessage="`削除すると下記の情報が失われ、システムにログインできなくなります。`"
      :listBox="{
        list1: '職員アカウントID',
        list2: 'パスワード',
        list3: 'メールアドレス',
        list4: 'グランドメニュー権限',
      }"
      :width="530"
      color="red"
      :leftButton="'キャンセル'"
      :rightButton="'削除'"
      v-if="dialogAccountDeleteOpenType == 1"
      args="accountDelete"
      @dialogConfirmMethod="dialogConfirmMethod"
      @dialogConfirmCancelMethod="dialogConfirmCancelMethod"
    />

    <ConfirmDialog
      :message="`本当に削除してもよろしいですか？`"
      alertIcon="alert"
      :submessage="`※元に戻す場合は、職員アカウントの再登録が必要になります。`"
      :width="530"
      color="red"
      :leftButton="'キャンセル'"
      :rightButton="'削除'"
      v-if="dialogAccountDeleteOpenType == 2"
      args="accountDeleted"
      @dialogConfirmMethod="dialogConfirmMethod"
      @dialogConfirmCancelMethod="dialogConfirmCancelMethod"
    />
    <AlertDialog
      v-if="dialogAccountDeleteOpenType == 3"
      :message="`削除完了しました`"
      :width="300"
    />

    <ConfirmDialog
      :message="`パスワードを再発行しますか?`"
      :submessage="`※仮パスワードがメールにて通知されます。再発行機のログイン時にパスワードを変更してください。`"
      :width="400"
      :leftButton="'キャンセル'"
      :rightButton="'再発行'"
      v-if="dialogAccountPasswordOpenType == 1"
      args="passwordReset"
      @dialogConfirmMethod="dialogConfirmMethod"
      @dialogConfirmCancelMethod="dialogConfirmCancelMethod"
    />
    <completeDialog
      v-if="dialogAccountPasswordOpenType == 2"
      :message="`仮パスワードを発行しました`"
      :width="600"
      @dialogCompleteMethod="dialogCompleteMethod"
      :body="{
        text1: 'アカウントIDと仮パスワードを管理者にメールにて通知します。 ',
        text2: { title: '管理者メールアドレス', body: dialogAccountMail },
        min_text:
          '※職員のメールアドレスが設定されている場合、職員にもメールにて通知します。',
      }"
    />

    <ConfirmDialog
      :message="`変更した内容を登録しますか?`"
      :width="300"
      v-if="dialogAccountRegistOpenType == 2"
      args="accountRegist"
      @dialogConfirmMethod="dialogConfirmMethod"
      @dialogConfirmCancelMethod="dialogConfirmCancelMethod"
    />
    <AlertDialog
      v-if="dialogAccountRegistOpenType == 3"
      :message="`登録完了しました`"
      :width="300"
    />

    <v-dialog
      width="500"
      v-model="dialogAccountFlag"
      class="dialogAccount"
      no-click-animation
      v-if="dialogAccountRegistOpenType <= 2"
    >
      <v-card>
        <v-card-title class="dialog_title">
          職員アカウント情報
          <v-btn class="closeButton pa-0" @click="dialogAccountClose()">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>
        <v-card class="pa-2" elevation="0">
          <p>教員アカウントのIDを発行し、システムを利用できる状態にします。</p>
          <v-row no-gutters class="borderbottom pb-2 mt-1">
            <label class="tle">職員名</label>
            <input
              type="text"
              class="v-card ml-1 box min pl-1"
              v-model="dialogSyokuinName"
            />
          </v-row>
          <v-row no-gutters class="mt-1">
            <label class="tle inq">アカウント発行</label>
            <v-card
              v-for="val in dialogAccountArray"
              :key="val.id"
              class="ml-2"
              elevation="0"
            >
              <input
                type="radio"
                name="dialogAccount"
                v-model="dialogAccount"
                :id="`dialogAccount_${val.id}`"
                :value="val.id"
              />
              <label class="ml-1" :for="`dialogAccount_${val.id}`">{{
                val.value
              }}</label>
            </v-card>
          </v-row>
          <v-row no-gutters class="mt-1">
            <div>
              <label class="tle inq">ID</label>
            </div>
            <div class="questionarea">
              <input
                type="text"
                v-model="dialogAccountID"
                class="v-card ml-1 box mdl pl-1"
                :disabled="dialogAccount == 2 ? true : false"
              />
              <v-tooltip :text="`${dialogMessageID}`" max-width="420">
                <template v-slot:activator="{ props }">
                  <v-icon class="questionIcon" v-bind="props">mdi-help</v-icon>
                </template>
              </v-tooltip>

              <p class="text-caption">半角英数字の4桁～32桁の文字</p>
            </div>
          </v-row>
          <v-row no-gutters class="mt-1">
            <div>
              <label class="tle">メールアドレス</label>
            </div>
            <div class="questionarea">
              <input
                type="text"
                v-model="dialogAccountMail"
                class="v-card ml-1 box mdl pl-1"
                :disabled="dialogAccount == 2 ? true : false"
              />
              <v-tooltip :text="`${dialogMessageMail}`" max-width="500">
                <template v-slot:activator="{ props }">
                  <v-icon class="questionIcon" v-bind="props">mdi-help</v-icon>
                </template>
              </v-tooltip>
            </div>
          </v-row>
          <v-row no-gutters class="mt-1">
            <div>
              <label class="tle">利用状態</label>
            </div>
            <div class="questionarea">
              <div
                :class="`ml-1 questionStatusButton ${useButton}`"
                @click="editUseStatus()"
              >
                利用中
              </div>
              <v-tooltip :text="`${dialogMessageUse}`" max-width="540">
                <template v-slot:activator="{ props }">
                  <v-icon class="questionIcon" v-bind="props">mdi-help</v-icon>
                </template>
              </v-tooltip>
            </div>
          </v-row>
          <v-row no-gutters class="mt-3">
            <v-col cols="3">
              <v-btn
                class="deleteButton htmin"
                @click="dialogAccountDeleteOpenType = 1"
                >削除</v-btn
              >
            </v-col>
            <v-col class="text-end">
              <v-btn class="passwordButton htmin" @click="passwordReset()"
                >パスワード再発行</v-btn
              >
              <v-btn
                class="ml-2 registButton htmin"
                @click="dialogAccountRegistOpenType = 2"
                >登録</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import AlphabetButton from '@/components/AlphabetButton.vue';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wijmo from '@grapecity/wijmo';
import '@grapecity/wijmo.cultures/wijmo.culture.ja';
import '@grapecity/wijmo.vue2.grid.filter';
import { WjFlexGrid, WjFlexGridColumn } from '@grapecity/wijmo.vue2.grid';
import { WjFlexGridFilter } from '@grapecity/wijmo.vue2.grid.filter';
import sysConst from '@/utiles/const';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import AlertDialog from '@/components/AlertDialog.vue';
import completeDialog from '@/components/completeDialog.vue';

export default {
  props: ['keycloak', 'userName', 'color'],
  components: {
    WjFlexGrid,
    WjFlexGridColumn,
    WjFlexGridFilter,
    AlphabetButton,
    ConfirmDialog,
    AlertDialog,
    completeDialog,
  },
  mounted() {
    this.calculateWindowHeight();
    window.addEventListener('resize', this.calculateWindowHeight);
    this.filtered.showFilterIcons = false;
  },
  computed: {
    styles() {
      // ブラウザの高さ
      return {
        '--height': window.innerHeight - this.headerheight + 'px',
      };
    },
  },

  data() {
    return {
      query: this.$route.params.client,
      dialogAccountFlag: false,
      dialogAccountRegistOpenType: 0, //1:登録フォーム, 2:登録確認, 3:登録完了
      dialogAccountDeleteOpenType: 0, //1:削除フォーム, 2:削除確認, 3:削除完了
      dialogAccountPasswordOpenType: 0, //1:確認フォーム, 2:完了

      syokuinViewDataFlag: false,
      flexGrid: [],
      signExplainFlag: false,
      authBtnActive: { 1: true },
      authBtnSelected: 1, // 権限入力の選択状態
      selAccount: 1,
      selOther: 1,
      syozokuGroup: 999,
      selFilter: [1, 2, 3],
      selected: 0,
      syokuinViewData: [],
      syokuinViewDataDefault: [],
      accountCount: 0,
      activateCancel: true,
      groupArray: [
        {
          id: 999,
          value: '',
        },
        {
          id: 1,
          value: '障害者支援施設　いるか園',
        },
        {
          id: 2,
          value: 'グループホーム　いるか園',
        },
        {
          id: 3,
          value: '総合支援センター　いるか園',
        },
      ],
      accountsArray: [
        {
          id: 1,
          value: '全表示',
        },
        {
          id: 2,
          value: '発行済',
        },
        {
          id: 3,
          value: '未発行',
        },
      ],
      filterArray: [
        {
          id: 1,
          value: '使用中',
        },
        {
          id: 2,
          value: '仮登録',
        },
        {
          id: 3,
          value: '停止中',
        },
        {
          id: 4,
          value: '未登録',
        },
      ],
      otherArray: [
        {
          id: 1,
          value: '全表示',
        },
        {
          id: 2,
          value: 'メール有',
        },
        {
          id: 3,
          value: '権限未設定',
        },
      ],
      filterAbled: [],
      columnArray: [
        {
          id: 1,
          header: 'コード',
          binding: 'syokuinCode',
          width: 80,
        },
        {
          id: 2,
          header: '職員名',
          binding: 'syokuinName',
          width: 180,
        },
        {
          id: 3,
          header: '職種',
          binding: 'syokusyu',
          width: 160,
        },
        {
          id: 4,
          header: '所属事業所',
          binding: 'syozokuJigyosyo',
          width: 200,
        },
        {
          id: 5,
          header: '開始日',
          binding: 'startDate',
          width: 100,
        },
        {
          id: 6,
          header: '終了日',
          binding: 'endDate',
          width: 100,
        },
        {
          id: 7,
          header: '退職',
          binding: 'taisyoku',
          width: 40,
        },
        {
          id: 8,
          header: 'メール',
          binding: 'mailFlag',
          width: 40,
        },
        {
          id: 9,
          header: 'ID',
          binding: 'accountID',
          width: 140,
        },
        {
          id: 10,
          header: '利用状況',
          binding: 'accountStatus',
          width: 100,
        },
      ],
      columnAuthArray: [
        {
          id: 1,
          top: 'グランドメニュー権限',
          middle: '共通',
          bottom: '事業者情報',
          binding: 'groundAuth.column_1',
        },
        {
          id: 2,
          top: 'グランドメニュー権限',
          middle: '共通',
          bottom: '利用者台帳',
          binding: 'groundAuth.column_2',
        },
        {
          id: 3,
          top: 'グランドメニュー権限',
          middle: '共通',
          bottom: '職員情報',
          binding: 'groundAuth.column_3',
        },
        {
          id: 4,
          top: 'グランドメニュー権限',
          middle: '共通',
          bottom: '電文作成',
          binding: 'groundAuth.column_4',
        },
        {
          id: 5,
          top: 'グランドメニュー権限',
          middle: 'いるか園',
          bottom: '生活支援',
          binding: 'groundAuth.column_5',
        },
        {
          id: 6,
          top: 'グランドメニュー権限',
          middle: 'いるか園',
          bottom: '施設請求',
          binding: 'groundAuth.column_6',
        },
        {
          id: 7,
          top: 'グランドメニュー権限',
          middle: 'GHいるか',
          bottom: '生活支援',
          binding: 'groundAuth.column_7',
        },
        {
          id: 8,
          top: 'グランドメニュー権限',
          middle: 'GHいるか',
          bottom: 'GH請求',
          binding: 'groundAuth.column_8',
        },
      ],
      authItem: [
        { id: 1, text: '〇 一般権限', value: '〇' },
        { id: 2, text: '● 管理権限', value: '●' },
        { id: 0, text: 'クリア', value: '' },
      ],
      filtered: {}, // フィルターデータ
      headerheight: 240,
      explainArray: sysConst.TOOLTIPMESSAGE,
      searchOption: {}, // 検索条件
      dialogAccount: 1,
      dialogSyokuinName: '',
      dialogAccountID: '',
      dialogAccountMail: '',
      useButton: '',
      useButtonMessage: [
        '福祉見聞録システムにログインできます。',
        '福祉見聞録システムにログインできますが、仮パスワードの状態です。',
        '福祉見聞録システムにログインできません。',
        '職員アカウントIDを発行していない状態です。',
      ],
      dialogMessageID: `この画面で設定したID名でログインできるようになります。
      他の職員で設定済みの同じ名前のIDは設定できません。`,
      dialogMessageMail: `メールアドレスを設定すると、アカウント発行時の仮パスワード通知や、
      パスワードを忘れた場合に職員本人で再設定することができます。
      `,
      dialogMessageUse: '',
      dialogAccountArray: [
        {
          id: 1,
          value: '有り',
        },
        {
          id: 2,
          value: '無し',
        },
      ],
      tooltipmessage_mail: false,
      gridSelectedRow: 0, // グリッドの選択した行数
      authCopyDialogFlag: false,
      dialogAuthFrom:
        'コピーの元となる職員を選択してください。ここで選択した職員の権限がコピーされます。',
      dialogAuthTo:
        'コピー元職員の権限を反映させたい職員をすべて選択して下さい。(複数選択可)',
      authCopySyokuinFrom: '',
      syokuinSelectCopyData: [],
      syokuinAuthCopyData: [],
      copyFlexGrid: {},
      copyActiveFlag: true,
      authCopyType: 1, // 1:登録フォーム 2:確認 3:登録完了
      cancelDialogType: 0,
    };
  },
  methods: {
    calculateWindowHeight() {
      if (document.getElementById('syokuinListGrid') != null) {
        document.getElementById('syokuinListGrid').style.height =
          window.innerHeight - this.headerheight + 'px';
      }
    },
    /*************
     * 権限コピーダイアログ
     */
    authCopyDialog() {
      this.authCopyDialogFlag = true;
      let tmp = this.syokuinViewData;
      const group = tmp.filter((item, index, self) => {
        const nameList = self.map((item) => item['syokuinCode']);
        // 重複を削除する
        if (nameList.indexOf(item.syokuinCode) === index) {
          return item;
        }
      });
      this.syokuinSelectCopyData = group;
    },
    dialogAuthClose() {
      this.authCopyDialogFlag = false;
    },
    /******************
     * コピー元職員選択
     */
    onSelectAuthCopySyokuinFrom() {
      // コピー元職員をコピー先職員に表示しないようにする
      let tmp = [];
      let data = this.syokuinSelectCopyData;
      for (let i = 0; i < data.length; i++) {
        if (data[i].syokuinCode != this.authCopySyokuinFrom) {
          tmp.push(data[i]);
        }
      }
      this.syokuinAuthCopyData = [];
      this.syokuinAuthCopyData = tmp.slice();
      this.copyFlexGrid.refresh();
      this.copyActiveFlag = false;
    },
    /*************
     * コピー完了後の実行
     */
    onCopyAreaComplete() {
      // 選択状態を解除
      this.authCancelCopy();
      this.authCopyType = 1;
      this.authCopyDialogFlag = false;
    },
    /***************************
     * コピー実行
     */
    onAuthCopy() {
      // コピー元のデータ
      let _self = this;
      let fromSelected = this.syokuinSelectCopyData.find(function (value) {
        return value.syokuinCode == _self.authCopySyokuinFrom ? value : '';
      });
      // 選択されたコピー先職員のデータ
      let tmp = this.syokuinAuthCopyData.slice();
      for (let i = 0; i < tmp.length; i++) {
        if (tmp[i].copySelected) {
          // 職員一覧にコピーデータを代入
          this.syokuinViewData.filter(function (value, k) {
            if (value.syokuinCode == tmp[i].syokuinCode) {
              _self.syokuinViewData[k].groundAuth = fromSelected.groundAuth;
              return value;
            }
          });
        }
      }
      this.authCopyType = 3;
      this.authCopyDialogFlag = false;
      this.activateCancel = false; // キャンセルボタン有効
    },
    /*********************
     * 権限コピーのフィルタリングアイコン
     */
    filterInitializedCopy(filter) {
      let tmp = [];
      tmp.push('syokuinCode');
      tmp.push('syokuinName');
      tmp.push('accountID');
      filter.filterColumns = tmp;
    },
    onSyozokuGroupChange() {
      let selected = this.syozokuGroup;
      let temp = this.groupArray.find(function (value) {
        return value.id == selected ? value : '';
      });
      this.searchOption.syozokuGroup = temp.value;
      this.searched();
    },
    onSelAccount() {
      let select = this.selAccount;
      let selected = this.accountsArray.find(function (value) {
        return value.id == select ? value : '';
      });
      this.searchOption.accountSelect = selected.id;
      this.searched();
    },
    onSelFilter() {
      this.searchOption.selFilter = this.selFilter;
      this.searched();
    },
    onSelOther() {
      let selOther = this.selOther;
      let selected = this.otherArray.find(function (value) {
        return value.id == selOther ? value : '';
      });

      // 権限未設定を選択時、権限の登録数を保持する
      if (selected.id == 3) {
        for (let i = 0; i < this.syokuinViewData.length; i++) {
          let groundAuth = this.syokuinViewData[i].groundAuth;
          let cnt = 0;
          Object.keys(groundAuth).forEach(function (key) {
            if (groundAuth[key]) {
              cnt += 1;
            }
          });
          this.syokuinViewData[i].groundAuthFlag = cnt;
        }
      }
      this.searchOption.otherSelect = selected;
      this.searched();
    },
    onAlphabetical(k) {
      this.searched(k);
    },
    searched(alphabetkey = '') {
      let temp = this.syokuinViewData;
      let result = temp;
      // 所属事業所検索
      let syozokuGroup = this.searchOption.syozokuGroup;
      if (syozokuGroup) {
        result = temp.filter((value) => value.syozokuJigyosyo === syozokuGroup);
      }
      // アカウントID検索
      if (
        this.searchOption.accountSelect &&
        this.searchOption.accountSelect != 1
      ) {
        let accountTemp = [];

        for (let i = 0; i < result.length; i++) {
          // 発行済み
          if (
            this.searchOption.accountSelect == 2 &&
            result[i].accountID.length > 0
          ) {
            accountTemp.push(result[i]);
          }
          // 未発行
          if (
            this.searchOption.accountSelect == 3 &&
            result[i].accountID.length == 0
          ) {
            accountTemp.push(result[i]);
          }
        }

        result = accountTemp;
      }

      // 利用状況
      let selFilter = this.searchOption.selFilter;
      if (selFilter && selFilter.length != 0) {
        let filterTemp = [];
        for (let i = 0; i < result.length; i++) {
          // 使用中
          if (
            selFilter.indexOf(1) != -1 &&
            result[i].accountStatus == this.filterArray[0].value
          ) {
            filterTemp.push(result[i]);
          }
          // 仮登録
          if (
            selFilter.indexOf(2) != -1 &&
            result[i].accountStatus === this.filterArray[1].value
          ) {
            filterTemp.push(result[i]);
          }
          // 停止中
          if (
            selFilter.indexOf(3) != -1 &&
            result[i].accountStatus === this.filterArray[2].value
          ) {
            filterTemp.push(result[i]);
          }
        }
        result = filterTemp;
      }

      // その他絞込
      let otherSelect = this.searchOption.otherSelect;
      if (otherSelect && otherSelect.id != 1) {
        let otherTemp = [];
        for (let i = 0; i < result.length; i++) {
          // メール有
          if (otherSelect.id == 2 && result[i].mailFlag != '') {
            otherTemp.push(result[i]);
          }
          // 権限未設定
          if (otherSelect.id == 3 && result[i].groundAuthFlag != 0) {
            otherTemp.push(result[i]);
          }
        }
        result = otherTemp;
      }
      // アルファベット検索
      if (alphabetkey > 0) {
        let tmpviewdata = result.concat();
        result = this.$refs.alp.alphabetFilter(tmpviewdata, 'rkana');
      }
      // データが取得できなかったときの説明文の表示フラグ切り替え
      if (result.length == 0) {
        this.syokuinViewDataFlag = true;
      } else {
        this.syokuinViewDataFlag = false;
      }
      this.flexGrid.itemsSource = result;
    },
    onInitializedCopy(flexGrid) {
      this.copyFlexGrid = flexGrid;
      this.syokuinAuthCopyData = this.syokuinSelectCopyData;
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        var ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          if (ht.col == 0) {
            if (_self.syokuinAuthCopyData[ht.row].copySelected == '〇') {
              _self.syokuinAuthCopyData[ht.row].copySelected = '';
            } else {
              _self.syokuinAuthCopyData[ht.row].copySelected = '〇';
            }
          }
        }
        flexGrid.refresh();
      });
    },
    onItemsSourceChangedCopy() {},
    authCancelCopy() {
      let tmp = this.syokuinSelectCopyData;
      for (let i = 0; i < tmp.length; i++) {
        tmp[i].copySelected = '';
      }
      this.copyFlexGrid.refresh();
    },
    onCancelAllClear() {
      let state = this.syokuinViewDataDefault;
      this.syokuinViewData = [];
      this.syokuinViewData = JSON.parse(JSON.stringify(state));
      this.cancelDialogType = 2;
      this.activateCancel = true;
    },
    onFormatItemCopy(flexGrid, e) {
      if (e.panel.cellType == wjGrid.CellType.Cell) {
        if (e.col == 2 || e.col == 3) {
          e.cell.style.textAlign = 'left';
        }
      }
    },

    onInitialized(flexGrid) {
      this.flexGrid = flexGrid;
      this.createHeader(flexGrid);
      // itemscourceデータ
      this.syokuinViewData = [];
      let syokuinViewData = [];
      syokuinViewData.push({
        syokuinCode: '00001',
        syokuinName: '東経 太郎',
        rkana: 'ﾀﾛｳﾄｳｹｲ',
        syokusyu: '施設長',
        syozokuJigyosyo: '障害者支援施設　いるか園',
        startDate: '2018/04/01',
        endDate: '',
        taisyoku: '',
        mailAddress: 'sample1@sample.co.jp',
        mailFlag: '有',
        accountID: 'tokeitaro00001',
        accountStatus: '使用中',
        groundAuth: {
          column_1: '●',
          column_2: '●',
          column_3: '●',
          column_4: '〇',
          column_5: '〇',
          column_6: '〇',
          column_7: '〇',
          column_8: '〇',
        },
      });
      syokuinViewData.push({
        syokuinCode: '00001',
        syokuinName: '東経 太郎',
        rkana: 'ﾀﾛｳﾄｳｹｲ',
        syokusyu: '施設長',
        syozokuJigyosyo: 'グループホーム　いるか園',
        startDate: '2018/04/01',
        endDate: '',
        taisyoku: '',
        mailAddress: 'sample1@sample.co.jp',
        mailFlag: '有',
        accountID: 'tokeitaro00001',
        accountStatus: '使用中',
        groundAuth: {
          column_1: '●',
          column_2: '●',
          column_3: '●',
          column_4: '〇',
          column_5: '〇',
          column_6: '〇',
          column_7: '〇',
          column_8: '〇',
        },
      });
      syokuinViewData.push({
        syokuinCode: '00001',
        syokuinName: '東経 太郎',
        rkana: 'ﾀﾛｳﾄｳｹｲ',
        syokusyu: '施設長',
        syozokuJigyosyo: '総合支援センター　いるか園',
        startDate: '2019/10/01',
        endDate: '',
        taisyoku: '',
        mailAddress: 'sample1@sample.co.jp',
        mailFlag: '有',
        accountID: 'tokeitaro00001',
        accountStatus: '使用中',
        groundAuth: {
          column_1: '●',
          column_2: '●',
          column_3: '●',
          column_4: '〇',
          column_5: '〇',
          column_6: '〇',
          column_7: '〇',
          column_8: '〇',
        },
      });
      syokuinViewData.push({
        syokuinCode: '00002',
        syokuinName: '明治 雅夫',
        rkana: 'ﾒｲｼﾞﾏｻｵ',
        syokusyu: 'サービス管理責任者',
        syozokuJigyosyo: '障害者支援施設　いるか園',
        startDate: '2018/04/01',
        endDate: '',
        taisyoku: '',
        mailAddress: 'sample2@sample.co.jp',
        mailFlag: '有',
        accountID: 'meijimasao00002',
        accountStatus: '使用中',
        groundAuth: {
          column_1: '●',
          column_2: '●',
          column_3: '●',
          column_4: '',
          column_5: '●',
          column_6: '',
          column_7: '',
          column_8: '',
        },
      });
      syokuinViewData.push({
        syokuinCode: '00002',
        syokuinName: '明治 雅夫',
        rkana: 'ﾒｲｼﾞﾏｻｵ',
        syokusyu: 'サービス管理責任者',
        syozokuJigyosyo: 'グループホーム　いるか園',
        startDate: '2018/10/01',
        endDate: '',
        taisyoku: '',
        mailAddress: 'sample2@sample.co.jp',
        mailFlag: '有',
        accountID: 'meijimasao00002',
        accountStatus: '使用中',
        groundAuth: {
          column_1: '●',
          column_2: '●',
          column_3: '●',
          column_4: '',
          column_5: '●',
          column_6: '',
          column_7: '',
          column_8: '',
        },
      });
      syokuinViewData.push({
        syokuinCode: '00002',
        syokuinName: '明治 雅夫',
        rkana: 'ﾒｲｼﾞﾏｻｵ',
        syokusyu: 'サービス管理責任者',
        syozokuJigyosyo: '障害者支援施設　みどり園',
        startDate: '2019/10/01',
        endDate: '',
        taisyoku: '',
        mailAddress: 'sample2@sample.co.jp',
        mailFlag: '有',
        accountID: 'meijimasao00002',
        accountStatus: '使用中',
        groundAuth: {
          column_1: '●',
          column_2: '●',
          column_3: '●',
          column_4: '',
          column_5: '●',
          column_6: '',
          column_7: '',
          column_8: '',
        },
      });
      syokuinViewData.push({
        syokuinCode: '00003',
        syokuinName: '昭和　和夫',
        rkana: 'ｼｮｳﾜｶｽﾞｵ',
        syokusyu: '事務員',
        syozokuJigyosyo: '障害者支援施設　いるか園',
        startDate: '2018/04/01',
        endDate: '',
        taisyoku: '',
        mailAddress: 'sample3@sample.co.jp',
        mailFlag: '有',
        accountID: 'syowa00003',
        accountStatus: '使用中',
        groundAuth: {
          column_1: '〇',
          column_2: '〇',
          column_3: '〇',
          column_4: '〇',
          column_5: '●',
          column_6: '●',
          column_7: '●',
          column_8: '●',
        },
      });
      syokuinViewData.push({
        syokuinCode: '00003',
        syokuinName: '昭和　和夫',
        rkana: 'ｼｮｳﾜｶｽﾞｵ',
        syokusyu: '事務員',
        syozokuJigyosyo: '障害者支援施設　みどり園',
        startDate: '2019/04/01',
        endDate: '',
        taisyoku: '',
        mailAddress: 'sample3@sample.co.jp',
        mailFlag: '有',
        accountID: 'syowa00003',
        accountStatus: '使用中',
        groundAuth: {
          column_1: '〇',
          column_2: '〇',
          column_3: '〇',
          column_4: '〇',
          column_5: '●',
          column_6: '●',
          column_7: '●',
          column_8: '●',
        },
      });
      syokuinViewData.push({
        syokuinCode: '00004',
        syokuinName: '平成　麗子',
        rkana: 'ﾍｲｾｲﾚｲｺ',
        syokusyu: '事務員',
        syozokuJigyosyo: '障害者支援施設　いるか園',
        startDate: '2020/07/01',
        endDate: '',
        taisyoku: '',
        mailAddress: 'sample4@sample.co.jp',
        mailFlag: '',
        accountID: 'heisei00004',
        accountStatus: '仮登録',
        groundAuth: {
          column_1: '〇',
          column_2: '〇',
          column_3: '〇',
          column_4: '〇',
          column_5: '〇',
          column_6: '〇',
          column_7: '〇',
          column_8: '〇',
        },
      });
      syokuinViewData.push({
        syokuinCode: '00005',
        syokuinName: '令和　弘',
        rkana: 'ﾚｲﾜﾋﾛｼ',
        syokusyu: '事務員',
        syozokuJigyosyo: '障害者支援施設　いるか園',
        startDate: '2018/04/01',
        endDate: '',
        taisyoku: '',
        mailAddress: 'sample5@sample.co.jp',
        mailFlag: '有',
        accountID: 'reiwa00005',
        accountStatus: '使用中',
        groundAuth: {
          column_1: '〇',
          column_2: '〇',
          column_3: '〇',
          column_4: '〇',
          column_5: '〇',
          column_6: '〇',
          column_7: '〇',
          column_8: '〇',
        },
      });
      syokuinViewData.push({
        syokuinCode: '00006',
        syokuinName: '福島　恵子',
        rkana: 'ｹｲｺﾌｸｼﾏ',
        syokusyu: '事務員',
        syozokuJigyosyo: '障害者支援施設　いるか園',
        startDate: '2018/04/01',
        endDate: '',
        taisyoku: '',
        mailAddress: '',
        mailFlag: '',
        accountID: '',
        accountStatus: this.filterArray[3].value,
        groundAuth: {
          column_1: '',
          column_2: '',
          column_3: '',
          column_4: '',
          column_5: '',
          column_6: '',
          column_7: '',
          column_8: '',
        },
        checkedFlag: true,
      });
      syokuinViewData.push({
        syokuinCode: '00007',
        syokuinName: '平成　慎吾',
        rkana: 'ｼﾝｺﾞﾍｲｾｲ',
        syokusyu: '生活指導員',
        syozokuJigyosyo: '障害者支援施設　いるか園',
        startDate: '2018/04/01',
        endDate: '',
        taisyoku: '',
        mailAddress: 'sample7@sample.co.jp',
        mailFlag: '',
        accountID: '',
        accountStatus: '停止中',
        groundAuth: {
          column_1: '',
          column_2: '',
          column_3: '',
          column_4: '',
          column_5: '',
          column_6: '',
          column_7: '',
          column_8: '',
        },
        checkedFlag: true,
      });
      syokuinViewData.push({
        syokuinCode: '00010',
        syokuinName: '岐阜　健太',
        rkana: 'ｷﾞﾌｹﾝﾀ',
        syokusyu: '看護師',
        syozokuJigyosyo: '障害者支援施設　いるか園',
        startDate: '2018/04/01',
        endDate: '2022/10/15',
        taisyoku: '',
        mailAddress: 'sample10@sample.co.jp',
        mailFlag: '',
        accountID: '',
        accountStatus: '使用中',
        groundAuth: {
          column_1: '',
          column_2: '',
          column_3: '',
          column_4: '',
          column_5: '〇',
          column_6: '',
          column_7: '',
          column_8: '',
        },
      });
      syokuinViewData.push({
        syokuinCode: '00010',
        syokuinName: '岐阜　健太',
        rkana: 'ｷﾞﾌｹﾝﾀ',
        syokusyu: '看護師',
        syozokuJigyosyo: '障害者支援施設　みどり園',
        startDate: '2019/10/01',
        endDate: '',
        taisyoku: '',
        mailFlag: '',
        accountID: '',
        accountStatus: '使用中',
        groundAuth: {
          column_1: '',
          column_2: '',
          column_3: '',
          column_4: '',
          column_5: '',
          column_6: '',
          column_7: '',
          column_8: '',
        },
      });

      this.syokuinViewDataDefault = JSON.parse(JSON.stringify(syokuinViewData));
      this.syokuinViewData = JSON.parse(JSON.stringify(syokuinViewData));
      this.searched();
      this.getAccountCount();
      flexGrid.frozenColumns = this.columnArray.length;
      //フィルタ表示切替
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseover', (e) => {
        // アカウント管理のマウスオーバー
        var ht = flexGrid.hitTest(e);
        let statusString = 'accountMouseOverStatus';
        let authString = 'headerAuthMouseOver';
        let authBodyString = 'authMouseOver';
        let headerElem = document.getElementsByClassName(authBodyString);
        for (let i = 0; i < headerElem.length; i++) {
          headerElem[i].style.backgroundColor = sysConst.COLOR.white;
        }
        if (ht.panel == flexGrid.columnHeaders) {
          let headerElement = document.elementFromPoint(e.clientX, e.clientY);
          if (headerElement.className.indexOf(authString) > -1) {
            // 縦列noを取得
            let str = headerElement.className;
            let target = 'headerAuthMouseOverCode--';
            let bodyTarget = 'authMouseOverBody--';
            let num = str.substring(str.indexOf(target) + target.length);
            let elem = document.getElementsByClassName(bodyTarget + num);
            for (let i = 0; i < elem.length; i++) {
              elem[i].style.backgroundColor = sysConst.COLOR.dialog_hover;
            }
          }
        }

        let elem = document.getElementsByClassName(statusString);
        for (let i = 0; i < elem.length; i++) {
          elem[i].style.backgroundColor = sysConst.COLOR.white;
        }

        if (ht.panel == flexGrid.cells) {
          let cellElement = document.elementFromPoint(e.clientX, e.clientY);
          if (cellElement.className.indexOf(statusString) > -1) {
            // 職員コードを取得
            let str = cellElement.className;
            let target = 'accountMouseOverCode--';
            let string = str.substring(str.indexOf(target) + target.length);
            // 指定職員コードのエレメント
            let elem = document.getElementsByClassName(target + string);
            for (let i = 0; i < elem.length; i++) {
              elem[i].style.backgroundColor = sysConst.COLOR.dialog_hover;
            }
          }
        }
        this.filtered.showFilterIcons = true;

        // vue3の場合下記記載がないとfiltered機能が動作しない
        setTimeout(() => {
          flexGrid.refresh();
        });
      });
      flexGrid.addEventListener(flexGrid.hostElement, 'mouseleave', () => {
        this.filtered.showFilterIcons = false;
      });

      // グリッド押下時
      let _self = this;
      flexGrid.hostElement.addEventListener('click', function (e) {
        var ht = flexGrid.hitTest(e);
        if (ht.panel == flexGrid.cells) {
          // グリッドの選択位置
          _self.gridSelectedRow = ht.row;
          // 利用状況を押下し、状態に応じた職員アカウント情報ダイアログ画面を表示
          if (ht.col == _self.columnArray.length - 1) {
            let temp = flexGrid.itemsSource[ht.row];
            _self.dialogSyokuinName = temp.syokuinName; // 職員名
            // アカウント発行 未登録の場合は0
            if (temp.accountStatus == this.filterArray[3].value) {
              _self.dialogAccount = 2;
            } else {
              _self.dialogAccount = 1;
            }
            _self.dialogAccountID = temp.accountID; // アカウントID
            _self.dialogAccountMail = temp.mailAddress; // メールアドレス

            // 使用中
            if (temp.accountStatus == _self.filterArray[0].value) {
              _self.useButton = 'useButton';
              _self.dialogMessageUse =
                _self.filterArray[0].value + '：' + _self.useButtonMessage[0];
            }
            // 仮登録
            if (temp.accountStatus == _self.filterArray[1].value) {
              _self.useButton = 'tempButton';
              _self.dialogMessageUse =
                _self.filterArray[1].value + '：' + _self.useButtonMessage[1];
            }
            // 停止中
            if (temp.accountStatus == _self.filterArray[2].value) {
              _self.useButton = 'stopButton';
              _self.dialogMessageUse =
                _self.filterArray[2].value + '：' + _self.useButtonMessage[2];
            }
            // 未登録
            if (temp.accountStatus == _self.filterArray[3].value) {
              _self.useButton = 'noRegistButton';
              _self.dialogMessageUse =
                _self.filterArray[3].value +
                '：' +
                '：' +
                _self.useButtonMessage[3];
            }

            _self.dialogAccountFlag = true;
            _self.dialogAccountRegistOpenType = 1;
            _self.dialogAccountDeleteOpenType = 0;
            _self.dialogAccountPasswordOpenType = 0;
          }
          // 権限のチェック
          if (ht.col > _self.columnArray.length - 1) {
            // 権限入力の選択状態
            let tempIcon = _self.getAuthSelecteToIdIcon(_self.authBtnSelected);
            // 選択したグランドメニュー権限のカラムの名前
            let colNumber = ht.col - _self.columnArray.length + 1;
            // let column = 'groundAuth.column_' + colNumber;

            // 選択したデータのsyokuinCodeを取得
            // 同じsyokuinCodeのデータを更新
            let syokuinCode = _self.syokuinViewData[ht.row].syokuinCode;
            _self.editSyokuiCodeColumData(
              syokuinCode,
              'groundAuth',
              'column_' + colNumber,
              tempIcon
            );
            flexGrid.refresh();
            _self.activateCancel = false; // キャンセルボタン有効
          }
        }
      });
    },

    /*********************************
     * 確認用ダイアログからの戻り関数
     */
    dialogConfirmMethod(args = {}) {
      console.log(args);
      if (this.dialogAccountRegistOpenType == 2) {
        // 利用状況の登録処理の実行
        this.dialogRegist();
      }
      if (this.dialogAccountPasswordOpenType == 1) {
        // パスワード再発行実行
        this.dialogPasswordRest();
      }
      if (this.dialogAccountDeleteOpenType == 1) {
        // 職員アカウント削除確認
        this.dialogAccountDeleteOpenType = 2;
      } else if (this.dialogAccountDeleteOpenType == 2) {
        // 職員アカウント削除
        this.dialogDelete();
      }

      if (this.cancelDialogType == 1) {
        // 編集内容のキャンセル
        this.onCancelAllClear();
      }
      if (this.authCopyType == 2) {
        // 権限コピー実行
        this.onAuthCopy();
      }
    },
    /*********************************
     * 確認用ダイアログからの戻り関数(キャンセル)
     */
    dialogConfirmCancelMethod(args = {}) {
      console.log(args);
      if (this.dialogAccountRegistOpenType == 2) {
        this.dialogAccountRegistOpenType = 1;
      }
      if (this.dialogAccountPasswordOpenType == 1) {
        this.dialogAccountPasswordOpenType = 0;
      }
      if (this.dialogAccountDeleteOpenType <= 2) {
        this.dialogAccountDeleteOpenType = 0;
      }
      if (this.cancelDialogType == 1) {
        this.cancelDialogType = 0;
      }
      if (this.authCopyType == 2) {
        this.authCopyType = 1;
      }
    },
    /*********************************
     * 完了ダイアログからの戻り
     */
    dialogCompleteMethod(args = {}) {
      console.log(args);
      if (this.dialogAccountPasswordOpenType == 2) {
        this.dialogAccountPasswordOpenType = 0;
      }
    },

    dialogAccountRegistFinish() {
      this.flexGrid.refresh();
      this.dialogAccountFlag = false;
    },
    /******************
     * 削除実行
     */
    dialogDelete() {
      let viewData = this.syokuinViewData;
      // コードが同じ人のデータを取得
      let syokuinCode =
        this.flexGrid.itemsSource[this.gridSelectedRow].syokuinCode;
      let tmp = [];
      viewData.filter(function (value) {
        // 選択したコード以外のデータを取得
        if (syokuinCode !== value.syokuinCode) {
          tmp.push(value);
        }
      });
      this.syokuinViewData = tmp;
      this.dialogAccountDeleteOpenType = 3;
      this.dialogAccountFlag = false;
    },
    /************************
     * ダイアログ登録実行
     */
    dialogRegist() {
      this.dialogAccountRegistOpenType = 3;
      let viewData = this.syokuinViewData;
      // コードが同じ人のデータを取得
      let syokuinCode =
        this.flexGrid.itemsSource[this.gridSelectedRow].syokuinCode;
      let _self = this;
      viewData.filter(function (value, k) {
        if (syokuinCode == value.syokuinCode) {
          viewData[k].syokuinName = _self.dialogSyokuinName;
          viewData[k].accountID = _self.dialogAccountID;
          viewData[k].mailAddress = _self.dialogAccountMail;

          // 使用中
          if (_self.useButton == 'useButton') {
            viewData[k].accountStatus = _self.filterArray[0].value;
          }
          // 仮登録
          if (_self.useButton == 'tempButton') {
            viewData[k].accountStatus = _self.filterArray[1].value;
          }
          // 停止中
          if (_self.useButton == 'stopButton') {
            viewData[k].accountStatus = _self.filterArray[2].value;
          }
          // 未登録
          if (_self.useButton == 'noRegistButton') {
            viewData[k].accountStatus = _self.filterArray[3].value;
          }
        }
      });
      this.syokuinViewData = viewData;
    },

    dialogAccountClose() {
      this.dialogAccountFlag = false;
    },
    /**********************
     * パスワード再発行
     */
    passwordReset() {
      this.dialogAccountPasswordOpenType = 1;
    },
    /**********************
     * パスワード再発行実行
     */
    dialogPasswordRest() {
      this.dialogAccountFlag = false;
      this.dialogAccountPasswordOpenType = 2;
    },

    /**************************
     * dialogで表示している利用状態の変更
     */
    editUseStatus() {
      // 利用中の時は停止ボタンに変更
      if (this.useButton == 'useButton') {
        this.useButton = 'stopButton';
        this.dialogMessageUse =
          this.filterArray[2].value + '：' + this.useButtonMessage[2];
      }
      // 停止中の時は利用中ボタンに変更
      else if (this.useButton == 'stopButton') {
        this.useButton = 'useButton';
        this.dialogMessageUse =
          this.filterArray[0].value + '：' + this.useButtonMessage[0];
      }
    },
    /*******************
     * 指定したsyokuinCodeのデータを更新
     */
    editSyokuiCodeColumData(syokuinCode, editColumn, num, icon) {
      for (let i = 0; i < this.syokuinViewData.length; i++) {
        // syokuinCodeが選択した物と同じもの
        // 利用状況が未登録ではない
        if (
          this.syokuinViewData[i].syokuinCode == syokuinCode &&
          this.syokuinViewData[i].accountStatus != this.filterArray[3].value
        ) {
          this.syokuinViewData[i][editColumn][num] = icon;
        }
      }
    },
    /*******************************
     * ヘッダ作成
     *******************************/
    createHeader(flexGrid) {
      var panel = flexGrid.columnHeaders;
      panel.rows.insert(1, new wjGrid.Row());
      panel.rows.insert(2, new wjGrid.Row());

      for (let i = 0; i < this.columnArray.length; i++) {
        panel.setCellData(0, i, this.columnArray[i].header);
        panel.setCellData(1, i, this.columnArray[i].header);
        panel.setCellData(2, i, this.columnArray[i].header);
        flexGrid.columnHeaders.columns[i].allowMerging = true;
      }

      let col = '';
      let c = this.columnArray.length;
      for (let i = 0; i < this.columnAuthArray.length; i++) {
        panel.setCellData(0, c, this.columnAuthArray[i].top);
        panel.setCellData(1, c, this.columnAuthArray[i].middle);
        panel.setCellData(2, c, this.columnAuthArray[i].bottom);

        col = flexGrid.columnHeaders.columns[c];
        col.allowMerging = true;
        col.multiLine = true;
        col.wordWrap = true;

        c++;
      }
      flexGrid.columnHeaders.rows[0].allowMerging = true;
      flexGrid.columnHeaders.rows[1].allowMerging = true;
      flexGrid.columnHeaders.rows[2].allowMerging = true;
      let str = '';
      for (let i = 3; i <= this.columnArray.length - 1; i++) {
        str = i >= 7 ? 'アカウント管理' : '勤務情報';
        panel.setCellData(0, i, str);
      }
      flexGrid.columnHeaders.rows[2].height = 60;
    },
    onItemsSourceChanged() {},
    onFormatItem(flexGrid, e) {
      let accountRowCount = this.columnArray.length - 1;

      if (e.panel.cellType == wjGrid.CellType.ColumnHeader) {
        if ((e.col == 6 || e.col == 7) && e.row == 1) {
          wijmo.addClass(e.cell, 'vertical-write');
        }

        if (e.col >= 7 && e.col <= accountRowCount) {
          wijmo.addClass(e.cell, 'headerorange');
        }
        if (e.col >= this.columnArray.length) {
          wijmo.addClass(e.cell, 'headerpink');
        }

        if (e.col > accountRowCount) {
          wijmo.addClass(e.cell, 'headerAuthMouseOver');
          wijmo.addClass(e.cell, 'headerAuthMouseOverCode--' + e.col);
        }
      }

      if (e.panel.cellType == wjGrid.CellType.Cell) {
        if (e.col == 1 || e.col == 2 || e.col == 3 || e.col == 8) {
          e.cell.style.textAlign = 'left';
        }

        // セルデータを取得
        let tmpitem = [];
        if (e.panel.rows[e.row]) {
          tmpitem = e.panel.rows[e.row].dataItem;
        }
        let tmp = [];
        // 終了日が登録＋権限が登録されている場合は背景をピンクに変更
        if (e.col > accountRowCount) {
          let c = 'column_' + (e.col - accountRowCount); // 権限カラム名

          this.syokuinViewData.map(function (value) {
            if (value.endDate && value.groundAuth[c]) {
              tmp.push(value.syokuinCode);
            }
          });

          if (tmpitem.syokuinCode == tmp[0]) {
            wijmo.addClass(e.cell, 'backgroundPink');
          }
        }

        // 利用状況が未登録の場合は列以降をgrayに変更
        if (tmpitem.accountStatus == this.filterArray[3].value) {
          if (e.col > accountRowCount) {
            wijmo.addClass(e.cell, 'backgroundGray');
          }
        }
        // 上下のセルを比べて同じ場合に下のセルを消す
        let tmpitemBefore = [];
        if (e.panel.rows[e.row - 1]) {
          tmpitemBefore = e.panel.rows[e.row - 1].dataItem;
        }
        if (
          tmpitemBefore != null &&
          tmpitem.syokuinCode == tmpitemBefore.syokuinCode
        ) {
          if (e.col == 0 || e.col == 1 || e.col >= 7) {
            e.cell.innerHTML = '';
          }
        }
        // 上下のセルを比べて同じ場合に上のセルの下線を消す
        let tmpitemAfter = [];
        let tmpBefore = [];
        if (e.panel.rows[e.row + 1]) {
          tmpitemAfter = e.panel.rows[e.row + 1].dataItem;
        }
        if (e.panel.rows[e.row - 1]) {
          tmpBefore = e.panel.rows[e.row - 1].dataItem;
        }
        if (
          tmpitemAfter != null &&
          tmpitem.syokuinCode == tmpitemAfter.syokuinCode
        ) {
          if (e.col == 0 || e.col == 1 || e.col >= 7) {
            wijmo.addClass(e.cell, 'borderBottomNone');
          }
        }

        // 職員名に要確認アイコンをつける
        if (e.col == 1 && tmpitem.checkedFlag) {
          e.cell.innerHTML += '<span class="checkicon">新規</span>';
        }

        // 利用状況へ文字前にアイコンを付けるためclass付与
        if (
          e.col == accountRowCount &&
          tmpBefore != null &&
          tmpitem.syokuinCode != tmpBefore.syokuinCode
        ) {
          // 使用中
          if (tmpitem.accountStatus == this.filterArray[0].value) {
            wijmo.addClass(e.cell, 'setCheckIcon');
            wijmo.addClass(e.cell, 'setCheckIconUsing');
          }
          // 未登録は空欄
          if (tmpitem.accountStatus == this.filterArray[3].value) {
            e.cell.innerHTML = '';
          }
          // 仮登録
          if (tmpitem.accountStatus == this.filterArray[1].value) {
            wijmo.addClass(e.cell, 'setCheckIcon');
            wijmo.addClass(e.cell, 'setCheckIconNone');
          }
          // 停止中
          if (tmpitem.accountStatus == this.filterArray[2].value) {
            wijmo.addClass(e.cell, 'setCheckIcon');
            wijmo.addClass(e.cell, 'setCheckIconStop');
          }
        }
        if (
          e.col == accountRowCount - 2 ||
          e.col == accountRowCount - 1 ||
          e.col == accountRowCount
        ) {
          wijmo.addClass(e.cell, 'accountMouseOverStatus');
          wijmo.addClass(
            e.cell,
            'accountMouseOverCode--' + tmpitem.syokuinCode
          );
        }

        if (e.col > accountRowCount) {
          // 下記セルはclassを付与しない
          // 終了日が登録＋権限が登録されている場合は背景をピンクに変更
          if (
            tmpitem.accountStatus != this.filterArray[3].value &&
            (tmpitem.endDate == '' ||
              (tmpitem.endDate && !flexGrid.getCellData(e.row, e.col))) &&
            tmpitem.syokuinCode != tmp[0]
          ) {
            wijmo.addClass(e.cell, 'authMouseOver');
            wijmo.addClass(e.cell, 'authMouseOverBody--' + e.col);
          }
        }

        if (e.col < this.columnArray.length - 3) {
          wijmo.addClass(e.cell, 'backgroundYellow');
        }
      }
    },
    /*******************
     * フィルターの指定
     */
    filterInitialized(filter) {
      this.filtered = filter;
      for (let i = 0; i < this.columnArray.length; i++) {
        if (i < 6) {
          this.filterAbled.push(this.columnArray[i].binding);
        }
      }
      filter.filterColumns = this.filterAbled;
    },
    /************************
     * 権限入力クリック
     */
    authClick(mine) {
      // クリア押下時はid:1に戻す
      if (mine == 0) {
        // グランドメニュー権限のデータをクリア
        let editColumn = '';
        for (let i = 0; i < this.syokuinViewData.length; i++) {
          for (let c = 0; c < this.columnAuthArray.length; c++) {
            editColumn = this.columnAuthArray[c].binding;
            this.syokuinViewData[i][editColumn] = '';
          }
        }
        this.flexGrid.refresh();
        this.activateCancel = false; // キャンセルボタン有効
        mine = 1;
      }
      this.authBtnActive = [];
      this.authBtnActive[mine] = true;
      this.authBtnSelected = mine; // 権限入力の選択値
    },
    /***********************
     * 選択しているidの値を元に表示されるiconを取得
     ***********/
    getAuthSelecteToIdIcon(select) {
      let temp = this.authItem.find((el) => el.id == select);
      return temp.value;
    },
    /****************************
     * アカウント発行要確認新規職員
     */
    getAccountCount() {
      // 新規のアイコンが表示されている数
      let array = this.syokuinViewData.map(function (value) {
        return value.checkedFlag ? 1 : 0;
      });
      this.accountCount = array.reduce((prev, current) => prev + current, 0);
    },
    /****************
     * 記号説明ボタン押下
     */
    onsignExplain(type) {
      this.signExplainFlag = type == 0 ? false : true;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';
@import '@grapecity/wijmo.styles/wijmo.css';

$height: 24px;
$mwidth: 1366px;
%commonCloseButton {
  height: $height;
  min-width: 30px;
  color: $black;
  position: absolute;
  left: auto;
  right: 10px;
  top: 10px;
}
%doButton {
  color: $white;
  background-color: $dialog_blue;
}

%checkCircleImage {
  border: none;
  background-color: $green;
  text-align: center;
  background-image: url('@/assets/checkCircle.png');
  background-position: 20% 50%;
}
%h5 {
  color: $white;
  font-weight: normal;
  font-size: 1.25rem;
}

#authCopyDialog {
  font-size: $default_fontsize;
  padding: 10px;
  .v-card-title {
    &.dialog_title {
      background-color: $deepgreen;
      color: $white;
      position: relative;
      .closeButton {
        @extend %commonCloseButton;
      }
    }
  }

  label {
    display: block;
    position: relative;
    .questionIcon {
      position: absolute;
      top: 0;
      border: 1px solid $gray;
      padding: 6px;
      border-radius: 50%;
      margin-top: 3px;
      margin-left: 10px;
      background-color: $black;
      color: $white;
      font-size: 8px;
    }
  }
  .borderbottom {
    border-bottom: 1px solid $grid_Border_Color;
    width: 100%;
  }
  select {
    border: 1px solid $light-gray;
    width: 80%;
    -webkit-appearance: auto;
    padding: 4px;
    border-radius: 5px;
  }
  .bottombutton {
    button {
      width: 120px;
      &.doButton {
        @extend %doButton;

        &.v-btn--disabled {
          color: $gray;
          background-color: $light-gray;
        }
      }
    }
  }
  #syokuinCopyGrid {
    max-height: 260px;
  }
}
.dialogAccount {
  font-size: $default_fontsize;

  input[type='text']:disabled {
    background: $light-gray;
  }
  label {
    &.tle {
      background-color: $view_Title_background_Blue;
      width: 160px;
      display: inline-block;
      text-align: center;
      position: relative;
      &.inq {
        &:before {
          content: '*';
          color: $red;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
  }
  .questionarea {
    position: relative;
    .questionIcon {
      position: absolute;
      top: 0;
      left: auto;
      right: -25px;
      font-size: 8px;
      border: 1px solid $gray;
      padding: 6px;
      border-radius: 50%;
      margin-top: 3px;
      background-color: $black;
      color: $white;
    }
    .questionStatusButton {
      width: 70px;
      height: 21px;
      background-size: 80%;
      text-indent: -9999px;
      background-position: 2px 2px;
      &.useButton {
        background-image: url('@/assets/usingButton.png');
      }
      &.tempButton {
        background-image: url('@/assets/tempRegistButton.png');
      }
      &.stopButton {
        background-image: url('@/assets/stoppingButton.png');
      }
      &.noRegistButton {
        background-image: url('@/assets/noRegistButton.png');
      }
    }
  }
  .v-card {
    &.box {
      border: 1px solid #ccc;
      display: inline-block;
      &.min {
        width: 200px;
      }
      &.mdl {
        width: 250px;
      }
    }
  }
  .borderbottom {
    border-bottom: 1px solid $grid_Border_Color;
    width: 100%;
  }
  .v-card-title {
    &.dialog_title {
      background-color: $deepgreen;
      color: $white;
      position: relative;
      .closeButton {
        @extend %commonCloseButton;
      }
    }
  }
  .htmin {
    height: $height;
    width: 120px;
    font-size: $cell_fontsize;
  }
  .deleteButton {
    border: 1px solid $red;
    color: $red;
  }
  .passwordButton {
    border: 1px solid $time_color_header;
  }
  .registButton {
    background-color: $view_Title_background_Main;
    color: $white;
  }
}
div#accountsData {
  font-size: 12px;
  min-width: $mwidth;

  #subTitle {
    border-bottom: 1px solid $black;
    h2 {
      font-weight: normal;
    }
    label {
      line-height: 28px;
      margin-left: 20px;
    }
  }
  #signExplain {
    position: absolute;
    width: 400px;
    padding: 10px;
    z-index: 1000;
    margin-top: 30px;
    background: rgba(255, 255, 255, 0.95);
    border: 3px solid $view_Title_background_Main;

    animation-name: fadeInAnime;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    opacity: 0;

    div {
      margin-top: 1px;
      &.left {
        width: 40px;
        text-align: center;
      }
      &.pinkBackColor {
        background-color: $pink;
      }
      &.brownBackColor {
        background-color: $brown;
        color: $white;
      }
    }
  }
  @keyframes fadeInAnime {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  label {
    &.message {
      background-color: $Hissu_Color !important;
      color: $white;
      padding: 5px;
    }
    &.accountConfLabel {
      background-color: $view_Title_background_Orange;
      height: $height;
      width: 260px;
      display: block;
      text-align: center;
      line-height: $height;
    }
  }
  span {
    &.checkicon {
      font-size: 0.85%;
      display: inline-block;
      float: right;
      background-color: $brown;
      width: 30px;
      height: 15px;
      text-align: center;
      color: $white;
    }
  }
  button {
    &.isActive {
      color: $white;
      background-color: $view_Title_font_color_Blue;
    }
  }
  #alpCommon {
    height: $height;
  }
  #syokuinListGrid {
    min-width: $mwidth;

    position: relative;
    #syokuinViewDataNone {
      position: absolute;
      top: 120px;
      left: 50%;
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      z-index: 10000;
      #noListLogo {
        width: 140px;
        height: 140px;
        background-image: url('@/assets/noList.png');
        background-size: contain;
        margin: 0 auto;
      }
    }

    .wj-cell {
      &.borderBottomNone {
        border-bottom: 0px;
      }
      &.backgroundYellow {
        background-color: $light-yellow;
      }
      &.backgroundGray {
        background-color: $selected_color;
      }
      &.backgroundPink {
        background-color: $pink;
      }
      &.backgroundWhite {
        background-color: $white;
      }
      &.setCheckIcon {
        width: 14px;
        text-indent: -9999px;
        background-repeat: no-repeat;
        background-position: 20px 3px;
        &.setCheckIconUsing {
          background-image: url('../../assets/usingIcon.png');
        }
        &.setCheckIconNone {
          background-image: url('../../assets/tempIcon.png');
        }
        &.setCheckIconStop {
          background-image: url('../../assets/stopIcon.png');
        }
      }
      &.setCheckIconNone {
        &:before {
          content: url('../../assets/checkIconNone.png');
          padding-right: 3px;
          padding-top: 3px;
        }
      }
    }
    .wj-header {
      &.wj-cell {
        display: flex;
        justify-content: center;
        align-items: center;

        &.vertical-write {
          -ms-writing-mode: tb-rl;
          writing-mode: vertical-rl;
        }
        &.headerpink {
          background-color: $pink;
        }
        &.headerorange {
          background-color: $grid_Total_Header_Background;
        }
        &.headeraqua {
          background-color: $light-blue;
        }
      }
    }
  }
  .bottomButtonArea {
    min-width: $mwidth;
    position: relative;
    div {
      &:first-child {
        width: $mwidth - 114px;
      }
      &:nth-child(2) {
        button {
          position: absolute;
          top: 0;
          left: auto;
          right: 10px;
        }
      }
    }
  }
  .labeled {
    background-color: $view_Row_background;
    width: 100px;
    text-align: center;
    line-height: $height;
    display: inline-block;
    &.pinked {
      background-color: $pink;
      line-height: $height;
      height: $height;
    }
    &.min {
      width: 80px;
    }
  }
  select {
    border: 1px solid $light-gray;
    -webkit-appearance: auto;
    &.selectBox {
      height: $height;
      width: 400px;
      &.short {
        width: 140px;
      }
    }
  }
  .boarderArea {
    width: 200px;
    &.wMdle {
      width: 450px;
    }
  }

  .filterHeight {
    height: $height;
  }
}
</style>
