<template>
  <a-modal
    title="新增/维护"
    :visible="visiable"
    width="800px"
    style="left:80px"
    :maskClosable="false"
    @ok="handleSubmit"
    @cancel="onClose"
  >
    <a-form layout="inline" :form="form" @change="handleFormChange">
    <a-row>
      <a-col :span="12"><a-form-item label="组织编码">
        <a-input v-decorator="['Code',{rules: [{ required: true, message: '请输入组织编码' }]} ]" disabled></a-input>
      </a-form-item></a-col>
      <a-col :span="12"> <a-form-item label="组织名称">
        <a-input v-decorator="['DisplayName',{rules: [{ required: true, message: '请输入组织名称' }]}]"></a-input>
      </a-form-item></a-col>
    </a-row>
      <a-row>
        <a-col :span="12"> 
          <a-form-item label="上级组织" class="inputmargin-left">
        <a-tree-select     :disabled="disabled"
          style="width: 174px"  
          :value="ParentIdvalue"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="上级组织"
          allowClear
          treeDefaultExpandAll
          @change="onChange"
          :treeData="organizations"
        ></a-tree-select>
      </a-form-item></a-col>
        <a-col :span="12">  <a-form-item label="组织类型" >
        <a-select class="selectclass" v-decorator="['OrganizationType',{rules: [{ required: true, message: '请选择组织类型' }],initialValue:this.formData.organizationType} ]">
          <a-select-option
            v-for="(item,index) in Soptions"
            :value="item.id"
            :key="index"
            @click="SelectClick(item.id)"
          >{{item.name}}</a-select-option>
        </a-select>
      </a-form-item></a-col>
      </a-row>
     <a-row>
      <a-col :span="12"><a-form-item label="组织负责人" >
        <a-input v-decorator="['ERPOrganizationLeader',{rules: []}]"></a-input>
     </a-form-item></a-col>
      <a-col :span="12"><a-form-item label="车间类型"  class="inputmargin-left">  
        <a-switch style="margin-left: 10px;" 
          @change="onChangechecked"
          :checked="Workshoptype"
          checkedChildren="车间"
          unCheckedChildren="非车间"
          defaultChecked
        />
      </a-form-item></a-col>
    </a-row> 

    
      <a-form-item label="备注说明">
        <a-textarea
          style="width:550px"
          v-decorator="['Remark',{rules: []}]"
          placeholder="备注说明"
          :autosize="{ minRows: 2, maxRows: 6 }"
        />
      </a-form-item>


      <a-collapse defaultActiveKey="1" >
        <a-collapse-panel header="ERP属性" style="background-color: #F2F2F2"  key="1" >
        
       <a-form-item label="数据连接" class="inputmargin-left"> 
        <a-input v-decorator="['DataBaseConnection',{rules: []}]"></a-input>
      </a-form-item>
  

           <a-form-item label="ERP组织" class="inputmargin-left">
        <a-input v-decorator="['ERPOrganization',{rules: []}]"></a-input>
      </a-form-item>


        </a-collapse-panel>
      </a-collapse>


    </a-form>
  </a-modal>
</template>

<script>
import { GetSelectOptio, CreateOu ,Update} from '@/api/Organization'
import { close, exists } from 'fs'
import pick from 'lodash.pick'



export default {
  data() {
    return {
      visiable: false,
      formData: {},
      form: this.$form.createForm(this),
      treeExpandedKeys: [],
      ParentIdvalue: '',
      Soptions: [],
      SelectClickValue: '',
      mdl: {},
      Workshoptype:false,
      IsEdit:false,//新增和修改的操作
      disabled:false

    }
  },
  mounted() {
    this._LoadData()
  },

  methods: {
    //查询组织类型的操作
    _LoadData() {
      GetSelectOptio()
        .then(res => {
          const result = res.result
          this.Soptions = result
        })
        .catch(err => {
          console.log(err)
        })
    },
    //显示弹框的方法
    showModal(formData,isEdit) {
      this.visiable = true
        this.formData = formData
        this.IsEdit=isEdit

      if(isEdit){  
        this.disabled=true
         this.Eidt(formData)
      }else{
         this.disabled=false
        this.Add(formData)
 
      }
    },

    //新增的操作
    Add(formData){
       var key = ''
      if (!!formData.selectedNodes) {
        key = formData.selectedNodes[0].key
        var childrenCount=formData.selectedNodes[0].componentOptions.children.length;
        if (
          !!formData.selectedNodes[0].componentOptions.children &&
          childrenCount > 0
        ) {
          key += '.00' + (childrenCount + 1)
          var ids = formData.selectedNodes[0].componentOptions.propsData.dataRef.id
          this.value = '' + ids + ''
        } else {
          key += '.00' + 1
          var ids = formData.selectedNodes[0].componentOptions.propsData.dataRef.id
          this.value = '' + ids + ''
        }
      } else {
        key = formData.Code
      }
      this.mdl.Code = key
      //强制再次渲染的方法
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'Code'))
      })
    },

    //编辑绑定
    Eidt(formData){

      this.mdl.Code = formData.code
      this.mdl.DisplayName=formData.displayName
     // this.mdl.OrganizationType = formData.organizationType
      this.mdl.ERPOrganization=formData.erpOrganization==''?0:formData.erpOrganization
      this.mdl.ERPOrganizationLeader=formData.erpOrganizationLeader==''?0:formData.erpOrganizationLeader
      this.mdl.Remark=formData.remark 
      this.mdl.DataBaseConnection=formData.dataBaseConnection
      this.ParentIdvalue=''+formData.parentId==0?0:formData.parentId+''
      this.Workshoptype=formData.fWorkshopType
      // this.Workshoptype=formData.fWorkshopType==0?false:true
      
      //强制再次渲染的方法
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'Code','DisplayName',
        'ERPOrganization','ERPOrganizationLeader','Remark','DataBaseConnection'))
      })

    },

