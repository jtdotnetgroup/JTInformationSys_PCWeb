<template>
  <div>
    <a-table :dataSource="data" :columns="columns"></a-table>
  </div>
</template>

<script>
import { GetAllDispBill } from '@/api/DispBill'
import {GenericColumns}from '@/utils/helper/ColumnsHelper'

export default {
  name: 'dispatchtable',
  data() {
    return {
      data: [],
      columnsDic: {
        id: 'id',
        fDate: 'fDate',
        fid: 'fid',
        fmoBillNo: '任务单号',
        fmoInterID: '',
        fBillNo: '派工单号',
        fBillTime: '派工日期',
        machine: '设备',
        fMachineID: 'fMachineID',
        worker: '员工',
        fWorkerID: '',
        fShift: '班次',
        fCommitAuxQty: '派工数量',
        dispFid: 'dispFid',
        fStatus:'状态'
      }
    }
  },
  computed: {
      columns() {
          return  GenericColumns(this.columnsDic)
      }
  },
  props: {
    FMobillno: {
      type: String
    },
    FMointerId: {
      type: Number
    }
  },
  methods: {
    getData(FMobillno) {
        let where='FMOBillNo="' + FMobillno + '"'
        where+="&& !String.IsNullOrEmpty(FBillNo)"
      const params = {
        Where: where
      }

      GetAllDispBill(params).then(res => {
        res.result.items.map(e=>{
            e.fBillTime=this.$moment(e.fBillTime).format('YYYY-MM-D')
        })
        this.data = res.result.items
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>