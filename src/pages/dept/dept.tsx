/**
 * @author: hzt,
 * @updateTime: 2024-03-04
 */

import React, { useState } from 'react';
import { Button, ConfigProvider, Flex, Input, Tree, TreeDataNode } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useClientLoaderData } from 'umi';
import ORGAPI from '@/services/API/zzjg';
import styles from './dept.less';


const { Search } = Input;
const getParentKey = (key: React.Key, tree: TreeDataNode[]): React.Key => {
  let parentKey: React.Key;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey!;
};

const App: React.FC = () => {
  const { data } = useClientLoaderData();
  const treeData: TreeDataNode[] = [];
  for (let i = 0; i < data?.rows.length; i++) {
    const item = data.rows[i];
    treeData.push({
      title: <Flex justify={'space-between'} align={'center'}>
        <span>{item.fullName}</span>
        <div>
          <Button size={'small'} type={'primary'} className={styles.btn}>新增</Button>
          <Button size={'small'} type={'primary'} className={styles.btn}>编辑</Button>
          <Button size={'small'} type={'primary'} danger>删除</Button>
        </div>
      </Flex>,
      key: item.id,
      children: item.children,
    });
  }
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const { value } = e.target;
    // const newExpandedKeys = dataList
    // .map((item) => {
    //   if (item.title.indexOf(value) > -1) {
    //     return getParentKey(item.key, defaultData);
    //   }
    //   return null;
    // })
    // .filter((item, i, self): item is React.Key => !!(item && self.indexOf(item) === i));
    // setExpandedKeys(newExpandedKeys);
    // setSearchValue(value);
    // setAutoExpandParent(true);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Tree: {
            titleHeight: 38,
          },
        },
      }}
    >
      <Search style={{ marginBottom: 8 }} placeholder="请输入部门名称" onChange={onChange} />
      <Button type={'primary'} className={styles['top-btn']}>新增</Button>
      <Tree
        blockNode
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={treeData}
        showLine
        switcherIcon={<DownOutlined />}
      />
    </ConfigProvider>
  );
};
export default App;

export async function clientLoader() {
  const data = await ORGAPI.getDept(1, 5);
  return data;
}
