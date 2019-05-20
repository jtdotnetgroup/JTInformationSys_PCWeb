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
      :rowSelection="rowSelection"
      :dataSource="dataTable"
      :columns="columnsjs"
<<<<<<< HEAD
      :scroll="{ x: 1300, y: 500 }"
=======
      :scroll="{ x: 3100, y: 500 }"
      :loading="taskschedulLoading"
>>>>>>> parent of 7a1bcfd... 提交设备档案代码
      bordered
      
      :pagination="false"
<<<<<<< HEAD
    >
      <!-- <template slot="serial" slot-scope="indexname">
      <span>{{dataTable.indexOf(indexname)+1}}</span>-->
      <!-- <span>{{dataTable.forEach((item)=>{item.indexname=indexname+1})}}</span>  -->
      <!-- <span>{{dataTable.forEach((item)=>{item.indexname = (this.pagination.current-1)*this.pagination.pageSize+indexname+1})}}</span> -->
      <!-- </template> -->
=======
      rowKey="计划单号"
      :customRow="OnClickJH"
    >
      <!-- <template slot="serial" slot-scope="indexname">
     <span  >{{dataTable.indexOf(indexname)+1}}</span>
      </template>-->
>>>>>>> parent of 7a1bcfd... 提交设备档案代码
    </a-table>

    <div id="button">
      <a-button style="background-color: #E6F7FF;border-color:#E6F7FF">
        <a-icon type="schedule"/>排产明细
      </a-button>
    </div>

    <a-table id="cardd" bordered :columns="columnsMX" :pagination="false"></a-table>

<<<<<<< HEAD
    <div id="divmodal">
=======
    <div>
>>>>>>> parent of 7a1bcfd... 提交设备档案代码
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

        <!-- :columns="columnsMT" -->
        <a-table
          id="cards"
          bordered
          :dataSource="dataSource"
          :columns="columns"
          :pagination="false"
        >
          <template slot="operation" slot-scope="text, record">
            <a-popconfirm v-if="dataSource.length" @click="() => edit(record.key)">
              <a>Edit</a>
            </a-popconfirm>

            <a-popconfirm
              v-if="dataSource.length"
              title="Sure to delete?"
              @confirm="() => onDelete(record.key)"
            >
              <a href="javascript:;" style="margin-left: 20px">Delete</a>
            </a-popconfirm>
          </template>

          <!-- <template slot="operation" slot-scope="text, record">
         <a-popconfirm 
          v-if="dataSource.length"
          @click="() => onEdit(record.key)">
            
        </a-popconfirm>
       
          </template>-->
        </a-table>
      </a-modal>
    </div>
<<<<<<< HEAD
=======

    <!-- <modalt ref="taskDispatch"/> -->
>>>>>>> parent of 7a1bcfd... 提交设备档案代码
  </a-card>
</template>

<script>
<<<<<<< HEAD
import buttons from './buttons'
import tableheader from './tableheader'
import { getRoleList, getServiceList } from '@/api/manage'
import { GetDaily, GetDailyAll } from '@/api/test/get'
=======
import buttons from './js/buttons'
import tableheader from './js/tableheader'
import { columns } from './js/tablehhe'

import { getRoleList, getServiceList } from '@/api/manage'
import { GetDailyAll, GetDispBillAll, CreateAll } from '@/api/test/get'
>>>>>>> parent of 7a1bcfd... 提交设备档案代码

