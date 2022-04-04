const ipUrl = 'http://127.0.0.1:7001/admin/'

const servicePath = {
    checkLogin : ipUrl+'checkLogin',       //登录验证
    getTypeInfo : ipUrl + 'getTypeInfo',       //获取分类列表
    addArticle : ipUrl + 'addArticle' ,  //  添加文章
    updateArticle : ipUrl + 'updateArticle' //修改文章
}
export default servicePath