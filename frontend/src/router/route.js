import Vue from 'vue'
import VueRouter from 'vue-router'
import JyukyuIcrn from '../views/JyukyuIcrn.vue'
import JissekiKirokuParent from '../views/JissekiKirokuParent.vue'
import KyuhuMeisai from '../views/KyuhuMeisai.vue'
import KyuhuMeisaiIcrn from '../views/KyuhuMeisaiIcrn.vue'
import SeikyuSho from '../views/SeikyuSho.vue'
import ShisetsuTaisei from '../views/ShisetsuTaisei.vue'
import TemporaryPage from '../views/TemporaryPage.vue'
import SampleLogin from '../views/SampleLogin.vue'
import SampleAuth from '../views/SampleAuth.vue'
import ApiTemporaryPage from '../views/ApiTemporaryPage.vue'
import KobetsuRiyouTouroku from '../views/KobetsuRiyouTouroku.vue'
import ReceptSyukei from '../views/ReceptSyukei.vue'
import KasanKoumokuIcrn from '../views/KasanKoumokuIcrn.vue'
import JyuryouTsuchisyo from '../views/JyuryouTsuchisyo.vue'
import NyutaiinHokoku from '../views/NyutaiinHokoku.vue'
import NenkanRiyouNissuIcrn from '../views/NenkanRiyouNissuIcrn.vue'
import JyukyuTouroku from '../../../../SIHMAIN/frontend/src/views/JyukyuTouroku.vue'
import ServiceHistory from '@sihmain/frontend/src/views/ServiceHistory.vue'
import KihonJyoho from '../../../../SIHMAIN/frontend/src/views/KihonJyoho.vue'

// store
import Store from '@/store/index.js'

const receptTitle = "レセプト請求";
const usedTitle = "利用者台帳";

Vue.use(VueRouter)
const routes = [{
        path: '/KihonJyoho',
        name: '基本情報',
        component: KihonJyoho,
        meta: {
            title: usedTitle,
            calender: true
        },
    },
    {
        path: '/JyukyuTouroku',
        name: '受給者証登録',
        component: JyukyuTouroku,
        meta: {
            title: usedTitle,
            calender: true
        },
    },
    {
        path: '/ServiceHistory',
        name: 'サービス履歴登録',
        component: ServiceHistory,
        meta: {
            title: usedTitle,
            calender: true
        },
    },
    {
        path: '/JyukyuIcrn',
        name: '利用者受給者証一覧',
        component: JyukyuIcrn,
        meta: {
            title: receptTitle,
        },
    },
    {
        path: '/KyuhuMeisai',
        name: '給付明細書',
        component: KyuhuMeisai,
        meta: {
            title: receptTitle,
        },
    },
    {
        path: '/KyuhuMeisaiIcrn',
        name: '介護給付明細一覧',
        component: KyuhuMeisaiIcrn,
        meta: {
            title: receptTitle,
        },
    },
    {
        path: '/JissekiKiroku',
        name: '実績記録票',
        component: JissekiKirokuParent,
        meta: {
            title: receptTitle,
        },
    },
    {
        path: '/SeikyuSho',
        name: '請求書',
        component: SeikyuSho,
        meta: {
            title: receptTitle,
        },
    },
    {
        path: '/ShisetsuTaisei',
        name: '施設体制確認',
        component: ShisetsuTaisei,
        meta: {
            title: receptTitle,
        },
    },
    {
        path: '/ReceptSyukei',
        name: 'レセプト集計',
        component: ReceptSyukei,
        meta: {
            title: receptTitle,
        },
    },
    {
        path: '/TemporaryPage',
        name: '仮のページ',
        component: TemporaryPage
    },
    {
        path: '/ApiTemporaryPage',
        name: 'API仮のページ',
        component: ApiTemporaryPage
    },
    {
        path: '/KobetsuRiyouTouroku',
        name: '個別利用状況登録',
        component: KobetsuRiyouTouroku,
        meta: {
            title: receptTitle,
        },
    },
    {
        path: '/KasanKoumokuIcrn',
        name: '加算項目一覧',
        component: KasanKoumokuIcrn,
        meta: {
            title: receptTitle,
        },
    },
    {
        path: '/JyuryouTsuchisyo',
        name: '受領通知書',
        component: JyuryouTsuchisyo,
        meta: {
            title: receptTitle,
        },
    },
    {
        path: '/NyutaiinHokoku',
        name: '入退院報告書',
        component: NyutaiinHokoku,
        meta: {
            title: receptTitle,
        },
    },
    {
        path: '/NenkanRiyouNissuIcrn',
        name: '年間利用日数一覧',
        component: NenkanRiyouNissuIcrn,
        meta: {
            title: receptTitle,
        },
    },
    {
        path: '/SampleLogin',
        name: 'ログイン',
        component: SampleLogin,
        meta: {
            title: 'ログインページのタイトル',
        },
    },
    {
        path: '/SampleAuth',
        name: 'authのみ',
        parentName: '親の仮のページ2',
        component: SampleAuth,
        meta: {
            requiresAuth: true
        }
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) && !Store.state.userToken) {
        next({
            path: '/SampleLogin',
            query: {
                redirect: to.fullPath
            }
        });
    } else {
        next();
    }
});


export default router