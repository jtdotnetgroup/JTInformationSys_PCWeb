<!--页面代码-->
<template>
  <a-spin tip="保存中，请稍等..." :spinning="spinning">
    <a-modal title="报表定义" :visible="visible" @ok="handleOk" @cancel="handleCancel" width="30%">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" label="数据源：">
          <a-input v-decorator="['name']"/>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="报表名称：">
          <a-input v-decorator="['name']"/>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="类型：">
          <a-input v-decorator="['name']"/>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="ID名称：">
          <a-input v-decorator="['name']"/>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="分组：">
          <a-input v-decorator="['name']"/>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="数据源定义：">
          <a-textarea placeholder :rows="4"/>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="最后修改人：">
          <a-input v-decorator="['name']"/>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="最后修改时间：">
          <a-input v-decorator="['name']"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-spin>
</template>
<!--脚本文件-->
<script>
export default {
  data() {
    return {
      spinning: false, // 加载框
      visible: false, // 是否显示模态框
      loading: false
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
