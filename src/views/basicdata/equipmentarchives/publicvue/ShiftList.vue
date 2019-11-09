<template>
  <a-modal :visible="visible" title="班次信息" @cancel="onClose" :width="800" @ok="handleSubmit">
    <Buttons :buttons="buttons" :search="false" @btnClick="handelBtnClick" />
    <a-table
      size="small"
      :dataSource="tableData"
      :columns="columns"
      :pagination="false"
      key="index"
    >
      <template slot="fEmployeeID" slot-scope="text, record">
        <!-- <a-select style="width: 150px" @change="handleEmployeeChange" v-model="record.fEmployeeID">
          <a-select-option
            v-for="(item,index) in workers"
            :key="index"
            :value="item.id"
          >{{item.fName}}</a-select-option>
        </a-select>-->
        <a-button @click="showSelectEmp(record)">
          {{record.fEmpName}}
          <a-icon type="search"></a-icon>
        </a-button>
      </template>
      <template slot="fShift" slot-scope="text, record">
        <a-input @change="e=>handleShiftChange(e.target.value,record)" v-model="record.fShift"></a-input>
      </template>
      <template slot="action" slot-scope="text,record">
        <a-popconfirm title="确定要删除这条记录吗？" @confirm="() => handleDeleteRow(record)">
          <a-button type="danger">删除</a-button>
        </a-popconfirm>
        <!-- <a-button type="" v-if="record.isEdit" >保存</a-button> -->
      </template>
    </a-table>
    <SelectEmployee ref="SelectEmployee" @selectChange="handleEmployeeChange"/>
  </a-modal>
</template>

<script>
import { columnShift } from '../js/columns'
import { buttonShift } from '../js/buttons'
import { CreateOrUpdateShift, GetShiftList, DeleteShift } from '@/api/Equipment'
export default {
  components: {
    Buttons: () => import('@/JtComponents/TableOperatorButton'),
    SelectEmployee: () => import('@/JtComponents/EmployeeSelectForm')
  },
  data() {
    return {
      visible: false,
      columns: columnShift,
      EquipmentID: 0,
      tableData: [],
      buttons: buttonShift,
      loading: false
    }
  },
  methods: {
    show(EquipmentID) {
      this.visible = true
      this.EquipmentID = EquipmentID
      this._loadData()
    },
    showSelectEmp(record){
      this.$refs.SelectEmployee.show(record);
    },
    handleEmployeeChange(emp,row) {
      this.tableData[row.index].fEmployeeID=emp.id
      this.tableData[row.index].fEmpName=emp.fName
    },
    handleShiftChange(value, record) {
      record.shiftName = value
    },
    onClose() {
      this.visible = false
      this.tableData = []
    },
    handelBtnClick(val) {
      switch (val) {
        case '新增': {
          if (!this.tableData) {
            this.tableData = []
          }

          this.tableData.push({
            fEqiupmentID: this.EquipmentID,
            fEmployeeID: '',
            fShift: '',
            index: this.tableData.length,
            id: 0
          })
          break
        }
      }
    },
    handleDeleteRow(row) {
      if (row.id !== 0) {
        DeleteShift(row)
          .then(res => {
            this.tableData = this.tableData.filter(e => {
              return e.index !== row.index
            })

            this.tableData.forEach(r => {
              r.index = this.tableData.indexOf(r)
            })
          })
          .catch(err => {
            this.$message.error('服务器异常')
          })
      } else {
        this.tableData = this.tableData.filter(e => {
          return e.index !== row.index
        })

        this.tableData.forEach(r => {
          r.index = this.tableData.indexOf(r)
        })
      }
    },
    _loadData() {
      //先获取所有车间员工名称单
      this.$store.dispatch('GetWorkers')
      const params = {
        Id: this.EquipmentID
      }
      this.loading = true
      GetShiftList(params)
        .then(res => {
          console.log(res)
          const { result } = res
          this.tableData = result
          this.tableData.forEach(r => {
            r.index = this.tableData.indexOf(r)
          })
          this.loading = false
        })
        .catch(err => {
          console.log(err)
          this.loading = false
        })
    },
    handleSubmit() {
      const data = this.tableData
      this.loading = true
      CreateOrUpdateShift(data)
        .then(res => {
          this.$message.success('保存成功')
          this.loading = false
          this.onClose()
          this.tableData = []
        })
        .catch(err => {
          this.$message.error('服务器异常，请稍候再试')
          this.loading = false
          console.log(err)
        })
    }
  },
  mounted() {
    this._loadData()
  },
  computed: {
    workers() {
      //所有车间员工名单
      return this.$store.getters.workers
    }
  }
}
</script>

<style lang="scss" scoped>
</style>