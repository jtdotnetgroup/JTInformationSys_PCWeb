const dataExample = {
  'fid': '0b08b65f-40c4-480a-8da4-eff94e7e0bb8',
  '日期': '2015-12-01T00:00:00',
  '机台': 0,
  '班次': 0,
  '操作员': '',
  '计划数量': 123,
  '派工数量': 466,
  '完成数量': 0,
  '合格数量': 0,
  'fmoBillNo': 'WORK000245',
  'fmoInterID': 1612,
  'id': null
}

export const editColumns = [
  '计划数量'
]

const keys = Object.keys(dataExample)
export const columns = []

// columns.push({
//   title: '任务单号',
//   dataIndex: 'fmoBillNo',
//   key: '任务单号',
//   width: 60,
//   align: 'center'
// })

keys.forEach(key => {
  if (key.match(/[\u4e00-\u9fa5]*/)[0].length !== 0) {
    var col = {
      title: key,
      dataIndex: key,
      key: key,
      width: 60,
      align: 'center'
    }

    if (editColumns.includes(key)) {
      col.scopedSlots = { customRender: key }
    }

    columns.push(col)
  }
})
