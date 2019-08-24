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
}];

module.exports = mockApi;