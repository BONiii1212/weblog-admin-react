import React,{useState} from "react";
import { marked } from "marked";
import '../static/css/AddArticle.css'
import {Input,Select,Button,DatePicker,message,Form} from 'antd'
import axios from "axios";
import servicePath from '../config/apiUrl'
import { useAddArticle, useGetTypeInfo, useUpdateArticle } from "../utils/article";

const {Option} = Select
const {TextArea} = Input

//缺少html显示换行
function AddArticle(){
    const {data:typeInfo} = useGetTypeInfo() // 获取下拉栏中所有的文章类型
    const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [selectedType,setSelectType] = useState('文章类型') //选择的文章类别
    const {add} = useAddArticle()
    const {update} = useUpdateArticle()
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
    const saveArticle = (data)=>{
        data = Object.assign({...data},{addTime:data['addTime'].format('YYYY-MM-DD')})
        if(articleId==0){
            add(data).then(res=>{
                setArticleId(res.insertId)
                if(res.isSuccess){
                    message.success('文章保存成功')
                }else{
                    message.error('文章保存失败');
                }}
            )
        }else{
            data.id = articleId
            update(data).then(res=>{
                if(res.isSuccess){
                    message.success('文章保存成功')
                }else{
                    message.error('保存失败');
                }
            })
        }
    }

    return(
        <Form onFinish={saveArticle}>
            <Form.Item label="文章标题" name="title" rules={[{required:true,message:'请输入文章标题'}]}>
                <Input placeholder="请输入文章标题"/>
            </Form.Item>
            <Form.Item label="文章类型" name="type_id" initialValue={selectedType}>
                <Select onChange={selectTypeHandler} value={selectedType}>
                    {typeInfo?.map(item=>{
                        return(<Option key={item.id} value={item.id}>{item.typeName}</Option>)
                    })}
                </Select>
            </Form.Item>
            <Form.Item label="发布时间" name="addTime" rules={[{required:true,message:'请选择发布时间'}]}>
                <DatePicker placeholder="请选择日期"/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">发布文章</Button>
            </Form.Item>
            <Form.Item name="article_content" rules={[{required:true,message:'请输入文章内容'}]}>
                <TextArea onChange={changeContent} className="markdown-content" rows={25} placeholder="文章内容" value={articleContent}/>
            </Form.Item>
            <Form.Item>
                <div className="show-html" dangerouslySetInnerHTML={{__html:markdownContent}}></div>
            </Form.Item>
            <Form.Item name="introduce" rules={[{required:true,message:'请输入文章简介'}]}>
                <TextArea onChange={changeIntroduce} rows={4} placeholder="文章简介" value={introducemd}></TextArea>   
            </Form.Item>
            <Form.Item>
                <div className="introduce-html" dangerouslySetInnerHTML={{__html:introducehtml}}></div>
            </Form.Item>
        </Form>
    )
}
export default AddArticle