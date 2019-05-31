<template>
	<bv-home-view class='bc-bg-ed' :router-level='3'>
		
		<bv-header :header="{title:{value:'证书资料填写'}}"/>
		
		<div class="apply-for-main">
			<div class="bc-pd-lr-15rp bc-f-14rp">
				<div class="bc-bg-white bc-flex bc-flex-ai-c bc-mg-t-10rp bc-pd-lr-10rp bc-bd-radius-3">
					<div class="bc-flex-2 bc-t-333 bc-f-b"><span class="bc-t-red">*</span>姓名</div>
					<div class="bc-flex-3 bc-t-666">
						<input type="text" class="bc-row bc-t-r bc-pd-tb-12rp" v-model="applyFor.subform.name" placeholder="请输入姓名">
					</div>
				</div>
			</div>
			<div class="bc-pd-lr-15rp bc-f-14rp">
				<div class="bc-bg-white bc-flex bc-flex-ai-c bc-mg-t-10rp bc-pd-lr-10rp bc-bd-radius-3">
					<div class="bc-flex-2 bc-t-333 bc-f-b"><span class="bc-t-red">*</span>性别</div>
					<div class="bc-flex-3 bc-t-666 bc-t-r">
					<span class="bc-select-wrap bc-select-down-icon ">
						<select class="bc-pd-tb-12rp bc-input" v-model="applyFor.subform.sex">
							<option value="-1">请选择</option>
							<option value="0">男</option>
							<option value="1">女</option>
						</select>
					</span>
					</div>
				</div>
			</div>
			<div class="bc-pd-lr-15rp bc-f-14rp">
				<div class="bc-bg-white bc-flex bc-flex-ai-c bc-mg-t-10rp bc-pd-lr-10rp bc-bd-radius-3">
					<div class="bc-flex-2 bc-t-333 bc-f-b"><span class="bc-t-red">*</span>出生日期</div>
					<div class="bc-flex-3 bc-t-666">
						<!--<input type="text" class="bc-row bc-t-r box-input-date" placeholder="请选择出生日期">-->
						<div class="bc-row bc-t-r box-input-date bc-pd-r-20rp bc-pd-tb-12rp" @click="openPicker('picker')">
							{{ startTime || '请选择出生日期' }}
						</div>
					</div>
				</div>
			</div>
			<mt-datetime-picker
				type="date"
				ref="picker"
				:startDate="startDate"
				year-format="{value} 年"
				month-format="{value} 月"
				date-format="{value} 日"
				@confirm="checkStartTime"
				v-model="morenTime"
				@cancel="quxiao"
				:closeOnClickModal="false"
			/>
			<div class="bc-pd-lr-15rp bc-f-14rp">
				<div class="bc-bg-white bc-flex bc-flex-ai-c bc-mg-t-10rp bc-pd-lr-10rp bc-bd-radius-3">
					<div class="bc-flex-2 bc-t-333 bc-f-b"><span class="bc-t-red">*</span>身份证号</div>
					<div class="bc-flex-3 bc-t-666">
						<input type="text" class="bc-row bc-t-r bc-pd-tb-12rp" v-model="applyFor.subform.sfz" placeholder="请输入身份证号">
					</div>
				</div>
			</div>
			<div class="bc-pd-lr-15rp bc-f-14rp">
				<div class="bc-bg-white bc-flex bc-flex-ai-c bc-mg-t-10rp bc-pd-lr-10rp bc-bd-radius-3">
					<div class="bc-flex-2 bc-t-333 bc-f-b">毕业(在读)院校名称</div>
					<div class="bc-flex-3 bc-t-666">
						<input type="text" class="bc-row bc-t-r bc-pd-tb-12rp" v-model="applyFor.subform.school" placeholder="请输入">
					</div>
				</div>
			</div>
			<div class="bc-pd-lr-15rp bc-f-14rp">
				<div class="bc-bg-white bc-flex bc-flex-ai-c bc-mg-t-10rp bc-pd-lr-10rp bc-bd-radius-3">
					<div class="bc-flex-2 bc-t-333 bc-f-b">专业(在校所学)</div>
					<div class="bc-flex-3 bc-t-666">
						<input type="text" class="bc-row bc-t-r bc-pd-tb-12rp" v-model="applyFor.subform.major" placeholder="请输入">
					</div>
				</div>
			</div>
			<div class="bc-pd-lr-15rp bc-f-14rp">
				<div class="bc-bg-white bc-flex bc-flex-ai-c bc-mg-t-10rp bc-pd-lr-10rp bc-bd-radius-3">
					<div class="bc-flex-2 bc-t-333 bc-f-b"><span class="bc-t-red">*</span>手机号码</div>
					<div class="bc-flex-3 bc-t-666">
						<input type="text" class="bc-row bc-t-r bc-pd-tb-12rp" v-model="applyFor.subform.phone" placeholder="请输入手机号码">
					</div>
				</div>
			</div>
			
			<div class="bc-pd-lr-15rp bc-f-14rp">
				<div class="bc-bg-white bc-flex bc-flex-ai-c bc-mg-t-10rp bc-pd-lr-10rp bc-bd-radius-3">
					<div class="bc-flex-1 bc-t-333 bc-f-b bc-pd-tb-12rp"><span class="bc-t-red">*</span>所在地区</div>
					<div class="bc-flex-3 bc-t-666 bc-t-r">
						<bv-picker :slots="applyFor.slots" :ajax="applyFor.ajax" class="bc-row" style="display: block;">
							<template slot-scope="scope">
								<!-- 联动的数据 -->
								<span class="bc-select-wrap bc-select-down-icon bc-mg-tb-10" v-for="(slot,index) in applyFor.slots" v-show="slot.values.length > 0">
								<select
									class="bc-input"
									:name="slot.name"
									v-model="slot.value"
									@change="scope.changePicker($event,index)"
								>
									<option value="">请选择</option>
									<option :value="item.id" v-for="item in slot.values">
										{{item.name}}
									</option>
								</select>
							</span>
							</template>
						</bv-picker>
					</div>
				</div>
			</div>
			
			<div class="bc-bg-white bc-mg-lr-15rp bc-f-14rp">
				<div class="bc-flex bc-flex-ai-c bc-mg-t-10rp bc-pd-lr-10rp bc-bd-radius-3 bc-pd-t-12rp">
					<div class="bc-flex-2 bc-t-333 bc-f-b"><span class="bc-t-red">*</span>详细地址</div>
					<div class="bc-flex-3 bc-t-666"></div>
				</div>
				<div class="bc-row">
					<textarea class="bc-row bc-mg-tb-12rp bc-pd-lr-12rp" v-model="applyFor.subform.address" placeholder="请输入地址"></textarea>
				</div>
			</div>
			
			<div class="bc-mg-lr-15rp bc-bg-white bc-f-14rp">
				<div class="bc-flex bc-flex-ai-c bc-mg-t-10rp bc-pd-lr-10rp bc-bd-radius-3">
					<div class="bc-flex-1 bc-t-333 bc-f-b"><span class="bc-t-red">*</span>上传照片</div>
					<div class="bc-flex-3 bc-pd-tb-12rp bc-t-999 bc-t-r bc-pd-r-20rp">
						请上传1寸或2寸电子版标准证件照
					</div>
				</div>
				
				<div class="bc-row bc-mg-l-10rp bc-pd-b-10rp">
				<span class="upload-img" v-for="(item,index) in applyFor.uploadImg" :style="`background-image:url(${item});`" v-if="applyFor.uploadImg.length > 0">
					<i class="remove icon icon-close" @click="removeUpload($refs['receipt'],applyFor.uploadImg,index)"></i>
				</span>
					<upload
						accept="image/png,image/gif,image/jpeg,image/webp"
						input-id="input1"
						ref="receipt"
						name="imgFile"
						post-action="/Upload/index_img"
						@input-file="inputOneFile"
						:upload-data="applyFor.uploadImg"
						style="font-size:0;"
						:style="(!(applyFor.uploadImg.length <= 0)) && `width:0;height:0;`"
					>
						<span class="upload-img upload-img-add"></span>
					</upload>
				</div>
			
			</div>
		</div>
		
		
		<template slot="other">
			<div class="apply-for-button" v-show="showTime && $store.state.view.pageFixed">
				<button :class="!applyFor.dis ? 'active':''" @click="btnForm()">提交</button><!--:disabled="applyFor.dis"-->
			</div>
		</template>
		
	</bv-home-view>
