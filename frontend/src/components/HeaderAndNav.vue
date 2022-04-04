<template>
  <div id="app">
    <v-navigation-drawer
    app
    v-model="drawer"
		dark
    color="#4d4d4d"
		width="280px"
    >
			<v-list-item>
				<p class="kenbunroku-logo">
					<img  src="../assets/HukushiKenbunrokuLogo.png" alt="">
				</p>
			</v-list-item>
			<v-list dense>
			<template v-for="nav_list in nav_lists">
				<!-- 下に階層を持たないメニューの場合はクリックで遷移 -->
				<v-list-item
					v-if="!nav_list.lists"
					:to="nav_list.link"
					:key="nav_list.name"
					class="nav-list-name"
				>
					<v-list-item-content>
						<v-list-item-title>
							{{ nav_list.name }}
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-group
					v-else
					:key="nav_list.name"
					no-action
					class="nav-list-name"
					dark
					color="#348498"
				>
					<template v-slot:activator>
						<!-- 下に階層を持つメニューの場合はクリックでメニューを展開 -->
							<v-list-item-content>
								<v-list-item-title>{{ nav_list.name }}</v-list-item-title>
							</v-list-item-content>
					</template>
					<!-- 下の階層のメニュー -->
					<v-list-item v-for="list in nav_list.lists" :key="list" :to="list.link">
						<v-list-item-content>
							<v-list-item-title>{{ list.name }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					</v-list-group>
				</template>
			</v-list>
			<v-spacer></v-spacer>
			<p class="kenbunroku-logo">
				<img  src="../assets/CorporateLogo.png" alt="">
			</p>
    </v-navigation-drawer>

    <v-app-bar app color="#348498" dark dense height="30px" >
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>{{pageTitle}}</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
      <v-toolbar-title>【社会福祉法人東経福祉会】</v-toolbar-title>
      <v-spacer></v-spacer>

      <div class="text-center">
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
										small
                >
                <v-icon>mdi-account-circle</v-icon>
                    大正雅夫
                </v-btn>
            </template>
            <v-list>
                <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        </div>
      <v-icon>mdi-magnify</v-icon>
      <v-icon>mdi-printer</v-icon>
      <v-icon>mdi-file-excel</v-icon>
    </v-app-bar>

  </div>

</template>

<script>
export default {
  data(){
    return{
      drawer: false,
      pageTitle: this.$route.name,
      items: [
        { title: '職員マスタ' },
        { title: 'パスワード変更' },
        { title: 'ログアウト' },
      ],
      nav_lists:[
        {name: '共通掲示板',link:'/TemporaryPage'},
        {
          name: '事業所情報',
          lists:[
            {name: '基本事業者',link:'/TemporaryPage'},
            {name: 'サービス提供事業所',link:'/TemporaryPage'}
          ]
        },
        {
          name: '入所レセプト請求',
          lists:[
            {name: '施設体制確認',link:'/TemporaryPage'},
            {name: '受給者証情報確認',link:'/TemporaryPage'},
            {name: '契約情報確認',link:'/TemporaryPage'},
            {name: '利用料項目確認',link:'/TemporaryPage'},
            {name: '個別加算登録',link:'/TemporaryPage'},
            {name: '生活支援取り込み',link:'/TemporaryPage'},
            {name: 'レセプト集計',link:'/TemporaryPage'},
            {name: '上限管理',link:'/TemporaryPage'},
            {name: '給付明細書',link:'/KyuhuMeisai'},
            {name: '実績記録表',link:'/JissekiKiroku'},
            {name: '請求書',link:'/SeikyuSho'}
          ]
        },
				{
          name: 'グループホームレセプト請求',
          lists:[
            {name: '施設体制確認',link:'/TemporaryPage'},
            {name: '受給者証情報確認',link:'/TemporaryPage'},
            {name: '契約情報確認',link:'/TemporaryPage'},
            {name: '利用料項目確認',link:'/TemporaryPage'}
          ]
        },
				{
          name: '相談支援レセプト請求',
          lists:[
            {name: '施設体制確認',link:'/TemporaryPage'},
            {name: '受給者証情報確認',link:'/TemporaryPage'},
            {name: '契約情報確認',link:'/TemporaryPage'},
            {name: '利用料項目確認',link:'/TemporaryPage'},
            {name: '記録表',link:'/TemporaryHistory'}
          ]
        },
      ],
    }
  },
	watch: {
    $route() {
      this.pageTitle = this.$route.name;
    }
  }
}
</script>

<style scoped>
.nav-list-name{
	border-top:1px solid #808080;
}

.kenbunroku-logo{
	padding-top:10px;
	margin:auto;
}

</style>
