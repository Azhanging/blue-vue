<template>
  <bv-home-view class='wap' :router-level='2' style="background: #f4f4f4">
    <w-home-header :header='{
            title:{
                value: "健康测试"
            }
        }'></w-home-header>

    <div class="fitness-test-box">
      <div class="fitness-test-tit">
        1.在设计APP界面时候，通常使用的分辨率是
      </div>
      <div class="fitness-test-main">

        <div class="fitness-test-item" :class="{active:(thisIndex===index)}" v-for="(item,index) in fitness_test" @click="btn_radio(index)">
          <label class="fitness-test-item-l">
            <input type="radio" :checked="thisIndex===index">
            {{ item.t }}
          </label>
          <div class="fitness-test-item-r">{{ item.contents }}</div>
        </div>

      </div>

      <div class="fitness-test-btn">
        <i class="iconfont iconxiangzuo"></i> 上一题
      </div>
    </div>


    <div class="fitness-test-fix">
      <div class="fitness-test-fix-l"><span>1</span>/1000000</div>
      <router-link :to="`${currentFullPath}/test-results`" class="fitness-test-fix-r">提交</router-link>
    </div>

  </bv-home-view>
</template>

<script>
  import router from '@router';
  export default {
    name: "fitness-test",
    data() {
      return {
        fitness_test:[
          {t:'A',contents:'72dpi，常规设计方法'},
          {t:'B',contents:'144dpi，考虑高清分辨率'},
          {t:'C',contents:'300dpi，方便输出打印规范'},
          {t:'D',contents:'以上都是可以，随设备而不同使用'},
        ],
        thisIndex:true
      }
    },
    computed:{
      currentFullPath(){
        return this.$router.currentRoute.fullPath;
      }
    },
    methods:{
      btn_radio(t_idx) {
        this.thisIndex=t_idx;
      },
      //考试题
      topic(){
        return this.$axios.get('/api/examination/question', {
          params:{
            examination_res:'0',
            ult_id:"32"
          },
        }).then((res) => {
          console.log(res.data+"|||")
        });

      }
    },
    mounted() {
      this.topic();
    }
  }
</script>

<style scoped lang="scss">
.fitness-test-box{
  background: #fff;
  margin-bottom: rem(45);
  .fitness-test-tit{
    font-size: rem(16);
    color: #333;
    padding: rem(15) rem(15) 0;
  }
  .fitness-test-main{
    overflow: hidden;
    padding:0 rem(15) rem(15);
    .fitness-test-item{
      padding: rem(10);
      background: #f4f4f4;
      margin-top: rem(15);
      border-radius: rem(3);
      display: flex;
      align-items: center;
      .fitness-test-item-l{
        width: rem(30);
        height: rem(30);
        background: #fff;
        border-radius: rem(5);
        line-height: rem(30);
        text-align: center;
        font-size: rem(14);
        color: #999;
        margin-right: rem(8);
        input[type="radio"]{
          opacity: 0;
          position: absolute;left: 0;
        }
      }
      &.active{
        .fitness-test-item-l{
          background: #CA9F75;
          color: #fff;
        }
      }
      .fitness-test-item-r{
        flex: 1;
        font-size: rem(14);
        color: #333;
      }
    }
  }
  .fitness-test-btn{
    padding: rem(12);
    text-align: center;
    background: #fff;
    border-top: 1px solid #e4e4e4;
    color: #CA9F75;
    font-size: rem(14);
    i{
      font-size: rem(12);
    }
  }
}

  .fitness-test-fix{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    background: #fff;
    height: rem(45);
    display: flex;
    align-items: center;
    .fitness-test-fix-l{
      flex: 1;
      font-size: rem(16);
      color: #666;
      padding: 0 rem(15);
      span{
        color: #CA9F75;
      }
    }
    .fitness-test-fix-r{
      padding: 0 rem(35);
      background: #CA9F75;
      color: #fff;
      height: rem(45);
      line-height: rem(45);
      text-align: center;
      font-size: rem(18);
    }
  }
</style>
