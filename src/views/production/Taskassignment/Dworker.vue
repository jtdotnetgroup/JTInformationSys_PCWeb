<template>
  <a-card>
    <!-- 功能按钮 -->
    <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttonp"/>
    <!-- 分页 -->
    <pagination
      :current="pagination.current"
      :pageSizeOptions="pagination.pageSizeOptions"
      :defaultPageSize="pagination.defaultPageSize"
      :total="pagination.total"
      @pageChange="pageChangeClick"
    />
    <!-- 表格 -->
    <a-table
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :dataSource="dataTable"
      :columns="columnsMain"
      :loading="taskschedulLoading"
      bordered
      onRow="{this.onClickRow}"
      :pagination="false"
      rowKey="Id"
      :scroll="scroll"
      size="small"
      :customRow="setRow"
    >
      <template slot="serial" slot-scope="text">
        <span>{{dataTable.indexOf(text)+1}}</span>
      </template>
      <!-- <template slot="serial" slot-scope="indexname">
     <span  >{{dataTable.indexOf(indexname)+1}}</span>
      </template>-->
    </a-table>

    <div id="button">
      <a-button style="background-color: #E6F7FF;border-color:#E6F7FF">
        <a-icon type="schedule"/>排产明细
      </a-button>
    </div>

    <a-table
      id="cardd"
      size="small"
      bordered
      :columns="columnsMX"
      :pagination="false"
      :dataSource="tableDataMX"
      :scroll="{x:1400,y:400}"
    >
      <template slot="actions" slot-scope="text,record">
        <a-button @click="BJMX(record)" type="primary">编辑</a-button>
        <a-button @click="GBMX(record)" type="danger">关闭</a-button>
        <a-button @click="showException(record)">异常</a-button>
      </template>
    </a-table>

    <DispatchWorkModalForm ref="DispatchWorkModalForm" @selectChange="SXsetRow"/>

    <ExceptionModal ref="ExceptionModal"/>
    <AddScheduling ref="AddScheduling" @addSuccess="SXsetRow"/>
  </a-card>
</template>

<script>
import buttons from './js/buttons'
import { columnsMX, columnsMT, columns as mainColumns } from './js/tableheader'
import { columns } from './js/tablehhe'
import { GetAllDispBill, GetDailyDispBillList, CloseDispBill } from '@/api/DispBill'

import { getRoleList, getServiceList } from '@/api/manage'
import { GetDailyAll, GetDispBillAll, CreateAll, GetDaily } from '@/api/test/get'
import { ICMODailyGetAll, GetGroupDailyList } from '@/api/ICMODaily'
import { constants } from 'crypto'

