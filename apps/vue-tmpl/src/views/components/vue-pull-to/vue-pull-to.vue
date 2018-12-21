<template>
	<div>
		<pull-to :top-load-method="refurbish" :bottom-load-method="more">
			<template slot="top-block" slot-scope="props">
				<div style="text-align: center;">
					{{props.stateText}}
				</div>
			</template>
			<ul>
				<li v-for="item in lists">
					{{item}}
				</li>
			</ul>
			<template slot="bottom-block" slot-scope="props">
				<div style="text-align: center;">
					{{props.stateText}}
				</div>
			</template>
		</pull-to>
	</div>
</template>

<script>
	import PullTo from 'vue-pull-to';

  function mockData() {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push(i);
    }
    return data;
  }

  export default {
    name: "vue-pull-to",
    data() {
      return {
        lists: mockData()
      }
    },
    methods: {
      refurbish(loaded) {
        setTimeout(() => {
          loaded('done');
        }, 1000);
      },
      more(loaded) {
        setTimeout(() => {
          this.lists = this.lists.concat(mockData());
          loaded('done');
        }, 1000);
      }
    },
    components: {
      PullTo
    }
  };

</script>