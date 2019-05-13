const data = {
  '任务单号': 'WORK000245',
  '状态': null,
  '销售订单': '',
  '车间': 'RI车间',
  '产品编码': '03.02.0259',
  '产品名称': '17880-0V230-00',
  '规格型号': '进气管',
  '单位': 'PCS',
  '批号': '',
  '计划生产数量': 10356,
  '入库数量': 0,
  '计划开工日期': '2015-12-01T00:00:00',
  '计划完工日期': '2015-12-23T00:00:00',
  '实际入库': null,
  'fmoInterID': 1612,
  'fStatus': 3,
  'id': 0
}

const keys = Object.keys(data)
const columns = []

keys.forEach(key => {
  columns.push({
    title: key,
    dataIndex: key,
    align: 'center',
    key: key,
    width: 160
  })
})

export default columns
