const columns = [
  { title: '员工编号', dataIndex: 'fMpno' },
  { title: '姓名', dataIndex: 'fName' },
  { title: '在职状态', dataIndex: 'fWorkingState', scopedSlots: { customRender: 'fWorkingState' } },
  { title: '性别', dataIndex: 'fSex', scopedSlots: { customRender: 'fSex' } },
  { title: '公司', dataIndex: 'fatherName' },
  { title: '部门', dataIndex: 'zsonName' },
  { title: '是否系统用户', dataIndex: 'fSystemUser', scopedSlots: { customRender: 'fSystemUser' } },
  { title: '角色', dataIndex: 'rolename' },
  { title: '备注', dataIndex: 'remark' }
]

export default columns
