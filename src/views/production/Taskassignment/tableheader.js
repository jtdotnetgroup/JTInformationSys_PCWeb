const result = {
  // eslint-disable-next-line no-sparse-arrays

  columns: [{
    title: '序号',
    dataIndex: 'FEntryID',
    width: 200,
    key: 'FEntryID'
  }, {
    title: '日期',
    dataIndex: 'FDate',
    width: 200,
    key: 'FDate'
  }, {
    title: '计划单号',
    dataIndex: 'FBillNo',
    width: 200,
    key: 'FBillNo'
  }, {
    title: '任务单号',
    dataIndex: 'FMOBillNo',
    width: 200,
    key: 'FMOBillNo'
  }, {
    title: '车间',
    width: 200,
    dataIndex: 'FWorkCenterID',
    key: 'FWorkCenterID'
  },
  // {
  //   title: '产品代码',
  //   width: 200,
  //   dataIndex: 'name6',
  //   key: 'name6'
  // }, {
  //   title: '产品名称',
  //   width: 200,
  //   dataIndex: 'name7',
  //   key: 'name7'
  // },
  // {
  //   title: '规格型号',
  //   width: 200,
  //   dataIndex: 'name8',
  //   key: 'name8'
  // },
  {
    title: '计划生产',
    width: 200,
    dataIndex: 'FPlanAuxQty',
    key: 'FPlanAuxQty'
  }, {
    title: '实际完成',
    width: 200,
    dataIndex: 'FFinishAuxQty',
    key: 'FFinishAuxQty'
  }, {
    title: '合格入库',
    width: 200,
    dataIndex: 'FPassAuxQty',
    key: 'FPassAuxQty'
  }
  ],

  columnsMX: [{
    title: '序号',
    dataIndex: 'namea',
    key: 'namea'

  }, {
    title: '机台',
    dataIndex: 'nameb',
    key: 'nameb'

  }, {
    title: '班组',
    dataIndex: 'namec',
    key: 'namec'

  }, {
    title: '操作员',
    dataIndex: 'named',
    key: 'named'

  }, {
    title: '派工数量',
    dataIndex: 'namee',
    key: 'namee'

  }, {
    title: '完成数量',
    dataIndex: 'namef',
    key: 'namef'

  }, {
    title: '合格数量',
    dataIndex: 'nameg',
    key: 'nameg'

  }, {
    title: '备注',
    dataIndex: 'nameh',
    key: 'nameh'

  }],

  dataSourceMX: [{
    key: '1',
    namea: '胡彦斌',
    nameb: 32,
    namec: '西湖区湖底公园1号',
    named: 32,
    namee: '西湖区湖底公园1号',
    namef: 32,
    nameg: '西湖区湖底公园1号',
    nameh: '西湖区湖底公园1号'
  },
  {
    key: '1',
    namea: '胡彦斌',
    nameb: 32,
    namec: '西湖区湖底公园1号',
    named: 32,
    namee: '西湖区湖底公园1号',
    namef: 32,
    nameg: '西湖区湖底公园1号',
    nameh: '西湖区湖底公园1号'
  },
  {
    key: '1',
    namea: '胡彦斌',
    nameb: 32,
    namec: '西湖区湖底公园1号',
    named: 32,
    namee: '西湖区湖底公园1号',
    namef: 32,
    nameg: '西湖区湖底公园1号',
    nameh: '西湖区湖底公园1号'
  }
  ],

  columnsMT: [{
    title: '序号',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: '日期',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '机台/设备',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '操作员',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '派工数量',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '派工单号',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '派单时间',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: '计划员',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: '备注',
    dataIndex: 'name',
    key: 'name'
  }]

}

export default result
