<template>
  <a-card :bordered="false">
    <tableOperatorBtn @btnClick="handleBtnClick"/>

    <pagination :current="pagination.current" :total="pagination.total" />

    <a-table :pagination="false" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :dataSource="loadData.result.data" :columns="columns">
      <template slot="serial" slot-scope="text">
        <span>{{loadData.result.data.indexOf(text)+1}}</span>
      </template>

      <template slot="isActived" slot-scope="checked">
        <a-checkbox disabled :checked="checked"></a-checkbox>
      </template>

    </a-table>
  </a-card>
</template>

<script>
import tableOperatorBtn from '@/JtComponents/TableOperatorButton'
import pagination from '@/JtComponents/Pagination'
import moment from 'moment'
import { STable } from '@/components'
// import StepByStepModal from './modules/StepByStepModal'
// import CreateForm from './modules/CreateForm'
import { getRoleList, getServiceList } from '@/api/manage'

import mockdata from './userlistData'

export default {
  name: 'UserList',
  components: {
    STable,tableOperatorBtn,pagination
    // CreateForm,
    // StepByStepModal
  },
  data () {
    return {
      mdl: {},
      //分页
      pagination:{
          current:1,
          total:50,

        },
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '#',
          key:'index',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '用户名',
          dataIndex: 'userName'
        },
        {
          title: '名称',
          dataIndex: 'name'
        },
        {
          title: '是否启用',
          dataIndex: 'isActived',
          sorter: true,
          scopedSlots: { customRender: 'isActived' },
          // needTotal: true,
          // customRender: (text) => text + ' 次'
        },
        {
          title: '最后登录时间',
          dataIndex: 'lastLoginTime',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '创建时间',
          dataIndex: 'creationTime',
          sorter: true
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: mockdata,
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
    }
  },
  created () {
    this.tableOption()
    getRoleList({ t: new Date() })
  },
  methods: {
    tableOption () {
      if (!this.optionAlertShow) {
        this.options = {
          alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange
          }
        }
        this.optionAlertShow = true
      } else {
        this.options = {
          alert: false,
          rowSelection: null
        }
        this.optionAlertShow = false
      }
    },
    handleBtnClick(val){

    },
    handleOk () {
      this.$refs.table.refresh()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>

<style>
  .table-operator{
    margin-bottom: 1vh;
  }
  
</style>
