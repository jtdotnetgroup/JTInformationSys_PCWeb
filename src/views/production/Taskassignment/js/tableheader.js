
const result = {

  columns: [
    {
      title: '序号',
      width: 80,
      name: 'indexname',
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
      dataIndex: '计划生产数量'
    }, {
      width: 180,
      title: '汇报数量',
      dataIndex: '汇报数量'
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
    {
      title: '序号',
      width: 80,
      dataIndex: 'index',
      scopedSlots: { customRender: 'serial' }
    }, {
      title: '日期',
      width: 120,
      dataIndex: '日期'
    },
    {
      width: 120,
      title: '机台/设备',
      dataIndex: '机台/设备',
      scopedSlots: { customRender: '机台/设备' }
    },
    {
      width: 120,
      title: '操作员',
      dataIndex: '操作员',
      scopedSlots: { customRender: '操作员' }
    },
    {
      width: 120,
      title: '班次',
      dataIndex: '班次',
      scopedSlots: { customRender: '班次' }
    },
    {
      width: 120,
      title: '派工数量',
      dataIndex: '派工数量',
      scopedSlots: { customRender: '派工数量' }
    },
    {
      width: 120,
      title: '派工单号',
      dataIndex: '派工单号'
    },
    {
      width: 120,
      title: '派单时间',
      dataIndex: '派单时间'
    },
    {
      width: 120,
      title: '计划员',
      dataIndex: '计划员'
    }, {
      width: 120,
      title: '备注',
      dataIndex: '备注'
    }, {
      width: 120,
      title: '操作',
      dataIndex: 'operation',
      scopedSlots: { customRender: 'operation' }
    }]

}

export default result
