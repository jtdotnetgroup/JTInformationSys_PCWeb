const columns = [
  { title: '序号', dataIndex: 'empcode' },
  { title: '产品编码  ', dataIndex: 'name' },
  { title: '产品名称', dataIndex: 'status' },
  { title: '规格型号', dataIndex: 'sex' },
  { title: '工序', dataIndex: 'companyName' },
  { title: '单位', dataIndex: 'depart' },
  { title: '副资源', dataIndex: 'isSysUser', scopedSlots: { customRender: 'isSysUser' } },
  { title: '时间单位', dataIndex: 'roles', scopedSlots: { customRender: 'roles' } },
  { title: '准备时间', dataIndex: 'notedd' },
  { title: '节拍', dataIndex: 'notes' },
  { title: '成品率', dataIndex: 'notew' },
  { title: '备注', dataIndex: 'notesb' }
]

export default columns
