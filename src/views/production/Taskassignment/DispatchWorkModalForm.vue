<template>
  <a-modal
    title="新增/维护"
    :visible="visible"
    width="1000px"
    style="left:80px"
    :maskClosable="true"
    @ok="handleSubmit"
    @cancel="onClose"
  >
    <tableOperatorBtn @btnClick="handleBtnClickModal" :buttons="buttonp" :search="false"/>

    <a-table
      id="cards"
      bordered
      :dataSource="tableData"
      :columns="columnsMT"
      :pagination="false"
      :loading="loading"
      rowKey="key"
      size="small"
    >
      <template slot="fCommitAuxQty" slot-scope="text, record">
        <a-input-number v-model="record.fCommitAuxQty"></a-input-number>
      </template>
      <template slot="worker" slot-scope="text,record">
        <!-- <a-select v-model="record.fWorkerID">
          <a-select-option
            v-for="(item,index) in workers"
            :key="index"
            :value="item.id"
          >{{item.fName}}</a-select-option>
        </a-select>-->
        <a-button @click="showEmployeeForm(record)">
          {{text}}
          <a-icon type="search"></a-icon>
        </a-button>
      </template>
      <!-- 设备 -->
      <template slot="machine" slot-scope="text,record">
        <!-- <a-select v-model="record.fWorkerID">
          <a-select-option
            v-for="(item,index) in workers"
            :key="index"
            :value="item.id"
          >{{item.fName}}</a-select-option>
        </a-select>-->
        <a-button @click="showSelequipment(record)">
          {{text}}
          <a-icon type="search"></a-icon>
        </a-button>
      </template>
    </a-table>
    <Selequipment ref="Selequipment" @selectChange="handleequipmentChange"/>
    <EmployeeSelectForm ref="EmployeeSelectForm" @selectChange="handleEmployeeChange"/>
  </a-modal>
</template>

<script>
import buttons from './js/buttons'
import { columnsMT } from './js/tableheader'
import { GetDispBillAll } from '@/api/test/get'
import { SaveDispBillList, GetDailyDispBillList } from '@/api/DispBill'

export default {
  components: {
    tableOperatorBtn: () => import('@/JtComponents/TableOperatorButton'),
    EditableCellSelect: () => import('./pubilcvue/EditableCellSelect'),
    EditableCellInput: () => import('@/JtComponents/JITEditCell'),
    EmployeeSelectForm: () => import('@/JtComponents/EmployeeSelectForm'),
    Selequipment: () => import('./Selequipment')
  },
  methods: {
    handleBtnClickModal(val) {
      switch (val) {
        case '新增': {
          break
        }
        case '保存': {
          this.saveData()
          break
        }
      }
    },
    showEmployeeForm(record) {
      this.$refs.EmployeeSelectForm.show(record)
    },
    showSelequipment(record) {
      this.$refs.Selequipment.show(record)
    },
    handleEmployeeChange(emp, row) {
      console.log(row)
      this.dataSource[row.key].fWorkerID = emp.id
      this.dataSource[row.key].worker = emp.fName
    },
    handleequipmentChange(emp, row) {
      console.log(emp)
      this.dataSource[row.key].fMachineID = emp.fInterID
      this.dataSource[row.key].machine = emp.fName
    },
    saveData() {
      this.loading = true
      const data = []
      this.dataSource.forEach(row => {
        data.push({
          fid: row.fid,
          fSrcID: '',
          fShift: row.fShiftID,
          fMachineID: row.fMachineID,
          fWorkCenterID: 0,
          fCommitAuxQty: row.fCommitAuxQty,
          fWorker: row.fWorkerID,
          fmoBillNo: row.fmoBillNo,
          fmoInterID: row.fmoInterID,
          ICMODispBillId:row.dispFid
        })
      })

      const obj = {
        details: data
      }

      SaveDispBillList(obj)
        .then(res => {
          this.$message.success('派工单已生成')
          this._LoadData()
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => { 
          this.onClose()
        })
    },
    show(data) {
      this.visible = true
      this.DailyData = data
      this.loading = true
      this._LoadData()
    },
    _LoadData() {
      console.log(this.DailyData)
      var params = { fmoBillNos: [], DatelList: [] }

      this.DailyData.forEach(row => {
        params.fmoBillNos.push(row.fmoBillNo)
        params.DatelList.push(row.fDate)
      })

      console.log(params)

      GetDailyDispBillList(params)
        .then(res => {
          console.log(res)
          this.loading = false
          var result = res.result
          if (result && result.items.length > 0) {
            let index = 0
            result.items.forEach(e => {
              e.key = index
              index++
              e.fDate = this.$moment(e.fDate).format('YYYY-MM-D')
              e.fBillTime = this.$moment(e.fBillTime).format('YYYY-MM-DD hh:mm:ss')
            })

            this.dataSource = result.items
          }
        })
        .catch(error => {
          this.loading = false
        })
    },
    handleSubmit() {
        this.saveData()
    },
    onCellChange(rowData, dataIndex, value) {
      const dataSource = [...this.dataSource]
      const row = this.dataSource.find(r => r.key === rowData.key)
      if (row) {
        row[dataIndex] = value
        this.dataSource = dataSource
      }
    },
    onClose() {
       this.$emit('selectChange')
      this.dataSource = []
      this.DailyData = {}
      this.visible = false
    }
  },
  data() {
    return {
      buttonp: buttons.buttonps,
      dataSource: [],
      visible: false,
      DailyData: {},
      loading: false,
      columnsMT: columnsMT,
      editColumns: ['fCommitAuxQty'],
      selectColumns: []
    }
  },
  computed: {
    tableData() {
      var result = []
      var index = 0

      for (let i = 0; i < this.dataSource.length; i++) {
        const row = this.dataSource[i]
        row.key = index
        index++
        result.push(row)
      }

      return result
    },
    workers() {
      if (this.$store.getters.workers.length === 0) {
        this.$store.dispatch('GetWorkers')
      }

      return this.$store.getters.workers
    }
  }
}
</script>

<style  scoped>
</style>