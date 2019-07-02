<template>
  <a-card>
    <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttonp"/>

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

    <div id="button">
      <a-button style="background-color: #E6F7FF;border-color:#E6F7FF">
        <a-icon type="schedule"/>排产明细
      </a-button>
    </div>

    <a-table
      id="card" size="small"
      bordered
      :dataSource="detailData"
      :columns="detailColumns"
      :pagination="false"
      :loading="detailLoading"
      :scroll="scroll"
    ></a-table>

    <dispatch ref="taskDispatch"/>
    <ImportExcel ref="ImportExcel"/>
  </a-card>
</template>

<script>
import buttons from './buttons'
import tableheader from './tableheader'
import { GetTaskSchedulData, GetAllDailyByFMOInterID } from '@/api/TaskScheduling'
import columns from './columns'

export default {
  components: {
    // @是根目录 。。是上一级 。是当前目录
    tableOperatorBtn: () => import('@/JtComponents/TableOperatorButton'),
    pagination: () => import('@/JtComponents/Pagination'),
    dispatch: () => import('./Dispatch'),
    ImportExcel: () => import('./ImportExcel')
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
      columnsMX: [],
      dataSourceMX: tableheader.dataSourceMX,
      scroll: {
        x: 3100,
        y: 350
      },
      taskschedulLoading: false,
      dailyDataList: [],
      detailLoading:false
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
        MaxResultCount: this.pagination.pageSize
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
      if (val == '查询') {
        this.visible = true
      } else if (val == '排产') {
        if (this.selectedRowKeys.length === 1) this.$refs.taskDispatch.show(this.selectedRows[0])
      } else if (val == '导入') {
        console.log(val)
        this.$refs.ImportExcel.show()
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
            this.GetAllDailyData(record.fmoInterID)
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
