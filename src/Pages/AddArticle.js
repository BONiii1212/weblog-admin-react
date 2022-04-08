import React,{useState,useEffect} from "react";
import { marked } from "marked";
import '../static/css/AddArticle.css'
import {Row,Col,Input,Select,Button,DatePicker,message} from 'antd'
import axios from "axios";
import servicePath from '../config/apiUrl'
import {useNavigate} from "react-router-dom";
import { useGetArticleById, useGetTypeInfo } from "../utils/article";

const {Option} = Select
const {TextArea} = Input

//缺少html显示换行
function AddArticle(){
    const {data:typeInfo} = useGetTypeInfo() //文章类型
    const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate,setShowDate] = useState()   //发布日期
    const [selectedType,setSelectType] = useState('文章类型') //选择的文章类别
    
    let navigate = useNavigate()

    const renderer = new marked.Renderer()
    marked.setOptions({
        renderer:renderer,
        gfm:true,
        pedantic:false,
        sanitize:false,
        breaks:false,
        smartLists:true,
        smartypants:false,
    })
    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }
    const changeIntroduce = (e)=>{
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }
    const selectTypeHandler = (value) => {
        setSelectType(value)
    }

    // useEffect(()=>{
    //     //getTypeInfo()
    //     //获得文章ID
    //     let tmpId = 7
    //     if(tmpId){
    //         setArticleId(tmpId)
    //         getArticleById(tmpId)
    //     } 
    // },[])

    // const getArticleById = (id)=>{
    //     axios(servicePath.getArticleById+id,{ 
    //         withCredentials: true,
    //         header:{ 'Access-Control-Allow-Origin':'*' }
    //     }).then(
    //         res=>{
    //             //let articleInfo= res.data[0]
    //             setArticleTitle(res.data[0].title)
    //             setArticleContent(res.data[0].article_content)
    //             let html=marked(res.data[0].article_content)
    //             setMarkdownContent(html)
    //             setIntroducemd(res.data[0].introduce)
    //             let tmpInt = marked(res.data[0].introduce)
    //             setIntroducehtml(tmpInt)
    //             setShowDate(res.data[0].addTime)
    //             setSelectType(res.data[0].typeId)
    
    //         }
    //     )
    // }    
    //直接使用Antd的Form组件来完成
    
    const saveArticle = ()=>{
        if(!selectedType){
            message.error('必须选择文章类别')
            return false
        }else if(!articleTitle){
            message.error('文章名称不能为空')
            return false
        }else if(!articleContent){
            message.error('文章内容不能为空')
            return false
        }else if(!introducemd){
            message.error('简介不能为空')
            return false
        }else if(!showDate){
            message.error('发布日期不能为空')
            return false
        }

        let dataProps={}   //传递到接口的参数
        dataProps.type_id = selectedType 
        dataProps.title = articleTitle
        dataProps.article_content =articleContent
        dataProps.introduce =introducemd
        let datetext= showDate.replace('-','/') //把字符串转换成时间戳
        dataProps.addTime =(new Date(datetext).getTime())/1000


        if(articleId==0){
            dataProps.view_count =Math.ceil(Math.random()*100)+1000
            console.log(dataProps)
            axios({
                method:'post',
                url:servicePath.addArticle,
                data:dataProps,
                withCredentials: true
            }).then(
                res=>{
                    setArticleId(res.data.insertId)
                    if(res.data.isSuccess){
                        message.success('文章保存成功')
                    }else{
                        message.error('文章保存失败');
                    }

                }
            )
        }else{
            dataProps.id = articleId 
            axios({
                method:'post',
                url:servicePath.updateArticle,
                header:{ 'Access-Control-Allow-Origin':'*' },
                data:dataProps,
                withCredentials: true
            }).then(
                res=>{
                if(res.data.isSuccess){
                    message.success('文章保存成功')
                }else{
                    message.error('保存失败');
                }
            })
        }
    }

    return(
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input value={articleTitle} placeholder="博客标题" size="large" onChange={(e)=>{setArticleTitle(e.target.value)}}/>
                        </Col>
                        <Col span={4}>
                            <Select onChange={selectTypeHandler} value={selectedType} defaultValue={selectedType} size="large">
                                {typeInfo?.map(item=>{
                                    return(
                                        <Option key={item.id} value={item.id}>{item.typeName}</Option>
                                    )
                                })}
                            </Select>
                        </Col>
                    </Row>
                    <br/>
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea onChange={changeContent} className="markdown-content" rows={25} placeholder="文章内容" style={{resize:"none"}} value={articleContent}/>
                        </Col>
                        <Col span={12}>
                            <div className="show-html" dangerouslySetInnerHTML={{__html:markdownContent}}></div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button type="primary" size="large" style={{marginRight:"5px"}} onClick={saveArticle}>发布文章</Button>
                            <DatePicker onChange={(date,dateString)=>{setShowDate(dateString)}} placeholder="发布日期" size="large"/>
                        </Col>
                        <Col span={24}>
                            <TextArea onChange={changeIntroduce} rows={4} placeholder="文章简介" style={{marginTop:"22px",resize:"none"}} value={introducemd}></TextArea>
                            <div className="introduce-html" dangerouslySetInnerHTML={{__html:introducehtml}}></div>
                        </Col>
                    </Row>
                </Col>

            </Row>
        </div>
    )
}
export default AddArticle