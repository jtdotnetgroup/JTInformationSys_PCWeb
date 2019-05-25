const columns = [
  { title: '员工编号', dataIndex: 'fMpno' },
  { title: '姓名', dataIndex: 'fName' },
  { title: '在职状态', dataIndex: 'fWorkingState', scopedSlots: { customRender: 'fWorkingState' } },
  { title: '性别', dataIndex: 'fSex', scopedSlots: { customRender: 'fSex' } },
  { title: '公司', dataIndex: 'displayName' },
  { title: '部门', dataIndex: 'fDepartment' },
  { title: '是否系统用户', dataIndex: 'fSystemUser', scopedSlots: { customRender: 'fSystemUser' } },
  { title: '角色', dataIndex: 'roles', scopedSlots: { customRender: 'roles' } },
  { title: '备注', dataIndex: 'Remark' }
]

export default columns
