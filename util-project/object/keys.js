const exportColumnMap = {
  docId: '文章id',
  createTime: {
    label: '进审时间',
  },
  updateTime: {
    label: '操作时间',
  },
  url: '网址链接',
  title: '标题',
  source: '内容来源账号',
  images: {
    label: '封面图url',
  },
  cpApi: 'cp',
  category: '一级分类',
  subCategory: '二级分类',
  operateStatusLabel: '操作状态/结果',
  lastReason: '原因',
  bizType: '业务来源',
  cType: '内容类型',
  modelTypeLabel: '命中策略',
  lastAuditor: '操作人',
};

console.log(Object.keys(exportColumnMap));
