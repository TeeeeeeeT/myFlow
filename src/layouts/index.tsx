import React, { useEffect, useState } from 'react';
import { history, Icon, Outlet, useLocation, useSelectedRoutes } from 'umi';
import styles from './index.less';
import type { MenuProps } from 'antd';
import { Avatar, Badge, Breadcrumb, Flex, Layout, Menu } from 'antd';
import GlobalRoutes from '../../config/routes';
import {
  ApartmentOutlined,
  AppstoreOutlined,
  BankOutlined,
  LeftCircleOutlined,
  NodeIndexOutlined,
  RightCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

type breadcrumbItem = {
  title?: string;
}
const iconList = [
  <BankOutlined />,
  <AppstoreOutlined />,
  <ApartmentOutlined />,
  <NodeIndexOutlined />,
];
// 从获取的路由配置生成菜单,只需要维护一个地方即可
const menuList: MenuItem[] = [];
const list = GlobalRoutes[0].routes || [];
const deepGenerateMenu = (item: any[]): any => {
  const resList: MenuItem[] = [];
  for (let i = 0; i < item.length; i++) {
    item[i].routes ?
      resList.push(
        getItem(item[i].custom_key, item[i].path, null, deepGenerateMenu(item[i].routes)),
      ) :
      resList.push(
        getItem(item[i].custom_key, item[i].path, null),
      );
  }
  return resList;
};
list.forEach((item: any, index) => {
  item.routes ?
    menuList.push(
      getItem(item.custom_key, item.path, iconList[index], deepGenerateMenu(item.routes)),
    ) :
    menuList.push(
      getItem(item.custom_key, item.path, null),
    );
});
console.log('menuList', menuList);

const { Content, Sider } = Layout;

export default function RootLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [breadcrumbList, setBreadcrumbList] = useState([] as breadcrumbItem[]);
  const routes = useSelectedRoutes();
  const location = useLocation();
  // 菜单选中处理事件
  const menuSelect = (item: any) => {
    console.log('item', item);
    // 从items中找到对应的item，把其label作为title


    history.push(item.key);
  };
  useEffect(() => {
    let list: any[] = [];
    // 对路由进行处理
    for (let i = 0; i < routes.length; i++) {
      const item: any = routes[i];
      if (item.route['custom_key']) {
        list.push({ title: item.route['custom_key'] });
        setBreadcrumbList(list);
      }
    }
  }, [location.pathname]);

  return (
    <div className={styles.navs}>
      {/*公共头部*/}
      <Flex justify={'space-between'} align={'center'}
            style={{ height: '40px', padding: '10px 20px 0', background: '#1f1f1f99', color: 'white' }}>
        <Flex align={'center'}>
          <Icon icon="local:system" style={{ display: 'flex', alignItems: 'center' }} width={'3vw'}
                height={'3vw'} />
          <span style={{ fontSize: '2vh', color: '#ffffffd9' }}>项目流程管理系统</span>
        </Flex>
        <div>
          <Badge count={1}>
            <Avatar shape="square" icon={<UserOutlined />} />
          </Badge>
          <span style={{ marginLeft: '10px' }}>TE</span>
        </div>
      </Flex>
      <Layout style={{ minHeight: 'calc(100vh - 50px)' }}>
        {/*左边导航栏*/}
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div onClick={() => setCollapsed(!collapsed)} className={styles['collapse-btn']}>
            {collapsed ? <LeftCircleOutlined className={styles.icon} /> :
              <RightCircleOutlined className={styles.icon} />}
          </div>
          <Menu theme="dark"
                defaultSelectedKeys={['/xt/rz']}
                selectedKeys={[location.pathname]}
                defaultOpenKeys={['/xt/rz']}
                mode="inline"
                items={menuList}
                onSelect={menuSelect} />
        </Sider>
        <Layout style={{ padding: '12px 18px' }}>
          <Breadcrumb style={{ marginBottom: '14px' }} items={breadcrumbList}>
          </Breadcrumb>
          <Content>
            {/*组件渲染区域*/}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
