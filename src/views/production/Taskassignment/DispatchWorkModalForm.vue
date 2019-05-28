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
    >
      <template  slot="fCommitAuxQty" slot-scope="text, record">
        <a-input-number v-model="record.fCommitAuxQty"></a-input-number>
      </template>
      <template slot="fWorkerID" slot-scope="text,record">
        <a-select v-model="record.fWorkerID">
          <a-select-option v-for="(item,index) in workers" :key="index" :value="item.id">{{item.fName}}</a-select-option>
        </a-select>
      </template>
      

      
    </a-table>
  </a-modal>
</template>

<script>
import buttons from './js/buttons'
import {columnsMT} from './js/tableheader'
import { GetDispBillAll } from '@/api/test/get'
import {SaveDispBillList,GetDailyDispBillList} from '@/api/DispBill'

export default {
  components: {
    tableOperatorBtn: () => import('@/JtComponents/TableOperatorButton'),
    EditableCellSelect:()=>import('./pubilcvue/EditableCellSelect'),
    EditableCellInput:()=>import('@/JtComponents/JITEditCell')
  },
  methods: {
    handleBtnClickModal(val) {
      switch(val){
        case '新增':{
          
          var index=this.dataSource.length;

          this.dataSource.push({
            日期:this.DailyData.日期,
            fSrcID:this.DailyData.fSrcID,
            key:index,
            fid:'',
            fmoBillNo:this.DailyData.fmoBillNo,
            fmoInterID:this.DailyData.fmoInterID
          })
          break;
        }
        case '保存':{
          this.loading=true
          const data=[]
          this.dataSource.forEach(row => {
            data.push({
              fid:row.fid,
              fSrcID:this.DailyData.fid,
              fShift:row.fShiftID,
              fMachineID:row.fMachineID,
              fWorkCenterID:0,
              fCommitAuxQty:row.fCommitAuxQty,
              fWorker:row.fWorkerID,
              fmoBillNo:this.DailyData.fmoBillNo,
              fmoInterID:row.fmoInterID
            })
          });

          const obj={
            details:data
          }

          SaveDispBillList(obj).then(res=>{
            this.loading=false;
            this.onClose();
          }).catch(err=>{
            console.log(err)
            this.loading=false;
          })
          break;
        }
      }
    },
    show(data) {
      this.visible = true
      this.DailyData = data
      this.loading=true;
      this._LoadData();
    },
    _LoadData() {
      var params={fmoBillNos:this.DailyData.fmoBillNo,DatelList:this.DailyData.fDate}
      GetDailyDispBillList(params).then(res=>{
        console.log(res)
        this.loading=false
        var result=res.result;
        if(result&&result.items.length>0){
          let index=0
          result.items.forEach(e => {
            e.key=index;
            index++;
            e.fDate=this.$moment(e.fDate).format('YYYY-MM-D')
          });

          this.dataSource=result.items
        }
      }).catch(error=>{
        this.loading=false
      })
    },
    handleSubmit(){

    },
    onCellChange(rowData,dataIndex,value){
      const dataSource=[...this.dataSource]
      const row=this.dataSource.find(r=>r.key===rowData.key)
      if(row){
        row[dataIndex]=value
        this.dataSource=dataSource
      }
    },
    onClose(){
      this.dataSource=[]
      this.DailyData={}
      this.visible=false
    }
  },
  data() {
    return {
      buttonp: buttons.buttonps,
      dataSource: [],
      visible: false,
      DailyData:{},
      loading:false,
      columnsMT:columnsMT,
      editColumns:['fCommitAuxQty'],
      selectColumns:[]
    }
  },
  computed: {
    tableData(){
      var result=[]
      var index=0;
      
      for (let i = 0; i < this.dataSource.length; i++) {
        const row = this.dataSource[i];
        row.key=index
        index++;
        console.log(row)
        
        result.push(row)
      }

      return result;
    },
    workers(){

      if(this.$store.getters.workers.length===0){
        this.$store.dispatch('GetWorkers')
      }

      return this.$store.getters.workers
    }
  }
}
</script>

<style  scoped>
</style>