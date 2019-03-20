
var timeFilter = function (val) {

	const [time,type] = val

	//2019-01-03格式
	if(type == 'type1'){
		var d = new Date(time);
		var month = (d.getMonth()+1)<10 ? '0' + (d.getMonth()+1) : (d.getMonth()+1);
		var day = d.getDate()<10 ? '0' + d.getDate() :  d.getDate();
		return d.getFullYear()+'-'+month+'-'+day;
	}


}
export default timeFilter
