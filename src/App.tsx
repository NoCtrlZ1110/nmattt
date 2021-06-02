import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Row } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import './App.css';
import RSA from './rsa/RSA';
import Elgamal from './elgamal/Elgamal';
import ModuloCaculate from './rsa/Modulo';
import SignRSA from './rsa/SignRSA';
import SignCheckRSA from './rsa/SignRSACheck';
import EncryptElgamal from './elgamal/EncryptElgamal';
import SignElgama from './elgamal/SignElgamal';
import SignCheckElgamal from './elgamal/SignElgamalCheck';
import Elliptic from './elliptic/Elliptic';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const App = () => {
  const location = useLocation();
  return (
    <>
      <Header className='header text-white justify-content-between'>
        <Row>
          <div className='mr-auto'>
            <>NHẬP MÔN AN TOÀN THÔNG TIN</>
          </div>
          <a
            className='text-white'
            href='https://github.com/NoCtrlZ1110/nmattt/'
          >
            Github / Source code
          </a>
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
              defaultSelectedKeys={[location.pathname.split('/')[1] || 'rsa-1']}
              defaultOpenKeys={[
                // location.pathname.split('/')[1]?.slice(0, -2) || 'rsa',
                'rsa',
                'elgamal',
                'elliptic',
              ]}
              style={{ height: '100%' }}
              onSelect={({ key }) => {
                window.location.href = '/#/' + key;
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
              <Route path='/rsa-1' component={RSA} />
              <Route path='/rsa-2' component={ModuloCaculate} />
              <Route path='/rsa-3' component={SignRSA} />
              <Route path='/rsa-4' component={SignCheckRSA} />
              <Route path='/elgamal-1' component={Elgamal} />
              <Route path='/elgamal-2' component={EncryptElgamal} />
              <Route path='/elgamal-3' component={SignElgama} />
              <Route path='/elgamal-4' component={SignCheckElgamal} />
              <Route path='/elliptic-1' component={Elliptic} />
              <Route path='*' component={DefaultRedirect} />
            </Switch>
          </Content>
        </Layout>
      </Content>
      {/* <Footer style={{ textAlign: 'center', marginTop: 50 }}>
        [18020651] - Nguyễn Văn Huy
      </Footer> */}
    </>
  );
};

export default App;

const DefaultRedirect: React.FC = () => {
  useEffect(() => {
    window.location.href = '/#/rsa-1';
  }, []);
  return <></>;
};
