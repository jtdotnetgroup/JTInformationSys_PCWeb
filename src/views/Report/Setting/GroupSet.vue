<!--页面代码-->
<template>
  <a-spin tip="保存中，请稍等..." :spinning="spinning">
    <a-modal title="分组设置" :visible="visible" @ok="handleOk" @cancel="handleCancel" width="30%">
      <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttons" :search="false"/>
      <a-layout-content style="padding: 0 5px">
        <a-layout style="padding: 24px 0; background: #fff">
          <a-layout-sider width="200" style="background: #fff">
            <a-form :form="form" @submit="handleSubmit">
              <a-form-item v-bind="formItemLayout" label="分组代码：">
                <a-input v-decorator="['name']"/>
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="分组名称：">
                <a-input v-decorator="['name']"/>
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="上级分组">
                <a-input v-decorator="['name']"/>
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="备注：">
                <a-textarea placeholder :rows="4"/>
              </a-form-item>
            </a-form>
          </a-layout-sider>
          <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
            <a-tree showLine :defaultExpandedKeys="['0-0-0-0']" @select="onSelect">
              <a-tree-node key="0-0">
                <span slot="title" style="color: #1890ff">叙事簿</span>
                <a-tree-node title="工序计划" key="0-0-0"></a-tree-node>
                <a-tree-node title="工序派工" key="0-0-1">
                  <a-tree-node title="leaf" key="0-0-1-0"/>
                </a-tree-node>
                <a-tree-node title="工序汇报" key="0-0-2">
                  <a-tree-node title="leaf" key="0-0-2-0"/>
                  <a-tree-node title="leaf" key="0-0-2-1"/>
                </a-tree-node>
                <a-tree-node title="计件工资" key="0-0-2">
                  <a-tree-node title="leaf" key="0-0-2-0"/>
                  <a-tree-node title="leaf" key="0-0-2-1"/>
                </a-tree-node>
              </a-tree-node>
            </a-tree>
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
        { text: '新增', icon: '', type: 'default' },
        { text: '保存', icon: '', type: 'default' },
        { text: '删除', icon: '', type: 'default' },
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
