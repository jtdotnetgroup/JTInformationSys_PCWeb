const fields = [
  {
    // 排序
    sortIndex: 0,
    // 控件类型
    type: 'input',
    // 字段标题
    label: '文本框',
    options: {
      // 是否必填
      required: true,
      // 占位内容
      placeholder: '',
      decorator: [
        'username',
        { rules: [{
          required: true, message: '请输入用户名'
        },
        {
          min: 3, max: 10, message: '用户名长度为3-10个字符'
        }] }
      ]
    }
  },
  {
    sortIndex: 1,
    type: 'datetime',
    label: '日期时间',
    options: {
      // 控件类型，默认为default ,range为日期范围
      type: 'range',
      // 是否必填
      required: false,
      // 是否显示时间
      showTime: true,
      // 是否显示今天
      showToday: true,
      // 日期格式
      format: 'YYYY-MM-DD HH:mm:ss',
      // 校验规则
      decorator: [
        'date',
        { rules: [
          { required: true, message: 'required' }
        ] }
      ]
    }
  },
  {
    sortIndex: 2,
    type: 'datetime',
    label: '日期时间',
    options: {
      // 控件类型，默认为default ,range为日期范围
      type: 'range',
      // 是否必填
      required: false,
      // 是否显示时间
      showTime: true,
      // 是否显示今天
      showToday: true,
      // 日期格式
      format: 'YYYY-MM-DD HH:mm:ss',
      // 校验规则
      decorator: [
        'date',
        { rules: [
          { required: true, message: 'required' }
        ] }
      ]
    }
  }
]

export default fields
