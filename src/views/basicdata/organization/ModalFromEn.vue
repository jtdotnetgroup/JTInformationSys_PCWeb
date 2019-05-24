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
        <a-input v-decorator="['员工编码',{ initialValue: this.formData.任务单号}]" disabled></a-input>
      </a-form-item>
      <a-form-item label="员工姓名">
        <a-input v-decorator="['员工姓名',{ initialValue: this.formData.任务单号}]" ></a-input>
      </a-form-item>
      <a-form-item label="性别">
        
       <a-switch checkedChildren="男" unCheckedChildren="女" defaultChecked/>
      </a-form-item>
      <a-form-item label="所属部门">

        <a-input v-decorator="['所属部门',{ initialValue: this.formData.产品名称}]"></a-input>

      </a-form-item>
      <a-form-item label="系统">
          <a-checkbox >在职</a-checkbox>
      <a-checkbox >系统用户</a-checkbox>
      </a-form-item>
      <a-form-item label="上级主管">
       <a-tree-select
          showSearch
          style="width: 300px"
          :value="value"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="Please select"
          allowClear
          treeDefaultExpandAll
          @change="onChange"
        >
          <a-tree-select-node value="捷特公司" title="捷特公司" key="0-1">
            <a-tree-select-node value="捷特公司 1-0" title="捷特公司 1-0" key="0-1-1">
              <a-tree-select-node :selectable="false" value="leaf1" title="my leaf" key="random"/>
              <a-tree-select-node value="leaf2" title="your leaf" key="random1"/>
            </a-tree-select-node>
            <a-tree-select-node value="parent 1-1" title="parent 1-1" key="random2">
              <a-tree-select-node value="sss" key="random3">
                <b style="color: #08c" slot="title">sss</b>
              </a-tree-select-node>
            </a-tree-select-node>
          </a-tree-select-node>
        </a-tree-select>

      </a-form-item>
      <a-form-item label="手机号码">
        <a-input v-decorator="['手机号码',{ initialValue: this.formData.产品编码}]"></a-input>
      </a-form-item>

      <a-form-item label="入职日期">  
         <a-date-picker
          disabled
          v-decorator="['入职日期',{ initialValue: this.$moment(this.formData.计划开工日期)}]"
        ></a-date-picker>
      </a-form-item>

      <a-form-item label="邮件地址">  
         <a-input v-decorator="['邮件地址',{ initialValue: this.formData.产品编码}]"></a-input>
      </a-form-item>


   <a-collapse defaultActiveKey="1" :bordered="false">
      <a-collapse-panel key="1" style="background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden">
        <template slot="header">
          ERP属性
        </template>
        <a-form-item label="对应ERP用户">  
         <a-input v-decorator="['对应ERP用户',{ initialValue: this.formData.产品编码}]"></a-input>
      </a-form-item>
        <a-form-item label="对应ERP职员">  
         <a-input v-decorator="['对应ERP职员',{ initialValue: this.formData.产品编码}]"></a-input>
      </a-form-item>

      </a-collapse-panel>
     
    </a-collapse>




    </a-form>
  </a-modal>
</template>

<script>
export default {
  data() {
    return {
      visiable: false,
      formData: {},
      form: this.$form.createForm(this),
      treeExpandedKeys: [],
      value: undefined
    }
  },
  methods: {
    showModal(formData) {
      this.visiable = true
    },

    handleSubmit() {},
    onClose() {
      this.visiable = false
    },
    handleFormChange() {},
    onChange(value) {
      console.log(value)
      this.value = value
    }
  }
}
</script>

<style  scoped>

.selectclass {
  width: 212px;
}


</style>