<!--页面代码-->
<template>
  <a-spin tip="保存中，请稍等..." :spinning="spinning">
    <a-modal title="新增/维护" :visible="visible" @ok="handleOk" @cancel="handleCancel" width="30%">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" label="数据源名称：">
          <a-input v-decorator="['name']"/>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="服务器地址：">
          <a-input v-decorator="['name']"/>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="数据库类型：">
          <a-input v-decorator="['name']"/>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="数据库名称：">
          <a-input v-decorator="['name']"/>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="数据库用户：">
          <a-input v-decorator="['name']"/>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="访问密码：">
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
