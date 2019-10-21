<template>
  <a-modal
    :visible="visible"
    title="选择员工"
    :width="800"
    @ok="handleSubmit"
    @cancel="onClose"
    :maskClosable="false"
  >
    <a-form :loading="loading" :form="form" layout="inline">
      <a-form-item label="员工姓名">
        <a-input v-model="empName"   placeholder="请输入员工姓名搜索"></a-input>
      </a-form-item>
      <a-form-item label="车间">
        <a-select v-model="workcenter" style="width:150px" @change="departmentChange" allowClear>
          <a-select-option
            v-for="(item,index) in workcenters"
            :key="index"
            :value="item.id"
          >{{item.displayName}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="searchEmp">搜索</a-button>
      </a-form-item>
    </a-form>

    <a-table
      :dataSource="workers"
      :columns="columns"
      :rowSelection="{selectedRowKeys:rowSelection. selectedRowKeys, onChange:rowSelection.onChange}"
      :scroll="{x:1000,y:400}"
      rowKey="id"
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
      rowData: {},
      loading:false,
      rowSelection: {
        selectedRowKeys: [],
        selectedRows: [],
        onChange: (keys, rows) => {
          this.rowSelection.selectedRowKeys = keys
          this.rowSelection.selectedRows = rows
        }
      },

      //行点击事件
      customRowClick: record => ({
        on: {
          click: () => {

            this.rowSelection.selectedRowKeys=[];
            this.rowSelection.selectedRows=[];
            this.rowSelection.selectedRows.push(record);
            this.rowSelection.selectedRowKeys.push(record.id);

          }
        }
      })
    }
  },
  props: {
    value: {
      type: String | Number
    }
  },
  computed: {
    workcenters() {
      // if (this.$store.getters.workcenters.length === 0) {
      //   this.$store
      //     .dispatch('GetWorkCenters')
      //     .then(() => {
      //       return this.$store.getters.workcenters
      //     })
      //     .catch(err => {
      //       console.log(err)
      //     })
      // }

      return this.$store.getters.workcenters
    },
    workers() {

      let result = this.$store.getters.workers

      return result
    },
    columns() {
      return GenericColumns(this.cols)
    },
    loading() {
      return this.$store.state.loading
    }
  },
  created() {
    this._getData()
  },
  methods: {
    _getData() {
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

      if(this.$store.getters.workers.length===0){
        this.$store.dispatch('GetWorkers',{})
      }
    },
    searchEmp(){
      this.empNameChange("");
    },
     empNameChange(e) {

      this.empName=this.empName.trim()

       const params = {
        Where: 'FName.Contains("' + this.empName + '")',
        SkipCount: 0,
        MaxResultCount: 50
      }

      this.loading=true;

      //过滤部门
      if (!!this.workcenter) {
        params.Where += '&&Department.id=' + this.workcenter
      }

        this.$store.dispatch('GetWorkers', params).then(()=>{
          this.loading=false;
        })

    },
    departmentChange(){
      this.empNameChange("");
    },
    show(record) {
      this.rowData = record
      this.visible = true
    },
    onClose() {
      this.visible = false
      this.rowData = {}
      this.rowSelection.selectedRowKeys = []
      this.rowSelection.selectedRows = []
    },
    handleSubmit() {
      if (this.rowSelection.selectedRowKeys.length > 1) {
        this.$message.warning('不能同时选择多名员工')
        return
      }

      this.$emit('selectChange', this.rowSelection.selectedRows[0], this.rowData)
      this.$emit('input', this.rowSelection.selectedRows[0].id)
      this.onClose()
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.rowSelection.selectedRowKeys = selectedRowKeys
      this.rowSelection.selectedRows = selectedRows
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>