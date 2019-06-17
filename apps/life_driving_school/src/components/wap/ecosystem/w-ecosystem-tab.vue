<template>
	<w-home-header :header='title' :leftControl="leftControl">
		<w-home-nav
			:nav='nav'
			:defaultParams_key='"more_id"'
			:otherParams='{tow_nav_id:$route.params.tow_nav_id}'
			:active-index='ecosystemIndex'
			type="ecosystem"
		>
		</w-home-nav>
	</w-home-header>
</template>

<script>

	export default {
		props:{
			//左边控制
			leftControl: {
				default: '',
				type: String
			},
			title:'',
			otherParams:{},
			growIndex:0,
			ecosystemIndex:{
				default: 0,
				type: Number
			}
		},
		data() {
			return {
				nav: [
					{
						id:'1',
						name:'相关资讯',
						pathr:'more-infor'
					},{
						id:'2',
						name:'相关课程',
						pathr:'more-course'
					},{
						id:'3',
						name:'相关服务',
						pathr:'more-serve'
					},{
						id:'4',
						name:'相关产品',
						pathr:'more-product'
					}
				]
			}
		},
	}
</script>

