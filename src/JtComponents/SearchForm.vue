<!--页面代码-->
<template>
  <a-spin tip="搜索中……" :spinning="spinning">
    <a-modal
      :title="title"
      :visible="visible"
      :maskClosable="false"
      @ok="handleOk"
      @cancel="handleCancel"
      width="70%"
      okText="搜索"
    >
      <!-- tabs -->
      <a-tabs defaultActiveKey="1" @change="callback">
        <!-- tabs 1 -->
        <a-tab-pane key="1">
          <span slot="tab">
            <a-icon type="search" />条件
          </span>
          <!-- 表格 -->
          <div style="padding-bottom: 25px;">
            <a-table
              size="small"
              bordered
              :columns="WhereColumns"
              :dataSource="WhereData"
              :loading="loading"
              :pagination="false"
            >
              <!-- 自定义列 -->
              <!-- 左括号 -->
              <span slot="LeftUBB" slot-scope="text, record">
                <a-select
                  v-model="record.LeftUBB"
                  :defaultValue="record.LeftUBB"
                  @change="CreateWhere"
                >
                  <a-select-option value>&nbsp;</a-select-option>
                  <a-select-option value="(">(</a-select-option>
                </a-select>
              </span>
              <!-- 右括号 -->
              <span slot="RightUBB" slot-scope="text, record">
                <a-select
                  v-model="record.RightUBB"
                  :defaultValue="record.RightUBB"
                  @change="CreateWhere"
                >
                  <a-select-option value>&nbsp;</a-select-option>
                  <a-select-option value=")">)</a-select-option>
                </a-select>
              </span>
              <!-- 字段 -->
              <span slot="Field" slot-scope="text, record, index">
                <a-select
                  class="w100"
                  :value="record.Field+'_'+index"
                  :defaultValue="record.Field+'_'+index"
                  @change="handleChangeField"
                >
                  <a-select-option
                    v-for="item in AllCol"
                    :key="item"
                    :value="item.name+'_'+index"
                  >{{item.dispName}}</a-select-option>
                </a-select>
              </span>
              <!-- 比较 -->
              <span slot="Compare" slot-scope="text, record">
                <a-select
                  v-model="record.Compare"
                  :defaultValue="GetDefault(record.Field)"
                  class="w100"
                  @change="CreateWhere"
                >
                  <a-select-option
                    v-for="item in GetCol(record.Field)"
                    :key="item"
                    :value="item.value"
                  >{{item.title}}</a-select-option>
                </a-select>
              </span>
              <!-- 比较值 -->
              <span slot="CompareVal" slot-scope="text, record">
                <!-- 文本 -->
                <div v-if="GetStyle(record.Field)==='string'">
                  <a-input
                    type="text"
                    class="w100"
                    v-model="record.CompareVal"
                    @change="CreateWhere"
                  ></a-input>
                </div>
                <!-- 时间 -->
                <div v-else-if="GetStyle(record.Field)==='datetime'">
                  <a-date-picker
                    format="YYYY-MM-DD HH:mm:ss"
                    v-model="record.CompareVal"
                    class="w100"
                  >
                    <a-icon slot="suffixIcon" type="smile" />
                  </a-date-picker>
                </div>
                <!-- 日期 -->
                <div v-else-if="GetStyle(record.Field)==='date'">
                  <a-date-picker format="YYYY-MM-DD" v-model="record.CompareVal" class="w100">
                    <a-icon slot="suffixIcon" type="smile" />
                  </a-date-picker>
                </div>
                <!-- 数字 -->
                <div v-else-if="GetStyle(record.Field)==='int'">
                  <a-input
                    class="w100"
                    v-model="record.CompareVal"
                    @change="CreateWhere"
                    type="number"
                  />
                </div>
                <!-- 浮点型数字 -->
                <div v-else-if="GetStyle(record.Field)==='double'">
                  <a-input
                    class="w100"
                    v-model="record.CompareVal"
                    @change="CreateWhere"
                    type="number"
                  />
                </div>
                <!-- 下拉选择 -->
                <div v-else-if="GetStyle(record.Field)==='select'">
                  <a-select
                    v-model="record.CompareVal"
                    :defaultValue="record.CompareVal"
                    class="w100"
                    @change="CreateWhere"
                  >
                    <a-select-option
                      v-for="item in GetColVal(record.Field)"
                      :key="item"
                      :value="item.value"
                    >{{item.title}}</a-select-option>
                  </a-select>
                </div>
                <!-- bool -->
                <div v-else-if="GetStyle(record.Field)==='bool'">
                  <a-radio-group
                    name="bool"
                    :defaultValue="record.CompareVal"
                    v-model="record.CompareVal"
                  >
                    <a-radio :value="true">真</a-radio>
                    <a-radio :value="false">假</a-radio>
                  </a-radio-group>
                </div>
                <!-- 单选 -->
                <div v-else-if="GetStyle(record.Field)==='radioGroup'">
                  <a-radio-group
                    name="radioGroup"
                    :defaultValue="record.CompareVal"
                    v-model="record.CompareVal"
                  >
                    <a-radio
                      v-for="item in GetColVal(record.Field)"
                      :key="item"
                      :value="item.value"
                    >{{item.title}}</a-radio>
                  </a-radio-group>
                </div>
                <!-- 多选 -->
                <div v-else-if="GetStyle(record.Field)==='checkbox'">
                  <a-checkbox
                    v-for="item in GetColVal(record.Field)"
                    :key="item"
                    :value="item.value"
                  >{{item.title}}</a-checkbox>
                </div>
                <!-- Class 选择器-->
                <div v-else-if="YesSelect.indexOf(GetStyle(record.Field))>=0">
                  <a-button @click="ShowSelect(record,GetStyle(record.Field))">
                    {{text}}
                    <a-icon type="search"></a-icon>
                  </a-button>
                </div>
                <!-- 未定义 -->
                <div v-else>
                  <span>{{record.Field}}</span>
                  <!-- <span>等待扩展</span> -->
                </div>
              </span>
              <!-- 逻辑 -->
              <span slot="Logic" slot-scope="text, record">
                <a-select
                  v-model="record.Logic"
                  :defaultValue="record.Logic"
                  class="w100"
                  @change="CreateWhere"
                >
                  <a-select-option value>&nbsp;</a-select-option>
                  <a-select-option value="&&">并且</a-select-option>
                  <a-select-option value="||">或者</a-select-option>
                </a-select>
              </span>
              <!-- 操作 -->
              <span slot="Operation" slot-scope="text, record, index">
                <a-button
                  shape="circle"
                  icon="minus"
                  @click="DelRow(record.key)"
                  v-show="index!==0"
                ></a-button>&nbsp;
                <a-button type="primary" shape="circle" icon="plus" @click="AddRow(index)"></a-button>
              </span>
              <!-- 列 -->
            </a-table>
          </div>
          <!-- 查询语句 -->
          <a-input addonBefore="最终条件(传入数据库的)：" disabled="disabled" v-model="EndWhere" />
        </a-tab-pane>
        <!-- tabs 2 -->
        <a-tab-pane key="2">
          <span slot="tab">
            <a-icon type="sort-ascending" />排序
          </span>
          <div style="padding-bottom: 25px;">
            <a-table
              size="small"
              bordered
              :columns="OrderColumns"
              :dataSource="OrderData"
              :loading="loading"
              :pagination="false"
            >
              <!-- 字段 -->
              <span slot="OrderField" slot-scope="text, record">
                <a-select class="w100" :value="record.OrderField" :defaultValue="record.OrderField">
                  <a-select-option
                    v-for="item in AllCol"
                    :key="item"
                    :value="item.name"
                  >{{item.dispName}}</a-select-option>
                </a-select>
              </span>
              <!-- 类型 -->
              <span slot="CompareVal" slot-scope="text, record">
                <a-select
                  v-model="record.CompareVal"
                  :defaultValue="record.CompareVal"
                  class="w100"
                >
                  <a-select-option value>不排序</a-select-option>
                  <a-select-option value="&&">升序</a-select-option>
                  <a-select-option value="||">倒序</a-select-option>
                </a-select>
              </span>
              <!-- 操作 -->
              <span slot="Operation" slot-scope="text, record, index">
                <a-button
                  shape="circle"
                  icon="minus"
                  @click="DelOrderRow(record.key)"
                  v-show="index!==0"
                ></a-button>&nbsp;
                <a-button type="primary" shape="circle" icon="plus" @click="AddOrderRow(index)"></a-button>
              </span>
            </a-table>
          </div>
          <a-input addonBefore="最终排序：" disabled="disabled" />
          <a-input v-show="false" addonBefore="最终排序(传入数据库的)：" />
        </a-tab-pane>
        <!-- tabs 3 -->
        <a-tab-pane key="3">
          <span slot="tab">
            <a-icon type="deployment-unit" />方式
          </span>
          方式
          <a-input addonBefore="最终方式：" disabled="disabled" />
          <a-input v-show="false" addonBefore="最终方式(传入数据库的)：" />
        </a-tab-pane>
      </a-tabs>
      <!-- 选择器 -->
      <Selequipment ref="Selequipment" @selectChange="SelectChange" />
      <EmployeeSelectForm ref="EmployeeSelectForm" @selectChange="SelectChange" />
    </a-modal>
  </a-spin>
