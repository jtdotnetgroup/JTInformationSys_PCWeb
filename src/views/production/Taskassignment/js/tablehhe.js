const dataExample = {
//   '序号': 1,
  '日期': '2019-05-11T03:04:27.783',
  'fSrcID': '09e6ffc9-a2e2-4f5d-9a34-a842b26385a7',
  'fmoBillNo': 'WORK000245',
  'fmoInterID': 1612,
  'id': null,
  '合格数量': 0,
  '完成数量': 0,
  '操作员': '',
  '机台': 1,
  '派工数量': 0,
  '班组': 1,
  '计划数量': 10356
}

export const editColumns = [

  '序号'
]

const keys = Object.keys(dataExample)
export const columns = []
keys.forEach(key => {
  if (key.match(/[\u4e00-\u9fa5]*/)[0].length !== 0) {
    var col = {
      title: key,
      dataIndex: key,
      key: key,
      width: 60,
      align: 'center'
    }

    // if (editColumns.includes(key)) {
    //   col.scopedSlots = { customRender: key }
    // }

    columns.push(col)
  }
})
