import Vue from 'vue'
import VueRouter from 'vue-router'
import JyukyuIcrn from '../views/JyukyuIcrn.vue'
import JissekiKirokuNyusho from '../views/JissekiKirokuNyusho.vue'
import JissekiKirokuTsusho from '../views/JissekiKirokuTsusho.vue'
import JissekiKirokuTanki from '../views/JissekiKirokuTanki.vue'
import KyuhuMeisai from '../views/KyuhuMeisai.vue'
import SeikyuSho from '../views/SeikyuSho.vue'
import ShisetsuTaisei from '../views/ShisetsuTaisei.vue'
import TemporaryPage from '../views/TemporaryPage.vue'
import TemporaryHistory from '../views/TemporaryHistory.vue'

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
        path:'/JissekiKirokuTsusho',
        name:'実績記録表',
        component: JissekiKirokuTsusho
    },
    {
        path:'/JissekiKirokuTanki',
        name:'実績記録表',
        component: JissekiKirokuTanki
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
]

const router = new VueRouter({
    mode:'history',
    base:process.env.BASE_URL,
    routes
})

export default router