</template>
<!--脚本文件-->
<script>
// 获取数据
import { GetAll } from '@/api/SearchForm'
// 列名
const WhereColumns = [
  {
    title: '(',
    dataIndex: 'LeftUBB',
    scopedSlots: { customRender: 'LeftUBB' },
    align: 'center',
    width: 80
  },
  {
    title: '字段',
    dataIndex: 'Field',
    width: 130,
    scopedSlots: { customRender: 'Field' }
  },
  {
    title: '比较',
    dataIndex: 'Compare',
    scopedSlots: { customRender: 'Compare' },
    align: 'center',
    width: 90
  },
  {
    title: '比较值',
    dataIndex: 'CompareVal',
    scopedSlots: { customRender: 'CompareVal' }
  },
  {
    title: ')',
    dataIndex: 'RightUBB',
    scopedSlots: { customRender: 'RightUBB' },
    align: 'center',
    width: 80
  },
  {
    title: '逻辑',
    dataIndex: 'Logic',
    scopedSlots: { customRender: 'Logic' },
    width: 110
  },
  {
    title: '操作',
    dataIndex: 'Operation',
    scopedSlots: { customRender: 'Operation' },
    width: 100
  }
]
// 排序
const OrderColumns = [
  {
    title: '列名',
    dataIndex: 'OrderField',
    align: 'center',
    scopedSlots: { customRender: 'OrderField' },
    width: 80
  },
  {
    title: '排序类型',
    dataIndex: 'CompareVal',
    align: 'center',
    scopedSlots: { customRender: 'CompareVal' },
    width: 50
  },
  {
    title: '操作',
    dataIndex: 'Operation',
    scopedSlots: { customRender: 'Operation' },
    align: 'center',
    width: 120
  }
]
//
export default {
  components: {
    EmployeeSelectForm: () => import('@/JtComponents/EmployeeSelectForm'),
    Selequipment: () => import('@/views/production/Taskassignment/Selequipment')
  },
  // 所有数据
  data() {
    return {
      title: '过滤', // 标题
      spinning: false, // 加载框
      visible: false, // 是否显示模态框
      loading: false, // 是否加载
      WhereData: [], //
      WhereColumns, //
      // 是选择器的
      YesSelect: ['EmployeeSelectForm', 'Selequipment'],
      // 操作符
      operateList: {
        string: [
          { value: '="{0}"', title: '等于' },
          { value: '!="{0}"', title: '不等于' },
          { value: '.Contains("{0}")', title: '包含', default: true },
          { value: '.Contains("{0}")==false', title: '不包含' },
          { value: '.StartsWith("{0}")', title: '开头是' },
          { value: '.EndsWith("{0}")', title: '结尾是' }
        ],
        bool: [{ value: '!={0}', title: '不等于' }, { value: '={0}', title: '等于', default: true }],
        select: [{ value: '!={0}', title: '不等于' }, { value: '={0}', title: '等于', default: true }],
        date: [
          { value: '<Convert.ToDateTime("{0}")', title: '小于' },
          { value: '=Convert.ToDateTime("{0}")', title: '等于', default: true },
          { value: '>Convert.ToDateTime("{0}")', title: '大于' },
          { value: '!=Convert.ToDateTime("{0}")', title: '不等于' },
          { value: '<=Convert.ToDateTime("{0}")', title: '小于等于' },
          { value: '>=Convert.ToDateTime("{0}")', title: '大于等于' }
        ],
        datetime: [
          { value: '<Convert.ToDateTime("{0}")', title: '小于' },
          { value: '=Convert.ToDateTime("{0}")', title: '等于', default: true },
          { value: '>Convert.ToDateTime("{0}")', title: '大于' },
          { value: '!=Convert.ToDateTime("{0}")', title: '不等于' },
          { value: '<=Convert.ToDateTime("{0}")', title: '小于等于' },
          { value: '>=Convert.ToDateTime("{0}")', title: '大于等于' }
        ],
        int: [
          { value: '<{0}', title: '小于' },
          { value: '={0}', title: '等于', default: true },
          { value: '>{0}', title: '大于' },
          { value: '!={0}', title: '不等于' },
          { value: '<={0}', title: '小于等于' },
          { value: '>={0}', title: '大于等于' }
        ],
        double: [
          { value: '<{0}', title: '小于' },
          { value: '={0}', title: '等于', default: true },
          { value: '>{0}', title: '大于' },
          { value: '!={0}', title: '不等于' },
          { value: '<={0}', title: '小于等于' },
          { value: '>={0}', title: '大于等于' }
        ]
      },
      // 所有选择字段以及他的类型
      AllCol: [],
      EndWhere: '',
      OrderData: [
        {
          key: new Date(),
          Field: '',
          CompareVal: '',
          Operation: ''
        }
      ],
      OrderColumns
    }
  },
  computed: {},
  // 创建后
  created() {},
  // 载入后
  mounted() {},
  // 所有方法
  methods: {
    // 删除排序行
    DelOrderRow(key) {
      this.OrderData = this.OrderData.filter(e => e.key !== key)
    },
    // 增加排序行
    AddOrderRow(index) {
      this.OrderData.splice(index + 1, 0, {
        key: new Date(),
        OrderField: '',
        CompareVal: '',
        Operation: ''
      })
    },
    // 生成Where
    CreateWhere() {
      var _this = this
      // 生成的Where
      var where = ''
      this.WhereData.forEach(item => {
        // 值类型
        var fieldType = _this.AllCol.filter(e => e.name === item.Field)[0].fieldType
        //
        if (item.LeftUBB.length > 0) {
          where += item.LeftUBB
        }
        // 字段
        if (item.Field.length > 0) {
          where += item.Field
        }
        // 如果是时间类型
        if (fieldType === 'datetime') {
          if (item.CompareVal.length === 0) {
            item.CompareVal = _this.$moment().format('YYYY-MM-DD')
          } else {
            item.CompareVal = _this.$moment(item.CompareVal).format('YYYY-MM-DD')
          }
        }
        // 如果是日期格式
        if (fieldType === 'date') {
          if (item.CompareVal.length === 0) {
            item.CompareVal = _this.$moment().format('YYYY-MM-DD')
          } else {
            item.CompareVal = _this.$moment(item.CompareVal).format('YYYY-MM-DD')
          }
        }
        // 值
        if (item.Compare.length > 0) {
          // 如果是class 则取隐藏的值
          if (this.YesSelect.indexOf(fieldType) >= 0) {
            where += '.ToString().' + item.Compare.replace('{0}', item.HideCompareVal)
          } else {
            where += item.Compare.replace('{0}', item.CompareVal)
          }
        }
        // 右括号
        if (item.RightUBB.length > 0) {
          where += item.RightUBB
        }
        // 逻辑关系
        if (item.Logic.length > 0) {
          where += item.Logic
        }
        //
      })
      _this.EndWhere = where
    },
    // 删除条件行
    DelRow(key) {
      this.WhereData = this.WhereData.filter(e => e.key !== key)
      this.CreateWhere()
    },
    // 增加条件行
    AddRow(index) {
      if (this.WhereData[index].Logic === '') {
        this.WhereData[index].Logic = '&&'
      }
      this.WhereData.splice(index + 1, 0, {
        key: new Date(),
        LeftUBB: '',
        Field: this.WhereData[index].Field,
        Compare: this.WhereData[index].Compare,
        CompareVal: '',
        RightUBB: '',
        Logic: '',
        Operation: ''
      })
      this.CreateWhere()
    },
    // 获取操作符
    GetCol(value) {
      var operate = this.AllCol.filter(e => e.name === value)
      if (operate.length > 0) {
        return operate[0].operateList
      } else {
        return this.AllCol.filter(e => e.name === 'select')[0].operateList
      }
    },
    // 获取默认操作符
    GetDefault(value) {
      var operateList = this.GetCol(value)
      return operateList.filter(e => e.default === true)[0].value
    },
    // 获取类型
    GetStyle(value) {
      return this.AllCol.filter(e => e.name === value)[0].fieldType
    },
    // 获取枚举值
    GetColVal(value) {
      return this.AllCol.filter(e => e.name === value)[0].values
    },
    // 字段选择
    handleChangeField(value) {
      var name = (value + '').split('_')[0] // name
      var index = (value + '').split('_')[1] // index
      //
      var obj = this.AllCol.filter(e => e.name === name)[0]
      var obj2 = this.WhereData[index]
      //
      obj2.Field = name
      obj2.Compare = this.GetDefault(name)
      // 设置默认值
      if (obj.fieldType === 'int' || obj.fieldType === 'double') {
        obj2.CompareVal = 0
      } else if (obj.fieldType === 'bool') {
        obj2.CompareVal = true
      } else {
        obj2.CompareVal = ''
      }

      this.CreateWhere()
    },
    // 选项卡回调
    callback(key) {
      console.log(key)
    },
    // 显示
    showModal() {
      this.visible = true
    },
    //显示加载框
    ShowLoad() {
      this.spinning = true
    },
    //隐藏加载框
    HideLoad() {
      this.spinning = false
    },
    // 显示
    show(obj) {
      this.showModal()
      if (this.AllCol.length === 0) {
        this.GetQueryFields(obj)
      }
    },
    // 隐藏
    hide() {
      this.visible = false
    },
    // 确定后执行关闭弹出层/窗口
    handleOk() {
      if (this.AllCol.filter(e => e.LeftUBB === '(').length !== this.AllCol.filter(e => e.RightUBB === ')').length) {
        this.$message.warning('左右括号数量不相等，无法搜索')
        return
      }
      if(this.AllCol.length>0){
      if (this.AllCol[this.AllCol.length - 1].Logic !== undefined) {
        this.$message.warning('并且或者后面必须加条件才能搜索')
        return
      }
      }
      this.CreateWhere()
      this.$emit('input', this.EndWhere)
      this.hide()
    },
    // 取消操作关闭弹出层/窗口
    handleCancel() {
      this.hide()
    },
    // 显示选择器
    ShowSelect(record, type) {
      var _this = this
      switch (type) {
        case 'EmployeeSelectForm': {
          _this.$refs.EmployeeSelectForm.show(record)
          break
        }
        case 'Selequipment': {
          _this.$refs.Selequipment.show(record)
          break
        }
      }
    },
    // 选择器回调
    SelectChange(SelectRow, record, id, name) {
      this.WhereData.filter(e => e === record).HideCompareVal = id
      this.WhereData.filter(e => e === record).CompareVal = name
    },
    // 获取字段
    GetQueryFields(obj) {
      var _this = this
      GetAll({ methodFullName: this.methodName }).then(res => {
        if (res.success) {
          _this.AllCol = []
          res.result.forEach(item => {
            var obj = {}
            obj.name = item.name
            obj.dispName = item.dispName
            obj.operateList = _this.operateList[item.fieldType]

            obj.fieldType = item.fieldType
            if (obj.fieldType === 'select') {
              obj.values = item.values
            }
            _this.AllCol.push(obj)
          })

          // 默认添加第一个
          _this.WhereData.push({
            key: new Date(),
            LeftUBB: '',
            Field: res.result[0].name,
            Compare: _this.GetDefault(res.result[0].name),
            CompareVal: '',
            HideCompareVal: '', // 选择器选择ID
            RightUBB: '',
            Logic: '',
            Operation: ''
          })
        }
      })
    }
  },
  props: {
    methodName: {
      type: String,
      required: true
    },
    value: {
      type: String
    }
  }
}
</script>
<!-- CSS样式 -->
<style>
.w100 {
  width: 100%;
}
</style>
