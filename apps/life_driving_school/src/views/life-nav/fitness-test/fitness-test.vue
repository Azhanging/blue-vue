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
        <div class="fitness-test-item">
          <label class="fitness-test-item-l" for="fitness-test-item-l-A">
            <input type="radio" id="fitness-test-item-l-A">
            A
          </label>
          <div class="fitness-test-item-r">72dpi，常规设计方法</div>
        </div>
        <div class="fitness-test-item">
          <label class="fitness-test-item-l" for="fitness-test-item-l-B">
            <input type="radio" id="fitness-test-item-l-B">
            B
          </label>
          <div class="fitness-test-item-r">144dpi，考虑高清分辨率</div>
        </div>
        <div class="fitness-test-item">
          <label class="fitness-test-item-l" for="fitness-test-item-l-C">
            <input type="radio" id="fitness-test-item-l-C">
            C
          </label>
          <div class="fitness-test-item-r">300dpi，方便输出打印规范</div>
        </div>
        <div class="fitness-test-item">
          <label class="fitness-test-item-l" for="fitness-test-item-l-D">
            <input type="radio" id="fitness-test-item-l-D">
            D
          </label>
          <div class="fitness-test-item-r">以上都是可以，随设备而不同使用</div>
        </div>
      </div>
      <div class="fitness-test-btn">
        <i class="iconfont iconxiangzuo"></i> 上一题
      </div>
    </div>


    <div class="fitness-test-fix">
      <div class="fitness-test-fix-l"><span>1</span>/1000000</div>
      <div class="fitness-test-fix-r" @click="to_test_results">提交</div>
    </div>

  </bv-home-view>
</template>

<script>
  import router from '@router';
  export default {
    name: "fitness-test",
    methods:{
      to_test_results(){
        this.$router.push({'path':`${router.currentRoute.fullPath}/test-results`})
      }
    }
  }
</script>

<style scoped lang="scss">
.fitness-test-box{
  background: #fff;
  margin-bottom: 45px;
  .fitness-test-tit{
    font-size: rem(16);
    color: #333;
    padding: 15px 15px 0;
  }
  .fitness-test-main{
    overflow: hidden;
    padding:0 15px 15px;
    .fitness-test-item{
      padding: 10px;
      background: #f4f4f4;
      margin-top: 15px;
      border-radius: 3px;
      display: flex;
      align-items: center;
      .fitness-test-item-l{
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
      .fitness-test-item-r{
        flex: 1;
        font-size: rem(14);
        color: #333;
      }
    }
  }
  .fitness-test-btn{
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

  .fitness-test-fix{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    background: #fff;
    height: 45px;
    display: flex;
    align-items: center;
    .fitness-test-fix-l{
      flex: 1;
      font-size: rem(16);
      color: #666;
      padding: 0 15px;
      span{
        color: #CA9F75;
      }
    }
    .fitness-test-fix-r{
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