const dataExample = {
  'fSrcID': '09fb6f88-b297-4cf1-9554-2e5d16699213',
  '日期': '2019-05-10T00:00:00',
  '机台': 2,
  '班组': 1,
  '操作员': '',
  '派工数量': 0,
  '完成数量': 0,
  '合格数量': 0,
  'fmoBillNo': 'WORK000260',
  'fmoInterID': 1653,
  '计划数量': 32,
  'id': null
}

const keys = Object.keys(dataExample)
const columns = []

keys.forEach(key => {
  if (key.match(/[\u4e00-\u9fa5]*/)[0].length !== 0) {
    var col = {
      title: key,
      dataIndex: key,
      align: 'center',
      key: key
    }

    columns.push(col)
  }
})

export default columns
