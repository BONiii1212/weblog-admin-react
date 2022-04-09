import React,{useEffect, useState,useRef} from "react";
import { marked } from "marked";
import '../static/css/AddArticle.css'
import {useNavigate} from "react-router-dom";
import {Input,Select,Button,DatePicker,message,Form} from 'antd'
import { useAddArticle, useGetArticleById, useGetTypeInfo, useUpdateArticle } from "../utils/article";
import { useUrlQueryParam } from "../utils/useUrlQueryParam";
import { useForm } from "antd/es/form/Form";
import moment from "moment"

const {Option} = Select
const {TextArea} = Input

//缺少html显示换行
function AddArticle(){
    const {data:typeInfo} = useGetTypeInfo() // 获取下拉栏中所有的文章类型
    const [params,setParams] = useUrlQueryParam(["id"])  // 文章的ID
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [articleDetails,setArticleDetails] = useState({
        title:'',
        introduce:'',
        article_content:'',
        addTime:'',
        type_id:0,
    })
    let navigate = useNavigate()
    const [form] = useForm() //用于重置表格
    const {add} = useAddArticle()
    const {update} = useUpdateArticle()
    const {getArticleDetails} = useGetArticleById()
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

    //表单数据变动
    const formDataChange = (data) => {
        if(Object.keys(data)[0]=='addTime'){
            data = {addTime:data['addTime'].format('YYYY-MM-DD')}
        }else if(Object.keys(data)[0]=='introduce'){
            let html = marked(data['introduce'])
            setIntroducehtml(html)
        }else if(Object.keys(data)[0]=='article_content'){
            let html = marked(data['article_content'])
            setMarkdownContent(html)
        }
        
        setArticleDetails({...articleDetails,...data})
    }
    //如果是修改模式的话，进来先加载数据
    useEffect(()=>{
        if(params.id!=''){
            //获取文章详细信息
            getArticleDetails(params.id).then(data=>{
                setArticleDetails(data)
                data = {...data,"addTime":moment(data["addTime"])}
                form.setFieldsValue(data)
                let introduce_html = marked(data['introduce'])
                setIntroducehtml(introduce_html)
                let article_content = marked(data['article_content'])
                setMarkdownContent(article_content)
            })
        }
    },[params])

    //发布方法
    const addArticle = (data)=>{
        data = Object.assign({...data},{addTime:data['addTime'].format('YYYY-MM-DD')})
        add(data).then(res=>{
            if(res.isSuccess){
                form.resetFields()
                message.success('文章发布成功')
            }else{
                message.error('文章发布失败');
            }}
        )
    }
    //更新方法
    const updateArticle = (data) =>{
        data = Object.assign({...data},{addTime:data['addTime'].format('YYYY-MM-DD')})
        data.id = params.id
        update(data).then(res=>{
            if(res.isSuccess){
                navigate(`/index/list`);
                message.success('文章修改成功')
            }else{
                message.error('文章修改失败');
            }
        })
    }
    return(
        <Form form={form} onValuesChange={formDataChange} onFinish={params.id==''?addArticle:updateArticle}>
            <Form.Item label="文章标题" name="title" rules={[{required:true,message:'请输入文章标题'}]}>
                <Input placeholder="请输入文章标题" />
            </Form.Item>
            <Form.Item label="文章类型" name="type_id" initialValue='文章类型'>
                <Select>
                    {typeInfo?.map(item=>{
                        return(<Option key={item.id} value={item.id}>{item.typeName}</Option>)
                    })}
                </Select>
            </Form.Item>
            <Form.Item label="发布时间" name="addTime" rules={[{required:true,message:'请选择发布时间'}]}>
                <DatePicker placeholder="请选择日期"/>
            </Form.Item>
            <Form.Item>
                {params.id==''?
                <Button type="primary" htmlType="submit">发布文章</Button>
                :<Button type="primary" danger htmlType="submit">修改文章</Button>}
            </Form.Item>
            <Form.Item name="article_content" rules={[{required:true,message:'请输入文章内容'}]}>
                <TextArea className="markdown-content" rows={25} placeholder="文章内容"/>
            </Form.Item>
            <Form.Item>
                <div className="show-html" dangerouslySetInnerHTML={{__html:markdownContent}}></div>
            </Form.Item>
            <Form.Item name="introduce" rules={[{required:true,message:'请输入文章简介'}]}>
                <TextArea rows={4} placeholder="文章简介" ></TextArea>   
            </Form.Item>
            <Form.Item>
                <div className="introduce-html" dangerouslySetInnerHTML={{__html:introducehtml}}></div>
            </Form.Item>
        </Form>
    )
}
export default AddArticle