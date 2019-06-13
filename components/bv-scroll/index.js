import utils from 'blue-utils';

//针对加载更多调用的mixin数据
export function scrollMixin(opts = {
	loadKey: 'load'
}) {
	return {
		data() {
			return {
				[opts.loadKey]: {
					data: {
						list: []
					},
					state: {
						disabled: false,
						hasMore: true
					},
					params: {
						page: 1
					}
				}
			}
		}
	}
}

//ssr default data
export function scrollAsyncData() {
	const scrollData = scrollMixin();
	return scrollData.data();
}

//停止加载状态
export function scrollEndHook(opts = {}) {
	const {loadKey, listKey, resultData} = utils.extend({
		loadKey: 'load',
		listKey: 'list',
		resultData: {}
	}, opts);
	const load = this[loadKey];
	const loadState = load.state;
	loadState.disabled = true;
	loadState.hasMore = false;

	//检查result的数据是否为空对象，如果为空，不设置list里面的数据
	if(!utils.nullPlainObject(resultData)){
		load.data.list = load.data.list.concat(getListData({
			resultData,
			listKey
		}));
	}

}

//检查load中列表数据是否存在
export function scrollNoHasListData(opts) {
	const {resultData, listKey = 'list', listLen = 0} = opts;
	if (!resultData || (typeof resultData === 'string')) return {};
	let data = resultData;
	if (listKey) {
		data = getListData({
			resultData,
			listKey
		});
	}
	return (!data || data.length === 0 || (listLen && data.length < listLen));
}

//获取list中的数据
function getListData(opts = {
	resultData: {},
	listKey: ''
}) {
	const {resultData, listKey} = opts;
	let data = resultData;
	(listKey.split('.') || []).forEach(function (key) {
		data = data[key];
	});
	return data;
}