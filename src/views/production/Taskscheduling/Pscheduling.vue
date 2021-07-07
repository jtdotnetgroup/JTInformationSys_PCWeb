<template>
  <a-card>
    <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttonp" :reflash="reflash"/>

    <pagination
      :current="pagination.current"
      :total="pagination.total"
      @pageChange="onPaginationChange"
    />

    <a-table
      rowKey="fmoInterID"
      :dataSource="dataSource"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :pagination="false"
      :bordered="true"
      :loading="taskschedulLoading"
      :scroll="scroll"
      :customRow="setRow"
      size="small"
    ></a-table>
    <a-tabs defaultActiveKey="2">
      <a-tab-pane key="1" tab="排产汇部"><a-table
      id="card" size="small"
      bordered
      :dataSource="detailData"
      :columns="detailColumns"
      :pagination="false"
      :loading="detailLoading"
      :scroll="scroll"
    ></a-table></a-tab-pane>
      <a-tab-pane key="2" tab="派工明细">
        <dispatchtable ref="dispatchtable" :FMobillno="currentFMobillno" />
      </a-tab-pane>
    </a-tabs>
    <dispatch ref="taskDispatch" />
    <ImportExcel ref="ImportExcel"/>
    <SearchForm v-model="where" methodName="JIT.DIME2Barcode#TaskSchedulingAppService#GetAll" ref="SearchForm" @input="_loadData"/>
  </a-card>
</template>

<script>
import buttons from './buttons'
import tableheader from './tableheader'
import { GetTaskSchedulData, GetAllDailyByFMOInterID } from '@/api/TaskScheduling'
import columns from './columns'

import {aoa2Excel} from '@/utils/helper/Export2Excel'

export default {
  components: {
    // @是根目录 。。是上一级 。是当前目录
    tableOperatorBtn: () => import('@/JtComponents/TableOperatorButton'),
    pagination: () => import('@/JtComponents/Pagination'),
    dispatch: () => import('./Dispatch'),
    ImportExcel: () => import('./ImportExcel'),
    SearchForm:()=>import('@/JtComponents/SearchForm'),
    dispatchtable:()=>import('./dispatchtable')
  },
  data() {
    return {
      pagination: {
        current: 1,
        total: 50,
        pageSize: 10
      },
      reflash:{
        _this:this,
        click:()=>{
          this._loadData();
          this.dataSourceMX=[]
        }
      },
      where:'',
      buttonp: buttons.buttonp,
      selectedRowKeys: [],
      selectedRows: [],
      buttonps: buttons.buttonps,
      dataSource: [],
      columns: columns,
      columnsMT: tableheader.columnsMT,
      columnsMX: [],
      dataSourceMX: tableheader.dataSourceMX,
      scroll: {
        x: 3100,
        y: 350
      },
      taskschedulLoading: false,
      dailyDataList: [],
      detailLoading:false,
      currentFMobillno:'',
      activetab:'2'
    }
  },
  mounted() {
    this._loadData()
  },
  computed: {
    detailData() {
      //排产明细表数据
      const result=[]
      if(!!this.dailyDataList&&!!this.dailyDataList.details){
        var row={
          totalPlan:this.dailyDataList.totalPlan,
          totalCommit:this.dailyDataList.totalCommit
        };
        this.dailyDataList.details.forEach(e => {
          var date=this.$moment(e.fDate).format('MM-DD')
          var plancol=date+'Plan'
          var commitcol=date+'Commit'
          row[plancol]=e.dayPlan
          row[commitcol]=e.dayCommit
        });
        result.push(row)
      }
      return result;
    },
    detailColumns() {
      const result = []

      result.push({
        title: '汇总',
        children: [{ title: '计划', dataIndex: 'totalPlan',width:50 }, { title: '实际', dataIndex: 'totalCommit',width:50 }]
      })
      if (!!this.dailyDataList && !!this.dailyDataList.details) {
        this.dailyDataList.details.forEach(r => {
          var date=this.$moment(r.fDate).format('MM-DD')
          var column = {
            title: date,
            children: [
              {
                title: '计划',
                dataIndex: date + 'Plan',
                algin:'center',
                width:50
              },
              {
                title: '实际',
                dataIndex: date + 'Commit',
                algin:'center',
                width:50
              }
            ]
          }
          result.push(column)
        })
      }
      return result
    }
  },
  methods: {
    _loadData() {

      var _this=this
      var params = {
        SkipCount: (this.pagination.current - 1)*this.pagination.pageSize,
        MaxResultCount: this.pagination.pageSize,
        Where:this.where
      }
      this.taskschedulLoading = true
      GetTaskSchedulData(params)
        .then(res => {
          const result = res.result
          this.dataSource=[];
          if (result) {

            result.items.forEach(e=>{
              e.计划完工日期=this.$moment(e.计划完工日期).format('YYYY-MM-DD')
              e.计划开工日期=this.$moment(e.计划开工日期).format('YYYY-MM-DD')

               this.dataSource.push(e)
            })

            this.pagination.total = result.totalCount
          }
          this.taskschedulLoading = false
        })
        .catch(err => {
          console.log(err)
          this.taskschedulLoading = false
        })
    },
    resetSearchForm() {
      this.queryParam = {
        date: moment(new Date())
      }
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    handleBtnClick(val) {

      switch(val){
        case '查询':{
          this.visible = true
          break;
        }
        case '排产':{
           if (this.selectedRowKeys.length === 1) this.$refs.taskDispatch.show(this.selectedRows[0])
          break;
        }
        case '导入':{
          this.$refs.ImportExcel.show()
          break;
        }
        case '搜索':{
          this.$refs.SearchForm.show();
          break;
        }
        case '导出':{
          this.export();
          break;
        }
      }
    },
    export(){
      if(this.selectedRowKeys.length===0){
        return;
      }

      const today=this.$moment().format('YYYY/MM/DD');

      const arr=[
        ['序号','车间','机台号','任务单号','产品名称','工序名','班次','打包数量',today]
      ]
      for (let index = 0; index < this.selectedRows.length; index++) {
        const row=this.selectedRows[index];
        const temp=[index+1,row.车间,'',row.任务单号,row.产品名称,'',''];
        arr.push(temp);
      }

      aoa2Excel(arr,'排产模板.xlsx')

    },
    onPaginationChange(page, size) {
      this.pagination.current = page
      this.pagination.pageSize = size
      this._loadData()
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    setRow(record) {
      return {
        on: {
          //表格行点击事件
          click: () => {
            
            let fmobillno=record.任务单号
            console.log(fmobillno)
            this.GetAllDailyData(record.fmoInterID)
            this.$refs.dispatchtable.getData(fmobillno);

          }
        }
      }
    },
    GetAllDailyData(fmoInterID) {
      this.detailLoading=true
      const params = {
        FMOInterID: fmoInterID
      }
      this.detailLoading = true
      GetAllDailyByFMOInterID(params)
        .then(res => {
          this.detailLoading = false
          const result = res.result
          this.dailyDataList = result
          this.detailColumns();
          this.detailLoading=false;
        })
        .catch(error => {
          this.detailLoading = false
          console.log(error)
          this.detailLoading=false
        })
    }
  }
}
</script>

<style scoped>
#card {
  margin-top: 10px;
}
#button {
  margin-top: 10px;
  background-color: #e6f7ff;
}

#divmodal {
  width: 900px;
}
.ant-table td {
  white-space: nowrap;
}

#taskTable {
  height: 300px;
  overflow-y: auto;
}

.ant-table-body::-webkit-scrollbar {
  display: none !important;
}
</style>
