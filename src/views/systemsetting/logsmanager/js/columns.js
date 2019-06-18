const columns = [

  { title: '详情',
    width: 150,
    align: 'center',
    dataIndex: 'id',
    scopedSlots: { customRender: 'id' }
  },
  { title: '进程类',
    width: 350,
    align: 'center',
    dataIndex: 'serviceName',
    scopedSlots: { customRender: 'serviceName' }
  },
  { title: '方法名', width: 200, align: 'center', dataIndex: 'methodName' },
  // { title: '参数', width: 100, align: 'center', dataIndex: 'parameters' },
  { title: '异常时间', width: 150, align: 'center', dataIndex: 'executionTime' },
  // { title: '异常报告', width: 150, align: 'center', dataIndex: 'exception' },
  { title: '请求耗时', width: 150, align: 'center', dataIndex: 'executionDuration' },
  { title: '请求地址', width: 150, align: 'center', dataIndex: 'clientIpAddress' }
  // { title: '是否系统用户', width: 100, align: 'center', dataIndex: 'fSystemUser', scopedSlots: { customRender: 'fSystemUser' } },
  // { title: '角色', width: 150, align: 'center', dataIndex: 'rolename' },
  // { title: '备注', width: 80, align: 'center', dataIndex: 'remark' }
]

export default columns
