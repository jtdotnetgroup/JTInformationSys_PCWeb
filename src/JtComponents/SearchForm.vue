<!--页面代码-->
<template>
  <a-spin tip="搜索中……" :spinning="spinning">
    <a-modal
      :title="title"
      :visible="visible"
      :maskClosable="false"
      @ok="handleOk"
      @cancel="handleCancel"
      width="50%"
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
                  style="width: 100%"
                  :value="record.Field+'_'+index"
                  :defaultValue="record.Field+'_'+index"
                  @change="handleChangeField"
                >
                  <a-select-option
                    v-for="item in AllCol"
                    :key="item"
                    :value="item.name+'_'+index"
                  >{{item.disName}}</a-select-option>
                </a-select>
              </span>
              <!-- 比较 -->
              <span slot="Compare" slot-scope="text, record">
                <a-select
                  v-model="record.Compare"
                  defaultValue="="
                  style="width: 100%"
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
                <div v-if="GetStyle(record.Field)==='text'">
                  <a-input
                    type="text"
                    style="width: 100%"
                    v-model="record.CompareVal"
                    @change="CreateWhere"
                  />
                </div>
                <!-- 时间 -->
                <div v-else-if="GetStyle(record.Field)==='date'">
                  <a-date-picker
                    format="YYYY-MM-DD HH:mm:ss"
                    v-model="record.CompareVal"
                    style="width: 100%"
                  >
                    <a-icon slot="suffixIcon" type="smile" />
                  </a-date-picker>
                </div>
                <!-- 下拉选择 -->
                <div v-else-if="GetStyle(record.Field)==='select'">
                  <a-select
                    :defaultValue="record.CompareVal"
                    style="width: 100%"
                    @change="CreateWhere"
                  >
                    <a-select-option value="0">&nbsp;</a-select-option>
                    <a-select-option value="1">小陈</a-select-option>
                    <a-select-option value="2">小邓</a-select-option>
                    <a-select-option value="3">小卓</a-select-option>
                  </a-select>
                </div>
                <!-- 数字 -->
                <div v-else-if="GetStyle(record.Field)==='number'">
                  <a-input-number
                    style="width: 100%"
                    v-model="record.CompareVal"
                    @change="CreateWhere"
                  />
                </div>
                <!-- 单选 -->
                <div v-else-if="GetStyle(record.Field)==='radioGroup'">
                  <a-radio-group name="radioGroup" :defaultValue="1">
                    <a-radio :value="1">A</a-radio>
                    <a-radio :value="2">B</a-radio>
                    <a-radio :value="3">C</a-radio>
                    <a-radio :value="4">D</a-radio>
                  </a-radio-group>
                </div>
                <!-- 多选 -->
                <div v-else-if="GetStyle(record.Field)==='Checkbox'">
                  <a-checkbox :value="0">Checkbox</a-checkbox>
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
                  style="width: 100%"
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
          <a-input addonBefore="最终条件：" disabled="disabled" v-model="EndWhereCN" />
          <a-input v-show="false" addonBefore="最终条件(传入数据库的)：" v-model="EndWhere" />
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
                <a-select
                  style="width: 100%"
                  :value="record.OrderField"
                  :defaultValue="record.OrderField"
                >
                  <a-select-option
                    v-for="item in AllCol"
                    :key="item"
                    :value="item.name"
                  >{{item.disName}}</a-select-option>
                </a-select>
              </span>
              <!-- 类型 -->
              <span slot="CompareVal" slot-scope="text, record">
                <a-select
                  v-model="record.CompareVal"
                  :defaultValue="record.CompareVal"
                  style="width: 100%"
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
    </a-modal>
  </a-spin>
