const columns = [
  { title: '进程类', width: 100, align: 'center', dataIndex: 'serviceName' },
  { title: '方法名', width: 100, align: 'center', dataIndex: 'methodName' },
  { title: '参数', width: 100, align: 'center', dataIndex: 'parameters' },
  { title: '异常时间', width: 100, align: 'center', dataIndex: 'executionTime', scopedSlots: { customRender: 'executionTime' } },
  { title: '异常报告', width: 150, align: 'center', dataIndex: 'exception' }
  // { title: '部门', width: 100, align: 'center', dataIndex: 'zsonName' },
  // { title: '是否系统用户', width: 100, align: 'center', dataIndex: 'fSystemUser', scopedSlots: { customRender: 'fSystemUser' } },
  // { title: '角色', width: 150, align: 'center', dataIndex: 'rolename' },
  // { title: '备注', width: 80, align: 'center', dataIndex: 'remark' }
]

export default columns
