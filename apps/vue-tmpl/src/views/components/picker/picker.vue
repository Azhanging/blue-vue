<template>
	<bv-home-view :router-level="2">
		<bv-header :header="{title:{value:'多级联动'}}"/>

		<div class="bc-pd-10rp">
			select联动：
		</div>
		<div class="bc-row bc-overflow-hide">
			<bv-picker :slots="slots" :ajax="ajax">
				<template slot-scope="scope">
					<!-- 联动的数据 -->
					<span class="bc-select-wrap bc-select-down-icon bc-mg-10" v-for="(slot,index) in slots" v-show="slot.values.length > 0">
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

		<div class="bc-pd-10rp">
			<a href="" class="bc-btn bc-btn-primary">
				点击联动
			</a>
		</div>

		<bv-picker-windows />

	</bv-home-view>
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
        value: '44'
      }, {
        values: [],
        value: '4402'
      }, {
        values: [],
        value: '440204'
      }],
      ajax: {
        url: '/member/personal/next_child'
      }
    };
  }
}
</script>