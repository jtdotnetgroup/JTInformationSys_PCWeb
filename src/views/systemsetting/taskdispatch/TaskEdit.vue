<template>
  <a-modal
    title="新增/维护"
    :visible="visiable"
    width="880px"
    style="left:100px"
    :maskClosable="false"
    @ok="handleSubmit"
    @cancel="onClose"
    :spinning="spinning"
  >
    <a-form :form="form">
      <a-form-item label="任务ID" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" v-show="false">
        <a-input v-model="form.TaskId" placeholder="请输入任务ID"/>
      </a-form-item>
      <a-form-item label="任务编码" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
        <a-input v-model="form.TaskCode" placeholder="请输入任务编码"/>
      </a-form-item>
      <a-form-item label="任务名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
        <a-input v-model="form.TaskName" placeholder="请输入任务名称"/>
      </a-form-item>
      <a-form-item label="任务类型" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
        <a-select v-model="form.TaskType" :defaultValue="form.TaskType" @change="handleChange">
          <a-select-option
            v-for="(item,index) in TaskTypeList"
            :key="index"
            :value="item.val"
          >{{item.title}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="任务状态" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
        <a-select v-model="form.TaskState" @change="handleChange">
          <a-select-option
            v-for="(item,index) in TaskStateList"
            :key="index"
            :value="item.val"
          >{{item.title}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="任务描述" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
        <a-textarea v-model="form.TaskBz" placeholder="请输入任务描述" :rows="4"/>
      </a-form-item>
      <a-form-item label="执行Corn表达式" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
        <a-input v-model="form.TaskCorn" placeholder="请输入执行Corn表达式"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<!-- 脚本 -->
<script>
// 获取数据
import { DataAdd, GetMx } from '@/api/Sys_Task'
export default {
  //
  data() {
    return {
      visiable: false,
      spinning: false, // 加载框
      form: {
        TaskId: 0,
        TaskCode: '',
        TaskName: '',
        TaskType: '同步数据',
        TaskBz: '',
        TaskState: 1,
        TaskCorn: ''
      },
      TaskTypeList: [
        { val: '同步数据', title: '同步数据' },
        { val: '清理图片', title: '清理图片' },
        { val: '库存释放', title: '库存释放' },
        { val: '维护提醒', title: '维护提醒' }
      ],
      TaskStateList: [
        { val: 1, title: '暂停/维护中' },
        { val: 2, title: '未更新/待更新' },
        { val: 3, title: '执行中/已更新' },
        { val: 4, title: '已结束' }
      ]
    }
  },
  methods: {
    showModal(formData) {
      var _this = this
      this.visiable = true 
      console.log(formData.taskId)
      if (formData.taskId != undefined) {
        GetMx({ TaskId: formData.taskId }).then(res => {
          if (res.success) {
            _this.form.TaskId = res.result.taskId
            _this.form.TaskCode = res.result.taskCode
            _this.form.TaskName = res.result.taskName
            _this.form.TaskType = res.result.taskType
            _this.form.TaskBz = res.result.taskBz
            _this.form.TaskState = res.result.taskState
            _this.form.TaskCorn = res.result.taskCorn
          }
        })
      } else {
        _this.form.TaskId = 0
        _this.form.TaskCode = ''
        _this.form.TaskName = ''
        _this.form.TaskType = '同步数据'
        _this.form.TaskBz = ''
        _this.form.TaskState = 1
        _this.form.TaskCorn = ''
      }
    },
    handleChange() {},
    //显示加载框
    ShowLoad() {
      this.spinning = true
    },
    //隐藏加载框
    HideLoad() {
      this.spinning = false
    },
    onClose() {
      this.visiable = false
    },
    handleSubmit() {
      var _this = this
      _this.ShowLoad()
      DataAdd(this.form)
        .then(res => {
          if (res.success) {
            this.onClose()
            _this.$message.success('保存成功')
            _this.$emit('addSuccess')
          } else {
            _this.$message.error('保存失败')
          }
        })
        .catch(function() {
          _this.$message.error('操作失败，请稍后重试！')
        })
        .finally(() => {
          _this.HideLoad()
        })
    }
  }
}
</script>
 