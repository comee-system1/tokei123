import Vue from 'vue'
import VueRouter from 'vue-router'
// import KihonJyoho from '@sihmain/views/KihonJyoho.vue'
// import JyukyuTouroku from '@sihmain/views/JyukyuTouroku.vue'
import SienTUketukeTourokuParent from '../views/SIENT/UketukeTourokuParent.vue'
import UketukeSanshoParent from '../views/SIENT/UketukeSanshoParent.vue'
import KojinRireki from '../views/SIENT/KojinRireki.vue'
import TantousyaBetuJisseki from '../views/SIENP/TantousyaBetuJisseki.vue'
import SoudanHoukokusyo from '../views/SIENT/SoudanHoukokusyo.vue'
import SoudanHoukokusyoJyoukenParent from '../views/SIENT/SoudanHoukokusyoJyoukenParent.vue'
import UketukeCheckList from '../views/SIENT/UketukeCheckList.vue'
import MstMenu from '../views/SIENT/MstMenu.vue'
import SienPUketukeTouroku from '../components/UketukeIcrn.vue'
import MonitoringParent from '../views/SIENP/MonitoringParent.vue'
import TantoKaigi from '../views/SIENP/TantoKaigi.vue'
import KeikakuLists from '../views/SIENP/KeikakuLists.vue'
import AssessmentInput from '../views/SIENP/AssessmentInput.vue'
import KeiyakuHokoku from '../views/SIENP/KeiyakuHoukoku.vue'
import ChiikiIkoSienKeikaku from '../views/SIENC/ChiikiIkoSienKeikaku.vue'

import ChiikiteityakuDaicho from '../views/SIENC/ChiikiteityakuDaicho.vue'
import ChiikiteityakuDaichoMst from '../views/SIENC/ChiikiteityakuDaichoMst.vue'

import KoteiinfList from '../views/SIENT/KoteiinfList.vue'



// const usedTitle = "利用者台帳";
const TitleSoudansien = "相談支援";
const TitleSoudansienSyukei = "相談支援＞集計表";
const TitleKeikaku = "計画相談支援";
const TantoKaigiString = "担当者会議";
const TitleKeiyaku = "契約報告書";
const TitleChiikiSoudan = "地域相談支援";
Vue.use(VueRouter)

