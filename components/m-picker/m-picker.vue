<template>
	<span>
		<template v-for="(slot,index) in slots">
			<!-- 联动的数据 -->
			<select
				:name="slot.name"
				:class="slot.className"
				v-model="slot.value"
				@change="changePicker($event,index)"
				v-show="slot.values.length > 0"
			>
				<option value="">请选择</option>
				<option :value="item.id" v-for="item in slot.values">
					{{item.name}}
				</option>
			</select>
		</template>
	</span>
</template>

<script>

	import utils from '$utils';

  function initPicker() {
    initPickerValues.call(this);
  }

  function getSlotsItemData(opts) {
    const { index } = opts;
    const params = utils.extend(this.ajax.params, {
      id: opts.id
    });
    this.$axios({
      url: this.ajax.url,
      method: 'post',
      data: params
    }).then((res) => {
      let { data } = res;
      data = this.got(data);
      this.slots[index].values = data;
    });
  }

  function initPickerValues() {
    const values = [];
    const slots = this.slots;
    slots.forEach((slot, index) => {
      this.changePicker(null, index, true);
    });
    this.values = values;
  }

  //情况后面的数据
  function clearNextAllSlot(index) {
    const slots = this.slots;
    for (; index < slots.length; index++) {
      const item = slots[index];
      item.values = [];
      item.value = "";
    }
  }

  export default {
    name: "m-picker",
    props: {
      got: {
        type: Function,
        default(data) {
          return data;
        }
      },
      slots: {
        default: [/*{
          values: [],
          name: '',   //form name
          className: '',
          value: ''
        }*/]
      },
      ajax: {
        validator(value) {
          return utils.extend({
            url: '',
            params: {},
            key: 'id'
          }, value || {})
        },
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        values: []
      }
    },
    methods: {
      changePicker($event, index, isInit = false) {
        const slots = this.slots;
        const slot = slots[index];
        const prevIndex = index - 1;
        const nextIndex = index + 1;
        const prevSlot = slots[prevIndex];
        if (index == 0 || prevSlot.value) {
          const _index = isInit ? index : nextIndex;
          if($event && !$event.target.value){
            clearNextAllSlot.call(this, _index);
            return;
          }
          getSlotsItemData.call(this, {
            index: _index,
            id: (function () {
              if (isInit) {
                if (index == 0) {
                  return 0
                } else {
                  return prevSlot.value;
                }
              } else {
                return slot.value
              }
            })()
          });
          if(!isInit){
            clearNextAllSlot.call(this, _index);
          }
        }
      }
    },
    mounted() {
      initPicker.call(this);
    }
  }
</script>

<style scoped lang="scss">

</style>