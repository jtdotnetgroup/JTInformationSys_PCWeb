<template>
  <a-modal
    title="新增/维护"
    :visible="visiable"
    width="1000px"
    style="left:80px"
    :maskClosable="true"
    @ok="handleSubmit"
    @cancel="visiable=false"
  >
    <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttons" :search="false"/>

    <a-form layout="inline" :form="form" @change="handleFormChange">
      <a-form-item label="任务单号">
        <a-input v-decorator="['任务单号',{ initialValue: this.formData.任务单号}]" disabled></a-input>
      </a-form-item>
      <a-form-item label="计划开工">
        <a-date-picker
          disabled
          v-decorator="['计划开工',{ initialValue: this.$moment(this.formData.计划开工日期)}]"
        ></a-date-picker>
      </a-form-item>
      <a-form-item label="计划完工">
        <a-date-picker
          disabled
          v-decorator="['计划完工',{ initialValue: this.$moment(this.formData.计划完工日期)}]"
        ></a-date-picker>
      </a-form-item>
      <a-form-item label="产品编码">
        <a-input disabled v-decorator="['产品编码',{ initialValue: this.formData.产品编码}]"></a-input>
      </a-form-item>
      <a-form-item label="产品名称">
        <a-input disabled v-decorator="['产品名称',{ initialValue: this.formData.产品名称}]"></a-input>
      </a-form-item>
      <a-form-item label="规格型号">
        <a-input disabled v-decorator="['规格型号',{ initialValue: this.formData.规格型号}]"></a-input>
      </a-form-item>
      <a-form-item label="计划数量">
        <a-input disabled v-decorator="['计划数量',{ initialValue: this.formData.计划生产数量}]"></a-input>
      </a-form-item>
      <a-form-item label="排产数量">
        <a-input disabled v-decorator="['排产数量',{ initialValue: this.formData.排产数量}]"></a-input>
      </a-form-item>
    </a-form>

    <a-table id="table"
      size="small"
      rowKey="fSrcID"
      :dataSource="dataSource"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :pagination="false"
      :bordered="true"
      :loading="dataLoading"
    ></a-table>
  </a-modal>
</template>

<script>
import columns from './DispatchColumns'
export default {
  components: {
    tableOperatorBtn: () => import('@/JtComponents/TableOperatorButton')
  },
  data() {
    return {
      visiable: false,
      buttons: [
        { text: '结转', icon: '', type: 'default' },
        { text: '保存', icon: '', type: 'default' },
        { text: '审核', icon: '', type: 'default' },
        { text: '派工', icon: '', type: 'default' },
        { text: '新建', icon: '', type: 'default' },
      ],
      form: this.$form.createForm(this),
      formData: {},
      columns: columns,
      dataLoading: false,
      selectedRowKeys: [],
      selectedRows: [],
      dataSource: [
        {
          fSrcID: '',
          日期: '',
          机台: 0,
          班组: 0,
          操作员: '',
          派工数量: 0,
          完成数量: 0,
          合格数量: 0,
          fmoBillNo: '',
          fmoInterID: '',
          计划数量: 0,
          id: null
        }
      ]
    }
  },
  props: {
    value: {
      type: Object
    }
  },
  methods: {
    show(formData) {
      this.visiable = true
      this.formData = formData
    },
    handleBtnClick(value) {},
    handleSubmit() {
      const {
        form: { validateFields }
      } = this
      validateFields((err, values) => {
        if (!err) {
          let result = {}

          for (const key in values) {
            if (values.hasOwnProperty(key)) {
              const element = values[key]
              result[key] = element ? element.toString() : undefined
            }
          }

          this.$emit('submit', result)
        } else {
          console.log(err)
        }
      })
    },
    handleFormChange(changedFields) {
      this.formData = { ...this.formData, ...changedFields }
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>

<style scoped>
#table{
    margin-top: 10px;
}

</style>