const routes = [
    // {
    //     path: '/KihonJyoho/:uniqid',
    //     name: '基本情報',
    //     component: KihonJyoho,
    //     meta: {
    //         title: usedTitle,
    //         calender: true
    //     },
    // },
    // {
    //     path: '/JyukyuTouroku/:uniqid',
    //     name: '受給者証登録',
    //     component: JyukyuTouroku,
    //     meta: {
    //         title: usedTitle,
    //         calender: true
    //     },
    // },

    {
        path: '/SIENT/UketukeTourokuParent/:uniqid',
        name: '受付・対応登録',
        component: SienTUketukeTourokuParent,
        meta: {
            title: TitleSoudansien,
        },
    },
    {
        path: '/UketukeSanshoParent/:uniqid',
        name: '受付対応日報・月報',
        component: UketukeSanshoParent,
        meta: {
            title: TitleSoudansien,
        },
    },
    {
        path: '/UketukeCheckList/:uniqid',
        name: '受付対応チェックリスト',
        component: UketukeCheckList,
        meta: {
            title: TitleSoudansienSyukei,
        },
    },
    {
        path: '/AssessmentInput/:uniqid',
        name: 'アセスメント',
        component: AssessmentInput,
        meta: {
            title: TitleSoudansien,
        },
    },
    {
        path: '/KojinRireki/:kind/:uniqid',
        name: '個人履歴',
        component: KojinRireki,
        meta: {
            title: TitleSoudansien,
        },
    },
    {
        path: '/SoudanHoukokusyoJyoukenParent/:uniqid',
        name: '報告書用集計条件設定',
        component: SoudanHoukokusyoJyoukenParent,
        meta: {
            title: TitleSoudansien,
        },
    },
    {
        path: '/SoudanHoukokusyo/:uniqid',
        name: '報告書',
        component: SoudanHoukokusyo,
        meta: {
            title: TitleSoudansien,
        },
    },
    {
        path: '/MstMenu/:uniqid',
        name: 'マスタ',
        component: MstMenu,
        meta: {
            title: TitleSoudansien,
        },
    },
    {
        path: '/KeikakuUketukeIcrn/:kind/:uniqid',
        name: '計画相談受付・対応登録',
        component: SienPUketukeTouroku,
        meta: {
            title: TitleKeikaku,
        },
    },
    {
        path: '/KeikakuKojinRireki/:kind/:uniqid',
        name: '計画相談個人履歴',
        component: KojinRireki,
        meta: {
            title: TitleKeikaku,
        },
    },
    {
        path: '/MonitoringParent/:uniqid',
        name: 'モニタリング',
        component: MonitoringParent,
        meta: {
            title: TitleKeikaku,
        },
    },
    {
        path: '/TantoKaigi/:kind/:uniqid',
        name: '担当者会議',
        component: TantoKaigi,
        meta: {
            title: TantoKaigiString,
        },
    },
    {
        path: '/TantousyaBetuJisseki/:uniqid',
        name: '担当者別実績表',
        component: TantousyaBetuJisseki,
        meta: {
            title: TitleKeikaku,
        },
    },
    {
        path: '/KeikakuLists/:uniqid',
        name: '計画作成',
        component: KeikakuLists,
        meta: {
            title: TitleKeikaku,
        },
    },
    {
        path: '/KeiyakuHokoku/:uniqid',
        name: '契約報告書',
        component: KeiyakuHokoku,
        meta: {
            title: TitleKeiyaku,
        },
    },
    {
        path: '/ChiikiUketukeIcrn/:kind/:uniqid',
        name: '地域相談受付・対応登録',
        component: SienPUketukeTouroku,
        meta: {
            title: TitleChiikiSoudan,
        },
    },
    {
        path: '/ChiikiKojinRireki/:kind/:uniqid',
        name: '地域相談個人履歴',
        component: KojinRireki,
        meta: {
            title: TitleChiikiSoudan,
        },
    },
    {
        path: '/ChiikiIkoSienKeikaku/:uniqid',
        name: '地域移行支援計画',
        component: ChiikiIkoSienKeikaku,
        meta: {
            title: TitleChiikiSoudan,
        },
    },
    {
        path: '/ChiikiteityakuDaicho/:uniqid',
        name: '地域定着台帳',
        component: ChiikiteityakuDaicho,
        meta: {
            title: TitleChiikiSoudan,
        },
    },
    {
        path: '/ChiikiteityakuDaichoMst/:uniqid',
        name: '地域定着台帳様式設定',
        component: ChiikiteityakuDaichoMst,
        meta: {
            title: "マスタ",
        },
    },

    {
        path:'/KoteiinfList/:uniqid',
        name:'固定情報',
        component:KoteiinfList,
        meta: {
            title: TitleSoudansien,
        },
    },

    // {
    //     path:'/KyuhuMeisaiIcrn',
    //     name:'介護給付明細一覧',
    //     component:KyuhuMeisaiIcrn
    // },
    // {
    //     path:'/JissekiKiroku',
    //     name:'実績記録表',
    //     component: JissekiKirokuParent
    // },
    // {
    //     path:'/SeikyuSho',
    //     name:'請求書',
    //     component: SeikyuSho
    // },
    // {
    //     path:'/ShisetsuTaisei',
    //     name:'施設体制確認',
    //     component: ShisetsuTaisei
    // },
    // {
    //     path:'/JijyougenkanriJimsyo',
    //     name:'自上限管理事務所用',
    //     component: JijyougenkanriJimsyo
    // },
    // {
    //     path:'/TajyougenkanriJimsyo',
    //     name:'他上限管理事務所用',
    //     component: TajyougenkanriJimsyo
    // },
    // {
    //     path:'/ReceptSyukei',
    //     name:'レセプト集計',
    //     component: ReceptSyukei
    // },
    // {
    //     path:'/TemporaryPage',
    //     name:'仮のページ',
    //     component: TemporaryPage
    // },
    // {
    //     path:'/KobetsuRiyouTouroku',
    //     name:'個別利用状況登録',
    //     component: KobetsuRiyouTouroku
    // },
    // {
    //     path:'/KasanKoumokuIcrn',
    //     name:'加算項目一覧',
    //     component: KasanKoumokuIcrn
    // },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router