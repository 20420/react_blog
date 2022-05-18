// 其实这个的作用 和封装到axios的BaseURL中是一样的
let ipUrl = "http://127.0.0.1:7001/blog/"

let servicePath = {
  getArticleList: ipUrl + 'getArticleList',  //首页接口
  getArticleById: ipUrl + 'getArticleById/',  //详细页接口
  getTypeInfo: ipUrl + 'getTypeInfo', //获得文章类别接口
  getListById: ipUrl + 'getListById/'  //根据类别ID获得文章列表
}

export default  servicePath