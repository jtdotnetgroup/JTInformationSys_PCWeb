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
    <a-form layout="inline" :form="form" @change="handleFormChange" :loading="loading">
       <a-row>
         <a-col :span="12"> <a-form-item label="员工编号">
        <a-input :disabled="this.IsEdit" 
          v-decorator="['FMpno',{rules: [{ required: true, message: '请输入员工编号' }]} ]"
        ></a-input>
      </a-form-item></a-col>
         <a-col :span="12"><a-form-item label="员工姓名">
        <a-input v-decorator="['FName',{rules: [{ required: true, message: '请输入员工姓名' }]} ]"></a-input>
      </a-form-item></a-col>
       </a-row>
     <a-row>
     <a-col :span="12">
       <a-form-item label="性别"  class="inputmargin-left">  
        <a-switch style="margin-left: 10px;"
          @change="onChangechecked"
          :checked="Sex"
          checkedChildren="男"
          unCheckedChildren="女"
          defaultChecked
        />
      </a-form-item>
   </a-col >
     <a-col :span="12">
      <a-form-item label="所属部门" class="inputmargin-left">
        <a-tree-select v-decorator="['fDepartment',{rules: [{ required: true, message: '请选择所属部门' }]} ]"
          style="width: 174px"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="所属部门"
          allowClear
          treeDefaultExpandAll
          @change="onChange"
          :treeData="organizations"
        ></a-tree-select>
      </a-form-item>
</a-col>
</a-row>
<a-row>
     <a-col :span="12">
        <a-form-item label="系统" class="inputmargin-left"  >
        <a-checkbox :checked="FWorkingState" @change="onChangeFWorkingState">在职</a-checkbox>
        <a-checkbox :checked="FSystemUser" @change="onChangeFSystemUser">系统用户</a-checkbox>
         </a-form-item>
    </a-col>
     <a-col :span="12">     
      <a-form-item label="上级主管" class="inputmargin-left">
        <a-tree-select 
          style="width: 174px"
          :value="valueTree"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="上级主管"
          allowClear
          treeDefaultExpandAll
          @change="onChangeTree"
          :treeData="treeDatas"
        ></a-tree-select>
      </a-form-item>
    </a-col>
</a-row>

<a-row v-if="FSystemUser">
  <a-col :span="12">
      <!-- <a-form-item label="员工账户" class="inputmargin-left">
        <a-input v-decorator="['UserName',{rules: [],initialValue:this.formData.userName} ]"  :disabled="disabled"></a-input>
      </a-form-item>
      <a-form-item label="员工密码">
        <a-input v-decorator="['Password',{initialValue:this.formData.password,rules: [{ required: true, message: '请输入员工密码' }]}  ]" :disabled="disabled" ></a-input> -->
      <a-form-item label="员工账户" class="inputmargin-left1">
        <a-input v-decorator="['UserName',{rules: []} ]"  :disabled="IsEdit&&!!this.mdl.UserName"></a-input>
      </a-form-item>
      <a-form-item label="员工密码">
        <a-input type="Password" v-decorator="['Password',{rules: [{ required: false, message: '请输入员工密码' }]}  ]" :disabled="IsEdit&&!!this.mdl.Password" ></a-input>
      </a-form-item>
  </a-col>
</a-row>
  <a-row>
    <a-col :span="12"><a-form-item label="手机号码">
          <a-input autocomplete="off" v-decorator="['FPhone',{rules: [{ required: false, message: '请输入手机号码' }]} ]"></a-input>
        </a-form-item></a-col>
    <a-col :span="12"> <a-form-item label="入职日期">
          <a-date-picker
            v-decorator="['FHiredate',{rules: [{ required: false, message: '请输入入职日期码' }]} ]"
          ></a-date-picker>
        </a-form-item></a-col>
  </a-row>
      <a-form-item label="邮件地址">
        <a-input autocomplete="off"
          v-decorator="['FEmailAddress',{rules: [{ required: false, message: '请输入正确邮件地址'}]} ]"
        ></a-input>
      </a-form-item>

       <a-collapse defaultActiveKey="1"  >
        <a-collapse-panel header="ERP属性" style="background-color: #F2F2F2" key="1" >  
          <a-form-item label="对应ERP用户">
            <a-input
              v-decorator="['FERPUser',{rules: []} ]"
            ></a-input>
          </a-form-item>
          <a-form-item label="对应ERP职员">
            <a-input
              v-decorator="['FERPOfficeClerk',{rules: []} ]"
            ></a-input>
          </a-form-item>
        </a-collapse-panel>
      </a-collapse>




    </a-form>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

