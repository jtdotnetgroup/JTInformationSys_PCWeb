<template>
  <a-card>
    <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttonp"/>

    <pagination
      :current="pagination.current"
      :total="pagination.total"
      @pageChange="onPaginationChange"
    />

    <a-table
      rowKey="任务单号"
      :dataSource="dataSource"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :pagination="false"
      :bordered="true"
      :loading="taskschedulLoading"
      :scroll="scroll"
      :customRow="setRow"
    ></a-table>

    <div id="button">
      <a-button style="background-color: #E6F7FF;border-color:#E6F7FF">
        <a-icon type="schedule"/>排产明细
      </a-button>
    </div>

    <a-table id="card" bordered :dataSource="dataSourceMX" :columns="columnsMX" :pagination="false"></a-table>

    <dispatch ref="taskDispatch"/>
  </a-card>
</template>

<script>
import buttons from './buttons'
import tableheader from './tableheader'
import { GetTaskSchedulData,GetAllDailyByFMOInterID } from '@/api/TaskScheduling'
import columns from './columns'

export default {
  components: {
    // @是根目录 。。是上一级 。是当前目录
    tableOperatorBtn: () => import('@/JtComponents/TableOperatorButton'),
    pagination: () => import('@/JtComponents/Pagination'),
    dispatch: () => import('./Dispatch')
  },
  data() {
    return {
      pagination: {
        current: 1,
        total: 50,
        pageSize: 10
      },
      buttonp: buttons.buttonp,
      selectedRowKeys: [],
      selectedRows: [],
      buttonps: buttons.buttonps,
      dataSource: [],
      columns: columns,
      columnsMT: tableheader.columnsMT,
      columnsMX: tableheader.columnsMX,
      dataSourceMX: tableheader.dataSourceMX,
      scroll: {
        x: 3100,
        y: 350
      },
      taskschedulLoading: false,
      test:''
    }
  },
  mounted() {
    this._loadData()
  },
  computed: {},
  methods: {
    _loadData() {
      var params = {
        SkipCount: this.pagination.current - 1,
        MaxResultCount: this.pagination.pageSize
      }
      this.taskschedulLoading = true
      GetTaskSchedulData(params)
        .then(res => {
          const result = res.result
          if (result) {
            this.dataSource = result.items
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
      if (val == '查询') {
        this.visible = true
      } else if (val == '排产') {
        if (this.selectedRowKeys.length === 1) this.$refs.taskDispatch.show(this.selectedRows[0])
      }
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
            console.log(record)
            const params={
              FMOInterID:record.fmoInterID
            }
            GetAllDailyByFMOInterID(params).then(res=>{
              const result=res.result
              if(result&&result.length>0){
                //排产明细表数据
                const groupData=[]
                let macid=-999;
                //生成行数据
                var row={}
                result.forEach(e => {
                  console.log(e)
                  if(macid!==e.FMachineID){
                    macid=e.FMachineID
                    row={
                      macid:macid,
                      sum:{
                        plan:0,
                        commit:0
                      }
                    }
                  }
                  //汇总计划和派工数
                    row.sum.plan+=e.FPlanAuxQty
                    row.sum.commit+=e.FCommitAuxQty
                });
              }
              
            }).catch(error=>{
              console.log(error)
            })
          }
        }
      }
    }
  }
}
</script>

<style   scoped>
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