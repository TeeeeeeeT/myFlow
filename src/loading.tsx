/**
 * @author: hzt,
 * @name: 全局加载组件，
 * @updateTime: 2024-02-29
 */

import React from 'react';

const loading: React.FC = () => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '24px',
        }}
      >
        Loading...
      </div>
    </div>
  );
};

export default loading;
