const ipUrl = 'http://127.0.0.1:7002/admin/'

const servicePath = {
    checkLogin : ipUrl+'checkLogin',       //登录验证
    getTypeInfo : ipUrl + 'getTypeInfo',       //获取分类列表
    addArticle : ipUrl + 'addArticle' ,  //  添加文章
    updateArticle : ipUrl + 'updateArticle', //修改文章
    getArticleList : ipUrl + 'getArticleList', //搜索文章列表
    delArticle : ipUrl + 'delArticle/' ,  //  删除文章
    getArticleById : ipUrl + 'getArticleById/' ,  //  根据ID获得文章详情
}
export default servicePath