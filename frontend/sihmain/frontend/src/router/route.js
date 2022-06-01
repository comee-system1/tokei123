import Vue from 'vue'
import VueRouter from 'vue-router'
import JyukyuIcrn from '../views/JyukyuIcrn.vue'
import JissekiKirokuParent from '../views/JissekiKirokuParent.vue'
import KyuhuMeisai from '../views/KyuhuMeisai.vue'
import KyuhuMeisaiIcrn from '../views/KyuhuMeisaiIcrn.vue'
import SeikyuSho from '../views/SeikyuSho.vue'
import ShisetsuTaisei from '../views/ShisetsuTaisei.vue'
import TemporaryPage from '../views/TemporaryPage.vue'
import JijyougenkanriJimsyo from '../views/JijyougenkanriJimsyo.vue'
import TajyougenkanriJimsyo from '../views/TajyougenkanriJimsyo.vue'
import KobetsuRiyouTouroku from '../views/KobetsuRiyouTouroku.vue'
import ReceptSyukei from '../views/ReceptSyukei.vue'
import KasanKoumokuIcrn from '../views/KasanKoumokuIcrn.vue'

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
        path:'/KyuhuMeisaiIcrn',
        name:'介護給付明細一覧',
        component:KyuhuMeisaiIcrn
    },
    {
        path:'/JissekiKiroku',
        name:'実績記録表',
        component: JissekiKirokuParent
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
        path:'/JijyougenkanriJimsyo',
        name:'自上限管理事務所用',
        component: JijyougenkanriJimsyo
    },
    {
        path:'/TajyougenkanriJimsyo',
        name:'他上限管理事務所用',
        component: TajyougenkanriJimsyo
    },
    {
        path:'/ReceptSyukei',
        name:'レセプト集計',
        component: ReceptSyukei
    },
    {
        path:'/TemporaryPage',
        name:'仮のページ',
        component: TemporaryPage
    },
    {
        path:'/KobetsuRiyouTouroku',
        name:'個別利用状況登録',
        component: KobetsuRiyouTouroku
    },
    {
        path:'/KasanKoumokuIcrn',
        name:'加算項目一覧',
        component: KasanKoumokuIcrn
    },
]

const router = new VueRouter({
    mode:'history',
    base:process.env.BASE_URL,
    routes
})

export default router