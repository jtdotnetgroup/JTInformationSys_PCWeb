<template>
  <a-modal
    title="详情"
    :visible="visible"
    width="1000px"
    style="left:80px"
    :maskClosable="true"
    @cancel="onClose"
    :footer="null"
  >
    
   <!-- <a-row>
     <a-col :span="3"><span>进程类</span></a-col>
     <a-col :span="21"><span>{{serviceName}}</span></a-col>
   </a-row>
     <a-row>
      <a-col :span="3"><span>方法名</span></a-col>
     <a-col :span="21"><span>{{methodName}}</span></a-col>
   </a-row> -->


   <a-form layout="inline" :form="form" >
       <a-row>
         <a-col :span="24"><a-form-item label="进   程   类" >
        <a-input  disabled
         class="inputwidth" 
          v-decorator="['serviceName', {initialValue:this.formData.serviceName} ]"
        ></a-input>
        </a-form-item></a-col>
        <a-col :span="24"> <a-form-item label="方   法   名">
        <a-input class="inputwidth"  disabled v-decorator="['methodName',{ initialValue: this.formData.methodName}]"></a-input>
        </a-form-item></a-col>

        <a-col :span="24"> <a-form-item label="参　　数" >
        <a-input   class="inputwidth" disabled v-decorator="['parameters',{ initialValue: this.formData.parameters}]"></a-input>
        </a-form-item></a-col>

         <a-col :span="24"> <a-form-item label="异常时间">
        <a-input class="inputwidth" disabled v-decorator="['executionTime',{ initialValue: this.formData.executionTime}]"></a-input>
        </a-form-item></a-col>

         <a-col :span="24"> <a-form-item label="请求耗时">
        <a-input class="inputwidth" disabled v-decorator="['executionDuration',{ initialValue: this.formData.executionDuration}]"></a-input>
        </a-form-item></a-col>

         <a-col :span="24"> <a-form-item label="请求地址">
        <a-input class="inputwidth" disabled v-decorator="['clientIpAddress',{ initialValue: this.formData.clientIpAddress}]"></a-input>
        </a-form-item></a-col>

      
        
       </a-row>
     
        

        

         <!-- <a-form-item label="任务名称">
        <a-input  v-decorator="['任务名称',{ initialValue: this.formData.产品编码}]"></a-input>
        </a-form-item>

        <a-form-item label="任务名称">
        <a-input  v-decorator="['任务名称',{ initialValue: this.formData.产品编码}]"></a-input>
        </a-form-item>

        <a-form-item label="任务名称">
        <a-input  v-decorator="['任务名称',{ initialValue: this.formData.产品编码}]"></a-input>
        </a-form-item> -->

    
    </a-form>


    <a-card  title="堆栈信息" style="margin-top: 20px;">
      <p>{{exceptions}}</p>   
    </a-card>
  </a-modal>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      formData: {},
      form: this.$form.createForm(this),
      exceptions:'',
    }
  },
  methods: {
    show(formData) {
      this.visible = true
      this.formData=formData[0]

    //    this.serviceName=formData[0].serviceName
    //     this.methodName=formData[0].methodName
       this.exceptions=formData[0].exception
    },

    onClose() {
      this.visible = false
    }
  }
}
</script>

<style scoped>

.inputwidth{
    width: 860px
    
}
.ant-card-head{
    background: transparent;
    border-bottom: 1px solid #e8e8e8;
    padding: 0 24px;
    border-radius: 2px 2px 0 0;
    zoom: 1;
    margin-bottom: -1px;
    min-height: 48px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    background-color: #F8F9FA
}
</style>