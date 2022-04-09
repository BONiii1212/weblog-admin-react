import { Layout, Menu} from 'antd';
import {PieChartOutlined, DesktopOutlined,UserOutlined,TeamOutlined,FileOutlined} from '@ant-design/icons'
import { useMemo, useState } from 'react';
import '../static/css/AdminIndex.css'
import AddArticle from './AddArticle';
import {Route,Routes,Link} from "react-router-dom"
import ArticleList from './ArticleList';
import Visualization from './Visualization';
import { useMenu } from '../context/menu-context';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminIndex = function(){
    const {openKeys,selectedKeys,changeOpen,changeSelect} = useMenu()
    const [collapsed,setCollapsed] = useState()

    const onCollapse = (collapsed)=>{
        setCollapsed(collapsed)
    }
    return(
        <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" onOpenChange={(value)=>changeOpen(value)} onSelect={(obj)=>changeSelect(obj.selectedKeys)} openKeys={openKeys} selectedKeys={selectedKeys} mode="inline">
            <Menu.Item key="1">
              <PieChartOutlined /><span><Link to={"/index"}></Link>数据可视化</span>
            </Menu.Item>
            <SubMenu key="sub1" title={<span><UserOutlined /><span>文章管理</span></span>}>
              <Menu.Item key="2"><Link to={"add"}>添加文章</Link></Menu.Item>
              <Menu.Item key="3"><Link to={"list"}>文章列表</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="4"><FileOutlined /><span>留言管理</span></Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <div>
                <Routes>
                  <Route index element={<Visualization />} />
                  <Route path={"/add"} element={<AddArticle/>}/>
                  <Route path={"/add/:id"} element={<AddArticle/>}/>
                  <Route path={"/list"} element={<ArticleList/>}/>
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