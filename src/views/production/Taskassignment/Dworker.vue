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
      :scroll="{ x: 1300, y: 500 }"
      bordered
      :pagination="false"
    >
      <!-- <template slot="serial" slot-scope="indexname">
      <span>{{dataTable.indexOf(indexname)+1}}</span>-->
      <!-- <span>{{dataTable.forEach((item)=>{item.indexname=indexname+1})}}</span>  -->
      <!-- <span>{{dataTable.forEach((item)=>{item.indexname = (this.pagination.current-1)*this.pagination.pageSize+indexname+1})}}</span> -->
      <!-- </template> -->
    </a-table>

    <div id="button">
      <a-button style="background-color: #E6F7FF;border-color:#E6F7FF">
        <a-icon type="schedule"/>排产明细
      </a-button>
    </div>

    <a-table id="cardd" bordered :columns="columnsMX" :pagination="false"></a-table>

    <div id="divmodal">
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
  </a-card>
</template>

<script>
import buttons from './buttons'
import tableheader from './tableheader'
import { getRoleList, getServiceList } from '@/api/manage'
import { GetDaily, GetDailyAll } from '@/api/test/get'

export default {
  components: {
    // @是根目录 。。是上一级 。是当前目录
    tableOperatorBtn: () => import('@/JtComponents/TableOperatorButton'),
    pagination: () => import('@/JtComponents/Pagination')
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

      columnsMT: tableheader.columnsMT,

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
          _this.dataTable = []
          var data = res.result
          if (data.items.length == 0) {
            return
          }
          _this.pagination.total = data.totalCount
          console.log(data)
          _this.dataTable = data.items
        })
        .catch(function(error) {
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