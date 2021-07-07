<template>
  <a-modal
    title="增加排产"
    :visible="visiable"
    width="25%"
    style="left:100px"
    :maskClosable="false"
    @ok="handleSubmit"
    @cancel="onClose"
    :spinning="spinning"
  >
    <a-form :form="form">
      <a-form-item label="任务单号" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
        <a-input v-model="ParentRow.fmoBillNo" placeholder="请输入任任务单号" disabled="disabled" />
      </a-form-item>
      <a-form-item label="任务日期" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
        <a-input v-model="ParentRow.fDate" placeholder="请输入任日期" disabled="disabled" />
      </a-form-item>
      <a-form-item label="任务员工" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
        <a-input-search :placeholder="form.yg" disabled="disabled" @search="onEmployeeForm">
          <a-button slot="enterButton">选择员工</a-button>
        </a-input-search>
      </a-form-item>
      <a-form-item label="任务设备" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
        <a-input-search :placeholder="form.sb" disabled="disabled" @search="onSelequipment">
          <a-button slot="enterButton">选择设备</a-button>
        </a-input-search>
      </a-form-item>
      <a-form-item label="派 工 数" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
        <a-input v-model="form.fCommitAuxQty" placeholder="请输入派工数" />
      </a-form-item>
    </a-form>
    <!-- 选择员工和选择设备 -->
    <Selequipment ref="Selequipment" @selectChange="handleequipmentChange" />
    <EmployeeSelectForm ref="EmployeeSelectForm" @selectChange="handleEmployeeChange" />
  </a-modal>
</template>
<!-- 脚本 -->
<script>
// 处理数据
import { SaveDispBillList } from '@/api/DispBill'
export default {
  //
  components: {
    EmployeeSelectForm: () => import('@/JtComponents/EmployeeSelectForm'),
    Selequipment: () => import('./Selequipment')
  },
  data() {
    return {
      visiable: false,
      spinning: false, // 加载框
      form: {
        fCommitAuxQty: 0,
        fMachineID: 0,
        fWorkCenterID: 0,
        sb: '请点击选择设备',
        yg: '请点击选择员工',
        fWorker: 0
      },
      ParentRow: {}
    }
  },
  methods: {
    onSelequipment(value) {
      this.$refs.Selequipment.show({})
    },
    onEmployeeForm(value) {
      this.$refs.EmployeeSelectForm.show({})
    },
    // 选择员工回调
    handleEmployeeChange(emp, row) {
      //   console.log(row)
      this.form.fWorker = emp.id
      this.form.yg = emp.fName
    },
    // 选择设备回调
    handleequipmentChange(emp, row) {
      this.form.fMachineID = emp.fInterID
      this.form.sb = emp.fName
      this.form.fWorkCenterID = emp = emp.fWorkCenterID
    },
    showModal(formData) {
      var _this = this
      this.ParentRow = formData[0]
      this.visiable = true
      console.log(formData)
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
      if (this.form.fWorker === 0) {
        _this.$notification['error']({
          message: '系统提示',
          description: '请选择员工'
        })
        return
      }
      if (_this.form.fMachineID === 0) {
        _this.$notification['error']({
          message: '系统提示',
          description: '请选择设备'
        })
        return
      }
      if (_this.form.fCommitAuxQty === 0) {
        _this.$notification['error']({
          message: '系统提示',
          description: '派工数量不能小于0'
        })
        return
      }
      _this.ShowLoad()
      var obj = { details: [] }
      obj.details.push({
        fid: _this.ParentRow.fId,
        fmoBillNo: _this.ParentRow.fmoBillNo,
        fSrcID: _this.ParentRow.fId, //任务单ID
        fShift: 0, //班次
        fMachineID: _this.form.fMachineID, //设备
        fWorkCenterID: _this.form.fWorkCenterID, //车间
        fCommitAuxQty: _this.form.fCommitAuxQty * 1, //派工数量
        fmoInterID: 0, //任务单ID
        fWorker: _this.form.fWorker, // 员工
        ICMODispBillId: 0
      })
      console.log(_this.ParentRow)
      console.log(obj)
      SaveDispBillList(obj)
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
 