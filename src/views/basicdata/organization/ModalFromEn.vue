<template>
  <a-modal
    title="新增/维护"
    :visible="visiable"
    width="620px"
    style="left:80px"
    :maskClosable="false"
    @ok="handleSubmit"
    @cancel="onClose"
  >
    <a-form layout="inline" :form="form" @change="handleFormChange">
      <a-form-item label="员工编码">
        <a-input
          v-decorator="['FMpno',{rules: [{ required: true, message: '请输入员工编码' }]} ]"
          disabled
        ></a-input>
      </a-form-item>
      <a-form-item label="员工姓名">
        <a-input v-decorator="['FName',{rules: [{ required: true, message: '请输入员工姓名' }]} ]"></a-input>
      </a-form-item>

<a-row>

  <a-col :span="12">
   <a-form-item label="性别" style="margin-left: 10px;">
    
        <a-switch style="margin-left: 20px;"
          @change="onChangechecked"
          :checked="Sex"
          checkedChildren="男"
          unCheckedChildren="女"
          defaultChecked
        />
      </a-form-item>
   </a-col >
<a-col :span="12">
      <a-form-item label="所属部门">
        <a-tree-select 
          style="width: 174px"
          :value="value"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="Please select"
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
        <a-form-item label="系统">
        <a-checkbox :checked="FWorkingState" @change="onChangeFWorkingState">在职</a-checkbox>
        <a-checkbox :checked="FSystemUser" @change="onChangeFSystemUser">系统用户</a-checkbox>
         </a-form-item>
    </a-col>


     <a-col :span="12">
       
      <a-form-item label="上级主管">
        <!-- <a-input v-decorator="['FDepartment',{rules: [{ required: false, message: '请输入所属部门' }]} ]"></a-input> -->
        <a-tree-select 
          style="width: 174px"
          :value="valueTree"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="Please select"
          allowClear
          treeDefaultExpandAll
          @change="onChangeTree"
          :treeData="treeDatas"
        ></a-tree-select>
      
      </a-form-item>

    </a-col>

</a-row>


      <a-form-item label="手机号码">
        <a-input v-decorator="['FPhone',{rules: [{ required: true, message: '请输入手机号码' }]} ]"></a-input>
      </a-form-item>

      <a-form-item label="入职日期">
        <a-date-picker
          v-decorator="['FHiredate',{rules: [{ required: true, message: '请输入入职日期码' }]} ]"
        ></a-date-picker>
      </a-form-item>

      <a-form-item label="邮件地址">
        <a-input
          v-decorator="['FEmailAddress',{rules: [{ required: true, message: '请输入正确邮件地址'}]} ]"
        ></a-input>
      </a-form-item>

      <a-collapse defaultActiveKey="1" :bordered="false">
        <a-collapse-panel
          key="1"
          style="background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden"
        >
          <template slot="header">ERP属性</template>
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

import { CreateEm, GetFMpno, Update,GetTreeListEn } from '@/api/Employee'

