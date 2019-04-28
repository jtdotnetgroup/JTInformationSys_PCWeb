const columns = [
  { title: '员工编号', dataIndex: 'empcode' },
  { title: '姓名', dataIndex: 'name' },
  { title: '在职状态', dataIndex: 'status' },
  { title: '性别', dataIndex: 'sex' },
  { title: '公司', dataIndex: 'companyName' },
  { title: '部门', dataIndex: 'depart' },
  { title: '是否系统用户', dataIndex: 'isSysUser', scopedSlots: { customRender: 'isSysUser' } },
  { title: '角色', dataIndex: 'roles', scopedSlots: { customRender: 'roles' } },
  { title: '备注', dataIndex: 'note' }
]

export default columns
