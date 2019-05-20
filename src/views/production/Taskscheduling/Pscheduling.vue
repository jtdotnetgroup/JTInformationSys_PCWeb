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
    ></a-table>

    <div id="button">
      <a-button style="background-color: #E6F7FF;border-color:#E6F7FF">
        <a-icon type="schedule"/>排产明细
      </a-button>
    </div>

    <a-table id="card" bordered :dataSource="dataSourceMX" :columns="columnsMX" :pagination="false"></a-table>

    <!-- <div id="divmodal">
      <a-modal
        title="新增/维护"
        v-model="visible"
        @ok="hideModal"
        okText="确认"
        cancelText="取消"
        width="1000px"
        style="left:80px"
        :maskClosable="maskClosable"
      >
        <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttonps"/>

        <div class="table-page-search-wrapper" id="card">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="任务单号">
                  <a-input v-model="queryParam.id" placeholder/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="计划开工">
                  <a-date-picker
                    v-model="queryParam.date"
                    style="width: 100%"
                    placeholder="请输入计划开工"
                  />
                </a-form-item>
              </a-col>

              <template v-if="advanced">
                <a-col :md="8" :sm="24">
                  <a-form-item label="计划完工">
                    <a-date-picker
                      v-model="queryParam.date"
                      style="width: 100%"
                      placeholder="请输入计划完工"
                    />
                  </a-form-item>
                </a-col>

                <a-col :md="8" :sm="24">
                  <a-form-item label="计划数量">
                    <a-input-number v-model="queryParam.callNo" style="width: 100%"/>
                  </a-form-item>
                </a-col>

                <a-col :md="8" :sm="24">
                  <a-form-item label="排产数量">
                    <a-input-number v-model="queryParam.callNo" style="width: 100%"/>
                  </a-form-item>
                </a-col>

                <a-col :md="8" :sm="24">
                  <a-form-item label="日产量">
                    <a-input-number v-model="queryParam.callNo" style="width: 100%"/>
                  </a-form-item>
                </a-col>
              </template>
              <a-col :md="!advanced && 8 || 24" :sm="24">
                <span
                  class="table-page-search-submitButtons"
                  :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
                >
                  <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                  <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
                  <a @click="toggleAdvanced" style="margin-left: 8px">
                    {{ advanced ? '收起' : '展开' }}
                    <a-icon :type="advanced ? 'up' : 'down'"/>
                  </a>
                </span>
              </a-col>
            </a-row>
          </a-form>
        </div>

        <a-table
          id="card"
          bordered
          :dataSource="dataSourceMX"
          :columns="columnsMT"
          :pagination="false"
        >
         </a-table>
      </a-modal> 
    </div>-->
 
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
      columnsMX: tableheader.columnsMX,
      dataSourceMX: tableheader.dataSourceMX,
      dailyDataList:[],
      scroll: {
        x: 3100,
        y: 350
      },
      taskschedulLoading: false,
      detailLoading:false,
      test: ''
    }
  },
  mounted() {
    this._loadData()
  },
  computed: {
    detailData(){
      //排产明细表数据
            const groupData = []
            let macid = -999
            //生成行数据
            var row = {}
            this.dailyDataList.forEach(e => {
              console.log(e)
              if (macid !== e.FMachineID) {
                macid = e.FMachineID
                row = {
                  macid: macid,
                  sum: {
                    plan: 0,
                    commit: 0
                  }
                }
              }
              //汇总计划和派工数
              row.sum.plan += e.FPlanAuxQty
              row.sum.commit += e.FCommitAuxQty
            })
    }
  },
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
      } else if (val == '导入') {
        console.log(val);
        this.$refs.ImportExcel.show();
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
      const params = {
        FMOInterID: fmoInterID
      }
      this.detailLoading=true;
      GetAllDailyByFMOInterID(params)
        .then(res => {
          this.detailLoading=false;
          const result = res.result
          if (result && result.length > 0) {
            this.dailyDataList=result;
          }
        })
        .catch(error => {
          this.detailLoading=false
          console.log(error)
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