import React,{useEffect, useState} from "react";
import { marked } from "marked";
import '../static/css/AddArticle.css'
import {useNavigate} from "react-router-dom";
import {EditOutlined,FileTextOutlined} from "@ant-design/icons"
import {Row,Col,Input,Select,Button,DatePicker,message,Form,Tabs,Spin} from 'antd'
import { useAddArticle, useGetArticleById, useGetTypeInfo, useUpdateArticle } from "../utils/article";
import { useUrlQueryParam } from "../utils/useUrlQueryParam";
import { useForm } from "antd/es/form/Form";
import moment from "moment"
import { useMenu } from "../context/menu-context";
import { useDocumentTile } from "../utils/title";
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import { ImageUpload } from "../components/ImageUpload";

const {Option} = Select
const {TextArea} = Input
const {TabPane} = Tabs

//缺少html显示换行
function AddArticle(){
    const {data:typeInfo} = useGetTypeInfo() // 获取下拉栏中所有的文章类型
    const [params,setParams] = useUrlQueryParam(["id"])  // 文章的ID
    const [markdownContent, setMarkdownContent] = useState("") //html内容
    const [introducehtml,setIntroducehtml] = useState("") //简介的html内容
    const [articleDetails,setArticleDetails] = useState({
        title:'',
        introduce:'',
        article_content:'',
        addTime:'',
        type_id:0,
    })
    let navigate = useNavigate()
    const [form] = useForm() //用于重置表格
    const {openKeys,selectedKeys,changeOpen,changeSelect} = useMenu()
    const {add,isLoading:addIsLoading} = useAddArticle()
    const {update,isLoading:updateIsLoading} = useUpdateArticle()
    const {getArticleDetails,isLoading:getDetailsIsLoading} = useGetArticleById()
    const renderer = new marked.Renderer()

    marked.setOptions({
        renderer:renderer,
        gfm:true,
        pedantic:false,
        sanitize:false,
        breaks:false,
        smartLists:true,
        smartypants:false,
        highlight:function(code){
            return hljs.highlightAuto(code).value
        }
    })
    useDocumentTile('添加文章',false)
    //修改Menu的状态
    useEffect(()=>{
        if(params.id==''){
            changeOpen(['sub1'])
            changeSelect(['2'])
        }
    },[changeOpen,changeSelect])

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
        <Spin tip="Loading..." spinning={addIsLoading||updateIsLoading||getDetailsIsLoading}>
            <Form form={form} onValuesChange={formDataChange} onFinish={params.id==''?addArticle:updateArticle}>
                <Row gutter={24}>
                    <Col span={12}>
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
                        <Row gutter={24}>
                            <Col span={12}>
                                 <Form.Item label="发布时间" name="addTime" rules={[{required:true,message:'请选择发布时间'}]}>
                                    <DatePicker placeholder="请选择日期"/>
                                </Form.Item>
                                <Form.Item>
                                    {params.id==''?
                                    <Button type="primary" htmlType="submit">发布文章</Button>
                                    :<Button type="primary" danger htmlType="submit">修改文章</Button>}
                                </Form.Item>       
                            </Col>
                            <Col span={12}>
                                <ImageUpload/>
                            </Col>
                        </Row>
                                
                    </Col>
                    <Col span={12}>
                        <Tabs defaultActiveKey="1" centered tabPosition="right">
                            <TabPane tab={<span><EditOutlined/>编辑</span>} key="1">
                                <Form.Item name="introduce" rules={[{required:true,message:'请输入文章简介'}]}>
                                    <TextArea style={{resize:"none",height:"190px",borderRadius:"5px"}} placeholder="文章简介" ></TextArea>   
                                </Form.Item>
                            </TabPane>
                            <TabPane tab={<span><FileTextOutlined/>预览</span>} key="2">
                                <Form.Item>
                                    <div className="introduce-html" dangerouslySetInnerHTML={{__html:introducehtml}}></div>
                                </Form.Item>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab={<span><EditOutlined/>编辑</span>} key="1">
                            <Form.Item name="article_content" rules={[{required:true,message:'请输入文章内容'}]}>
                                <TextArea className="markdown-content" rows={25} placeholder="文章内容"/>
                            </Form.Item> 
                        </TabPane>
                        <TabPane tab={<span><FileTextOutlined/>预览</span>} key="2">
                            <Form.Item>
                                <div className="show-html" dangerouslySetInnerHTML={{__html:markdownContent}}></div>
                            </Form.Item>   
                        </TabPane>        
                    </Tabs>           
            </Form>
        </Spin>
        
    )
}
export default AddArticle