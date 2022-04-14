import Vue from 'vue'
import VueRouter from 'vue-router'
import JyukyuIcrn from '../views/JyukyuIcrn.vue'
import JissekiKirokuNyusho from '../views/JissekiKirokuNyusho.vue'
import KyuhuMeisai from '../views/KyuhuMeisai.vue'
import SeikyuSho from '../views/SeikyuSho.vue'
import ShisetsuTaisei from '../views/ShisetsuTaisei.vue'
import TemporaryPage from '../views/TemporaryPage.vue'
import TemporaryHistory from '../views/TemporaryHistory.vue'
import TemporaryHistory02 from '../views/TemporaryHistory02.vue' //todo : 後で消す

Vue.use(VueRouter)

const routes = [
    {
        path:'/JyukyuIcrn',
        name:'利用者受給者証一覧',
        component:JyukyuIcrn
    },
    {
        path:'/KyuhuMeisai',
        name:'給付明細書',
        component:KyuhuMeisai
    },
    {
        path:'/JissekiKirokuNyusho',
        name:'実績記録表',
        component: JissekiKirokuNyusho
    },
    {
        path:'/SeikyuSho',
        name:'請求書',
        component: SeikyuSho
    },
    {
        path:'/ShisetsuTaisei',
        name:'施設体制確認',
        component: ShisetsuTaisei
    },
    {
        path:'/TemporaryPage',
        name:'仮のページ',
        component: TemporaryPage
    },
    {
        path:'/TemporaryHistory',
        name:'個別利用状況登録',
        component: TemporaryHistory
    },
    {
        //todo 後で消す
        path:'/TemporaryHistory02',
        name:'個別利用状況登録',
        component: TemporaryHistory02
    },
]

const router = new VueRouter({
    mode:'history',
    base:process.env.BASE_URL,
    routes
})

export default router