</template>
<!--脚本文件-->
<script>
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
  data() {
    return {
      title: '过滤', // 标题
      spinning: false, // 加载框
      visible: false, // 是否显示模态框
      loading: false, // 是否加载
      WhereData: [
        {
          key: new Date(),
          LeftUBB: '',
          Field: 'Date',
          Compare: '=',
          CompareVal: '',
          RightUBB: '',
          Logic: '',
          Operation: ''
        }
      ],
      WhereColumns,
      AllCol: [
        {
          name: 'Name',
          disName: '名称',
          operateList: [
            { value: '="{0}"', title: '等于' },
            { value: '!="{0}"', title: '不等于' },
            { value: '.StartsWith("{0}")', title: '开头是' },
            { value: '.EndsWith("{0}")', title: '结尾是' },
            { value: '.Contains("{0}")', title: '包含' },
            { value: '.Contains("{0}")==false', title: '不包含' }
          ],
          values: [],
          fieldType: 'text'
        },
        {
          name: 'Date',
          disName: '日期',
          operateList: [
            { value: '<Convert.ToDateTime("{0}")', title: '小于' },
            { value: '=Convert.ToDateTime("{0}")', title: '等于' },
            { value: '>Convert.ToDateTime("{0}")', title: '大于' },
            { value: '!=Convert.ToDateTime("{0}")', title: '不等于' },
            { value: '<=Convert.ToDateTime("{0}")', title: '小于等于' },
            { value: '>=Convert.ToDateTime("{0}")', title: '大于等于' }
          ],
          values: [],
          fieldType: 'date'
        },
        {
          name: 'ZSZL',
          disName: '重量',
          operateList: [
            { value: '<{0}', title: '小于' },
            { value: '={0}', title: '等于' },
            { value: '>{0}', title: '大于' },
            { value: '!={0}', title: '不等于' },
            { value: '<={0}', title: '小于等于' },
            { value: '>={0}', title: '大于等于' }
          ],
          values: [],
          fieldType: 'number'
        },
        {
          name: 'XZRY',
          disName: '人员',
          operateList: [{ value: '!={0}', title: '不等于' }, { value: '={0}', title: '等于' }],
          values: [],
          fieldType: 'select'
        }
      ],
      EndWhereCN: '',
      EndWhere: '',
      OrderData: [
        {
          key: new Date(),
          Field: 'Date',
          CompareVal: '',
          Operation: ''
        }
      ],
      OrderColumns
    }
  },
  computed: {},
  //
  created() {},
  mounted() {},
  //
  methods: {
    // 删除排序
    DelOrderRow(key) {
      this.OrderData = this.OrderData.filter(e => e.key !== key)
    },
    // 增加排序
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
        if (item.LeftUBB.length > 0) {
          where += item.LeftUBB
        }
        if (item.Field.length > 0) {
          where += item.Field
        }
        // 值类型
        var fieldType = _this.AllCol.filter(e => e.name === item.Field)[0].fieldType
        // 如果是时间类型
        if (fieldType === 'date') {
          if (item.CompareVal.length === 0) {
            item.CompareVal = _this.$moment().format('YYYY-MM-DD HH:mm:ss.sss')
          } else {
            item.CompareVal = _this.$moment(item.CompareVal).format('YYYY-MM-DD HH:mm:ss.sss')
          }
        }
        //
        if (item.Compare.length > 0) {
          where += item.Compare.replace('{0}', item.CompareVal)
        }
        // if(item.CompareVal.length>0){
        //    where += item.CompareVal
        // }
        if (item.RightUBB.length > 0) {
          where += item.RightUBB
        }
        if (item.Logic.length > 0) {
          where += item.Logic
        }
      })
      _this.EndWhereCN = where
    },
    // 删除行
    DelRow(key) {
      this.WhereData = this.WhereData.filter(e => e.key !== key)
      this.CreateWhere()
    },
    // 增加行
    AddRow(index) {
      this.WhereData.splice(index + 1, 0, {
        key: new Date(),
        LeftUBB: '',
        Field: this.WhereData[index].Field,
        Compare: '',
        CompareVal: '',
        RightUBB: '',
        Logic: '',
        Operation: ''
      })
      this.CreateWhere()
    },
    // 获取操作符
    GetCol(value) {
      return this.AllCol.filter(e => e.name === value)[0].operateList
    },
    // 获取类型
    GetStyle(value) {
      return this.AllCol.filter(e => e.name === value)[0].fieldType
    },
    // 字段素选择
    handleChangeField(value) {
      var name = (value + '').split('_')[0] // name
      var index = (value + '').split('_')[1] // index
      //
      var obj = this.AllCol.filter(e => e.name === name)[0]
      var obj2 = this.WhereData[index]
      //
      obj2.Field = name
      obj2.Compare = ''
      obj2.CompareVal = ''
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
    },
    // 隐藏
    hide() {
      this.visible = false
    },
    // 确定后执行关闭弹出层/窗口
    handleOk() {
      this.CreateWhere()
      var Where = this.EndWhere
      this.hide()
    },
    // 取消操作关闭弹出层/窗口
    handleCancel() {
      this.hide()
    }
  }
}
</script>
