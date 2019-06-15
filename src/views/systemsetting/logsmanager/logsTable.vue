<template>
  <a-card>
    <!-- <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttons"/> -->

    <a-form :form="form" layout="inline">
       <a-form-item label="开始时间">
        <a-date-picker
         format="YYYY-MM-DD HH:mm:ss"
          v-decorator="['开始时间',{ }]"
        ></a-date-picker>
      </a-form-item>
      <a-form-item label="结束时间">
        <a-date-picker
        format="YYYY-MM-DD HH:mm:ss"
          v-decorator="['结束时间',{}]"
        ></a-date-picker>
      </a-form-item>

      <a-form-item label="Message">
        <a-input  v-decorator="['Message',{rules: []} ]" placeholder="Message"></a-input>
      </a-form-item>

      <a-form-item >
        <a-checkbox  >1小时</a-checkbox>
      </a-form-item>
      
       <a-form-item >
        <a-checkbox  >今天</a-checkbox>
      </a-form-item>

     <a-form-item >
      <a-button type="default">查询</a-button>
      </a-form-item>
      


    </a-form>

    <pagination
      :current="pagination.current"
      :total="pagination.total"
      @pageChange="onPaginationChange"
    />

    <a-table
      bordered
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :dataSource="tableData"
      :columns="columns"
      :pagination="false"
      :loading="loading"
      rowKey="key"
      size="small"
    />
  </a-card>
</template>


<script>
//import buttons from './js/buttons'
import columns from './js/columns'

export default {
  components: {
    pagination: () => import('@/JtComponents/Pagination')
  },
  data() {
    return {
      pagination: {
        current: 1,
        pageSize: 10,
        total: 50
      },
      form:this.$form.createForm(this),
      //buttons: buttons,
      columns: columns,
      tableData: [],
      selectedRowKeys: [],
      loading: false
    }
  },
  methods: {
    //分页的方法
    onPaginationChange(page, size) {
      this.pagination.current = page
      this.pagination.pageSize = size
    },
    handleBtnClick(val) {},

    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>

<style lang="scss" scoped>
</style>