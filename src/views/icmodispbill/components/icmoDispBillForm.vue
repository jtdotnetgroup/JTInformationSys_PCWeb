<template>
  <a-modal
    title="派工单"
    :maskClosable="false"
    :visible="visiable"
    @cancel="visiable=false"
    @ok="handleSubmit"
    width="800px"
  >
    <a-form layout="inline">
      <div class="layout">
        <a-form-item
          label="派工单号"
          :labelCol="layoutConfig.labelCol"
          :wrapperCol="layoutConfig.wrapperCol"
        >
          <a-input disabled :value="BillObject.fBillNo"></a-input>
        </a-form-item>
        <a-form-item
          label="派工日期"
          :labelCol="layoutConfig.labelCol"
          :wrapperCol="layoutConfig.wrapperCol"
        >
          <a-input disabled :value="BillObject.fDate"></a-input>
        </a-form-item>
        <a-form-item
          label="任务单号"
          :labelCol="layoutConfig.labelCol"
          :wrapperCol="layoutConfig.wrapperCol"
        >
          <a-input disabled :value="BillObject.fmoBillNo"></a-input>
        </a-form-item>
        <a-form-item
          label="设备"
          :labelCol="layoutConfig.labelCol"
          :wrapperCol="layoutConfig.wrapperCol"
        >
          <a-input disabled :value="BillObject.machine"></a-input>
        </a-form-item>
        <a-form-item
          label="员工"
          :labelCol="layoutConfig.labelCol"
          :wrapperCol="layoutConfig.wrapperCol"
        >
          <!-- <a-input :disabled="!canEdit" :value="BillObject.worker"></a-input> -->
          <a-button :disabled="!canEdit" type="default" @click="showEmpSelectForm">{{BillObject.worker}}
              <a-icon type="search"></a-icon>
          </a-button>
        </a-form-item>
        <a-form-item
          label="班次"
          :labelCol="layoutConfig.labelCol"
          :wrapperCol="layoutConfig.wrapperCol"
        >
          <a-input disabled :value="BillObject.fShift"></a-input>
        </a-form-item>
        <a-form-item
          label="派工数量"
          :labelCol="layoutConfig.labelCol"
          :wrapperCol="layoutConfig.wrapperCol"
        >
          <a-input-number :disabled="!canEdit" v-model="BillObject.fCommitAuxQty"></a-input-number>
        </a-form-item>
        <a-form-item
          label="打包数量"
          :labelCol="layoutConfig.labelCol"
          :wrapperCol="layoutConfig.wrapperCol"
        >
          <a-input-number :disabled="!canEdit" v-model="BillObject.fPackQty"></a-input-number>
        </a-form-item>
        <a-form-item
          label="状态"
          :labelCol="layoutConfig.labelCol"
          :wrapperCol="layoutConfig.wrapperCol"
        >
          <a-input disabled :value="BillObject.fStatus"></a-input>
        </a-form-item>
      </div>
    </a-form>
    <EmployeeSelectForm ref="EmployeeSelectForm" @selectChange="handleEmployeeChange" />
  </a-modal>
</template>

<script>
import{UpdateDispBill}from '@/api/DispBill'
export default {
  name: 'icomDispBillForm',
  components: {
    EmployeeSelectForm: () => import('@/JtComponents/EmployeeSelectForm'),
  },
  data() {
    return {
      //派工单对象
      BillObject: {},
      visiable: false,
      columnsDic: {
        id: 'id',
        fDate: '派工日期',
        fid: 'fid',
        fmoBillNo: '任务单号',
        fmoInterID: '',
        fBillNo: { title: '派工单号', width: 250 },
        fBillTime: '制单日期',
        machine: '设备',
        fMachineID: 'fMachineID',
        worker: '员工',
        userName: '员工账号',
        fWorkerID: '',
        fShift: '班次',
        fCommitAuxQty: '派工数量',
        dispFid: 'dispFid',
        fStatus: '状态',
        fPackQty: '打包数量'
      },
      layoutConfig: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      }
    }
  },
  methods: {
    show(bill) {
      if (!!bill) {
        this.BillObject = bill
        this.visiable = true
      }
    },
    handleSubmit(){
        if(this.canEdit){
            const param={
                FWorker:this.BillObject.fWorkerID,
                FCommitAuxQty:this.BillObject.fCommitAuxQty,
                FPackQty:this.BillObject.fPackQty,
                FBillno:this.BillObject.fBillNo
            }
            UpdateDispBill(param)
            .then(res=>{
                this.$message.success('操作成功')
                this.visiable=false;
            })
            .catch(err=>{
                this.$message(err)
            })
        }
        
    },
    handleEmployeeChange(emp, row) {
      this.BillObject.fWorkerID = emp.id
      this.BillObject.worker = emp.fName
    },
    showEmpSelectForm(){
        this.$refs.EmployeeSelectForm.show(this.BillObject)
    }
  },
  computed: {
    fields() {
      const keys = Object.keys(this.BillObject)
      const result = []
      keys.forEach(k => {
        const label = this.columnsDic[k]
        if (!!label) {
          const fieldItem = { id: k, label: label }
          result.push(fieldItem)
        }
      })

      return result
    },
    canEdit() {
      return this.BillObject.fStatus === '待开工'
    }
  }
}
</script>

<style  scoped>
.layout {
  display: grid;
  grid-template-columns: repeat(2, 50%);
}
</style>