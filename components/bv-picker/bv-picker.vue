<template>
	<span>
		<slot :change-picker="changePicker" :init-picker="initPicker"/>
	</span>
</template>

<script>

	import utils from 'blue-utils';

  function initPicker() {
    const values = [];
    const slots = this.slots;
    slots.forEach((slot, index) => {
      this.changePicker(null, index, true);
    });
    this.values = values;
  }

  function getSlotsItemData(opts) {
    const { index } = opts;
    const params = utils.extend(this.ajax.params || {}, {
      [this.ajax.key]: opts.id
    });
    this.$axios({
      url: this.ajax.url,
      method: this.ajax.type || 'get',
      params
    }).then((res) => {
      let { data } = res;
      data = this.got(data);
      if (this.slots[index]) {
        this.slots[index].values = data;
      }
    });
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

  function isFormElm(elm) {
    const tagName = elm.tagName;
    return tagName === 'SELECT' || tagName === 'INPUT' || tagName === 'TEXTAREA';
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
        default() {
          return [];
        }
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
        this.$nextTick(() => {
          const slots = this.slots;
          const slot = slots[index];
          const prevIndex = index - 1;
          const nextIndex = index + 1;
          const prevSlot = slots[prevIndex];
          if (index == 0 || prevSlot.value) {
            const _index = isInit ? index : nextIndex;
            if ($event && isFormElm($event.target) && !$event.target.value) {
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
            if (!isInit) {
              clearNextAllSlot.call(this, _index);
            }
          }
        });
      },
      initPicker
    },
    mounted() {
      this.initPicker();
    }
  }
</script>

<style scoped lang="scss">
	.bc-select-wrap {
		display: inline-block;
	}
</style>