import Vue from 'vue'
import VueRouter from 'vue-router'
import JissekiKiroku from '../views/JissekiKiroku.vue'
import KyuhuMeisai from '../views/KyuhuMeisai.vue'
import SeikyuSho from '../views/SeikyuSho.vue'
import TemporaryPage from '../views/TemporaryPage.vue'
import TemporaryHistory from '../views/TemporaryHistory.vue'

Vue.use(VueRouter)

const routes = [
    {
        path:'/KyuhuMeisai',
        name:'給付明細書',
        component:KyuhuMeisai
    },
    {
        path:'/JissekiKiroku',
        name:'実績記録表',
        component: JissekiKiroku
    },
    {
        path:'/SeikyuSho',
        name:'請求書',
        component: SeikyuSho
    },
    {
        path:'/TemporaryPage',
        name:'仮のページ',
        component: TemporaryPage
    },
    {
        path:'/TemporaryHistory',
        name:'変動情報登録・修正',
        component: TemporaryHistory
    },
]

const router = new VueRouter({
    mode:'history',
    base:process.env.BASE_URL,
    routes
})

export default router