
const example = {
  'Id': 'Id',
  'fDate': '日期',
  'fmoBillNo': '任务单号',
  'DisplayName': '车间',
  'fItemID': '产品编码',
  'fItemName': '产品名称',
  'fItemModel': '产品规格',
  'totalPlanAuxQty': '计划数量'
}

const exampleMT = {
  'id': 'id',
  'fDate': '日期',
  'fid': 'fid',
  'fmoBillNo': '任务单号',
  'fmoInterID': '',
  'fBillNo': '派工单号',
  'fBillTime': '派工日期',
  'machine': '设备',
  'fMachineID': 'fMachineID',
  'worker': '',
  'fWorkerID': '员工',
  'fShift': '班次',
  'fCommitAuxQty': '派工数量',
  'fBiller': '计划员'
}

const exampleMX = {
  'id': 'id',
  'fDate': 'fDate',
  'fid': 'fid',
  'fmoBillNo': '任务单号',
  'fmoInterID': '',
  'fBillNo': '派工单号',
  'fBillTime': '派工日期',
  'machine': '设备',
  'fMachineID': 'fMachineID',
  'worker': '',
  'fWorkerID': '员工',
  'fShift': '班次',
  'fCommitAuxQty': '派工数量',
  'fBiller': '计划员'
}

export const columns = GenericColumns(example)
export const columnsMT = GenericColumns(exampleMT)
export const columnsMX = GenericColumns(exampleMX)

columns.push(
  {
    title: '序号',
    key: 'index',
    scopedSlots: { customRender: 'serial' },
    width: 60,
    align: 'center'
  }
)

// const keys = Object.keys(example)
// console.log(example)
// keys.forEach(key => {
//   if (example[key].match(/[\u4e00-\u9fa5]*/)[0].length !== 0) {
//     var col = {
//       title: example[key],
//       dataIndex: key,
//       key: key,
//       align: 'center',
//       width: 130
//     }

//     // if (editColumns.includes(key)) {
//     //   col.scopedSlots = { customRender: key }
//     // }

//     columns.push(col)
//   }
// })

function GenericColumns (data) {
  const result = []
  const keys = Object.keys(data)
  keys.forEach(key => {
    if (data[key].match(/[\u4e00-\u9fa5]*/)[0].length !== 0) {
      var col = {
        title: data[key],
        dataIndex: key,
        key: key,
        align: 'center',
        width: 130,
        scopedSlots: { customRender: key }
      }

      // if (editColumns.includes(key)) {
      //   col.scopedSlots = { customRender: key }
      // }

      result.push(col)
    }
  })
  return result
}
