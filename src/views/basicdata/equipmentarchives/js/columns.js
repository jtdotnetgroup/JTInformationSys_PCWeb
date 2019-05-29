import { GenericColumns } from '@/utils/helper/ColumnsHelper'

export const columns = [
  { title: '序号', dataIndex: 'findex', scopedSlots: { customRender: 'findex' }, width: 80, align: 'center' },
  { title: '工作中心  ', dataIndex: 'workCenter', width: 80, align: 'center' },
  { title: '资源编号', dataIndex: 'fNumber', width: 80, align: 'center' },
  { title: '资源名称', dataIndex: 'fName', width: 80, align: 'center' },
  { title: '资源类型', dataIndex: 'fType', width: 80, align: 'center' },
  { title: '状态', dataIndex: 'fStatus', width: 80, align: 'center' },
  { title: '日标准工作时长', dataIndex: 'fDayWorkHours', scopedSlots: { customRender: 'fDayWorkHours' }, width: 150, align: 'center' },
  { title: '日最大工作时长', dataIndex: 'fMaxWorkHours', scopedSlots: { customRender: 'fMaxWorkHours' }, width: 150, align: 'center' },
  { title: '使用寿命', dataIndex: 'fLift', width: 80, align: 'center' },
  { title: '剩余寿命', dataIndex: 'fResidualLife', width: 80, align: 'center' },
  { title: '备注', dataIndex: 'note', width: 80, align: 'center' }
]

const shiftExample = {
  'fEqiupmentID': 'equipmentID',
  'fEmployeeID': '员工',
  'fShift': '班次',
  'id': 'id',
  'action': '操作'
}

export const columnShift = GenericColumns(shiftExample)
