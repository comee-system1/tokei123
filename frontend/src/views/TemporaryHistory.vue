<template>
  <div>
    <v-breadcrumbs
      :items="items"
      divider=""
      small
    ></v-breadcrumbs>
    <div class="container-fluid">
        <div class="row">
            <div class="col-2">
              ここにメニュー
            </div>
            <div class="col-10">
              <div class="container-fluid">
                <wj-flex-grid
                    :itemsSource="data"
                    :allowMerging="'ColumnHeaders'"
                    :alternatingRowStep="0"
                    :autoGenerateColumns="false"
                >
                    <wj-flex-grid-column :binding="'country'" :header="'項目'" :allowMerging="true"></wj-flex-grid-column>
                </wj-flex-grid>
              </div>
            </div>
        </div>
    </div>

  </div>
</template>

<script>


import "@grapecity/wijmo.vue2.grid";

export default{

  data(){
    return{
      items: [
        {
          text: 'グランドメニュー',
          disabled: false,
          href: '/',
        },
        {
          text: '入所レセプト請求',
          disabled: false,
          href: '#',
        },
        {
          text: '変動情報登録・修正',
          disabled: true,
          href: '#',
        },
      ],
      data: this.getData()
    }
  },
  methods: {
    getData:function(){
      //var countries = 'アメリカ,ドイツ,イギリス,日本'.split(',');
      var data = [];
      // for (var i = 0; i < 20; i++) {
      //     data.push({
      //         id: i,
      //         country: countries[i % countries.length],
      //     });
      // }
     // console.log(data);
      var colum = [ '利用日', '入退院・外泊', '食事', '光熱水費' ];
      for(var i = 0; i < colum.length; i++){
        data.push({
          id:1,
          country: colum[i]
        });
        console.log(data);
      }


      return data;
    }
  }
}

</script>

<style>
  .wj-flexgrid {
    max-height: 100vh;
    margin:10px 0;
  }

  /* use flex display to center-align cells vertically */
  .wj-flexgrid .wj-cell {
    display: flex;
    align-items: center;
  }
  .wj-flexgrid .wj-cell.wj-align-right {
    justify-content: flex-end;
  }
  .wj-flexgrid .wj-cell.wj-align-center {
    justify-content: center;
  }

  body {
    margin-bottom: 20px;
  }
</style>
