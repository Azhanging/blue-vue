<template>
  <bv-home-view class='wap' :router-level='2' style="background: #f4f4f4">
    <w-home-header :title='{
            title:{
                value: "健康测试"
            }
        }'></w-home-header>

    <div class="fitness_test_box">
      <div class="fitness_test_tit">
        1.在设计APP界面时候，通常使用的分辨率是
      </div>
      <div class="fitness_test_main">
        <div class="fitness_test_item">
          <label class="fitness_test_item_l" for="fitness_test_item_l_A">
            <input type="radio" id="fitness_test_item_l_A">
            A
          </label>
          <div class="fitness_test_item_r">72dpi，常规设计方法</div>
        </div>
        <div class="fitness_test_item">
          <label class="fitness_test_item_l" for="fitness_test_item_l_B">
            <input type="radio" id="fitness_test_item_l_B">
            B
          </label>
          <div class="fitness_test_item_r">144dpi，考虑高清分辨率</div>
        </div>
        <div class="fitness_test_item">
          <label class="fitness_test_item_l" for="fitness_test_item_l_C">
            <input type="radio" id="fitness_test_item_l_C">
            C
          </label>
          <div class="fitness_test_item_r">300dpi，方便输出打印规范</div>
        </div>
        <div class="fitness_test_item">
          <label class="fitness_test_item_l" for="fitness_test_item_l_D">
            <input type="radio" id="fitness_test_item_l_D">
            D
          </label>
          <div class="fitness_test_item_r">以上都是可以，随设备而不同使用</div>
        </div>
      </div>
      <div class="fitness_test_btn">
        <i class="iconfont iconxiangzuo"></i> 上一题
      </div>
    </div>


    <div class="fitness_test_fix">
      <div class="fitness_test_fix_l"><span>1</span>/1000000</div>
      <div class="fitness_test_fix_r" @click="to_test_results">提交</div>
    </div>

  </bv-home-view>
</template>

<script>
  import router from '@router';
  export default {
    name: "fitness_test",
    methods:{
      to_test_results(){
        this.$router.push({'path':`${router.currentRoute.fullPath}/test_results`})
      }
    }
  }
</script>

<style scoped lang="scss">
.fitness_test_box{
  background: #fff;
  margin-bottom: 45px;
  .fitness_test_tit{
    font-size: rem(16);
    color: #333;
    padding: 15px 15px 0;
  }
  .fitness_test_main{
    overflow: hidden;
    padding:0 15px 15px;
    .fitness_test_item{
      padding: 10px;
      background: #f4f4f4;
      margin-top: 15px;
      border-radius: 3px;
      display: flex;
      align-items: center;
      .fitness_test_item_l{
        width: rem(30);
        height: rem(30);
        background: #fff;
        border-radius: 5px;
        line-height: rem(30);
        text-align: center;
        font-size: rem(14);
        color: #999;
        margin-right: 8px;
        input[type="radio"]{
          opacity: 0;
          position: absolute;left: 0;
        }
      }
      .fitness_test_item_r{
        flex: 1;
        font-size: rem(14);
        color: #333;
      }
    }
  }
  .fitness_test_btn{
    padding: 12px;
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

  .fitness_test_fix{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    background: #fff;
    height: 45px;
    display: flex;
    align-items: center;
    .fitness_test_fix_l{
      flex: 1;
      font-size: rem(16);
      color: #666;
      padding: 0 15px;
      span{
        color: #CA9F75;
      }
    }
    .fitness_test_fix_r{
      padding: 0 35px;
      background: #CA9F75;
      color: #fff;
      height: 45px;
      line-height: 45px;
      text-align: center;
      font-size: rem(18);
    }
  }
</style>