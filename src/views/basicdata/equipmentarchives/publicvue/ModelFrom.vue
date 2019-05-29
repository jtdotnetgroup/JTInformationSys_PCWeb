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

      <a-row>
        <a-col :span="8"> <a-form-item label="设备代码">
        <a-input
          v-decorator="[ 'FNumber', {rules: [{ required: true, message: '请输入设备代码' }],initialValue:this.formData.fNumber} ]"
        ></a-input>
      </a-form-item></a-col>
        <a-col :span="8"> <a-form-item label="设备名称">
        <a-input
          v-decorator="['FName',{rules:[{required:true,message: '请输入资源名称' }], initialValue: this.formData.fName}]"
        ></a-input>
      </a-form-item></a-col>
        <a-col :span="8"><a-form-item label="工作中心" class="formmargin-left">
        <a-select       
          style="width: 174px"
          @change="handleWorkCenterChange"         
          v-decorator="['fWorkCenterID',{
          rule:[{required:true,message: '请选择工作中心' }],
          initialValue:this.formData.fWorkCenterID}]"
        >
          <a-select-option
            v-for="(item,index) in workcenters"
            :value="item.id"
            :key="index"
          >{{item.title}}</a-select-option>
        </a-select>
      </a-form-item></a-col>
      </a-row>
    
     
     

      <a-row>
        <a-col :span="8"> <a-form-item label="资源类型" class="formmargin-left">
        <a-select
          class="selectclass"
          v-decorator="['FType',{rule:[{required:true,message: '请选择资源类型' }], 
        initialValue: this.formData.fType}]"
        >
          <a-select-option :value="1">设备</a-select-option>
          <a-select-option :value="2">模具</a-select-option>
          <a-select-option :value="999">其它</a-select-option>
        </a-select>
      </a-form-item></a-col>
         <a-col :span="8">   <a-form-item label="产能系数" class="formmargin-left">
        <a-input v-decorator="['fRunsRate',{ initialValue: this.formData.fRunsRate}]"></a-input>
      </a-form-item></a-col>
        <a-col :span="8"><a-form-item label="时间单位" >
        <a-select
          class="selectclass"
          v-decorator="['FTimeUnit',{
          rules:[{required:true,message: '请选择时间单位' }],
          initialValue:this.formData.fTimeUnit}]"
        >
          <a-select-option :value="1">小时</a-select-option>
          <a-select-option :value="0">分钟</a-select-option>
          <a-select-option :value="2">天</a-select-option>
        </a-select>
      </a-form-item></a-col>

      </a-row>

      <a-row>
        <a-col :span="8"> <a-form-item label="日标准工作时长" class="formmargin-left">
        <a-input-number class="numberinput" :min="0"  v-decorator="['fDayWorkHours',{ initialValue: this.formData.fDayWorkHours}]">         
        ></a-input-number>
      </a-form-item></a-col>
        <a-col :span="8"> <a-form-item  label="日最大工作时长" class="formmargin-left">
        <a-input-number class="numberinput" :min="0" v-decorator="['fMaxWorkHours',{ initialValue: this.formData.fMaxWorkHours}]">          
        ></a-input-number>
      </a-form-item></a-col>
        <a-col :span="8"><a-form-item label="切换时间" class="formmargin-left">
        <a-input-number style="width:174px" :min="0" v-decorator="['fSwichTime',{ initialValue: this.formData.fSwichTime}]"></a-input-number>
      </a-form-item></a-col>
      </a-row>


     <a-row>
       <a-col :span="8"><a-form-item label="使用寿命" class="formmargin-left">
        <a-input v-decorator="['fLift',{ initialValue: this.formData.fLift}]"></a-input>
      </a-form-item></a-col>
       <a-col :span="8">    <a-form-item label="剩余寿命" class="formmargin-left">
        <a-input v-decorator="['fResidualLife',{ initialValue: this.formData.fResidualLife}]"></a-input>
      </a-form-item> </a-col>
     </a-row>

     <!-- 隐藏ID用于修改 -->
     <a-form-item>
       <a-input hidden v-decorator="['fInterID',{ initialValue: this.formData.fInterID}]"></a-input>
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
      size="small"
    ></a-table>
  </a-modal>
</template>

<script>
import {buttons} from '../js/buttons'
import columnsmodel from '../js/columnsmodel'
import { Create, Update } from '@/api/Equipment'
import pick from 'lodash.pick'
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
      isEdit: false,
      mdl:{}
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
            this.$emit("addSuccess")
            this.$message.success('保存成功')
            this.form.resetFields();
            this.onClose();
            console.log(res)
          }).catch(err=>{
            this.$message.error(err.message)
            console.log(err)
          })
        }
      })
    },
    onClose() {
   
         this.visiable = false
         this.mdl = {},
         this.form.resetFields()
         this.formData=[]
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

.formmargin-left{
  margin-left: 10px;
}

.selectclass {
  width: 174px;
}
#table {
  margin-top: 10px;
}
 .numberinput{
   width: 131px
 } 
</style>