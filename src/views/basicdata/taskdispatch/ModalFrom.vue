<template>
    <a-modal
    title="新增/维护"
    :visible="visiable"
    width="800px"
    style="left:100px"
    :maskClosable="false"
    @ok="handleSubmit"
    @cancel="onClose"
  >
   <a-form layout="inline" :form="form" @change="handleFormChange">

      <a-row>
           <a-col :span="20"> <a-form-item label="任务名称">
           <a-input  style="width:540px" v-decorator="['任务名称',{ initialValue: this.formData.产品编码}]"></a-input>                  
           </a-form-item>  </a-col>  
          <a-col :span="4"> <a-checkbox  style="margin-top: 8px">启用</a-checkbox> </a-col>       
      </a-row>


      
      <a-form-item label="计划类型">
          
         <a-select  class="selectclass" >
            <a-select-option v-for="(item, index) in itemsTiem" :key="index" @click="onChangeSelect(item.value)" :value="item.value">{{item.text}}</a-select-option>       
          </a-select>
      </a-form-item>
      
      <a-form-item label="任务类型">
        <a-select  class="selectclass">
            <a-select-option value="0">数据下载</a-select-option>
            <a-select-option value="1">数据上传</a-select-option>
            <a-select-option value="2">数据更新</a-select-option>
            <a-select-option value="3">数据删除</a-select-option>
          </a-select>
      </a-form-item>


 <a-form-item v-if="checkboxbool">
      <div class="checkboxclass">
           <template  v-for="(item, index) in items" >
              <a-checkbox  :key="index" style="margin-top: 8px">{{item.text}}</a-checkbox>
           </template>    
       </div> 
 </a-form-item>

        <a-row>
            <a-form-item v-if="numberbool">
            每月第 <a-input-number :min="1" :max="10" @change="onChange"/>&nbsp;&nbsp; 天    
            </a-form-item>
        </a-row>

        
        <a-button class="buttonstyle">每天频率</a-button>



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
     
    </a-form>

  </a-modal>
</template>

<script>
    export default {
        data() {
            return {
                visiable: false,   
                formData:{},
                form: this.$form.createForm(this),
                items:[{text:"周一"},{text:"周二"},{text:"周三"},{text:"周四"},{text:"周五"},{text:"周六"},{text:"周日"}],
                checkboxbool:false,
                numberbool:false,
                itemsTiem:[{text:"每天",value:1},{text:"每周",value:2},{text:"每月",value:3}]
            }
        },
        methods: {
              showModal(formData){
                this.visiable=true;

            },
            onClose(){
                this.visiable=false;
            },
            handleSubmit(){

            },
            handleFormChange(){

            },
            onChange(value) {
             console.log('changed', value);
           },
            onChangeSelect(key){

            switch (key) {
                case 1:
                    this.checkboxbool=false
                    this.numberbool=false
                    break;
                case 2:
                    this.checkboxbool=true
                    this.numberbool=false
                    break;
                 case 3:
                   this.checkboxbool=false
                    this.numberbool=true
                    break;           
                default:
                    break;
            }
               

            }
        },
        
    }
</script>

<style  scoped>
.selectclass{
  width: 212px
}
.checkboxclass{
    
   height: 50px;
    line-height: 30px;
}
.buttonstyle{
    width: 750px;
    text-align: left;
    border: none;
    border-bottom-style: inset;
}
</style>