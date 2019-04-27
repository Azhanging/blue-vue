<template>
  <bv-home-view class='wap' :router-level='2' style="background: #f4f4f4">
    <w-home-header :header='{
    
            title:{
                value: fitness_info
            }
        }' :leftControl='"/life-nav/"+this.$route.params.nav_id+"/driving-license/"+this.$route.params.id' ></w-home-header>

    <div class="fitness-test-box">

      <bv-scroll>
        <swiper :options="swiperOption" ref="swiper">
          <swiper-slide v-for="(slide, index) in fitness_list" :key="index" class="swiper-no-swiping">

            <div class="fitness-test-tit">
              {{ index+1 }}.{{ slide.name }}
            </div>

            <div class="fitness-test-main">

              <div class="fitness-test-item" :class="tion.checked? 'active':''" v-for="(tion,index) in slide.option" @click="btn_radio(slide.id,tion.id)">
                <label class="fitness-test-item-l">
                  <!--<input type="radio" :checked="thisIndex===slide.checked">-->
                  {{ tion.option }}
                </label>
                <div class="fitness-test-item-r">{{ tion.description }}</div>
              </div>

            </div>

          </swiper-slide>
        </swiper>
      </bv-scroll>

      <div class="fitness-test-btn">
        <span @click="swiper_btn_prev" v-if="this_level!=1">
          <i class="iconfont iconxiangzuo"></i> 上一题
        </span>
        <span @click="swiper_btn_next" v-if="this_level!=fitness_list.length">
          下一题 <i class="iconfont iconyou"></i>
        </span>
      </div>
    </div>


    <div class="fitness-test-fix">
      <div class="fitness-test-fix-l"><span>{{ this_level }}</span>/{{ fitness_list.length }}</div>
      <!--<router-link :to="`${currentFullPath}/test-results`" class="fitness-test-fix-r">提交</router-link>-->
      <button class="fitness-test-fix-r" @click="btn_sub">提交</button>
    </div>

  </bv-home-view>
</template>

<script>
  import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
  import router from '@router';
  import { $toast } from "$use-in-vue/mint-ui/toast";
  export default {
    name: "fitness-test",
    data() {
      return {
        swiperOption: {
          pagination: {
            el: "#pagination"
          },
          noSwiping : true
        },
        this_level: 0,//swiper当前页
        fitness_list:'',
        fitness_info:'',
        fitness_test:[
          {t:'A',contents:'72dpi，常规设计方法'},
          {t:'B',contents:'144dpi，考虑高清分辨率'},
          {t:'C',contents:'300dpi，方便输出打印规范'},
          {t:'D',contents:'以上都是可以，随设备而不同使用'},
        ],
        thisSwiper:'', //第多少道题
      }
    },
    computed:{
      currentFullPath(){
        return this.$router.currentRoute.fullPath;
      }
    },
    watch: {
      '$route' (to, from) {
        if(this.$route.params.record_id){//判断传递值的变化
          //获取数据
          this.topic();
        }
      }
    },
    methods:{
      swiperUpdate() {
        this.swiper.update();
      },
      btn_radio(slide_id,tion_id) {//选择答案
        /*console.log(slide_id)
        console.log(tion_id)*/
        this.$axios.post('/api/examination/select',{
          examination_record_id: this.$route.params.record_id,
          question_id:slide_id,
          option_id:tion_id,
        }).then(res=>{
          this.$axios.post('/api/examination/question', {
            record_id:this.$route.params.record_id
          }).then((res) => {
            this.fitness_list=res.data.data.list
          });
          //console.log(res)
        })
      },
      //考试题
      topic(){
        return this.$axios.post('/api/examination/question', {
          record_id:this.$route.params.record_id
        }).then((res) => {
          if(res.data.data.list==''){
            this.$router.push({
              path: '/life-nav/'+ this.$route.params.nav_id +'/driving-license/'+ this.$route.params.id,
            })
          }
          //console.log(res)
          this.thisSwiper = res.data.data.record_info.step-1 //答到了第多少道
          this.fitness_list=res.data.data.list
          this.fitness_info=res.data.data.info.name
          this.$refs.swiper.swiper.slideTo(this.thisSwiper, 1000, false);
          this.this_level=this.$refs.swiper.swiper.realIndex+1
        });
      },
      swiper_btn_prev(){
        this.$refs.swiper.swiper.slidePrev();
        this.this_level=this.$refs.swiper.swiper.realIndex+1
      },
      swiper_btn_next(){
        this.$axios.post('/api/examination/question', {
          record_id:this.$route.params.record_id
        }).then(res=> {
          this.thisSwiper = res.data.data.record_info.step
         /* console.log(this.this_level+'当前swiper页');
          console.log(this.thisSwiper);*/
          if((this.thisSwiper)<this.this_level){
            $toast({
              message: '请选择答案',
              duration: 3000
            });
            return;
          }
          this.$refs.swiper.swiper.slideNext();
          let t_level = this.$refs.swiper.swiper.realIndex+1
          this.this_level=t_level
        })
      },
      btn_sub(){
        /*console.log(this.thisSwiper)
        console.log(this.fitness_list.length)*/
        this.$axios.post('/api/examination/submit', {
          record_id:this.$route.params.record_id
        }).then(res=> {
          let status= res.data.data.status;
          if(status == 1017){
            $toast({
              message: '请答完所有问题再提交',
              duration: 3000
            });
            return
          }
          if(status == 1010){
            $toast({
              message: '参数错误',
              duration: 3000
            });
            setTimeout(()=>{
              this.$router.push({
                path: '/life-nav/'+ this.$route.params.nav_id +'/driving-license/'+ this.$route.params.id,
                params:{
                  record_id:this.$route.params.record_id
                }
              })
            },3000)
          }
          this.$router.push({
            path: '/life-nav/'+ this.$route.params.nav_id +'/driving-license/'+ this.$route.params.id +'/test-results/'+this.$route.params.record_id,
            params:{
              record_id:this.$route.params.record_id
            }
          })
        })
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.swiper = this.$refs['swiper'];
        this.swiperUpdate();
        this.this_level=this.$refs.swiper.swiper.realIndex+1
      });
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
