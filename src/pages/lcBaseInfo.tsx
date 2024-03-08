/**
 * @author: hzt,
 * @updateTime: 2024-03-06
 */

import FlowApi from '@/services/API/flow';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React from 'react';
import styles from './flowBase/index.less';

const lcBaseInfo: React.FC = () => {
  const [modalOpen, handleModalOpen] = React.useState<boolean>(false);
  const [selectedRows, setSelectedRows] = React.useState<any[]>([]);
  const columns: any[] = [
    {
      title: '流程名称',
      dataIndex: 'name',
      valueType: 'textarea',
    },
    {
      title: '操作',
      valueType: 'option',
      render: () => [
        <a
          key="editable"
          onClick={() => {
            handleModalOpen(true);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  return (
    <ProTable
      className={styles.flowBase}
      headerTitle={'流程基本信息'}
      rowKey="key"
      search={{
        labelWidth: 66,
        className: 'search',
        // span: 3.5,
        showHiddenNum: true,
      }}
      toolBarRender={() => [
        <Button
          type="primary"
          key="primary"
          onClick={() => {
            handleModalOpen(true);
          }}
        >
          <PlusOutlined /> 新建
        </Button>,
      ]}
      request={async ({ pageSize, current }) => {
        const res: any = await FlowApi.getFlowList(
          current || 1,
          pageSize || 10,
        );
        console.log('流程结果', res);
        return {
          data: res.rows,
          success: true,
          total: res.totalCount,
        };
      }}
      columns={columns}
      rowSelection={{
        onChange: (_, selectedRows) => {
          setSelectedRows(selectedRows);
        },
      }}
    />
  );
};

export default lcBaseInfo;
