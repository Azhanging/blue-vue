<!--
	申请代理页面
-->
<template>
	<bv-home-view :router-level='3' style="background-color: #F4F4F4;">
		<bv-header :header="{
      title:{
				value:'申请代理'
      }
		}"/>

		<div class="bc-row">
			<img :src="`${staticPath}/join-banner.png`" alt="" class="bc-w-100">
		</div>

		<!-- 级别选择 -->
		<div class="bc-row bc-f-16rp bc-bg-white">

			<!-- 代理级别 -->
			<div class="bc-row bc-bd-b-e5e">
				<a class="bc-block bc-flex bc-flex-ai-c bc-pd-17rp" @click="openPickerWindows('level')">
					<div class="bc-flex-1 bc-f-b bc-t-333">
						<span class="bc-t-red">*</span>代理级别
					</div>
					<div class="bc-flex-2 bc-t-r bc-t-999 bc-t-hide">
						<template v-if="pageData.agent.level.slots[0].value">
							{{getJoinSelectName(pageData.agent.level.slots)}}
						</template>
						<template v-else>
							<span>请选择您要申请的代理级别</span>
						</template>
						<i class="icon icon-right bc-f-17rp"></i>
					</div>
				</a>
			</div>

			<!-- 申请区域 -->
			<div class="bc-row">
				<a class="bc-block bc-flex bc-flex-ai-c bc-pd-17rp" @click="openPickerWindows('area')">
					<div class="bc-flex-1 bc-f-b bc-t-333">
						<span class="bc-t-red">*</span>申请区域
					</div>
					<div class="bc-flex-2 bc-t-r bc-t-999 bc-t-hide">
						<template v-if="pageData.agent.area.slots[0].value">
							{{getJoinSelectName(pageData.agent.area.slots)}}
						</template>
						<template v-else>
							<span>请选择您要申请的代理区域</span>
						</template>
						<i class="icon icon-right bc-f-17rp"></i>
					</div>
				</a>
			</div>
		</div>

		<!-- 缴费金额 -->
		<div class="bc-flex bc-flex-ai-c bc-bg-white bc-mg-t-14rp bc-f-16rp bc-pd-17rp">
			<div class="bc-flex-1 bc-f-b bc-t-333">
				<span class="bc-t-red">*</span>缴费金额
			</div>
			<div class="bc-flex-2 bc-t-r bc-t-999 bc-t-hide ">
				<input type="number" class="bc-bd-none bc-t-r" placeholder="请输入实际缴费金额" v-model="pageData.capital">
			</div>
		</div>

		<!-- 推荐人 -->
		<div class="bc-flex bc-flex-ai-c bc-bg-white bc-mg-t-14rp bc-f-16rp bc-pd-17rp"
		     v-if="pageData.agent.level.slots[0].value && pageData.agent.level.slots[0].value != 1">
			<div class="bc-flex-1 bc-f-b bc-t-333">
				推荐人
			</div>
			<div class="bc-flex-2 bc-t-r bc-t-999 bc-t-hide ">
				<input type="text" class="bc-bd-none bc-t-r" placeholder="请输入推荐人代理账号" v-model="pageData.refereePhone">
			</div>
		</div>

		<!-- 上传图片 -->
		<div class="bc-row bc-mg-t-14rp ">

			<!-- 上传营业执照 -->
			<div class="bc-row bc-bg-white bc-pd-17rp">
				<div class="bc-row bc-f-16rp bc-f-b">
					<span class="bc-t-red">*</span>上传营业执照
				</div>
				<div class="bc-row bc-mg-t-25rp bc-mg-l-10rp ">
					<span class="upload-img" v-for="(item,index) in pageData.business.imgs" :style="`background-image:url(${item});`">
						<i class="remove icon icon-close" @click="removeUpload($refs['business'],pageData.business.imgs,index)"></i>
					</span>
					<upload
						accept="image/png,image/gif,image/jpeg,image/webp"
						input-id="input0"
						ref="business"
						name="imgFile"
						post-action="/Upload/index_img"
						@input-file="inputFile"
						:multiple="true"
						:upload-data="pageData.business.imgs"
						:maximum="5"
						style="font-size:0;"
						:style="(!(pageData.business.imgs.length < 5)) && `width:0;height:0;`"
					>
						<span class="upload-img upload-img-add"></span>
					</upload>
				</div>
			</div>

			<!-- 上传收据 -->
			<div class="bc-row bc-bg-white bc-pd-17rp bc-mg-t-10rp">
				<div class="bc-row bc-f-16rp bc-f-b">
					<span class="bc-t-red">*</span>上传收据
				</div>
				<div class="bc-row bc-mg-t-25rp bc-mg-l-10rp">
					<span class="upload-img" v-for="(item,index) in pageData.receipt.imgs" :style="`background-image:url(${item});`">
						<i class="remove icon icon-close" @click="removeUpload($refs['receipt'],pageData.receipt.imgs,index)"></i>
					</span>
					<upload
						accept="image/png,image/gif,image/jpeg,image/webp"
						input-id="input1"
						ref="receipt"
						name="imgFile"
						post-action="/Upload/index_img"
						@input-file="inputFile"
						:multiple="true"
						:upload-data="pageData.receipt.imgs"
						:maximum="5"
						style="font-size:0;"
						:style="(!(pageData.receipt.imgs.length < 5)) && `width:0;height:0;`"
					>
						<span class="upload-img upload-img-add"></span>
					</upload>
				</div>
			</div>
		</div>

		<!-- 使用本账号作为创客关联账号 -->
		<div class="bc-row  bc-bg-white bc-mg-t-14rp bc-f-16rp" v-show="pageData.ck_on_off == 0">
			<div class="bc-flex bc-flex-ai-c bc-pd-17rp bc-bd-b-e5e">
				<div class="bc-flex-4 bc-f-b">
					<div class="bc-flex bc-flex-ai-c">
						<span class="inline-block bc-pd-r-4rp">使用本账号作为创客关联账号</span>
						<img :src="`${staticPath}/tips.png`" alt="" style="width:1rem;height:1rem;" @click.stop="$toast({message:'您可输入任意点通宝账号作为您的创客账号'})">
					</div>
				</div>
				<div class="bc-flex-1 bc-t-r">
					<mt-switch v-model="pageData.bindChuankeMember.status" class="bc-flex-jc-e"></mt-switch>
				</div>
			</div>

			<div class="bc-flex bc-flex-jc-sb bc-flex-ai-c bc-pd-17rp" v-if="!pageData.bindChuankeMember.status">
				<div class="bc-flex-2 bc-f-b bc-f-16rp">
					<span>添加账号</span>
				</div>
				<div class="bc-flex-1 bc-t-999">
					<input type="text" class="bc-bd-none bc-t-r" placeholder="请输入手机号" v-model="pageData.bindChuankeMember.phone">
				</div>
			</div>
		</div>

		<!-- 占位 -->
		<div class="placeholder"></div>

		<!-- 提交申请 -->
		<template slot="other">
			<div class="bc-bd-t-e5e bc-row bc-pd-lr-20rp bc-ps-f bc-bg-white"
			     :class="[
							pageData.agent.level.slots[0].value && pageData.agent.level.slots[0].value != 1 ? 'bc-pd-b-15rp' : 'bc-pd-tb-15rp'
			     ]"
			     style="bottom:0;left:0;"
			     v-show="$store.state.view.pageFixed">
				<div class="bc-flex bc-flex-ai-c bc-pd-tb-11rp bc-v-m" v-if="pageData.agent.level.slots[0].value && pageData.agent.level.slots[0].value != 1">
					<input type="checkbox" v-model="pageData.protocol" class="bc-inline-block bc-mg-r-5rp">我同意
					<router-link to="/member/contract/agent" class="bc-t-info">
						《点通宝代理智能合约》
					</router-link>
				</div>
				<div class="bc-row">
					<button
						class="bc-btn bc-bd-radius-4 bc-w-100 join-btn"
						:class="[ pageData.protocol && 'bc-btn-base', !pageData.protocol && 'bc-btn-grey']"
						@click="submit"
					>
						申请
					</button>
				</div>
			</div>

			<!-- picker windows -->
			<bv-transition transition-name="top">
				<bv-picker-windows
					ref="pickerWindows"
					v-show="pageData.pickerWindows.showStatus"
					:title="pageData.pickerWindows.data.title"
					:slots="pageData.pickerWindows.data.slots"
					:ajax="pageData.pickerWindows.data.ajax"
					:select="{
			  className: 'bc-pd-10rp',
			  activeClassName: 'bc-t-base bc-bd-b-base'
			}"
					:scroll="{
			  className: 'bc-pd-10rp',
			  activeClassName: 'bc-t-base'
			}"
					@close-picker-windows="closePickerWindows"
					@select-picker="selectPicker"
				/>
			</bv-transition>

		</template>

	</bv-home-view>
