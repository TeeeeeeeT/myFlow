import axios from 'axios';

// 创建一个axios实例
const service = axios.create({
  // @ts-ignore
  baseURL: RequestUrl, // url = base url + request url
  timeout: 1000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  config.headers['Authorization'] =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6InN5c3RlbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiLnrqHnkIblkZgiLCJlbWFpbCI6IiIsInN1YiI6InN5c3RlbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IiIsIm5iZiI6MTcwOTgwMjY5NywiZXhwIjoxNzEwMTYyNjk3LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAifQ.2F20OmX5mdncG8I-oUTOXfFW2mHQ1WQ1QtpEb4ltPkI';
  return config;
});

// 响应拦截器
service.interceptors.response.use((response) => {
  // 对响应数据做点什么
  if (response.status === 200) {
    console.log('response.data', response.data);
    return response.data.data;
  } else {
    // 全局错误信息处理
    return Promise.reject(response.data);
  }
});

export default service;