</template>

<script>
	import { uploadMixin } from "$upload";
	export default {
		name: "apply-for",
		mixins: [uploadMixin()],
		components: {
		},
		computed: {
		},
		data() {
			return {
				startDate: new Date('1900/1/1'),
				startTime: '',
				showTime:true,
				morenTime: new Date(),
				applyFor:{
					uploadImg: [],
					dis:true,
					subform:{
						imgs:false,
						Time:'',
						name:'',
						sex:'-1',
						sfz:'',
						phone:'',
						address:'',
						school:'',
						major:'',
					},
					
					//联动
					slots: [{
						values: [],
						value: ''
					}, {
						values: [],
						value: ''
					}, {
						values: [],
						value: ''
					}],
					ajax: {
						url: '/member/CreatorCertificateapply/next_child',
						key:'id'
					},
				},
			}
		},
		methods: {
			openPicker(ref) {
				this.$refs[ref].open();
				this.showTime = false
			},
			checkTime(date) {
				const year = date.getFullYear();
				const month = date.getMonth() + 1;
				const day = date.getDate();
				return [year, month, day].join('/');
			},
			checkStartTime(date) {
				this.showTime = true;
				this.startTime = this.checkTime(date);
			},
			quxiao(){
				this.showTime = true
			},
			inputOneFile(newFile, oldFile, upload) {
				this.$upload(upload, {
					eventArgs: {
						newFile,
						oldFile
					},
					hooks: {
						success(res) {
							upload.uploadData.splice(0, 1, res.url);
						}
					}
				});
			},
			removeUpload(upload, lists, index) {
				this.$removeFile(upload,index);
				lists.splice(index, 1);
			},
			showToast(txt,toPath){
				this.$toast({
					message: txt
				});
				setTimeout(() => {
					this.$closeToast();
					if(toPath){
						//location.href = toPath;
						this.$router.push({
							path: toPath,
						})
					}
				}, 2000);
			},
			btnForm(){
				let name = this.applyFor.subform.name;//姓名
				let sex = this.applyFor.subform.sex;//性别 0，1
				let Time = this.applyFor.subform.Time;//出生日期
				let sfz = this.applyFor.subform.sfz;//身份证
				let phone = this.applyFor.subform.phone;//联系电话
				let gc_top_id = this.applyFor.slots[0].value;//省
				let gc_pid_id = this.applyFor.slots[1].value;//市
				let gc_id = this.applyFor.slots[2].value;//县
				//let phone = this.applyFor.slots[4].value;
				let address = this.applyFor.subform.address;//详细地址
				let imgs = this.applyFor.subform.imgs;//证件照
				let uploadImg = this.applyFor.uploadImg;//证件照
				let school = this.applyFor.subform.school;//学校
				let major = this.applyFor.subform.major;//专业
				let phoneyz = /^[0-9]{11}$/;
				let sfzyz = /^[0-9a-zA-Z]{18}$/;
				if(name == ''){
					this.showToast('请填写姓名');
				}else if(sex == '-1'){
					this.showToast('请选择性别');
				}else if(Time == ''){
					this.showToast('请选择出生日期');
				}else if(!sfzyz.test(sfz)){
					this.showToast('请填写正确的身份证号码');
				}else if(!phoneyz.test(phone)){
					this.showToast('请填写正确的电话号码');
				}else if(address == ''){
					this.showToast('请填写联系地址');
				}else if(imgs == false){
					this.showToast('请上传证件照');
				}else if(this.applyFor.dis != false){
					this.showToast('请填写完证书资料');
				}else {
					this.$axios.post('/member/CreatorCertificateapply/index',{
						username: name,//姓名
						gender: sex,//性别 0，1
						phone: phone,//联系电话
						//create_time: page,//创建时间
						birthday: Time,//出生日期
						img: uploadImg[0],//证件照
						gc_top_id: gc_top_id,//地区省id
						gc_pid_id: gc_pid_id,//地区市id
						gc_id: gc_id,//地区县id
						address: address,//详细地址
						id_card: sfz,//身份证
						school: school,//专业院校
						major: major,//专业
					}).then((res) => {
						this.showToast('申请成功','/member/creator');
					});
				}
			}
		},
		mounted() {},
		watch: {
			'applyFor.subform': {
				handler: function (val) {
					{
						if(val.name!='' && val.sex !='' && val.sfz !='' && val.phone !='' && val.address !='' && val.Time !='' && val.imgs ==true){
							this.applyFor.dis = false;
						}else {
							this.applyFor.dis = true;
						}
					}
				},
				deep: true //对象的深度验证
			},
			'startTime':function (val) {
				if(val!=''){
					this.applyFor.subform.Time = val
				}
			},
			'applyFor.uploadImg':function (val) {
				if(val.length > 0){
					this.applyFor.subform.imgs = true
				}else {
					this.applyFor.subform.imgs = false
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.bc-bg-ed{background: #ededed;}
	input[type="text"],select{border: 0;padding-right: rem(20);outline: none;}
	select.bc-input{direction: rtl;padding-left: rem(5)!important;}
	textarea{border: 0;padding-right: rem(20);outline: none;}
	.box-set option{direction: rtl;}
	.box-input-date{background: url($base-static-path + '/img/member/creator/date.png') right center no-repeat;background-size: rem(16);}
	.apply-for-main{margin-bottom: rem(95);z-index: 1000;}
	.apply-for-button{background:#fff;padding: rem(15) rem(20);position: fixed;left: 0;bottom: 0;right: 0;z-index: 0;}
	.apply-for-button button{width: 100%;padding: rem(15) 0;text-align: center;font-size: 18px;color: #fff;background: #ccc;border-radius: 3px;}
	.apply-for-button button.active{background: #DCB46E;}
	
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
</style>