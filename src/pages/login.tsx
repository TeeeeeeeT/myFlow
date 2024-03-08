import { Icon } from 'umi';
import type { TabsProps } from 'antd';
import { Button, Checkbox, ConfigProvider, Form, Input, Tabs } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const LoginPage: React.FC = () => {
  const tabList: TabsProps['items'] = [
    {
      key: '1',
      label: '账号登陆',
      children:
        <Form
          name="basic"
          style={{ width: '20vw' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            name="username"
            rules={[{ required: true, message: '用户名' }]}
          >
            <Input placeholder={'用户名'} prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item<FieldType>
            name="password"
            rules={[{ required: true, message: '密码' }]}
          >
            <Input.Password placeholder={'密码'} prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>自动登陆</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button style={{ width: '20vw' }} type="primary" htmlType="submit">
              登陆
            </Button>
          </Form.Item>
        </Form>,
    }, {
      key: '2',
      label: '手机号登陆',
      children: <div>en</div>,
    },
  ];


  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            itemColor: '#ffffffd9',
          },
          Checkbox: {
            colorText: '#ffffffd9',
          },
        },
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'black',
        height: '100vh',
        flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Icon icon="local:system" width={'3vw'} height={'3vw'} />
          <span style={{ color: '#ffffffd9' }}>项目流程管理系统</span>
        </div>
        <Tabs
          defaultActiveKey="1"
          centered
          items={tabList} />
      </div>
    </ConfigProvider>
  );
};

export default LoginPage;
