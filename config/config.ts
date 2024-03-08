import { defineConfig } from 'umi';
import routes from './routes';
import proxy from './proxy';

export default defineConfig({
  routes,
  npmClient: 'pnpm',
  legacy: {},
  icons: {},
  plugins: [],
  title: '流程管理系统',
  clientLoader: {},
  proxy: proxy['dev'],
  /*全局环境变量配置*/
  define: {
    // axios接口请求地址
    RequestUrl: '/api',
  },
});
