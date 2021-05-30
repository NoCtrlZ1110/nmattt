import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Row, Col } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import './App.css';
import { Footer } from 'antd/lib/layout/layout';
import RSA from './rsa/RSA';
import Elgamal from './elgamal/Elgamal';
import ModuloCaculate from './rsa/Modulo';
import { history } from './history';
import SignRSA from './rsa/Sign';
import SignCheckRSA from './rsa/SignCheck';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const App = () => {
  const location = useLocation();
  useEffect(() => {}, []);

  return (
    <>
      <Header className='header text-white justify-content-between'>
        <Row>
          <Col span={16}>
            <>NHẬP MÔN AN TOÀN THÔNG TIN</>
          </Col>
          <Col span={8} className='text-center'></Col>
        </Row>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>UET</Breadcrumb.Item>
          <Breadcrumb.Item>VNU</Breadcrumb.Item>
          <Breadcrumb.Item>Nguyễn Văn Huy - 18020651</Breadcrumb.Item>
        </Breadcrumb>
        <Layout className='site-layout-background'>
          <Sider className='site-layout-background' width={200}>
            <Menu
              mode='inline'
              defaultSelectedKeys={[location.pathname.replaceAll('/', '')]}
              defaultOpenKeys={[
                location.pathname.replaceAll('/', '').slice(0, -2),
              ]}
              style={{ height: '100%' }}
              onSelect={({ item, key, keyPath, selectedKeys, domEvent }) => {
                history.push('/' + key);
              }}
            >
              <SubMenu key='rsa' icon={<UserOutlined />} title='Hệ mật RSA'>
                <Menu.Item key='rsa-1'>Xây dựng hệ mật RSA</Menu.Item>
                <Menu.Item key='rsa-2'>Tính mũ theo modulo</Menu.Item>
                <Menu.Item key='rsa-3'>Ký văn bản</Menu.Item>
                <Menu.Item key='rsa-4'>Kiểm tra chữ ký</Menu.Item>
              </SubMenu>
              <SubMenu
                key='elgamal'
                icon={<LaptopOutlined />}
                title='Hệ mật ElGamal'
              >
                <Menu.Item key='elgamal-1'>Xây dựng hệ mật Elgamal</Menu.Item>
                <Menu.Item key='elgamal-2'>Mã hóa Elgamal</Menu.Item>
                <Menu.Item key='elgamal-3'>Ký văn bản</Menu.Item>
                <Menu.Item key='elgamal-4'>Kiểm tra chữ ký</Menu.Item>
              </SubMenu>
              <SubMenu
                key='elliptic'
                icon={<NotificationOutlined />}
                title='Hệ mật trên đường cong Elliptic'
              >
                <Menu.Item key='elliptic-1'>Elliptic</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: '30px', marginBottom: 30 }}>
            <Switch>
              <Route exact path='/rsa-1' component={RSA} />
              <Route exact path='/rsa-2' component={ModuloCaculate} />
              <Route exact path='/rsa-3' component={SignRSA} />
              <Route exact path='/rsa-4' component={SignCheckRSA} />
              <Route exact path='/elgamal-1' component={Elgamal} />
              <Route exact path='/elgamal-2' component={Elgamal} />
              <Route exact path='/elgamal-3' component={Elgamal} />
              <Route exact path='/elgamal-4' component={Elgamal} />
              <Route exact path='/elliptic-1' component={Elgamal} />
              <Route path='*' component={DefaultRedirect} />
            </Switch>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center', marginTop: 50 }}>
        [18020651] - Nguyễn Văn Huy
      </Footer>
    </>
  );
};

export default App;

const DefaultRedirect: React.FC = () => {
  useEffect(() => {
    window.location.href = '/rsa-1';
  }, []);
  return <></>;
};
