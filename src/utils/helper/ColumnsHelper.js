export function GenericColumns (data) {
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
