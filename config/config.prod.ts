/**
 * @description: 正式环境环境变量配置
 */

import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: 'prod',
      UMI_ENV: 'prod',
    },
    // axios接口请求地址
    RequestUrl: 'http://120.132.122.154:5002/workflow',
  },
});
