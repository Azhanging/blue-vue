import utils from 'blue-utils';


export function filter(Vue){
	Vue.filter('timeFilter', timeFilter);
	Vue.filter('cutImage',cutImage);
}

//时间过滤器("Y-M-D h:min:s")
export function timeFilter(time,val='Y-M-D') {
	let d = new Date(time);
	var year = d.getFullYear();
	var month = (d.getMonth()+1)<10 ? '0' + (d.getMonth()+1) : (d.getMonth()+1);
	var day = d.getDate()<10 ? '0' + d.getDate() :  d.getDate();
	var hours = d.getHours()<10 ? '0' + d.getHours() : d.getHours();
	var minutes = d.getMinutes()<10 ? '0' + d.getMinutes() :  d.getMinutes();
	var seconds = d.getSeconds()<10 ? '0' + d.getSeconds() :  d.getSeconds();

	var value = val.replace(/Y/g,year).replace(/M/g,month).replace(/D/g,day).replace(/h/g,hours).replace(/min/g,minutes).replace(/s/g,seconds);

	return value

}

//裁剪过滤器
function cutImage(val, w, h) {
	if (!val) return val;
	var url = '',
		hasParme = (val.indexOf('?') == -1);
	if (w && h) {
		url = val + (hasParme ? '?' : '&') + 'val=Thumb_' + w + '_' + h;
	} else {
		url = val + (hasParme ? '?' : '&') + 'val=Thumb';
	}
	return url;
}
