//时间搜索
function dateSearch(){
  return {
    data() {
      return {
        startTime: '',
        endTime: ''
      };
    },
    methods: {
      openPicker(ref) {
        this.$refs[ref].open();
      },
      checkTime(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return [year, month, day].join('/');
      },
      checkStartTime(date) {
        this.startTime = this.checkTime(date);
      },
      checkEndTime(date) {
        this.endTime = this.checkTime(date);
      },
      //搜索
      search() {
        if (this.startTime === '' || this.endTime === '') {
          this.load.state.disabled = true;
          this.$toast({
            message: `请选择时间`
          });
          return;
        }
        const startTime = new Date(this.startTime).getTime();
        const endTime = new Date(this.endTime).getTime();
        if (startTime > endTime) {
          this.$toast({
            message: `开始时间不能大于结束时间`
          });
          this.load.state.disabled = true;
          return;
        }
        this.load.state.disabled = true;
        this.$nextTick(() => {
          this.load.params.page = 1;
          this.load.data.list = [];
          this.load.state.disabled = false;
          this.load.state.hasMore = true;
        });
      }
    }
  };
}

export default dateSearch;