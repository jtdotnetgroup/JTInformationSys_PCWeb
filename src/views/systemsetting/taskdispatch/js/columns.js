const columns = [
  { title: '序号', dataIndex: 'empcode' },
  { title: '任务名称  ', dataIndex: 'name' },
  { title: '任务类型', dataIndex: 'status' },
  { title: '计划方式', dataIndex: 'sex' },
  { title: '创建人', dataIndex: 'companyName' },
  { title: '创建时间', dataIndex: 'depart' },
  { title: '任务描述', dataIndex: 'isSysUser', scopedSlots: { customRender: 'isSysUser' } }

]

export default columns
