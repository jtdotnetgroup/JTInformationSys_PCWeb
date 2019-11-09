export function GenericColumns (data) {
  const result = []
  const keys = Object.keys(data)
  keys.forEach(key => {
    const title = data[key].title || data[key] || ''

    if (title !== '' && title.match(/[\u4e00-\u9fa5]*/)[0].length !== 0) {
      var col = {
        title: title,
        dataIndex: key,
        key: key,
        align: 'center',
        width: data[key].width || 120,
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
