<template>
	<div class="row overflow-hide">
		<m-picker :slots="slots" :ajax="ajax"></m-picker>
	</div>
</template>

<script>
export default {
  name: "picker",
  data() {
    return {
      slots: [{
        values: [],
        className: 'g-input',
        value: '44'
      },{
        values: [],
        className: 'g-input',
        value: '4402'
      },{
        values: [],
        className: 'g-input',
        value: '440204'
      },{
        values: [],
        className: 'g-input',
        value: ''
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