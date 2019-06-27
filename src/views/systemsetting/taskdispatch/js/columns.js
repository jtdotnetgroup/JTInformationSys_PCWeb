const columns = [
  { title: '序号', dataIndex: 'XH' },
  { title: '任务编码', dataIndex: 'taskCode' },
  { title: '任务名称  ', dataIndex: 'taskName' },
  { title: '任务类型', dataIndex: 'taskType' },
  { title: '任务状态', dataIndex: 'taskState' },
  { title: '任务描述', dataIndex: 'taskBz', scopedSlots: { customRender: 'isSysUser' } },
  { title: '任务Corn', dataIndex: 'taskCorn' },
  { title: '创建人', dataIndex: 'lastSyncUserId' },
  { title: '创建时间', dataIndex: 'lastSyncTime' }
]
export default columns
