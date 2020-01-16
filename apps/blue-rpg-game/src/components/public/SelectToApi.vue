<template>
  <select v-model="currentValue" @change="change" class="bz-input">
    <option v-for="(item,index) in data" :value="item[valueKey]" :label="getLabelKey(item)" :key="index"/>
  </select>
</template>

<script>
  export default {
    name: "select-config-type",
    props: {
      value: {
        default: '',
        type: [String, Number, Array]
      },
      method: {
        default: 'get',
        type: String
      },
      api: {
        default: '',
        type: String
      },
      valueKey: {
        default: 'id',
        type: String
      },
      labelKey: {
        default: 'name',
        type: [String, Function]
      },
      multiple: {
        default: false,
        type: Boolean
      }
    },
    data() {
      return {
        data: [],
        currentValue: ``
      };
    },
    created() {
      this.currentValue = this.value;
      this.getData();
    },
    watch: {
      value(val) {
        this.currentValue = val;
      },
      currentValue(val) {
        this.$emit('input', val);
      }
    },
    methods: {

      getLabelKey(item) {
        const labelKey = this.labelKey;
        if (this.$utils.isStr(labelKey)) {
          return item[labelKey];
        } else if (this.$utils.isFunction(labelKey)) {
          return labelKey(item);
        }
        return '';
      },

      getData() {
        const { api, method } = this;
        this.$axios({
          url: api,
          method
        }).then((res) => {
          const { data } = res;
          this.data = data.list;
          this.$emit('loaded', this.data);
        });
      },
      change(data) {
        this.$emit('change', data);
      }
    }
  }
</script>