export default {
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
      FMpnos: '',
      Sex: true,
      FWorkingState: true,
      FSystemUser: false,
      IsEdit: false
    }
  },
  mounted() {
    
     this.LoadGetFMpno()
     this.LoadTreeData()
  },

  created() {
    //执行绑定编号的api
     //this.LoadGetFMpno()
  },


  computed: {
    organizations() {
      return this.$store.getters.organizations
    },
    
  //  FMpnos(){

 
  //     // GetFMpno()
  //     // .then(res => {
        
  //     //  return  this.FMpnos = results
  //     // })
  //     // .catch(err => {
  //     //   console.log(err)
  //     // })

  //  }


    
  },
  methods: {
    showModal(formData, isEdit) {
      this.visiable = true
      this.IsEdit = isEdit
      this.LoadGetFMpno()
      

      if (isEdit == false) {
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

      this.mdl.FMpno = this.FMpnos
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'FMpno'))
      })
    },

    Edit(formData) {
      console.log(formData)
      this.formData = formData

      this.Sex = formData.fSex == 1 ? true : false

      this.FWorkingState = formData.fWorkingState == 1 ? true : false
      this.FSystemUser = formData.fSystemUser == 1 ? true : false
      console.log(this.FWorkingState)

      this.value = '' + formData.fDepartment + ''
      this.valueTree=''+formData.id+''

      this.mdl.FMpno = formData.fMpno
      this.mdl.FName = formData.fName
      this.mdl.FPhone = formData.fPhone
      this.mdl.FHiredate = this.$moment(formData.fHiredate)
      this.mdl.FEmailAddress = formData.fEmailAddress
      this.mdl.FERPUser = formData.ferpUser
      this.mdl.FERPOfficeClerk = formData.ferpOfficeClerk
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
            'FERPOfficeClerk'
          )
        )
      })
    },

    handleSubmit() {
      var _this = this
      //新建
      if (this.IsEdit == false) {
        this.form.validateFields((err, values) => {

          //  if(this.FSystemUser==true){
          //   if((values.UserName==undefined ||values.UserName==""  ) || (values.Password==undefined ||values.Password==""))
          //   {
          //      this.$message.error("请输入账户和密码")
          //      return;
          //   }
          // }else{
          //   values.UserName="",
          //   values.Password=""
          // }

        

          var params = {
            fMpno: values.FMpno,
            fName: values.FName,
            fSex: this.Sex ? 1 : 2, //1 男 2女
            fDepartment: this.value, //部门
            fWorkingState: this.FWorkingState ? 1 : 2, //1 在职 2不在职
            fSystemUser: this.FSystemUser ? 1 : 2, //1 是系统用户 2是系统用户
            fParentId: this.valueTree,//上级主管
            fPhone: values.FPhone,
            fHiredate: values.FHiredate,
            fEmailAddress: values.FEmailAddress,
            ferpUser: values.FERPUser==''?0:values.FERPUser,
            ferpOfficeClerk: values.FERPOfficeClerk==''?0:values.ferpOfficeClerk,
          
          }

          var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if(!reg.test(values.FEmailAddress))
          {
            this.$message.error('邮箱格式不正确')
            return;
          }
          
          if(this.FWorkingState==false){

            this.$message.error('默认新增是员工必须为在职状态')
            return;
          }
          // values.fSex=this.Sex?1:2  这样赋值

          console.log(params)
          if (!err) {
            //console.log(params)
            CreateEm(params)
              .then(res => {
                if (res.result !== 0) {
                  _this.$message.success('成功')

              var params = {
                Id: _this.value,
                SkipCount: 0,
                MaxResultCount: 100
              }

               this.$store.dispatch('GetEmployees',params)

                  this.onClose()

                } else {
                  _this.$message.error('失败')
                }
              })
              .catch(err => {
                console.log(err)
                 _this.$message.error('失败')
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
          values.fDepartment=this.formData.fDepartment
          values.fUserId=this.formData.fUserId
          

        
          if (!err) {
            Update(values)
              .then(res => {
                if (res.result !== 0) {
                  _this.$message.success('成功')
               var params = {
                Id: _this.value,
                SkipCount: 0,
                MaxResultCount: 100
              }
               this.$store.dispatch('GetEmployees',params)

               this.onClose()
                } else {
                  _this.$message.error('失败')
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
         this.mdl = {},
         this.form.resetFields()
         this.valueTree=''
        this.value = '',
        this.Sex = true,
        this.FWorkingState = true,
        this.FSystemUser = false
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
      console.log(checked)
    },
    //在职状态触发
    onChangeFWorkingState(e) {
      this.FWorkingState = e.target.checked
      console.log(e)
    },
    //系统用户
    onChangeFSystemUser(e) {
      this.FSystemUser = e.target.checked
      console.log(e)
    },


//获取编号
     LoadGetFMpno(){

        GetFMpno()
      .then(res => {
        const results = res.result
        this.FMpnos = results
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
          console.log(result)
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
</style>