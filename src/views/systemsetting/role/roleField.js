const fields = [
  {
    // 排序
    sortIndex: 0,
    // 控件类型
    type: 'input',
    // 字段标题
    label: '角色名',
    options: {
      type: 'text',
      // 是否必填
      required: true,
      // 占位内容
      placeholder: ''

    },
    decorator: [
      'rolename',
      {
        rules: [{
          required: true, message: '角色名必填'
        },
        {
          min: 3, max: 10, message: '角色名长度为3-10个字符'
        }]
      }
    ]
  },
  {
    // 排序
    sortIndex: 1,
    // 控件类型
    type: 'input',
    // 字段标题
    label: '角色名',
    options: {
      type: 'number',
      // 是否必填
      required: true,
      // 占位内容
      placeholder: ''

    },
    decorator: [
      'number',
      {
        rules: []
      }
    ]
  },
  {
    sortIndex: 2,
    type: 'datetime',
    label: '日期时间',
    options: {
      // 控件类型，默认为default ,range为日期范围
      type: 'default',

      // 是否显示时间
      showTime: true,
      // 是否显示今天
      showToday: true,
      // 日期格式
      format: 'YYYY-MM-DD HH:mm:ss'
    },
    // 校验规则
    decorator: [
      'date',
      {
        rules: [
          { required: true, message: 'required' }
        ]
      }
    ]
  },
  {
    sortIndex: 3,
    label: '下拉选择',
    type: 'select',
    options: {
      selectOptions: [
        { key: 'A', value: 'A' },
        { key: 'B', value: 'B' },
        { key: 'C', value: 'C' },
        { key: 'D', value: 'D' }
      ]
    },
    decorator: [
      'select',
      {
        rules: [
        ]
      }
    ]
  },
  {
    sortIndex: 4,
    label: '单选',
    type: 'check',
    options: {
      type: 'single',
      checkOptions: '单选'
    },
    decorator: [
      'singleCheck',
      {
        rules: [
        ]
      }
    ]
  },
  {
    sortIndex: 5,
    label: '多选',
    type: 'check',
    options: {
      type: 'multi',
      checkOptions: [
        'A', 'B', 'C', 'D'
      ]
    },
    decorator: [
      'multiCheck',
      {
        rules: [
          { required: true, message: '必填' }
        ]
      }
    ]
  }
]

export default fields
