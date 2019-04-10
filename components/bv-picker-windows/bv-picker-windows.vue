<template>
	<bv-picker
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
					<div class="bc-flex bc-flex-ai-c bc-pd-10rp bc-t-999 bc-f-16rp bc-bd-b-e5e">
						<div class="bc-flex-1"></div>
						<div class="bc-flex-2 bc-t-c">
							{{title}}
						</div>
						<div class="bc-flex-1 bc-t-r bc-f-21rp">
							<a href="javascript:;" class="bc-t-666" @click.stop="closePickerWindows">
								&times;
							</a>
						</div>
					</div>

					<!-- 窗口内容 -->
					<div class="bv-picker-windows-body">
						<!-- 显示项 -->
						<div class="bv-picker-select bc-flex bc-bd-b-e5e">
							<div
								class="bc-t-hide"
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
						<div class="bv-picker-windows-body-items bc-flex">
							<bv-swiper-scroll
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
										class="bc-block bc-t-hide bc-pd-tb-10rp"
										:class="[
									  findSlot(slot).index === index && scroll.activeClassName
									]"
										v-for="item in slot.values"
										:key="item.id"
										@click.stop="selectItem($event,item,slot,pickerScope,index)"
									>
										{{item.name}}
									</div>
								</template>
							</bv-swiper-scroll>
						</div>
					</div>
				</div>
			</div>
		</template>
	</bv-picker>
</template>

<script>
	import Vuex from 'vuex';
  import utils from 'blue-utils';

  const { mapState } = Vuex;

  export default {
    name: "bv-picker-windows",
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