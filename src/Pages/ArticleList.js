import React,{useState,useEffect} from "react";
import { Modal, message,Button, Table} from "antd";
import '../static/css/ArticleList.css'
import {useNavigate} from "react-router-dom";
import Column from "antd/lib/table/Column";
import { useDelArticle, useGetArticleList } from "../utils/article";

const { confirm } = Modal;

const ArticleList = () => {

    const [list,setList]=useState([])
    let navigate = useNavigate()
    const {getList} = useGetArticleList()
    const {del} = useDelArticle()

    useEffect(()=>{
        getList().then(res=>setList(res))
    },[])

    const delArticle = (id)=>{
        confirm({
            title: '确定要删除这篇博客文章吗?',
            content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
            onOk() {
                del(id).then(res=>{ message.success('文章删除成功');
                getList().then(res=>setList(res))})
            },
            onCancel() {
                message.success('没有任何改变')
            },
         });
    }

    const updateArticle = (id,checked)=>{
        navigate(`/index/add?id=${id}`);
    }
    
    return (
        <Table dataSource={list} rowKey={"id"}>
            <Column title="标题" dataIndex="title" key="title"/>
            <Column title="类别" dataIndex="typeName" key="typeName"/>
            <Column title="发布时间" dataIndex="addTime" key="addTime"/>
            <Column title="操作" key="action" 
                //当前行的值，数据和索引
                render={(value,record,index)=>(
                    <div>
                        <Button type="primary" onClick={()=>updateArticle(record.id)} style={{marginRight:"10px"}}>修改</Button>
                        <Button type="primary" danger onClick={()=>delArticle(record.id)}>删除 </Button>
                    </div>    
                )}
            />
        </Table>
    )
}

export default ArticleList