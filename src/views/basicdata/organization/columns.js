const columns = [
  { title: '员工编号', width: 100, align: 'center', dataIndex: 'fMpno' },
  { title: '姓名', width: 80, align: 'center', dataIndex: 'fName' },
  { title: '在职状态', width: 80, align: 'center', dataIndex: 'fWorkingState', scopedSlots: { customRender: 'fWorkingState' } },
  { title: '性别', width: 80, align: 'center', dataIndex: 'fSex', scopedSlots: { customRender: 'fSex' } },
  { title: '公司', width: 150, align: 'center', dataIndex: 'fatherName' },
  { title: '部门', width: 100, align: 'center', dataIndex: 'zsonName' },
  { title: '是否系统用户', width: 100, align: 'center', dataIndex: 'fSystemUser', scopedSlots: { customRender: 'fSystemUser' } },
  { title: '角色', width: 150, align: 'center', dataIndex: 'rolename' },
  { title: '备注', width: 80, align: 'center', dataIndex: 'remark' }
]

export default columns
