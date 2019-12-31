<template>
  <BvLayoutView :router-level="2">
    <BvHeader :center-control="{
	  	title:`多级联动`
		}"/>

    <div class="bc-pd-10rpx">
      select联动：
    </div>
    <div class="bc-row bc-overflow-hide">
      <BvPicker :slots="slots" :ajax="ajax">
        <template slot-scope="scope">
          <!-- 联动的数据 -->
          <span class="bc-select-wrap bc-select-down-icon bc-mg-10" v-for="(slot,index) in slots"
                v-show="slot.values.length > 0">
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
      </BvPicker>
    </div>

    <div class="bc-pd-10rpx">
      <a href="" class="bc-btn bc-btn-primary">
        点击联动
      </a>
    </div>

    <BvPickerWindows
            :slots="slots"
            :ajax="ajax"
            :select="{
			  className: 'bc-pd-10rpx',
			  activeClassName: 'bc-t-base bc-bd-b-base'
			}"
            :scroll="{
			  className: 'bc-pd-10rpx',
			  activeClassName: 'bc-t-base'
			}"
    />

  </BvLayoutView>
</template>

<script>
  export default {
    name: "picker",
    data() {
      return {
        slots: [{
          values: [],
          value: '659005'
        }, {
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
          url: '/member/personal/next_child'
        },
        showPickerWindows: false
      };
    },
    methods: {}
  }
</script>