<template>
  <a-card>
    <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttons"/>

    <div>
      <a-row :gutter="10">
        <a-col :span="4">
          <treeData @btnClick="btnTree"/>
        </a-col>
        <a-col :span="20">
          <pagination :current="pagination.current" :total="pagination.total" @pageChange="onPaginationChange"/>
          <a-table
            :dataSource="tableData"
            :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
            :columns="columns"
            :pagination="false"
          >
            <!-- <template slot="roles" slot-scope="roles">                      
                        <span v-for="(role,index) in roles.split(',')" :key="index">{{role}},</span>
            </template>-->
          </a-table>
        </a-col>
      </a-row>
    </div>
  </a-card>
</template>

<script>
import { GetAll } from '@/api/Organization'
import buttons from './buttons'
import columns from './columns'
import tableData from './tableData'
import { close } from 'fs'
export default {
  components: {
    tableOperatorBtn: () => import('@/JtComponents/TableOperatorButton'),
    pagination: () => import('@/JtComponents/Pagination'),
    treeData: () => import('./ptreedata')
  },
  data() {
    return {
      pagination: {
        current: 1,
        total: 50
      },
      tableData: [],
      columns: columns,
      selectedRowKeys: [],
      buttons: buttons
    }
  },

  mounted() {
    this._LoadData()
  },
  methods: {
    _LoadData() {
      var params = {
        SkipCount: this.pagination.current - 1,
        MaxResultCount: this.pagination.pageSize
      }

      GetAll(params)
        .then(res => {
          const result = res.result
          console.log(result)

        //   if (result) {
        //     this.tableData = result.items
        //     this.pagination.total = result.totalCount
        //   }
        })
        .catch(err => {
          console.log(err)
        })
    },

    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
     onPaginationChange(page, size) {
      this.pagination.current = page
      this.pagination.pageSize = size
      //this._loadData()
    },
    handleBtnClick(val) {},

    btnTree(obj) {
      console.log(obj)
    }
  }
}
</script>
