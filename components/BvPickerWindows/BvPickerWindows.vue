<template>
	<BvPicker
		class="bv-picker-windows-container"
		:class="{'no-tab-bar':!view.tabBar}"
		:ajax="ajax"
		:slots="slots"
		ref="picker"
	>
		<template slot-scope="pickerScope">
			<div class="bv-picker-windows-shadow" @click.stop="closePickerWindows">
				<div class="bv-picker-windows">
					<!-- 标题 -->
					<div class="ba-flex ba-flex-ai-c ba-pd-10rpx ba-t-999 ba-f-16rpx ba-bd-b-e5e">
						<div class="ba-flex-1"></div>
						<div class="ba-flex-2 ba-t-c">
							{{title}}
						</div>
						<div class="ba-flex-1 ba-t-r ba-f-21rpx">
							<a href="javascript:;" class="ba-t-666" @click.stop="closePickerWindows">
								&times;
							</a>
						</div>
					</div>

					<!-- 窗口内容 -->
					<div class="bv-picker-windows-body">
						<!-- 显示项 -->
						<div class="bv-picker-select ba-flex ba-bd-b-e5e">
							<div
								class="ba-t-hide"
								v-for="(slot,index) in slots"
								:class="[
							  select && select.className,
							  isShowWindowsItem(index) && select && select.activeClassName
							]"
								@click.stop="checkedItem(index)"
								v-show="slot.values.length > 0"
							>
								{{findSlot(slot).item.name}}
							</div>
						</div>

						<!-- 选择的列表 -->
						<div class="bv-picker-windows-body-items ba-flex">
							<BvSwiperScroll
								:direction="'y'"
								class="bv-picker-windows-body-item"
								v-for="(slot,index) in slots"
								:key="index"
								:class="[
							  isShowWindowsItem(index) && scroll && scroll.className
							]"
								:active-class-name="scroll.activeClassName"
								:current-index="findSlot(slot).index"
								:style="`${isShowWindowsItem(index) ? 'width:100%;' : 'width:0;'}`"
							>
								<template slot="scroll-items">
									<div
										class="ba-block ba-t-hide ba-pd-tb-10rpx"
										v-for="(item,slotIndex) in slot.values"
										:class="[
										  findSlot(slot).index === slotIndex && scroll.activeClassName
										]"
										:key="item.id"
										@click.stop="selectItem($event,item,slot,pickerScope,index)"
									>
										{{item.name}}
									</div>
								</template>
							</BvSwiperScroll>
						</div>
					</div>
				</div>
			</div>
		</template>
	</BvPicker>
</template>

<script>
	import Vuex from 'vuex';
  import utils from 'blue-utils';

  const { mapState } = Vuex;

  export default {
    name: "BvPickerWindows",
    props: {
      title: {
        default: 'title',
        type: String
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
      },
      scroll: {
        type: Object,
        default() {
          return {
            className: 'default-css',
            activeClassName: 'default-css'
          };
        }
      },
      select: {
        type: Object,
        default() {
          return {
            className: 'default-css',
            activeClassName: 'default-css'
          };
        }
      }
    },
    data() {
      return {
        checkItemIndex: -1
      };
    },
    computed: {
      ...mapState(['view'])
    },
    methods: {

      //关闭的windows
      closePickerWindows() {
        this.$emit('close-picker-windows');
      },

      //选中id
      selectItem($event, item, slot, pickerScope, index) {
        if (item.id === slot.value) return;
        pickerScope.changePicker($event, index);
        this.checkItemIndex = -1;
        slot.value = item.id;
        document.body.scrollTop = document.body.scrollHeight;
        this.$emit('select-picker', {
          item,
          slot
        });
      },

      //从slots查找slot
      findSlot(slot) {
        const value = slot.value;
        for (let i = 0; i < slot.values.length; i++) {
          let item = slot.values[i];
          if (value === item.id) {
            return {
              index: i,
              value,
              item
            };
          }
        }
        return {
          index: -1,
          value: '',
          item: {
            name: '请选择'
          }
        };
      },

      //查找选择
      findNextChecked() {
        const slots = this.slots;
        const lastIndex = slots.length - 1;
        for (let i = 0; i < slots.length; i++) {
          let item = slots[i];
          if (!item.value) {
            if (item.values.length === 0) {
              return i - 1;
            } else {
              return i;
            }
          }
        }
        return lastIndex;
      },

      //显示scroll
      isShowWindowsItem(index) {
        const checkItemIndex = this.checkItemIndex;
        const findIndex = this.findNextChecked();
        let showStatus;
        if (checkItemIndex !== -1) {
          showStatus = (checkItemIndex === index);
        } else {
          showStatus = (findIndex === index);
        }
        return showStatus
      },

      //选择具体的某项
      checkedItem(index) {
        this.checkItemIndex = index;
      },

      //bv-picker中的初始化方法
      initPicker() {
        this.$refs['picker'].initPicker();
      }

    }
  }
</script>

<style scoped lang="scss">
	.bv-picker-windows-container {
		position: fixed;
		z-index: 10000;
		top: 0;
		left: 0;
		right: 0;
		bottom: 47px;
		bottom: calc(constant(safe-area-inset-bottom) + 47px);
		bottom: calc(env(safe-area-inset-bottom) + 47px);
		background-color: rgba(0, 0, 0, .2);
		//没有tab-bar
		&.no-tab-bar {
			bottom: 0;
		}
		.bv-picker-windows-shadow {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
		}
		.bv-picker-windows {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			background-color: white;
			.bv-picker-windows-body {
				.bv-picker-windows-body-items {
					.bv-picker-windows-body-item {
						height: rem(300);
					}
				}
			}
		}
	}
</style>