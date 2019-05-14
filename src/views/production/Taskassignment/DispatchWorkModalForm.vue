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
      <template v-for="(col,index) in editColumns" :slot="col" slot-scope="text, record">
        <EditableCellInput :key="index" :text="text" @change="onCellChange(record, col, $event)"/>
      </template>

      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.fSrcID)"
        >
          <a href="javascript:;" style="margin-left: 20px">Delete</a>
        </a-popconfirm>
      </template>
    </a-table>
  </a-modal>
</template>

<script>
import buttons from './js/buttons'
import tableHeader from './js/tableheader'
import { GetDispBillAll } from '@/api/test/get'
import {SaveDispBillList} from '@/api/DispBill'
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
              fSrcID:row.fSrcID,
              fShift:row.班次,
              fMachineID:row.设备,
              fWorkCenterID:0,
              fCommitAuxQty:row.派工数量,
              fWorker:row.操作员,
              fmoBillNo:this.DailyData.fmoBillNo,
              fmoInterID:this.DailyData.fmoInterID
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
      var params={FSrcID:this.DailyData.fid}
      GetDispBillAll(params).then(res=>{
        console.log(res)
        this.loading=false
        var result=res.result;
        if(result&&result.length>0){
          let index=0
          result.forEach(e => {
            e.key=index;
            index++;
            e.日期=this.$moment(e.日期).format('YYYY-MM-D')
          });

          this.dataSource=result
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
      columnsMT:tableHeader.columnsMT,
      editColumns:['机台','操作员','班次','派工数量'],
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
    }
  }
}
</script>

<style  scoped>
</style>