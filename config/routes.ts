/**
 * @name 路由配置
 */

export default [
  {
    path: '/', routes: [
      /*组织架构管理*/
      {
        path: '/zz', custom_key: '组织架构管理', routes: [
          { path: '/zz/bm', component: 'dept/dept', custom_key: '部门管理' },
          { path: '/zz/yh', component: 'dept/dept', custom_key: '用户管理' },
          { path: '/zz/js', component: 'dept/dept', custom_key: '角色管理' },
        ],
      },
      /*流程模版管理*/
      {
        path: '/lc', custom_key: '流程模版管理', routes: [
          { path: '/lc/baseInfo', component: 'lcBaseInfo', custom_key: '流程模版' },
          { path: '/lc/design', component: 'lcBaseInfo', custom_key: '模版设计' },
        ],
      },
    ],
  },
  { path: '/login', component: 'login', layout: false },
  { path: '*', component: '404', custom_key: '404页面' },
];
