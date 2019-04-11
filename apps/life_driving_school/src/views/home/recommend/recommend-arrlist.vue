<template>
	<div class='bc-reset-ul  bc-media'>
		<div v-for='item in list' @click='detailClick(item.id)' class='itemList bc-pd-10rp' :key="item.id">
			<recommend-itemdata :itemList='item' :ifAchieve="ifAchieve"></recommend-itemdata>
		</div>
	</div>
</template>

<script>
	import router from '@router';
  import recommendItemdata from './recommend-itemdata';
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
      'recommend-itemdata': recommendItemdata
    },
    methods:{
      detailClick(article_id){
        this.$router.push({'path':`${router.currentRoute.fullPath}/detail/${article_id}`})
      }
    }
  }
</script>

<style lang='scss' scoped>

</style>