const columns = [
  { title: '序号', dataIndex: 'empcode' },
  { title: '工作中心  ', dataIndex: 'name' },
  { title: '资源编号', dataIndex: 'status' },
  { title: '资源名称', dataIndex: 'sex' },
  { title: '资源类型', dataIndex: 'companyName' },
  { title: '状态', dataIndex: 'depart' },
  { title: '日标准工作时长', dataIndex: 'isSysUser', scopedSlots: { customRender: 'isSysUser' } },
  { title: '日最大工作时长', dataIndex: 'roles', scopedSlots: { customRender: 'roles' } },
  { title: '使用寿命', dataIndex: 'note' },
  { title: '剩余寿命', dataIndex: 'note' },
  { title: '备注', dataIndex: 'note' }
]

export default columns