//提交的方法
    handleSubmit() {
      var _this = this
       
       //修改的操作
       if(this.IsEdit){

          this.form.validateFields((err, values) => {   
            values.id=this.formData.id
            values.parentId=this.ParentIdvalue
            //values.organizationType=this.SelectClickValue
            values.fWorkshopType=this.Workshoptype
            values.creationTime=this.$moment(this.formData.creationTime)
            values.creatorUserId=this.formData.creatorUserId


      //  var reg=/^[0-9]*$/
      //   if(!reg.test(values.ERPOrganizationLeader))
      //     {
      //       this.$message.error('ERP组织负责人为数字')
      //       return;
      //     }
      //     else if(!reg.test(values.ERPOrganization)){

      //       this.$message.error('ERP组织为数字')
      //       return;
      //     }

          if(!err){
            var _this=this

             Update(values)
            .then(res => {
              if (res.result != 0) {
                this.$message.success('成功')
                var params = {
                  ParentID: 0
                }

                // _this.$emit("Eidt")
               // _this.$store.dispatch('GetOrganizations', params)
                this.$store.dispatch('GetOrganizations', params)
                this.$emit('updateOrg')
                this.onClose();

              } else {
                this.$message.error('失败')
              }
              
            })
            .catch(err => {
              console.log(err)
                _this.$message.error(''+err+'')
            })

          }
       })

       }else{


         this.form.validateFields((err, values) => {   
         var params = {
          parentId: this.value == '' ? '0' : this.value,
          code: values.Code,
          displayName: values.DisplayName,
          organizationType: this.SelectClickValue,
          dataBaseConnection: values.DataBaseConnection,
          erpOrganizationLeader:values.ERPOrganizationLeader==''?0:values.ERPOrganizationLeader,
          erpOrganization:values.ERPOrganization==''?0:values.ERPOrganization ,
          remark: values.Remark
        }
 if(!(values.ERPOrganizationLeader==undefined ||values.ERPOrganizationLeader==""  ) || !(values.ERPOrganization==undefined ||values.ERPOrganization==""))
  {
            
               var reg=/^[0-9]*$/
        if(!reg.test(values.ERPOrganizationLeader))
          {
            this.$message.error('ERP组织负责人为数字')
            return;
          }
          else if(!reg.test(values.ERPOrganization)){

            this.$message.error('ERP组织为数字')
            return;
          }
   }
        

        if (!err) {
          CreateOu(params)
            .then(res => {
              if (res.result != 0) {
                this.$message.success('成功')
                var params = {
                  ParentID: 0
                }
                this.$store.dispatch('GetOrganizations', params)
                this.onClose();
              
              } else {
                this.$message.error('失败')
              }
              
            })
            .catch(err => {
              console.log(err)
                _this.$message.error(''+err+'')
            })
        }
      })

       }

      
    },
    onClose() {
      this.visiable = false,
      this.ParentIdvalue='',
      this.form.resetFields()
    },
    handleFormChange() {},
    onChange(value) {
      this.ParentIdvalue = value
    },
    SelectClick(obj) {
      this.SelectClickValue = obj
    },
     //车间类型触发方法
    onChangechecked(checked) {
      this.Workshoptype = checked
    },
   
  },
  computed: {
    organizations() {
      return this.$store.getters.organizations
    }
  }
}
</script>

<style  scoped>
.selectclass {
  width: 174px;
}
.inputmargin-left{
  margin-left: 10px
}
</style>