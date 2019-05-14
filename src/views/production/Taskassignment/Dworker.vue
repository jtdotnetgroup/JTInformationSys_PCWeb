<template>
  <a-card>
    <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttonp"/>

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
      :columns="columnsjs"
      :scroll="{ x: 3100, y: 500 }"
      :loading="taskschedulLoading"
      bordered
      :pagination="false"
      rowKey="计划单号"
    >
      <template slot="serial" slot-scope="indexname">
        <span>{{dataTable.indexOf(indexname)+1}}</span>
      </template>
    </a-table>

    <div id="button">
      <a-button style="background-color: #E6F7FF;border-color:#E6F7FF">
        <a-icon type="schedule"/>排产明细
      </a-button>
    </div>

    <a-table id="cardd" bordered :columns="columnsMX" :pagination="false"></a-table>

    <div>
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
        <tableOperatorBtn @btnClick="handleBtnClickModal" :buttons="buttonps"/>

        <a-table
          id="cards"
          bordered
          :dataSource="dataSource"
          :columns="columnsMT"
          :pagination="false"
          :scroll="{ x: 2000, y: 500 }"
          :loading="taskschedulLoadings"
          rowKey="fSrcID"
        >
          <template slot="机台" slot-scope="text, record">
            <EditableCell :text="text" @change="onCellChange(record.机台, '机台', $event)"/>
          </template>

          <template slot="派工数量" slot-scope="text, record">
            <EditableCellInput
              :text="text"
              @change="onCellChange(record.派工数量, '派工数量', $event)"
            />
          </template>

          <template slot="操作员" slot-scope="text, record">
            <EditableCell :text="text" @change="onCellChange(record.操作员, '操作员', $event)"/>
          </template>

          <template slot="班次" slot-scope="text, record">
            <EditableCellInput :text="text" @change="onCellChange(record.班次, '班次', $event)"/>
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
    </div>

    <!-- <modalt ref="taskDispatch"/> -->
  </a-card>
</template>

<script>
import buttons from './js/buttons'
import tableheader from './js/tableheader'

import { getRoleList, getServiceList } from '@/api/manage'
import { GetDailyAll, GetDispBillAll, CreateAll } from '@/api/test/get'

export default {
  components: {
    // @是根目录 。。是上一级 。是当前目录
    tableOperatorBtn: () => import('@/JtComponents/TableOperatorButton'),
    pagination: () => import('@/JtComponents/Pagination'),
  
    EditableCell: () => import('./pubilcvue/EditableCellSelect'),
    EditableCellInput: () => import('./pubilcvue/EditableCellInput')
  },
  data() {
    return {
      pagination: {
        current: 1,
        total: 50,
        pageSize: 100,
        pageSizeOptions: ['100', '200', '300'],
        defaultPageSize: 100
      },
      buttonp: buttons.buttonp,
      buttonps: buttons.buttonps,
      columnsMT: tableheader.columnsMT,
      // 高级搜索 展开/关闭
      advanced: false,
      selectedRowKeys: [],
      selectedRows: [],

      queryParam: {},
      maskClosable: false,

      visible: false,

      dataTable: [],

      columnsjs: tableheader.columns,
      columnsMX: tableheader.columnsMX,
      taskschedulLoading: false,
      taskschedulLoadings: false,
      dataSource: []
    }
  },

  //一开始就执行的方法
  created() {
    getRoleList({ t: new Date() }), this.pageData()
  },

  methods: {
    //查询分页的方法
    pageData() {
      this.taskschedulLoading = true
      var params = {
        SkipCount: this.pagination.current - 1,
        MaxResultCount: this.pagination.pageSize
      }

      var _this = this
      GetDailyAll(params)
        .then(res => {
          _this.dataTable = []
          var data = res.result
          if (data.items.length == 0) {
            return
          }
          this.taskschedulLoading = false
          _this.pagination.total = data.totalCount
          console.log(data)
          _this.dataTable = data.items
        })
        .catch(function(error) {
          this.taskschedulLoading = false
          console.log(error)
        })
    },

    pageChangeClick(page, pageSize) {
      ;(this.pagination.current = page), (this.pagination.pageSize = pageSize)
      this.pageData()
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
        this.count = count + 1
      } else if (val == '保存') {
        alert('保存')

        console.log(this.dataSource)
        //  var params = {
        //   details:this.dataSource
        //  }

        // CreateAll(params)
        //   .then(res => {
        //       console.log(res)
        //   })
        //   .catch(function(error) {
        //     console.log(error)
        //   })
      }
    },

    onDelete(key) {
      alert(key)
      const dataSource = [...this.dataSource]
      this.dataSource = dataSource.filter(item => item.key !== key)
    },

    onCellChange(key, dataIndex, value) {
    
      const dataSource = [...this.dataSource]

      const target = dataSource.find(item => item.dataIndex === dataIndex)
      if (target) {
        target[dataIndex] = value
        this.dataSource = dataSource
      }
    },

    _loadData(FDates) {
      this.taskschedulLoadings = true
      var params = {
        SkipCount: this.pagination.current - 1,
        MaxResultCount: this.pagination.pageSize,
        FDate: FDates
      }

      var _this = this
      GetDispBillAll(params)
        .then(res => {
          _this.dataSource = []
          var data = res.result
          if (data.items.length == 0) {
            return
          }
          //_this.pagination.total = data.totalCount
          console.log(data)

      

          _this.dataSource =data.items
          this.taskschedulLoadings = false


          



        })
        .catch(function(error) {
          console.log(error)
          this.taskschedulLoadings = false
        })
    },

    handleBtnClick(val) {
      if (val == '查询') {
      } else if (val == '派工') {
        if (this.selectedRowKeys.length === 1) this.visible = true

        this._loadData(this.selectedRows[0].日期)
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
</style>