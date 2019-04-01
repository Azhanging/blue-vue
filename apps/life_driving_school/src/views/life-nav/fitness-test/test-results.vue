<template>
  <bv-home-view class='wap' :router-level='3' style="background: #f4f4f4">
    <w-home-header :header='{
            title:{
                value: "测试结果"
            }
        }'></w-home-header>

    <div class="test-results-top">
      <div class="test-results-points">
        <strong>80</strong>分
      </div>

      <div class="test-results-tit">恭喜您测试通过，可以学习下阶段课程</div>
      <div class="test-results-p">
        虽然您已通过测试，但是您本阶段课程掌握不熟，再进行下一阶段学习的过程中不要忘记回顾本阶段课程哦。
      </div>
      <div class="test-results-btn">
        <button>点击这里查看答案分数</button>
      </div>

    </div>

    <div class="fitness-test-box" v-for="i in 3">
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
          <div class="fitness-test-item-f">+5分</div>
        </div>
        <div class="fitness-test-item">
          <label class="fitness-test-item-l" for="fitness-test-item-l-B">
            <input type="radio" id="fitness-test-item-l-B">
            B
          </label>
          <div class="fitness-test-item-r">144dpi，考虑高清分辨率</div>
          <div class="fitness-test-item-f">+3分</div>
        </div>
        <div class="fitness-test-item">
          <label class="fitness-test-item-l" for="fitness-test-item-l-C">
            <input type="radio" id="fitness-test-item-l-C">
            C
          </label>
          <div class="fitness-test-item-r">300dpi，方便输出打印规范</div>
          <div class="fitness-test-item-f">+4分</div>
        </div>
        <div class="fitness-test-item">
          <label class="fitness-test-item-l" for="fitness-test-item-l-D">
            <input type="radio" id="fitness-test-item-l-D">
            D
          </label>
          <div class="fitness-test-item-r">以上都是可以，随设备而不同使用</div>
          <div class="fitness-test-item-f">+2分</div>
        </div>
      </div>
      <div class="fitness-test-desc">
        <div class="fitness-test-desc-l">
          问题简介:
        </div>
        <div class="fitness-test-desc-r">
          这里是问题介绍这里是问题介绍这里是问题介绍这里是问题介绍这里是问题介绍这里是问题介绍
        </div>
      </div>

    </div>


  </bv-home-view>
</template>

<script>
  export default {
    name: "test results.vue"
  }
</script>

<style scoped lang="scss">

  .test-results-top{
    background: #fff;
    margin-bottom: 10px;
    padding: 15px;
    .test-results-points{
      text-align: center;
      font-size: rem(14);
      color: #CA9F75;
      strong{
        font-size: rem(50);
      }
    }
    .test-results-tit{
      text-align: center;
      margin-top: 15px;
      color: #333;
      font-size: rem(14);
    }
    .test-results-p{
      margin-top: 15px;
      color: #666;
      font-size: rem(14);
    }
    .test-results-btn{
      text-align: center;
      margin-top: 20px;
      button{
        border: 1px solid #CA9F75;
        color: #CA9F75;
        border-radius: 15px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        box-sizing: border-box;
        padding: 0 12px;
      }
    }
  }

  .fitness-test-box{
    background: #fff;
    border-bottom: 1px solid #e4e4e4;
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
        .fitness-test-item-f{
          color: #999;
          font-size: rem(12);
          margin-left: 5px;
        }
      }
    }

    .fitness-test-desc{
      padding: 0 15px 15px;
      display: flex;
      font-size: rem(12);
      .fitness-test-desc-l{
        margin-right: 10px;
        color: #333;
      }
      .fitness-test-desc-r{
        flex: 1;
        color: #999;
      }
    }
  }
</style>