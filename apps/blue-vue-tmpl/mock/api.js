const mockApi = [{
  url: `/mock/data`,
  type: 'post',
  response(req, res) {
    res.send({
      code: 200,
      data: {}
    });
  }
}, {
  url: `/mock/data1`,
  type: 'post',
  response(req, res) {
    res.send({
      code: 200,
      data: {}
    });
  }
}];

module.exports = mockApi;