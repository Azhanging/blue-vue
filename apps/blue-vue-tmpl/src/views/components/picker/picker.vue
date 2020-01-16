<template>
  <BvView>
    <BvHeader :center-control="{
	  	title:`多级联动`
		}"/>

    <div class="bz-pd-20rpx">
      select联动：
    </div>
    <div class="bz-row bz-overflow-hide">
      <BvPicker :slots="slots" :ajax="ajax">
        <template slot-scope="scope">
          <!-- 联动的数据 -->
          <span class="bz-select-wrap bz-select-down-icon bz-mg-10" v-for="(slot,index) in slots"
                v-show="slot.values.length > 0">
						<select
                    class="bz-input"
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

    <div class="bz-pd-20rpx">
      <a href="" class="bz-btn bz-btn-primary">
        点击联动
      </a>
    </div>

    <BvPickerWindows
            :slots="slots"
            :ajax="ajax"
            :select="{
			  className: 'bz-pd-20rpx',
			  activeClassName: 'bz-t-base bz-bd-b-base'
			}"
            :scroll="{
			  className: 'bz-pd-20rpx',
			  activeClassName: 'bz-t-base'
			}"
    />

  </BvView>
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