<template>
  <a-card>
    <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttons" />
    <a-table
      :dataSource="tableData"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :pagination="false"
      :loading="loading"
       size="small"
    ></a-table>
    <!-- 公共组件 模态框 -->
    <TaskEdit ref="TaskEdit" @addSuccess="loadTable" /> 
      <searchForm v-model="StrWhere" methodName="JIT.DIME2Barcode#Sys_TaskAppService#Sys_TaskList" ref="SearchForm" @input="_loadData"/>
  </a-card>
</template>

<script>
import buttons from './js/buttons'
import columns from './js/columns'
import tableData from './js/tableData'
// 获取数据
import { GetAllList } from '@/api/Sys_Task'
export default {
  components: {
    tableOperatorBtn: () => import('@/JtComponents/TableOperatorButton'),
    TaskEdit: () => import('./TaskEdit'),
    SearchForm: () => import('@/JtComponents/SearchForm')
  },
  data() {
    return {
      StrWhere:'',
      columns,
      selectedRowKeys: [],
      buttons: buttons.buttons,
      tableData,
      loading: false,
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  methods: {
    // 显示表格加载框
    ShowLoad() {
      this.loading = true
    },
    // 隐藏表格加载框
    HideLoad() {
      this.loading = false
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleBtnClick(val) {
      var _this = this
      var obj = {}
      switch (val) {
        case '搜索': {
          _this.$refs.SearchForm.show()
          break
        }
        case '新增':
          _this.$refs.TaskEdit.showModal(obj)
          break
        case '编辑':
          if (_this.selectedRows.length === 1) {
            _this.$refs.TaskEdit.showModal(_this.selectedRows[0])
          } else {
            _this.$notification['error']({
              message: '系统提示',
              description: '编辑时只能选择一个！'
            })
          }
          break
        default:
          break
      }
    },
    // 搜索
    Search(where){
      this.StrWhere = where
      this.loadTable()
    },
    // 获取列表
    loadTable() {
      var _this = this
      _this.ShowLoad()
      _this.tableData = []
      GetAllList({
        TaskId: 0,
        TaskCode: '',
        TaskName: '',
        TaskType: '',
        TaskBz: '',
        TaskState: 0,
        TaskCorn: '',
        where:_this.StrWhere
      })
        .then(res => {
          if (res.success) {
            var i = 0
            res.result.forEach(item => {
              var obj = {}
              item.XH = i + 1
              i = item.XH
              item.lastSyncTime = this.$moment(item.lastSyncTime).format('YYYY-MM-DD HH:mm')
              _this.tableData.push(item)
            })
          }
        })
        .catch(function() {})
        .finally(() => {
          _this.HideLoad()
        })
    }
  }, // 页面渲染完加载
  created() {
    this.loadTable()
  }
}
</script>

<style>
</style>