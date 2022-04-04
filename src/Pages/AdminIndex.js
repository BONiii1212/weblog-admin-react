import { Layout, Menu, Breadcrumb} from 'antd';
import {PieChartOutlined, DesktopOutlined,UserOutlined,TeamOutlined,FileOutlined} from '@ant-design/icons'
import { useState } from 'react';
import '../static/css/AdminIndex.css'
import AddArticle from './AddArticle';
import {Route,Routes} from "react-router-dom"

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


const AdminIndex = function(){
    const [collapsed,setCollapsed] = useState()

    const onCollapse = (collapsed)=>{
        setCollapsed(collapsed)
    }

    return(
        <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <PieChartOutlined />
              <span>工作台</span>
            </Menu.Item>
            <Menu.Item key="2">
                <DesktopOutlined />
              <span>添加文章</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <UserOutlined />
                  <span>文章管理</span>
                </span>
              }
            >
              <Menu.Item key="3">添加文章</Menu.Item>
              <Menu.Item key="4">文章列表</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
                <FileOutlined />
              <span>留言管理</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
              <Breadcrumb.Item>工作台</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <div>
                <Routes>
                  <Route index element={<AddArticle />} />
                </Routes>
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}></Footer>
        </Layout>
      </Layout>
    )
}
export default AdminIndex