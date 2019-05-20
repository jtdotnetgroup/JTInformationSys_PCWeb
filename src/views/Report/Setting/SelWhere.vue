<!--页面代码-->
<template>
  <a-spin tip="保存中，请稍等..." :spinning="spinning">
    <a-modal title="查询条件设置" :visible="visible" @ok="handleOk" @cancel="handleCancel" width="80%">
      <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttons" :search="false"/>
      <a-layout-content style="padding: 0 5px">
        <a-layout style="padding: 24px 0; background: #fff">
          <a-layout-sider width="200" style="background: #fff">
            <a-form :form="form" @submit="handleSubmit">
              <a-form-item v-bind="formItemLayout" label="字段名称：">
                <a-input v-decorator="['name']"/>
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="数据类型：">
                <a-input v-decorator="['name']"/>
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="数据来源：">
                <a-input v-decorator="['name']"/>
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="默认取值：">
                <a-input v-decorator="['name']"/>
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="取值定义：">
                   <a-textarea placeholder="" :rows="4"/>
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
    title: '条件名称',
    dataIndex: 'gender',
    width: '20%'
  },
  {
    title: '数据类型',
    dataIndex: 'email'
  },
  {
    title: '数据来源',
    dataIndex: 'email'
  },
  {
    title: '默认取值',
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
      columns,
      buttons: [
        { text: '新增', icon: '', type: 'default' },
        { text: '保存', icon: '', type: 'default' },
        { text: '删除', icon: '', type: 'default' },
        { text: '上移', icon: '', type: 'default' },
        { text: '下移', icon: '', type: 'default' },
        { text: '关闭', icon: '', type: 'default' }
      ]
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
