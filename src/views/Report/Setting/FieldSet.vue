<!--页面代码-->
<template>
  <a-spin tip="保存中，请稍等..." :spinning="spinning">
    <a-modal title="字段设置" :visible="visible" @ok="handleOk" @cancel="handleCancel" width="80%">
      <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttons" :search="false"/>
      <a-layout-content style="padding: 0 5px">
        <a-layout style="padding: 24px 0; background: #fff">
          <a-layout-sider width="300" style="background: #fff">
            <a-form :form="form" @submit="handleSubmit">
              <a-form-item v-bind="formItemLayout" label="字段名称：">
                <a-input v-decorator="['name']"/>
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="列名显示：">
                <a-input v-decorator="['name']"/>
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="列宽设置：">
                <a-input v-decorator="['name']"/>
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="数据类型：">
                <a-select defaultValue="lucy" style="width: 100%;" @change="handleChange">
                  <a-select-option value="jack">int 数字类型</a-select-option>
                  <a-select-option value="lucy">stirng 字符串类型</a-select-option>
                  <a-select-option value="disabled" disabled>time 时间类型</a-select-option>
                  <a-select-option value="Yiminghe">yiminghe</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="格式化：">
                <a-input v-decorator="['name']"/>
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label>
                <a-row>
                  <a-col :span="8">
                    <a-checkbox value="A">字段可见</a-checkbox>
                  </a-col>
                  <a-col :span="8">
                    <a-checkbox value="B">显示合计</a-checkbox>
                  </a-col>
                  <a-col :span="8">
                    <a-checkbox value="C">作为查询条件</a-checkbox>
                  </a-col>
                </a-row>
              </a-form-item>
            </a-form>
          </a-layout-sider>
          <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
            <a-table
              :columns="columns"
              :rowKey="record => record.login.uuid"
              :dataSource="data"
              :pagination="pagination"
              :loading="loading"
              @change="handleTableChange"
            >
              <template slot="name" slot-scope="name">{{name.first}} {{name.last}}</template>
            </a-table>
          </a-layout-content>
        </a-layout>
      </a-layout-content>
    </a-modal>
  </a-spin>
</template>
<!--脚本文件-->
<script>
const columns = [
  {
    title: '序号',
    dataIndex: 'name',
    sorter: true,
    width: '20%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '字段名称',
    dataIndex: 'gender',
    width: '20%'
  },
  {
    title: '显示列名',
    dataIndex: 'email'
  },
  {
    title: '宽列设置',
    dataIndex: 'email'
  },
  {
    title: '数据类型',
    dataIndex: 'email'
  },
  {
    title: '可见字段',
    dataIndex: 'email'
  },
  {
    title: '查询条件',
    dataIndex: 'email'
  }
]
export default {
  components: {
    tableOperatorBtn: () => import('@/JtComponents/TableOperatorButton'),
    editCell: () => import('@/JtComponents/JITEditCell')
  },
  data() {
    return {
      spinning: false, // 加载框
      visible: false, // 是否显示模态框
      loading: false,
      buttons: [
        { text: '获取', icon: '', type: 'default' },
        { text: '新增', icon: '', type: 'default' },
        { text: '编辑', icon: '', type: 'default' },
        { text: '删除', icon: '', type: 'default' },
        { text: '保存', icon: '', type: 'default' },
        { text: '上移', icon: '', type: 'default' },
        { text: '下移', icon: '', type: 'default' },
        { text: 'JS脚本', icon: '', type: 'default' },
        { text: '关闭', icon: '', type: 'default' }
      ],
      columns
    }
  },
  methods: {
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
    // 清空表格内容
    empty() {
      this.dataSource = []
      this.columns = []
      this.count = 0
      this.uploadPath = ''
    },
    // 显示
    show(obj) {
      this.showModal()
    },
    // 隐藏
    hide() {
      this.visible = false
    },
    // 确定排班后执行关闭弹出层/窗口
    handleOk() {
      this.onSubmit()
      this.visible = false
    },
    // 取消操作关闭弹出层/窗口
    handleCancel() {
      this.visible = false
    },
    // 提交
    onSubmit() {}
  }
}
</script>
<style>
</style>
