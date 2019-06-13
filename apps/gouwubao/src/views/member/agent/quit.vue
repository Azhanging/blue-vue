<template>
	<bv-home-view class='wap' :router-level='3' style="background: #f4f4f4;">

		<bv-header :header="{title:{value:'申请退出'}}"></bv-header>

		<div class="bc-row">
			<!-- 用户信息 -->
			<div class="bc-flex bc-flex-ai-c bc-pd-15rp bc-bg-white">
				<div class="bc-flex-1 bc-pd-r-10rp">
					<img :src="pageData.head_img" style="width: 5.466666rem;height: 5.466666rem;border-radius:50%;">
				</div>
				<div class="bc-flex-3">
					<div class="bc-row bc-pd-tb-2rp">
						点通宝账号：{{pageData.member_phone}}
					</div>
					<div class="bc-row bc-pd-tb-2rp bc-t-666">
						代理级别：{{pageData.area_level}}
					</div>
					<div class="bc-row bc-pd-tb-2rp bc-t-666">
						代理区域：{{pageData.area}}
					</div>
				</div>
			</div>

			<!-- 解绑原因 -->
			<div class="bc-row bc-bg-white">
				<div class="bc-row bc-bg-f4f bc-pd-10rp">
					解绑缘由
				</div>
				<div class="bc-row bc-pd-10rp">
					<textarea class="bc-bd-none bc-w-100" rows="6" placeholder="请输入您解绑的原因" v-model="content"></textarea>
				</div>
			</div>
			<div class="bc-row bc-t-c bc-mg-t-20rp">
				<button
					type="button"
					:class="[
	          content.length > 0 && 'bc-btn-base',
	           content.length === 0 && 'bc-btn-grey',
	        ]"
					@click="submit"
					class="bc-btn bc-bd-radius-5 bc-f-18rp bc-w-90"
					style="padding-top:1rem;padding-bottom:1rem;">申请退出
				</button>
			</div>
		</div>
	</bv-home-view>
</template>

<script>
	export default {
    name: "agent-quit",
    data() {
      return {
        pageData: {},
        content: ''
      };
    },
    methods: {
      getData() {
        const params = this.$route.params;
        this.$axios.get('/member/AreaApply/out_area_apply', {
          params: {
            area_id: params.area_id
          }
        }).then((res) => {
          const { data } = res;
          this.pageData = data;
        });
      },
      submit() {
        if (this.content.length <= 0) return;
        const params = this.$route.params;
        this.$axios({
	        url: `/member/AreaApply/out_area_apply?area_id=${params.area_id}`,
	        method: 'post',
	        data:{
            out_reason: this.content
	        }
        }).then((res) => {
          const { data } = res;
          this.$toast({
            message: data.message
          });
          if (data.status === 4) {
            this.$router.push(`/member/agent/${params.area_id}/${params.level}`);
          }
        });
      }
    },
    created() {
      this.getData();
    }
  }
</script>
