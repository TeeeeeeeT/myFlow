import requestInstance from '@/services/services';

/** 获取部门数据 GET */
function getDept(pageNum: number, pageSize: number) {
  return requestInstance({
    url: '/Department/GetPageList',
    params: {
      PageIndex: pageNum,
      PageSize: pageSize,
    },
  });
}

export default {
  getDept,
};
