const mockApi = [{
	url: `/mock/data`,
	method: 'post',
	response(req, res) {
		res.send({
			code: 200,
			data: {}
		});
	}
}, {
	url: `/mock/data1`,
	method: 'post',
	response(req, res) {
		res.send({
			code: 200,
			data: {}
		});
	}
}, {
	url: `/mock/list`,
	method: 'get',
	response(req, res) {
		res.send({
			code: 200,
			data: {
				list: (() => {
					const data = [];
					for (let i = 0; i < 10; i++) {
						data.push({
							name: 'test',
							src_img: ''
						});
					}
					return data;
				})()
			}
		});
	}
}];

module.exports = mockApi;