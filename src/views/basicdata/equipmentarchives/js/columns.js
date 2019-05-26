import { GenericColumns } from '@/utils/helper/ColumnsHelper'

export const columns = [
  { title: '序号', dataIndex: 'findex', scopedSlots: { customRender: 'findex' } },
  { title: '工作中心  ', dataIndex: 'workCenter' },
  { title: '资源编号', dataIndex: 'fNumber' },
  { title: '资源名称', dataIndex: 'fName' },
  { title: '资源类型', dataIndex: 'fType' },
  { title: '状态', dataIndex: 'fStatus' },
  { title: '日标准工作时长', dataIndex: 'fDayWorkHours', scopedSlots: { customRender: 'fDayWorkHours' } },
  { title: '日最大工作时长', dataIndex: 'fMaxWorkHours', scopedSlots: { customRender: 'fMaxWorkHours' } },
  { title: '使用寿命', dataIndex: 'fLift' },
  { title: '剩余寿命', dataIndex: 'fResidualLife' },
  { title: '备注', dataIndex: 'note' }
]

const shiftExample = {
  'equipmentID': 'equipmentID',
  'employeeID': '员工',
  'shiftName': '班次',
  'id': 'id'
}

export const columnShift = GenericColumns(shiftExample)
