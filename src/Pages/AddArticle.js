import React,{useState,useEffect} from "react";
import marked from 'marked'
import '../static/css/AddArticle.css'
import {Row,Col,Input,Select,Button,DatePicker} from 'antd'
const {Option} = Select
const {TextArea} = Input

function AddArticle(){
    return(
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input placeholder="博客标题" size="large"/>
                        </Col>
                        <Col span={4}>
                            <Select defaultValue="1" size="large">
                                <Option value="1">文章</Option>
                                <Option value="2">音乐</Option>
                                <Option value="3">杂谈</Option>
                            </Select>
                        </Col>
                    </Row>
                    <br/>
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea className="markdown-content" rows={25} placeholder="文章内容" style={{resize:"none"}}/>
                        </Col>
                        <Col span={12}>
                            <div className="show-html"></div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large" style={{marginRight:"5px"}} >暂存文章</Button>
                            <Button type="primary" size="large" style={{marginRight:"5px"}}>发布文章</Button>
                            <DatePicker placeholder="发布日期" size="large"/>
                        </Col>
                        <Col span={24}>
                            <TextArea rows={4} placeholder="文章简介" style={{marginTop:"22px",resize:"none"}}></TextArea>
                            <div className="introduce-html" style={{display:"none"}}></div>
                        </Col>
                    </Row>
                </Col>

            </Row>
        </div>
    )
}
export default AddArticle