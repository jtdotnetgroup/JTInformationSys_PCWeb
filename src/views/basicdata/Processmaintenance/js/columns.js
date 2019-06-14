const columns = [
  // { title: '产品', width: 180, align: 'center', dataIndex: 'fItemName' },
  { title: '工序', width: 50, align: 'center', dataIndex: 'fOperName' },
  { title: '不良项目代码', width: 80, align: 'center', dataIndex: 'fNumber' },
  { title: '不良项目名称', width: 100, align: 'center', dataIndex: 'fName' },
  { title: '禁用状态', width: 60, align: 'center', dataIndex: 'fDeleted', scopedSlots: { customRender: 'fDeleted' } },
  // { title: '是否合格', width: 100, align: 'center', dataIndex: 'fDeleted' },
  { title: '说明', width: 100, align: 'center', dataIndex: 'fRemark' }
]

export default columns
