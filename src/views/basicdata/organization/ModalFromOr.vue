<template>
  <a-modal
    title="新增/维护"
    :visible="visiable"
    width="650px"
    style="left:80px"
    :maskClosable="false"
    @ok="handleSubmit"
    @cancel="onClose"
  >
    <a-form layout="inline" :form="form" @change="handleFormChange">
      <a-form-item label="组织编码">
        <a-input v-decorator="['Code',{rules: [{ required: true, message: '请输入组织编码' }]} ]" disabled></a-input>
      </a-form-item>
      <a-form-item label="组织名称">
        <a-input v-decorator="['DisplayName',{rules: [{ required: true, message: '请输入组织名称' }]}]"></a-input>
      </a-form-item>
      <a-form-item label="上级组织">
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
      <a-form-item label="组织类型">
        <a-select class="selectclass" v-decorator="['OrganizationType',{rules: [{ required: true, message: '请选择组织类型' }]} ]">
          <a-select-option
            v-for="(item,index) in Soptions"
            :value="item.id"
            :key="index"
            @click="SelectClick(item.id)"
          >{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="数据连接">
        <a-input v-decorator="['DataBaseConnection',{rules: []}]"></a-input>
      </a-form-item>
      <a-form-item label="组织负责人">
        <a-input v-decorator="['ERPOrganizationLeader',{rules: []}]"></a-input>
      </a-form-item>
      <a-form-item label="ERP组织">
        <a-input v-decorator="['ERPOrganization',{rules: []}]"></a-input>
      </a-form-item>

      <a-form-item label="备注说明">
        <a-textarea
          style="width:550px"
          v-decorator="['Remark',{rules: []}]"
          placeholder="备注说明"
          :autosize="{ minRows: 2, maxRows: 6 }"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { GetSelectOptio, CreateOu } from '@/api/Organization'
import { close, exists } from 'fs'
import pick from 'lodash.pick'
export default {
  data() {
    return {
      visiable: false,
      formData: {},
      form: this.$form.createForm(this),
      treeExpandedKeys: [],
      value: '',
      Soptions: [],
      SelectClickValue: '',
      mdl: {}

      //organizations:[]
    }
  },
  mounted() {
    this._LoadData()
  },

  methods: {
    //查询下组织类型的操作

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

    showModal(formData) {
      this.visiable = true
      this.formData = formData
      var key = ''
      if (!!formData.selectedNodes) {key = formData.selectedNodes[0].key
        if (
          !!formData.selectedNodes[0].componentOptions.children &&
          formData.selectedNodes[0].componentOptions.children.length > 0
        ) {
          key += '.00' + (formData.selectedNodes[0].componentOptions.children.length + 1)
          var ids = formData.selectedNodes[0].componentOptions.propsData.dataRef.id
          this.value = '' + ids + ''
          //console.log(formData.selectedNodes[0].componentOptions.propsData.dataRef.id)
        } else {
          key += '.00' + 1
          var ids = formData.selectedNodes[0].componentOptions.propsData.dataRef.id
          this.value = '' + ids + ''
        }
      } else {
        key = formData.Code
      }

      this.mdl.Code = key



      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'Code'))
      })



    },

//提交的方法
    handleSubmit() {
      var _this = this
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
              // this.$message.error("请输入账户和密码")
              // return;

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
                _this.$message.success('成功')
                var params = {
                  ParentID: 0
                }
                this.$store.dispatch('GetOrganizations', params)
                this.onClose()
              }else{
                  _this.$message.error('失败')
                   this.onClose()
              }
              
            })
            .catch(err => {
              console.log(err)
                _this.$message.error(''+err+'')
            })
        }
      })
    },
    onClose() {
      this.visiable = false,
       this.form.resetFields()
    },
    handleFormChange() {},
    onChange(value) {
      console.log(value)
      this.value = value
    },
    SelectClick(obj) {
      this.SelectClickValue = obj
    }
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
</style>