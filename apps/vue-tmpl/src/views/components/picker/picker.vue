<template>
	<m-home-view :router-level="2">
		<m-header :title="'多级联动'"></m-header>
		<div class="row overflow-hide">
			<m-picker :slots="slots" :ajax="ajax">
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
			</m-picker>
		</div>
	</m-home-view>
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
        url: '/common/next_child'
      }
    };
  }
}
</script>

<style scoped lang="scss">

</style>