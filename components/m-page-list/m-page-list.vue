<template>
	<span class="inline-block">
		<slot></slot>
		<slot name="pagination"
      :pages="pages"
      :pageJump="pageJump"
		></slot>
	</span>
</template>

<script>
	export default {
    name: "m-page-list",
    props: {
      pageListData: {
        default: {},
        type: Object
      },
      current: {
        default: 1,
        type: Number
      },
      showItem: {
        default: 5,
        type: Number
      },
      allPage: {
        default: 1,
        type: Number
      }
    },
    computed: {
      pages() {
        const page = [];
        if (this.current < this.showItem) {
          let i = Math.min(this.showItem, this.allPage);
          while (i) {
            page.unshift(i--);
          }
        } else {
          let middle = this.current - Math.floor(this.showItem / 2),
            i = this.showItem;
          if (middle > (this.allPage - this.showItem)) {
            middle = (this.allPage - this.showItem) + 1
          }
          while (i--) {
            page.push(middle++);
          }
        }
        return page;
      }
    },
    methods: {
      pageJump(page) {
        if (page == this.current || page < 1 || page > this.allPage || isNaN(page)) return;
        this.$emit('page-jump', {
          current: page,
          component: this
        });
      }
    }
  }
</script>

<style scoped lang="scss">
	.inline-block {
		display: inline-block;
	}
</style>