export default {
  components: {
    // @是根目录 。。是上一级 。是当前目录
    tableOperatorBtn: () => import('@/JtComponents/TableOperatorButton'),
<<<<<<< HEAD
    pagination: () => import('@/JtComponents/Pagination')
=======
    pagination: () => import('@/JtComponents/Pagination'),

    EditableCell: () => import('./pubilcvue/EditableCellSelect'),
    EditableCellInput: () => import('./pubilcvue/EditableCellInput')
>>>>>>> parent of 7a1bcfd... 提交设备档案代码
  },
  data() {
    return {
      pagination: {
        current: 1,
        total: 50,
        pageSize: 100,
        pageSizeOptions: ['100', '200', '300'],
        defaultPageSize: 100
        // pageSizeOptions:['10']
      },
      buttonp: buttons.buttonp,

      buttonps: buttons.buttonps,
      // 高级搜索 展开/关闭
      advanced: false,

      queryParam: {},
      maskClosable: false,

      visible: false,

      dataTable: [],

      columnsjs: tableheader.columns,
<<<<<<< HEAD

      columnsMT: tableheader.columnsMT,
=======
>>>>>>> parent of 7a1bcfd... 提交设备档案代码

      columnsMX: tableheader.columnsMX,

      dataSource: [
        {
          key: '0',
          age: '32',
          address: 'London, Park Lane no. 0'
        },
        {
          key: '1',
          age: '32',
          address: 'London, Park Lane no. 1'
        }
      ],
      count: 2,
      columns: [
        {
          title: 'age',
          dataIndex: 'age'
        },
        {
          title: 'address',
          dataIndex: 'address'
        },
        {
          title: 'operation',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ]
    }
  },

  //一开始就执行的方法
  created() {
<<<<<<< HEAD
    getRoleList({ t: new Date() }), this.pageData()
  },
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
        }
      }
    }
  },

  methods: {
    //查询分页的方法
    pageData() {
      var _this = this
      GetDailyAll('任务单号', this.pagination.current, this.pagination.pageSize)
        .then(res => {
          // _this.dataTable= []
          // var data = res.result
          // if (data.items.length == 0) {
          //   return
          // }
          _this.pagination.total = data.totalCount
          //console.log(data)
          _this.dataTable = res.result.items
        })
        .catch(function(error) {
=======
    this.pageData()
  },

  // onClickRow = (record) => {
  //   return {
  //     onClick: () => {
  //       alert("单击反复")
  //     },
  //   };
  // },

  methods: {


    OnClickJH(){(record)=>{
      return {

        on: { 
        click: () => {
          alert("单击")
        },       // 点击行
        
      },

      }

    }
    },
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

          //服务端数据库
          //  _this.dataTableArry=data.items;
          // var result = []
          // var index = 0
          //  data.items.forEach(item => {
          //   index = index + 1
          //   var datasss = {
          //   key:index,
          //   indexname:index,
          //   日期: item.日期,
          //   机台: item.机台,
          //   班组: item.班组,
          //   操作员: item.操作员,
          //   派工数量: item.派工数量,
          //   完成数量: item.完成数量,
          //   合格数量: item.合格数量,
          //   计划数量: item.计划数量,
          //   任务单号: item.fmoBillNo
          // }
          //   result.push(datasss)
          //  });
          // // console.log(dataTableArry)
          //  console.log(result)
          _this.dataTable = data.items
        })
        .catch(function(error) {
          this.taskschedulLoading = false
>>>>>>> parent of 7a1bcfd... 提交设备档案代码
          console.log(error)
        })
    },

    pageChangeClick(page, pageSize) {
      ;(this.pagination.current = page), (this.pagination.pageSize = pageSize)
      this.pageData()
    },

    onDelete(key) {
      const dataSource = [...this.dataSource]
      this.dataSource = dataSource.filter(item => item.key !== key)
    },

    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource]
      const target = dataSource.find(item => item.key === key)
      if (target) {
        target[dataIndex] = value
        this.dataSource = dataSource
      }
    },

    showModal() {
      this.visible = true
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
<<<<<<< HEAD
        const { count, dataSource } = this
        const newData = {
          key: count,
          name: `Edward King ${count}`,
          age: `32. ${count}`,
          address: `London, Park Lane no. ${count}`
        }
        this.dataSource = [...dataSource, newData]
        this.count = count + 1
      }
    },

    handleBtnClick(val) {
      if (val == '查询') {
      } else if (val == '派工') {
        this.visible = true
=======
        const { count, dataSource, selectedRows } = this
        const newData = {
          // 日期: selectedRows[0].日期,
          // FShift: 0,
          // FMachineID: 1,
          // FWorker: '',
          // FCommitAuxQty: 0,
          // FSrcID: '',
          // FMOBillNo: selectedRows[0].fmoBillNo,
          // FMOInterID: selectedRows[0].fmoInterID
          日期: selectedRows[0].日期,
          机台: 0,
          班组: 0,
          操作员: '',
          派工数量: 0,
          完成数量: 0,
          合格数量: 0,
          计划数量: 0,
          任务单号: selectedRows[0].fmoBillNo
        }
        this.dataSource = [...dataSource, newData]
        this.count = count + 1
      } else if (val == '保存') {
        alert('保存')

        var data = {
          // fmoInterID: 123,
          // fmoBillNo: 'dddd',
          dailies: []
        }
        //添加明细
        this.dataSource.forEach(row => {
          data.dailies.push({
            fSrcID: row.fSrcID,
            fShift:  row.fShift,
            fMachineID: row.fmoInterID,
            fWorkCenterID: row.fWorkCenterID,
            fCommitAuxQty: row.派工数量,
            fWorker: row.fWorker,
            fmoBillNo: row.fmoBillNo,
            fmoInterID: row.fmoInterID
          })
        })

        CreateAll(data)
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
      const dataSource = [...this.dataSource]

      const target = dataSource.find(item => item.key === key.key)

      if (target) {
        target[dataIndex] = value
        this.dataSource = dataSource
      }

      console.log(this.dataSource)

      // const dataTableArrget = [...this.dataTableArrget]
      // const dataSource = [...this.dataSource]
      // console.log(dataTableArrget)
      // const dstarget = dataTableArrget.find(item => item.dataIndex === dataIndex)

      // const target = dataSource.find(item => item.key === dataIndex)

      // if (target) {
      //   target[dataIndex] = value
      //   this.dataSource = dataSource
      // }
    },

    _loadData(fSrcID) {
      this.taskschedulLoadings = true
      var params = {
        SkipCount: this.pagination.current - 1,
        MaxResultCount: this.pagination.pageSize,
        FSrcID: fSrcID
      }

      var _this = this
      GetDispBillAll(params)
        .then(res => {
          this.taskschedulLoadings = false
          _this.dataSource = []
          var data = res.result
          if (data.items.length == 0) {
            return
          }

          //   _this.dataTableArrget.push(data.items)
          //    var result = []
          //   var index = 0
          //   data.items.forEach(item => {
          //   index = index + 1
          //   var datasss = {
          //   key:index,
          //   indexname:index,
          //   日期: item.日期,
          //   机台: item.机台,
          //   班组: item.班组,
          //   操作员: item.操作员,
          //   派工数量: item.派工数量,
          //   完成数量: item.完成数量,
          //   合格数量: item.合格数量,
          //   计划数量: item.计划数量,
          //   任务单号: item.fmoBillNo
          // }
          //   result.push(datasss)
          //  });

          _this.dataSource = data.items
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
        this._loadData(this.selectedRows[0].fSrcID)
>>>>>>> parent of 7a1bcfd... 提交设备档案代码
      }
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

#divmodal {
  width: 900px;
}
</style>