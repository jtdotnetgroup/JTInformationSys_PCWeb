
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
  'worker': '员工',
  'fShift': '班次',
  'fCommitAuxQty': '派工数量',
  'fBiller': '计划员'
}

export const columns = GenericColumns(example)
export const columnsMT = GenericColumns(exampleMT)
columns.push(
  {
    title: '序号',
    key: 'index',
    scopedSlots: { customRender: 'serial' },
    width: 30
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

const result = {

  columns: [
    {
      title: '序号',
      key: 'index',
      scopedSlots: { customRender: 'serial' }
    },
    {
      title: '日期',
      width: 180,
      dataIndex: '日期'
    }, {
      title: '计划单号',
      width: 180,
      dataIndex: '计划单号'
    }, {
      title: '车间',
      width: 180,
      dataIndex: '车间'
    }, {
      title: '任务单号',
      width: 180,
      dataIndex: '任务单号'
    },
    {
      width: 180,
      title: '产品编码',
      dataIndex: '产品编码'
    }, {
      width: 180,
      title: '产品名称',
      dataIndex: '产品名称'
    },
    {
      width: 180,
      title: '规格型号',
      dataIndex: '规格型号'
    },
    {
      width: 180,
      title: '计划生产',
      dataIndex: '计划数量'
    }, {
      width: 180,
      title: '汇报数量',
      dataIndex: '完成数量'
    },
    {
      width: 180,
      title: '合格入库',
      dataIndex: '合格入库'
    },
    {
      width: 180,
      title: '计划开工日期',
      dataIndex: '计划开工日期'
    }, {
      width: 180,
      title: '计划完工日期',
      dataIndex: '计划完工日期'
    }],

  columnsMX: [{
    title: '序号',
    dataIndex: 'namea'
  }, {
    title: '机台',
    dataIndex: 'nameb'
  }, {
    title: '班组',
    dataIndex: 'namec'
  }, {
    title: '操作员',
    dataIndex: 'named'
  }, {
    title: '派工数量',
    dataIndex: 'namee'
  }, {
    title: '完成数量',
    dataIndex: 'namef'
  }, {
    title: '合格数量',
    dataIndex: 'nameg'
  }, {
    title: '备注',
    dataIndex: 'nameh'
  }],

  columnsMT: [
    // {
    //   title: '序号',
    //   width: 100,
    //   dataIndex: 'index',
    //   scopedSlots: { customRender: 'serial' }
    // },
    {
      key: '日期',
      title: '日期',
      width: 100,
      dataIndex: '日期'
    },
    {
      key: '设备',
      width: 100,
      title: '机台/设备',
      dataIndex: '设备',
      scopedSlots: { customRender: '设备' }
    },
    {
      key: '操作员',
      width: 100,
      title: '操作员',
      dataIndex: '操作员',
      scopedSlots: { customRender: '操作员' }
    },
    {
      key: '班次',
      width: 100,
      title: '班次',
      dataIndex: '班次',
      scopedSlots: { customRender: '班次' }
    },
    {
      key: '派工数量',
      width: 100,
      title: '派工数量',
      dataIndex: '派工数量',
      scopedSlots: { customRender: '派工数量' }
    },
    {
      key: '派工单号',
      width: 100,
      title: '派工单号',
      dataIndex: 'fmoBillNo'
    },
    {
      key: '派单时间',
      width: 100,
      title: '派单时间',
      dataIndex: '派单时间'
    },
    {
      key: '计划员',
      width: 100,
      title: '计划员',
      dataIndex: '计划员'
    }, {
      key: '备注',
      width: 100,
      title: '备注',
      dataIndex: '备注'
    },
    //, {
    //   // colSpan: 0,
    //   key: 'fSrcID',
    //   width: 100,
    //   title: 'fSrcID',
    //   dataIndex: 'fSrcID'
    // },
    // {
    //   // colSpan: 0,
    //   key: 'fmoInterID',
    //   width: 100,
    //   title: 'fmoInterID',
    //   dataIndex: 'fmoInterID'
    // },
    {
      key: '1',
      width: 100,
      title: '操作',
      dataIndex: 'operation',
      scopedSlots: { customRender: 'operation' }
    }]

}

export default result
