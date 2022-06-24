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


Vue.use(VueRouter)
const routes = [{
        path: '/KihonJyoho',
        name: '基本情報',
        component: KihonJyoho
    },
    {
        path: '/JyukyuTouroku',
        name: '受給者証登録',
        component: JyukyuTouroku
    },
    {
        path: '/ServiceHistory',
        name: 'サービス履歴登録',
        component: ServiceHistory
    },
    {
        path: '/JyukyuIcrn',
        name: '利用者受給者証一覧',
        component: JyukyuIcrn
    },
    {
        path: '/KyuhuMeisai',
        name: '給付明細書',
        component: KyuhuMeisai
    },
    {
        path: '/KyuhuMeisaiIcrn',
        name: '介護給付明細一覧',
        component: KyuhuMeisaiIcrn
    },
    {
        path: '/JissekiKiroku',
        name: '実績記録票',
        component: JissekiKirokuParent
    },
    {
        path: '/SeikyuSho',
        name: '請求書',
        component: SeikyuSho
    },
    {
        path: '/ShisetsuTaisei',
        name: '施設体制確認',
        component: ShisetsuTaisei
    },
    {
        path: '/ReceptSyukei',
        name: 'レセプト集計',
        component: ReceptSyukei
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
        component: KobetsuRiyouTouroku
    },
    {
        path: '/KasanKoumokuIcrn',
        name: '加算項目一覧',
        component: KasanKoumokuIcrn
    },
    {
        path: '/JyuryouTsuchisyo',
        name: '受領通知書',
        component: JyuryouTsuchisyo
    },
    {
        path: '/NyutaiinHokoku',
        name: '入退院報告書',
        component: NyutaiinHokoku
    },
    {
        path: '/NenkanRiyouNissuIcrn',
        name: '年間利用日数一覧',
        component: NenkanRiyouNissuIcrn
    },
    {
        path: '/SampleLogin',
        name: 'ログイン',
        component: SampleLogin
    },
    {
        path: '/SampleAuth',
        name: 'authのみ',
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