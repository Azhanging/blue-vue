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
        className: 'g-input mg-10',
        value: '44'
      },{
        values: [],
        className: 'g-input mg-10',
        value: '4402'
      },{
        values: [],
        className: 'g-input mg-10',
        value: '440204'
      },{
        values: [],
        className: 'g-input mg-10',
        value: ''
      }],
      ajax: {
        url: '/common/next_child'
      }
    };
  }
}
</script>
