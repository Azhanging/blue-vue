<template>
	<div>
		<!-- 列表数据slot -->
		<slot></slot>

		<slot name="pagination">
			<!-- 页码 -->
			<div class="bc-row bc-t-c m-page-list" v-show="allPage > 0">

				<a class="m-page-btn active" href="javascript:void(0);" @click="pageJump(1)">
					首页
				</a>

				<a class="m-page-btn active" href="javascript:void(0);" v-show="current != 1" @click="pageJump(current-1)">
					上一页
				</a>

				<a v-for="index in pages" class="m-page-btn" :class="{'active': current == index,'bc-t-666': current != index}" href="javascript:void(0);" @click="pageJump(index)">
					{{index}}
				</a>

				<a class="m-page-btn active" href="javascript:void(0);" v-show="allPage != current && allPage != 0 " @click="pageJump(current + 1)">
					下一页
				</a>

				<a class="m-page-btn active" href="javascript:void(0);" @click="pageJump(allPage)">
					末页
				</a>

				<span>共 {{allPage}} 页，到第</span>

				<input type="text" class="bc-input bc-t-c bc-mg-l-5" style="width: 50px" v-model="inputPageNum" @keydown.enter="pageJump(inputPageNum)"/>

				<a class="m-page-btn active" @click="pageJump(inputPageNum)">
					确定
				</a>
			</div>
		</slot>

	</div>
</template>

<script>
	export default {
    name: "m-page-list",
    props: {
      pageListData: {
        default() {
          return {};
        },
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
    data() {
      return {
        inputPageNum: ''
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
        this.inputPageNum = '';
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

	@import '@/assets/scss/config.scss';

	html[data-mobile-device="true"] {
		.m-page-btn {
			padding: 4px 10px 2px 10px;
		}
		.m-page-btn {
			&:hover {
			}
		}
	}

	.m-page-list {
		.m-page-btn {
			display: inline-block;
			padding: 4px 10px;
			margin: 4px;
			line-height: 1.42857143;
			border: 1px solid transparent;
			&.active {
				background-color: $color-base;
				border: 1px solid $color-base;
				color: white;
			}
			&:hover {
				background-color: $color-base - 22;
				color: white;
			}
		}
	}
</style>