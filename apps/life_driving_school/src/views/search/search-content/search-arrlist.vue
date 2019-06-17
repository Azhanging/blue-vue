<template>
	<div class='bc-pd-lr-15rp'>
		<div class="bc-f-16rp bc-t-base bc-pd-t-14rp bc-mg-t-50rp" v-if="list && list.length>0">
			相关内容
		</div>
		<div v-for='item in list' @click='detailClick(item.id,item.column_ecosphere)' class='itemList' :key="item.id">
			<search-itemdata :itemList='item' :ifAchieve="ifAchieve"></search-itemdata>
		</div>
	</div>
</template>

<script>
	import router from '@router';
  import searchItemdata from './search-itemdata';
  export default {
    props: {
      list: {
        type: Array,
        default: [1, 2, 3]
      },
      ifAchieve: {
        type: String,
        default: ''
      }
    },
    data() {
      return {

      }
    },
    components:{
      'search-itemdata': searchItemdata
    },
    methods:{
      detailClick(article_id,column_ecosphere){
        this.$router.push({'path':`${router.currentRoute.fullPath}/detail/${article_id}?column_ecosphere=${column_ecosphere}`})
      }
    }
  }
</script>

<style lang='scss' scoped>

</style>