export default {
  components: {
    // @是根目录 。。是上一级 。是当前目录
    tableOperatorBtn: () => import('@/JtComponents/TableOperatorButton'),
    pagination: () => import('@/JtComponents/Pagination'),

    EditableCell: () => import('./pubilcvue/EditableCellSelect'),
    EditableCellInput: () => import('./pubilcvue/EditableCellInput'),
    DispatchWorkModalForm: () => import('./DispatchWorkModalForm'),
    ExceptionModal: () => import('./ICMOException'),
    AddScheduling:()=>import('./AddScheduling')
  },
  data() {
    return {
      pagination: {
        current: 1,
        total: 50,
        pageSize: 100,
        pageSizeOptions: ['10', '50', '100'],
        defaultPageSize: 100
      },
      buttonp: buttons.buttonp,
      buttonps: buttons.buttonps,
      columnsMT: columnsMT,
      // 高级搜索 展开/关闭
      advanced: false,
      selectedRowKeys: [],
      selectedRows: [],
      scroll: {
        x: 1500,
        y: 350
      },
      queryParam: {},
      maskClosable: false,

      visible: false,

      dataTable: [],

      columnsMain: mainColumns,

      columnsMX: columnsMX,
      taskschedulLoading: false,
      dataSource: [],
      tableDataMX: [],
      dataTableArry: [],
      dataTableArrget: [],
      djsetRow: {}
    }
  },
  mounted() {
    this._LoadMainData()
  },

  //一开始就执行的方法
  methods: {
    // 编辑明细
    BJMX(record) {
      console.log(record)
      this.$refs.DispatchWorkModalForm.show([record])
    },
    // 关闭明细
    GBMX(record) {
      var _this = this
      console.log(record)
      this.$confirm({
        title: '确定要关闭该任务吗?',
        content: '系统提示',
        onOk() {
          var obj = { id: record.dispFid }
          CloseDispBill(obj)
            .then(res => {
              if (res.success) {
                _this.$message.success('关闭成功')
                _this.SXsetRow()
              } else {
                _this.$notification['error']({
                  message: res.error.message,
                  description: res.error.details
                })
              }
            })
            .finally(() => {})
        },
        onCancel() {
          console.log('Cancel')
        },
        class: 'test'
      })
    },
    _LoadMainData() {
      const params = {
        SkipCount: (this.pagination.current - 1) * this.pagination.pageSize,
        MaxResultCount: this.pagination.pageSize
      }
      this.taskschedulLoading = true
      //后端获取数据
      GetGroupDailyList(params)
        .then(res => {
          const result = res.result
          this.pagination.total = result.totalCount
          this.dataTable = []
          if (result && result.items.length > 0) {
            //绑定到表格上
            result.items.forEach(e => {
              e.fDate = this.$moment(e.fDate).format('YYYY-MM-DD')
              this.dataTable.push(e)
            })
            //this.dataTable = result.items
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.taskschedulLoading = false
        })
    },

    showException(record) {
      console.log(record)
      this.$refs.ExceptionModal.show(record.dispFid)
    },

    pageChangeClick(page, pageSize) {
      ;(this.pagination.current = page), (this.pagination.pageSize = pageSize)
      this._LoadMainData()
    },

    hideModal() {
      this.visible = false
    },
    resetSearchForm() {
      this.queryParam = {
        date: moment(new Date())
      }
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },

    handleBtnClickModal(val) {
      if (val == '新增') {
        const { count, dataSource } = this

        if (dataSource.length == 0) {
          const newData = {
            日期: '',
            FShift: 0,
            FMachineID: 0,
            FWorker: '',
            FCommitAuxQty: 0,
            FSrcID: '',
            FMOBillNo: '',
            FMOInterID: ''
          }
          this.dataSource = [...dataSource, newData]
        } else {
          const newData = {
            日期: this.dataSource[dataSource.length - 1].日期,
            FShift: 0,
            FMachineID: 0,
            FWorker: '',
            FCommitAuxQty: 0,
            FSrcID: this.dataSource[dataSource.length - 1].fSrcID,
            FMOBillNo: this.dataSource[dataSource.length - 1].fmoBillNo,
            FMOInterID: this.dataSource[dataSource.length - 1].fmoInterID
          }
          this.dataSource = [...dataSource, newData]
        }

        this.count = count + 1
      } else if (val == '保存') {
        alert('保存')
        console.log(this.dataSource)
        var params = {
          details: this.dataSource
        }
         console.log(params)
        CreateAll(params)
          .then(res => {
            console.log(res)
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    },

    onDelete(key) {
      alert(key)
      const dataSource = [...this.dataSource]
      this.dataSource = dataSource.filter(item => item.key !== key)
    },

    onCellChange(key, dataIndex, value) {
      //后端返回的数据集
      const dataTableArrget = [...this.dataTableArrget]
      //动态生成的数据
      const dataSource = [...this.dataSource]
      console.log(dataTableArrget)
      //判断是否已存在数据
      const dstarget = dataTableArrget.find(item => item.dataIndex === dataIndex)
      //
      const target = dataSource.find(item => item.key === dataIndex)

      if (target) {
        target[dataIndex] = value
        this.dataSource = dataSource
      }
    },
    SXsetRow() {
      console.log(this.djsetRow)
      this.GetMXGetDailyDispBillList(this.djsetRow)
    },
    setRow(record) {
      return {
        on: {
          //表格行点击事件
          click: () => {
            this.djsetRow = record
            this.GetMXGetDailyDispBillList(record)
          }
        }
      }
    },
    GetMXGetDailyDispBillList(record) {
      var params = { fmoBillNos: [record.fmoBillNo], DatelList: [record.fDate] }
      GetDailyDispBillList(params)
        .then(res => {
          var result = res.result
          if (result && result.items.length > 0) {
            let index = 0
            result.items.forEach(e => {
              e.key = index
              index++
              e.fDate = this.$moment(e.fDate).format('YYYY-MM-D')
              e.fBillTime = this.$moment(e.fBillTime).format('YYYY-MM-DD hh:mm:ss')
            })
            this.tableDataMX = result.items
          }
        })
        .catch(err => {})
        .finally(() => {})
    },
    handleBtnClick(val) {
      switch (val) {
        case '派工': {
          if (this.selectedRows.length > 0) {
            var rowSelection = this.selectedRows
            this.$refs.DispatchWorkModalForm.show(rowSelection)
          }
        }
        case '增加排产': {
          if (this.selectedRows.length > 0) {
            var rowSelection = this.selectedRows
            
            this.$refs.AddScheduling.showModal(rowSelection)
          }
        }
      }
    },

    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
      console.log(selectedRows)
    }
  }
}
</script>

<style  scoped>
#card {
  margin-top: 10px;
}
#button {
  margin-top: 10px;
  background-color: #e6f7ff;
}
/* #btn {
    width:40px;
    height: 40px;
    position:fixed;
    left:60%;
    bottom:30px;
    background:url(@/public/Thetopup)  no-repeat  left top ;
    margin-left: 610px;
} */
/* #btn:hover {
    background:url(@/public/Thetopup)  no-repeat  left -40px;
} */
</style>