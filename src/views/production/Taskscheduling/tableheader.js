const result = {
  dataSource: [{
    key: '1',
    name1: '胡彦斌',
    name2: '胡彦祖2',
    name3: '胡彦祖2',
    name4: '胡彦祖2',
    name5: '胡彦祖2',
    name6: '胡彦祖2',
    name7: '胡彦祖2',
    name8: '胡彦祖2',
    name9: '胡彦祖2',
    age9: 38,
    address10: '西湖区湖底公园1号'
  }, {
    key: '2',
    name1: '胡彦斌',
    name2: '胡彦祖2',
    name3: '胡彦祖2',
    name4: '胡彦祖2',
    name5: '胡彦祖2',
    name6: '胡彦祖2',
    name7: '胡彦祖2',
    name8: '胡彦祖2',
    name9: '胡彦祖2',
    age9: 38,
    address10: '西湖区湖底公园1号'
  }, {
    key: '3',
    name1: '胡彦斌',
    name2: '胡彦祖2',
    name3: '胡彦祖2',
    name4: '胡彦祖2',
    name5: '胡彦祖2',
    name6: '胡彦祖2',
    name7: '胡彦祖2',
    name8: '胡彦祖2',
    name9: '胡彦祖2',
    age9: 38,
    address10: '西湖区湖底公园1号'
  }, {
    key: '4',
    name1: '胡彦斌',
    name2: '胡彦祖2',
    name3: '胡彦祖2',
    name4: '胡彦祖2',
    name5: '胡彦祖2',
    name6: '胡彦祖2',
    name7: '胡彦祖2',
    name8: '胡彦祖2',
    name9: '胡彦祖2',
    age9: 38,
    address10: '西湖区湖底公园1号'
  }, {
    key: '5',
    name1: '胡彦斌',
    name2: '胡彦祖2',
    name3: '胡彦祖2',
    name4: '胡彦祖2',
    name5: '胡彦祖2',
    name6: '胡彦祖2',
    name7: '胡彦祖2',
    name8: '胡彦祖2',
    name9: '胡彦祖2',
    age9: 38,
    address10: '西湖区湖底公园1号'
  }, {
    key: '6',
    name1: '胡彦斌',
    name2: '胡彦祖2',
    name3: '胡彦祖2',
    name4: '胡彦祖2',
    name5: '胡彦祖2',
    name6: '胡彦祖2',
    name7: '胡彦祖2',
    name8: '胡彦祖2',
    name9: '胡彦祖2',
    age9: 38,
    address10: '西湖区湖底公园1号'
  }],

  columns: [{
    title: '序号',
    dataIndex: 'name1',
    width: 200,
    key: 'name1'
  }, {
    title: '车间',
    dataIndex: 'name2',
    width: 200,
    key: 'name2'
  }, {
    title: '任务单号',
    dataIndex: 'name3',
    width: 200,
    key: 'name3'
  }, {
    title: '状态',
    dataIndex: 'name4',
    width: 200,
    key: 'name4'
  }, {
    title: '产品代码',
    width: 200,
    dataIndex: 'name5',
    key: 'name5'
  }, {
    title: '产品名称',
    width: 200,
    dataIndex: 'name6',
    key: 'name6'
  }, {
    title: '规格型号',
    width: 200,
    dataIndex: 'name7',
    key: 'name7'
  }, {
    title: '计划完成日期',
    width: 200,
    dataIndex: 'name8',
    key: 'name8'
  }, {
    title: '计划生产',
    width: 200,
    dataIndex: 'age9',
    key: 'age9'
  }, {
    title: '实际入库',
    width: 200,
    dataIndex: 'address10',
    key: 'address10'
  }],

  columnsMX: [{
    title: '汇总',
    dataIndex: 'namea',
    key: 'namea',
    children: [{
      title: '计划',
      dataIndex: 'agea',
      key: 'agea',

      sorter: (a, b) => a.age - b.age
    }, {
      title: '实际',
      dataIndex: 'ageb',
      key: 'ageb',
      sorter: (a, b) => a.age - b.age
    }]
  }, {
    title: '2019-04-26',
    dataIndex: 'nameb',
    key: 'nameb',
    children: [{
      title: '计划',
      dataIndex: 'agec',
      key: 'agec',

      sorter: (a, b) => a.age - b.age
    }, {
      title: '实际',
      dataIndex: 'aged',
      key: 'aged',
      sorter: (a, b) => a.age - b.age
    }]
  }, {
    title: '2019-04-26',
    dataIndex: 'namec',
    key: 'namec',
    children: [{
      title: '计划',
      dataIndex: 'ageq',
      key: 'ageq',

      sorter: (a, b) => a.age - b.age
    }, {
      title: '实际',
      dataIndex: 'agew',
      key: 'agew',
      sorter: (a, b) => a.age - b.age
    }]
  }],

  dataSourceMX: [{
    key: '1',
    namea: '胡彦斌',
    agea: 32,
    ageb: '西湖区湖底公园1号',
    agec: 32,
    aged: '西湖区湖底公园1号',
    ageq: 32,
    agew: '西湖区湖底公园1号'
  },
  {
    key: '1',
    nameb: '胡彦斌',
    agea: 32,
    ageb: '西湖区湖底公园1号',
    agec: 32,
    aged: '西湖区湖底公园1号',
    ageq: 32,
    agew: '西湖区湖底公园1号'
  },
  {
    key: '1',
    namec: '胡彦斌',
    agea: 32,
    ageb: '西湖区湖底公园1号',
    agec: 32,
    aged: '西湖区湖底公园1号',
    ageq: 32,
    agew: '西湖区湖底公园1号'
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
    title: '排产数量',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '完成数量',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '合格数量',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '计划单号',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '排产日期',
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
