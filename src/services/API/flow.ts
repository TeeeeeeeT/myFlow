import requestInstance from '@/services/services';

/** 获取流程数据 GET */
function getFlowList(pageNum: number, pageSize: number) {
  return requestInstance({
    url: '/SchemeInfo/GetPageList',
    params: {
      PageIndex: pageNum,
      PageSize: pageSize,
    },
  });
}

export default {
  getFlowList,
};