import regular from './regular'

import { CreateEm, GetFMpno, Update,GetTreeListEn } from '@/api/Employee'

export default {
  name:'EmployeeModal',
  data() {
    return {
      visiable: false,
      formData: {},
      treeDatas:[],
      form: this.$form.createForm(this),
      treeExpandedKeys: [],
      value: undefined,
      valueTree:undefined,
      mdl: {},
      Sex: true,
      FWorkingState: true,
      FSystemUser: true,
      IsEdit: false,
      disabled:false,
      loading:false
    }
  },
  mounted() {
    
     this.LoadTreeData()
  },



  computed: {
    organizations() {
      return this.$store.getters.organizations
    },
  },
  methods: {
    showModal(formData, isEdit) {
      this.visiable = true
      this.IsEdit = isEdit
      if (isEdit === false) {
        // this.LoadGetFMpno()
        this.add(formData)
      } else {
        this.Edit(formData)
        console.log(formData)
      }
    },

    //新增的操作
    add(formData) {
      this.formData = formData
      if (!!formData) {
        if (!!formData.selectedNodes && formData.selectedNodes.length > 0) {
          var ids = formData.selectedNodes[0].componentOptions.propsData.dataRef.id
          this.value = '' + ids + ''
        } else {
          this.value = ''
        }
      }
      
       
        
    },
   //编辑是绑定值
    Edit(formData) {
      this.formData = formData

      this.Sex = formData.fSex == 1 ? true : false

      this.FWorkingState = formData.fWorkingState == 1 ? true : false
      this.FSystemUser = formData.fSystemUser == 1 ? true : false
      this.value = '' + formData.fDepartment + ''//所属部门
      this.valueTree=''+formData.fParentId==0?''+formData.id+'':formData.fParentId+''//上级主管
      this.mdl.fDepartment=formData.fDepartment
      this.mdl.FMpno = formData.fMpno
      this.mdl.FName = formData.fName
      this.mdl.FPhone = formData.fPhone
      this.mdl.FHiredate =formData.fHiredate && this.$moment(formData.fHiredate)
      this.mdl.FEmailAddress = formData.fEmailAddress
      this.mdl.FERPUser = formData.ferpUser
      this.mdl.FERPOfficeClerk = formData.ferpOfficeClerk
      this.mdl.UserName=formData.userName
      this.mdl.Password=formData.password

      if(formData.userName!==""&&formData.password!==""){
        this.disabled=true
      }else{
        this.disabled=false
      }

      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.mdl,
            'FMpno',
            'FName',
            'FDepartment',
            'FPhone',
            'FHiredate',
            'FEmailAddress',
            'FERPUser',
            'FERPOfficeClerk',
            'UserName',
            'Password',
            'fDepartment'
          )
        )
      })
    },

    handleSubmit() {
      var _this = this
      //新建
      if (this.IsEdit == false) {
        this.form.validateFields((err, values) => {
      
          var params = {
            fMpno: values.FMpno,
            fName: values.FName,
            fSex: this.Sex ? 1 : 2, //1 男 2女
            fDepartment: this.value, //部门
            fWorkingState: this.FWorkingState ? 1 : 2, //1 在职 2不在职
            fSystemUser: this.FSystemUser ? 1 : 2, //1 是系统用户 2是系统用户
            fParentId: this.valueTree===''?0:this.valueTree,//上级主管
            fPhone: values.FPhone,
            fHiredate: values.FHiredate,
            fEmailAddress: values.FEmailAddress,
            ferpUser: values.FERPUser===''?0:values.FERPUser,
            ferpOfficeClerk: values.FERPOfficeClerk===''?0:values.ferpOfficeClerk,
            user:{
            UserName:values.UserName,
            Password:values.Password
          }

       }

          if(this.FWorkingState==false){
            this.$message.error('默认新增是员工必须为在职状态')
            return;
          }

          console.log(params)
          if (!err) {
            this.loading=true;
            //console.log(params)
            CreateEm(params)
              .then(res => {
                if (res.result !== 0) {
                  _this.$message.success('成功')
               _this.$emit('addSuccess');
                  this.onClose()
                } 
                this.loading=false
              })
              .catch(err => {
                console.log(err)
                this.loading=false
              })
          }
        })
      } else {
        this.form.validateFields((err, values) => {
          values.fSex = this.Sex ? 1 : 2 //这样赋值
          values.fParentId = this.formData.fParentId //这样赋值
          values.fWorkingState = this.FWorkingState ? 1 : 2
          values.fSystemUser = this.FSystemUser ? 1 : 2
          values.id = this.formData.id
          values.fUserId = this.formData.fUserId
          values.fOrganizationUnitId=this.formData.fOrganizationUnitId
          if(this.value!=this.formData.fDepartment){ //判断如果改变部门
              values.fDepartment=this.value
          }else{
             values.fDepartment=this.formData.fDepartment     
          }         
          values.fUserId=this.formData.fUserId
           values.FHiredate=this.$moment(values.FHiredate).format('YYYY-MM-DD')

          values.user={
            UserName:values.UserName,
            Password:values.Password
          }
          
          // if(!regular.phone.test(values.FPhone))
          // {
          //   this.$message.error('手机号码不正确')
          //   return;
          // }     
          // if(!regular.Email.test(values.FEmailAddress))
          // {
          //   this.$message.error('邮箱格式不正确')
          //   return;
          // }

           console.log(values)
          if (!err) {
            Update(values)
              .then(res => {
                if (res.result !== 0) {
                  _this.$message.success('成功')         
               _this.$emit('addSuccess');
               this.onClose()
                } 
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
      }
    },
    onClose() {
        this.visiable = false
         this.mdl = {}
         this.form.resetFields()
         this.valueTree=''
        this.value = ''
        this.Sex = true
        this.FWorkingState = true
        this.FSystemUser = true
        this.IsEdit=false
    },
    handleFormChange() {},
    onChange(value) {
      console.log(value)
      this.value = value
    },

    onChangeTree(value){
       console.log(value)
      this.valueTree = value
    },
    //性别触发方法
    onChangechecked(checked) {
      this.Sex = checked
    },
    //在职状态触发
    onChangeFWorkingState(e) {
      this.FWorkingState = e.target.checked
      console.log(e)
    },
    //系统用户
    onChangeFSystemUser(e) {
      this.FSystemUser = e.target.checked

      if(this.IsEdit==false){
         this.disabled=false   
        
      }else{
        if(this.formData.password!==""){
          this.disabled=true
      
        }else{
           this.disabled=false
         
        }   
      }
     
    },

//获取编号
     LoadGetFMpno(){
        GetFMpno()
      .then(res => {
        const results = res.result
        this.mdl.FMpno = results
        this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'FMpno'))
      })
      })
      .catch(err => {
        console.log(err)
      })
     },


    //上级主管
    LoadTreeData(){
      var _this=this
      var params = {
        ParentID: 0,
      }
      GetTreeListEn(params)
        .then(res => {
          this.treeDatas = []
          const result = res.result
          if (result) {
            this.treeDatas = result
          }
        })
        .catch(err => {
          console.log(err)
        })
    }

  }
}
</script>

<style  scoped>
.selectclass {
  width: 212px;
}
.inputmargin-left{
  margin-left: 10px
}



</style>