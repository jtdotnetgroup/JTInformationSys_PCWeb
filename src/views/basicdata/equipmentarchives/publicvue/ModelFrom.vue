<template>
  <a-modal
    title="新增/维护"
    :visible="visiable"
    width="1000px"
    style="left:80px"
    :maskClosable="false"
    @ok="handleSubmit"
    @cancel="onClose"
  >
    <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttons" :search="false"/>

    <a-form layout="inline" :form="form" @change="handleFormChange">
      <!-- <a-form-item label="资源属性">
            <a-select  class="selectclass" >
            <a-select-option value="0">资源一</a-select-option>
            <a-select-option value="1">资源二</a-select-option>
            <a-select-option value="2">资源三</a-select-option>
          </a-select>
      </a-form-item>-->

      <a-form-item label="工作中心">
        <a-select
          style="width: 120px"
          @change="handleWorkCenterChange"
          v-decorator="['fWorkCenterID',{
          rule:[{required:true,message: '请选择工作中心' }],
          initialValue:this.formData.workcenter}]"
        >
          <a-select-option
            v-for="(item,index) in workcenters"
            :value="item.id"
            :key="index"
          >{{item.title}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="资源类型">
        <a-select
          class="selectclass"
          v-decorator="['FType',{rule:[{required:true,message: '请选择资源类型' }], 
        initialValue: this.formData.FType}]"
        >
          <a-select-option :value="1">设备</a-select-option>
          <a-select-option :value="2">模具</a-select-option>
          <a-select-option :value="999">其它</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="设备代码">
        <a-input
          v-decorator="[ 'FNumber', {rules: [{ required: true, message: '请输入设备代码' }],initialValue:this.formData.FNumber} ]"
        ></a-input>
      </a-form-item>
      <a-form-item label="资源名称">
        <a-input
          v-decorator="['FName',{rules:[{required:true,message: '请输入资源名称' }], initialValue: this.formData.FName}]"
        ></a-input>
      </a-form-item>
      <a-form-item label="产能系数">
        <a-input v-decorator="['fRunsRate',{ initialValue: this.formData.FRunsRate}]"></a-input>
      </a-form-item>
      <a-form-item label="时间单位">
        <a-select
          class="selectclass"
          v-decorator="['FTimeUnit',{
          rules:[{required:true,message: '请选择时间单位' }],
          initialValue:this.formData.FTimeUnit}]"
        >
          <a-select-option :value="1">小时</a-select-option>
          <a-select-option :value="0">分钟</a-select-option>
          <a-select-option :value="2">天</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="日标准工作时长">
        <a-input
          style="width:170px"
          v-decorator="['fDayWorkHours',{ initialValue: this.formData.fDayWorkHours}]"
        ></a-input>
      </a-form-item>
      <a-form-item label="日最大工作时长">
        <a-input
          style="width:170px"
          v-decorator="['fMaxWorkHours',{ initialValue: this.formData.fMaxWorkHours}]"
        ></a-input>
      </a-form-item>
      <a-form-item label="切换时间">
        <a-date-picker v-decorator="['fSwichTime',{ initialValue: this.formData.fSwichTime}]">

        </a-date-picker>
      </a-form-item>
      <a-form-item label="使用寿命">
        <a-input v-decorator="['fLift',{ initialValue: this.formData.fLift}]"></a-input>
      </a-form-item>
      <a-form-item label="剩余寿命">
        <a-input v-decorator="['fResidualLife',{ initialValue: this.formData.fResidualLife}]"></a-input>
      </a-form-item>
    </a-form>

    <a-table
      id="table"
      rowKey="fSrcID"
      :dataSource="tableData"
      :columns="columns"
      :pagination="false"
      :bordered="true"
      :loading="dataLoading"
    ></a-table>
  </a-modal>
</template>

<script>
import buttons from '../js/buttons'
import columnsmodel from '../js/columnsmodel'
import { Create, Update } from '@/api/Equipment'

export default {
  name: 'EquipmentForm',
  components: {
    tableOperatorBtn: () => import('@/JtComponents/TableOperatorButton')
  },
  data() {
    return {
      buttons: buttons.buttonsmodel,
      visiable: false,
      formData: {},
      form: this.$form.createForm(this),
      columns: columnsmodel,
      dataLoading: false,
      tableData: [],
      isEdit: false
    }
  },

  methods: {
    showModal(formData) {
      if (!!formData) {
        this.isEdit = true
        this.formData = formData
      }

      this.visiable = true
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          var request=!this.isEdit?Create(values):Update(values)

          request.then(res=>{
            console.log(res)
          }).catch(err=>{
            console.log(err)
          })
        }
      })
    },
    onClose() {
      this.visiable = false
    },
    handleBtnClick() {},
    handleFormChange() {},
    handleWorkCenterChange(value) {}
  },
  computed: {
    workcenters() {
      return this.$store.getters.workcenters
    }
  }
}
</script>

<style scoped>
.selectclass {
  width: 212px;
}
#table {
  margin-top: 10px;
}
</style>