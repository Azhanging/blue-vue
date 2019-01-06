<template>
	<m-home-view>
		<m-header :title="'多级联动'"></m-header>
		<div class="row overflow-hide">
			<m-picker :slots="slots" :ajax="ajax"></m-picker>
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
        wrapClassName: 'bc-select-down-icon bc-mg-10',
        className: 'bc-input',
        value: '659005'
      }, {
        values: [],
        wrapClassName: 'bc-select-down-icon bc-mg-10',
        className: 'bc-input',
        value: '44'
      }, {
        values: [],
        wrapClassName: 'bc-select-down-icon bc-mg-10',
        className: 'bc-input',
        value: '4402'
      }, {
        values: [],
        wrapClassName: 'bc-select-down-icon bc-mg-10',
        className: 'bc-input',
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