</template>

<script>

	import { uploadMixin } from "$upload";

  //创建区域slots数据
  function createAreaSlots(slotsData, id) {
    const createSlotsData = [];
    for (let i = 0; i < id; i++) {
      createSlotsData.push({
        values: [],
        value: ''
      });
    }
    slotsData.slots = createSlotsData;
  }


  //验证地区
  function validateArea() {
    let i = 0;
    const pickerWindows = this.pageData.pickerWindows;
    let slots = pickerWindows.data.slots;
    slots.forEach((item) => {
      if (item.value) ++i;
    });
    if (i !== 0 && i < slots.length) {
      return false;
    }
    return true;
  }

  export default {
    name: "join-agent",
    mixins: [uploadMixin()],
    computed: {
      staticPath() {
        return `${this.config.path.static}/img/home/join/agent-apply`;
      }
    },
    created() {
      this.getData();
    },
    data() {
      return {
        pageData: {
          //推荐金额
          capital: '',
          //推荐人
          refereePhone: '',
          //绑定创客用户状态
          bindChuankeMember: {
            status: true,
            phone: ''
          },
          //营业执照
          business: {
            imgs: []
          },
          //收据
          receipt: {
            imgs: []
          },
          //代理数据
          agent: {
            //等级
            level: {
              ajax: {
                url: '/member/area_apply',
                key: 'id',
                params: {}
              },
              title: '代理级别',
              slots: [{
                values: [],
                value: ''
              }]
            },
            //区域
            area: {
              ajax: {
                url: '/member/area_apply/next_child',
                key: 'id',
                params: {}
              },
              title: '申请区域',
              slots: [{
                values: [],
                value: ''
              }]
            }
          },
          //pickerWindows的数据
          pickerWindows: {
            data: {
              title: '',
              slots: [],
              ajax: {}
            },
            showStatus: false,
            type: ''
          },
          //协议
          protocol: true,
          //创客开关
          ck_on_off: 0
        }
      };
    },
    methods: {
      getData() {
        const utils = this.$utils;
        const query = this.$route.query;
        const { id } = query;
        this.$axios.get('/member/area_apply/add_area_apply', {
          params: {
            id: id || ''
          }
        }).then((res) => {
          const { data } = res.data;
          const { ck_on_off, apply_msg } = data;
          //申请
          if (utils.isArray(apply_msg) && apply_msg.length === 0) {
            this.pageData.ck_on_off = ck_on_off;
          } else {
            //重新申请
            this.pageData = utils.extend(JSON.parse(apply_msg), {
              ck_on_off
            });
          }
          console.log(this.pageData);
        });
      },
      //上传图片
      inputFile(newFile, oldFile, upload) {
        this.$upload(upload, {
          eventArgs: {
            newFile,
            oldFile
          },
          hooks: {
            success(res) {
              upload.uploadData.push(res.url);
            }
          }
        });
      },
      //删除上传的图片
      removeUpload(upload, lists, index) {
        this.$removeFile(upload, index);
        lists.splice(index, 1);
      },
      //打开picker windows
      openPickerWindows(type) {
        this.$closeToast();
        const pickerWindows = this.pageData.pickerWindows;
        const agent = this.pageData.agent;
        const currentPickerData = agent[type];
        if (type === 'area') {
          let levelPickerData = agent['level'].slots[0];
          if (!levelPickerData.value) {
            this.$toast({
              message: '请选择代理级别'
            });
            return;
          }
          currentPickerData.ajax.params['level'] = agent.level.slots[0].value;
        }
        pickerWindows.showStatus = true;
        pickerWindows.type = type;

        if (currentPickerData) {
          pickerWindows.data = {
            ajax: currentPickerData.ajax,
            slots: currentPickerData.slots,
            title: currentPickerData.title
          };
          this.$nextTick(() => {
            this.$refs['pickerWindows'].initPicker();
          });
        }
      },
      //关闭弹窗
      closePickerWindows() {
        const pickerWindows = this.pageData.pickerWindows;
        let validateStatus = true;
        //检查区域是否完整
        if (pickerWindows.type === 'area') {
          validateStatus = validateArea.call(this);
          //验证不通过，直接初始化地区
          if (!validateStatus) {
            this.resetArea();
          }
        }
        pickerWindows.showStatus = false;
      },
      //选择picker后的事件
      selectPicker() {
        const pageData = this.pageData;
        const pickerWindows = pageData.pickerWindows;
        if (pickerWindows.type === 'level') {
          this.resetArea();
          this.closePickerWindows();
        } else if (pickerWindows.type === 'area') {
          //下一跳查询数据完整性
          this.$nextTick(() => {
            const level = pageData.agent.level.slots[0].value;
            let i = 0;
            pageData.agent.area.slots.forEach((item) => {
              if (item.value) {
                ++i;
              }
            });
            if (level == i) {
              this.closePickerWindows();
            }
          });
        }
      },
      //重置area
      resetArea() {
        const agent = this.pageData.agent;
        const level = agent.level;
        const area = agent.area;
        createAreaSlots.apply(this, [area, level.slots[0].value]);
      },
      //合并选择上的name
      getJoinSelectName(slots) {
        let name = '';
        (slots || []).forEach((slot) => {
          const value = slot.value;
          (slot.values || []).forEach((item) => {
            if (item.id !== value) return;
            name += item.name;
          });
        });
        return name;
      },
      //提交
      submit() {
        const pageData = this.pageData;
        if (!pageData.protocol) return;
        const agent = pageData.agent;
        const levelSlots = agent.level.slots;
        const areaSlots = agent.area.slots;
        const bindChuankeMember = pageData.bindChuankeMember;
        const query = this.$route.query;
        this.$axios({
          url: '/member/area_apply/add_area_apply',
          method: 'post',
          data: {
            id: (query && query.id) || '',
            capital: pageData.capital,
            referee_phone: pageData.refereePhone,
            is_relation_ck: bindChuankeMember.status ? 1 : 0,
            ck_phone: bindChuankeMember.phone,
            opencopy: pageData.business.imgs.join('|'),
            licence: pageData.receipt.imgs.join('|'),
            level: levelSlots[levelSlots.length - 1].value,
            area_id: areaSlots[areaSlots.length - 1].value,
            apply_msg: JSON.stringify(pageData)
          }
        }).then((res) => {
          const { data } = res.data;
          const { status, message } = data;
          this.$toast({
            message: message
          });
          if (status === 4) {
            this.$router.push(`/join/agent-apply/agent-apply-success`);
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
	//占位
	.placeholder {
		padding-bottom: rem(150);
	}

	//上传图片
	.upload-img {
		position: relative;
		display: inline-block;
		background-repeat: no-repeat;
		background-size: 100%;
		background-position: center;
		margin-left: rem(5);
		font-size: 0;
		width: rem(98);
		height: rem(98);
		&.upload-img-add {
			background: url($base-static-path + '/img//home/upload.png') no-repeat center #EDEDED;
			background-size: 20%;
		}
		.remove {
			position: absolute;
			right: 0;
			top: 0;
			background-color: rgba(0, 0, 0, .4);
			color: white;
			padding: rem(2);
			font-size: rem(18);
		}
	}

	//加入按钮
	.join-btn {
		padding-top: rem(10) !important;
		padding-bottom: rem(10) !important;
		font-size: rem(16);
	}
</style>