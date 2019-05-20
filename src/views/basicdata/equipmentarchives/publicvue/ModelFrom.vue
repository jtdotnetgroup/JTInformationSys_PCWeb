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
      <a-form-item label="资源属性">
        <!-- <a-input v-decorator="['资源属性',{ initialValue: this.formData.任务单号}]" disabled></a-input> -->
            <a-select  class="selectclass" >
            <a-select-option value="0">资源一</a-select-option>
            <a-select-option value="1">资源二</a-select-option>
            <a-select-option value="2">资源三</a-select-option>
          </a-select>
      </a-form-item>
      <a-form-item label="工作中心">
        <!-- <a-date-picker
          disabled
          v-decorator="['工作中心',{ initialValue: this.$moment(this.formData.计划开工日期)}]"
        ></a-date-picker> -->
        <a-input  v-decorator="['工作中心',{ initialValue: this.formData.产品编码}]"></a-input>
      </a-form-item>
      <a-form-item label="资源类型">
        <a-select  class="selectclass">
            <a-select-option value="0">资源类型一</a-select-option>
            <a-select-option value="1">资源类型二</a-select-option>
            <a-select-option value="2">资源类型三</a-select-option>
          </a-select>
      </a-form-item>
      <a-form-item label="资源代码">
        <a-input  v-decorator="['资源代码',{ initialValue: this.formData.产品编码}]"></a-input>
      </a-form-item>
      <a-form-item label="资源名称">
        <a-input  v-decorator="['资源名称',{ initialValue: this.formData.产品名称}]"></a-input>
      </a-form-item>
      <a-form-item label="产能系数">
        <a-input  v-decorator="['产能系数',{ initialValue: this.formData.规格型号}]"></a-input>
      </a-form-item>
      <a-form-item label="时间单位">
        <a-select class="selectclass">
            <a-select-option value="0">1个小时</a-select-option>
            <a-select-option value="1">2个小时</a-select-option>
            <a-select-option value="2">3个小时</a-select-option>
          </a-select>
      </a-form-item>
      <a-form-item label="日标准工作时长">
        <a-input style="width:170px"  v-decorator="['日标准工作时长',{ initialValue: this.formData.排产数量}]"></a-input>
      </a-form-item>
      <a-form-item label="日最大工作时长">
        <a-input style="width:170px"  v-decorator="['日最大工作时长',{ initialValue: this.formData.排产数量}]"></a-input>
      </a-form-item>
       <a-form-item label="切换时间">
        <a-input  v-decorator="['切换时间',{ initialValue: this.formData.排产数量}]"></a-input>
      </a-form-item>
       <a-form-item label="使用寿命">
        <a-input  v-decorator="['使用寿命',{ initialValue: this.formData.排产数量}]"></a-input>
      </a-form-item>
       <a-form-item label="剩余寿命">
        <a-input  v-decorator="['剩余寿命',{ initialValue: this.formData.排产数量}]"></a-input>
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
    >
      <!-- <template v-for="(col,index) in editColumns" :slot="col" slot-scope="text, record, index">
        <editCell :key="index" :text="text" @change="onCellChange(record.日期, col, $event)"/>
      </template> -->
    </a-table>
  </a-modal>
</template>

<script>
   import buttons from '../js/buttons'
   import columnsmodel from '../js/columnsmodel'
    export default {
        components:{
        tableOperatorBtn: () => import('@/JtComponents/TableOperatorButton'),



        },
        data() {
            return {
                buttons:buttons.buttonsmodel,     
                 visiable: false,   
                 formData:{},     
                 form: this.$form.createForm(this),
                 columns:columnsmodel,
                 dataLoading:false,
                 tableData:[],
            }
        },

        methods: {
            showModal(formData){
                this.visiable=true;

            },
            handleSubmit(){

            },
            onClose(){
                this.visiable=false;

            },
            handleBtnClick(){

            },handleFormChange(){

            }
            
        },
        
    }
</script>

<style scoped>

.selectclass{
  width: 212px
}
#table{
   margin-top: 10px
}


</style>