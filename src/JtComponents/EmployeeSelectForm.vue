<template>
  <a-modal :visible="visible" title="选择员工" :width="800" @ok="handleSubmit" @cancel="onClose">
    <a-form :form="form" layout="inline">
      <a-form-item label="员工姓名">
        <a-input v-model="empName" placeholder="请输入员工姓名搜索"></a-input>
      </a-form-item>
      <a-form-item label="车间">
        <a-select v-model="workcenter" style="width:150px" allowClear>
          <a-select-option
            v-for="(item,index) in workcenters"
            :key="index"
            :value="item.id"
          >{{item.displayName}}</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>

    <a-table
      :dataSource="workers"
      :columns="columns"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :scroll="{x:1000,y:400}"
      :pagination="false"
      :customRow="setRow"
    >
      <template slot="fDepartment" slot-scope="record,index">{{record.displayName}}</template>
    </a-table>
  </a-modal>
</template>

<script>
import { GenericColumns } from '@/utils/helper/ColumnsHelper'

export default {
  name: 'EmployeeSelectForm',
  data() {
    return {
      visible: false,
      form: this.$form.createForm(this),
      empName: '',
      workcenter: '',
      cols: {
        fMpno: '工号',
        fName: '姓名',
        fSex: '性别',
        fWorkingState: '是否在职',
        fSystemUser: '系统用户',
        fPhone: '联系电话',
        department: '部门'
      },
      selectedRowKeys: [],
      selectedRows: [],
      rowData: {}
    }
  },
  props:{
    value:{
      type:String|Number
    }
  },
  computed: {
    workcenters() {
      if (this.$store.getters.workcenters.length === 0) {
        this.$store
          .dispatch('GetWorkCenters')
          .then(() => {
            return this.$store.getters.workcenters
          })
          .catch(err => {
            console.log(err)
          })
      }

      return this.$store.getters.workcenters
    },
    workers() {
      if (this.$store.getters.workers.length === 0) {
        this.$store.dispatch('GetWorkers')
      }

      let result = this.$store.getters.workers
      //过滤员工姓名
      if (!!this.empName) {
        result = result.filter(e => {
          return e.fName.indexOf(this.empName) >= 0
        })
      }
      //过滤部门
      if (!!this.workcenter) {
        result = result.filter(e => {
          return e.department.id === this.workcenter
        })
      }

      return result
    },
    columns() {
      return GenericColumns(this.cols)
    }
  },
  methods: {
    show(record) {
      this.rowData = record
      this.visible = true
    },
    onClose() {
      this.visible = false
      this.rowData = {}
      this.selectedRowKeys=[]
      this.selectedRows=[]
    },
    handleSubmit() {
      if (this.selectedRowKeys.length > 1) {
        this.$message.warning('不能同时选择多名员工')
        return
      }

      this.$emit('selectChange', this.selectedRows[0], this.rowData)
      this.$emit('input',this.selectedRows[0].id)
      this.onClose()
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    setRow(record) {
      return {
        on: {
          click: () => {
            // this.selectedRowKeys=[]
            // this.selectedRowKeys=[]
            // this.selectedRowKeys.push(record.id)
            // this.selectedRows.push(record)
          }
        }
      }
    },
    
  }
}
</script>

<style lang="scss" scoped>
</style>