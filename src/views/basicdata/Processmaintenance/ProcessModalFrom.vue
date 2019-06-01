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
        <a-col :span="12">
          <a-form-item label="产品名称"  style="margin-left:16px">
            <a-select
          
              showSearch
              :value="value"
              placeholder="产品名称"
              style="width: 200px"
              :defaultActiveFirstOption="false"
              :showArrow="false"
              :filterOption="false"
              @search="handleSearch"
              @change="handleChange"
              :notFoundContent="null"
            >
              <a-select-option v-for="d in data" :key="d.fItemID">{{d.fName}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="不良项目代码">
            <a-input
              v-decorator="['fNumber',{rules: [{required:true,message: '请输入不良项目代码' }],initialValue:this.formData.fNumber}] "
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-item label="不良项目名称">
            <a-input
              v-decorator="['FName',{rules: [{required:true,message: '请输入不良项目名称' }],initialValue:this.formData.fName}]"
            ></a-input>
          </a-form-item>
        </a-col>
        <!-- <a-col :span="12">
          <a-form-item label="是否启用">
            <a-switch
              style="margin-left: 10px;"
              @change="onChangechecked"
              :checked="FDeleted"
              checkedChildren="启用"
              unCheckedChildren="不启用"
              defaultChecked
            />
          </a-form-item>
        </a-col> -->
      </a-row>

      <a-form-item label="备注说明">
        <a-textarea
          style="width:700px"
          v-decorator="['FRemark',{rules: [],initialValue:this.formData.fRemark}]"
          placeholder="备注说明"
          :autosize="{ minRows: 2, maxRows: 6 }"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { GetICItem,Create,Update } from '@/api/TB_BadItemRelation'

export default {
  data() {
    return {
      visiable: false,
      formData: {},
      form: this.$form.createForm(this),
      //FDeleted: false,
      data: [],
      value: undefined,
      IsEdit: false
    }
  },
  methods: {
    showModal(formData) {
      this.visiable = true
      if (formData.fid == '') {
        this.formData = formData
        this.IsEdit = false
        // this.FDeleted = false
      } else {
        this.IsEdit = true
        this.formData = formData
       // this.FDeleted = formData.fDeleted
        this.value = formData.fItemName
      }
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {

         

          if(this.formData.fid==''){
          //values.fDeleted=this.FDeleted
          values.fItemID=this.value
          values.fOperID=this.formData.key
          values.fid=0

          }else{
         // values.fDeleted=this.formData.fDeleted!==''?this.FDeleted:this.formData.fDeleted

             var reg=/^[0-9]*$/

            var fItemID=0
            if(!reg.test(this.value)){
              fItemID=this.formData.fItemID
            }else{
              fItemID=this.value
            }

          values.fItemID=this.formData.fItemID!==''?fItemID:this.formData.fItemID
          values.fid=this.formData.fid==''?0:this.formData.fid
          values.fOperID=this.formData.fOperID
          }
         
          console.log(values)
        var request=this.IsEdit==false?Create(values):Update(values)
        request.then(res=>{
            this.$emit("addSuccess")
            this.$message.success('保存成功')         
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
      this.value = undefined
      this.form.resetFields()
      this.formData = []
    },
    handleSearch(value) {
      this._loadDataProduct(value)

      //fetch(value, data => this.data = data);
    },

    handleChange(value) {
      console.log(value)
      this.value = value
    },

    //远程搜索产品
    _loadDataProduct(value) {
      var _this = this

      var params = {
        FName: value
      }

      GetICItem(params)
        .then(res => {
          this.data = []
          const result = res.result
          if (result) {
            this.data = result
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    handleFormChange() {},

    // //启用或者不启用
    // onChangechecked(checked) {
    //   this.FDeleted = checked
    // }
  }
}
</script>

<style lang="scss" scoped>
</style>