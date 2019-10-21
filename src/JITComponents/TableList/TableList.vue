<template>
  <div>
    <JITButtonsGroup :buttons="options.buttons" @buttonClick="handleButtonClick" />
    <a-table
      :rowSelection="{selectedRowKeys:rowSelection. selectedRowKeys, onChange:rowSelection.onChange}"
      size="middle"
      :dataSource="dataSource"
      :columns="options. columns"
      :rowKey="options.rowKey"
      :pagination="pagination"
      @change="onTableChange"
      :customRow="customRowClick"
      :scroll="options.scroll"
    ></a-table>
  </div>
</template>

<script>
const defaultButtonClick = text => {
  alert(text)
}
export default {
  name: 'TableList',
  data() {
    return {
      params: {
        where: ''
      },
      dataSource: [],
      pagination: {
        current: 1,
        defaultCurrent: 1,
        defaultPageSize: 20,
        hideOnSinglePage: false,
        pageSize: 20,
        pageSizeOptions: ['20', '50', '100'],
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        size: 'small'
      },
      rowSelection: {
        selectedRowKeys: [],
        selectedRows: [],
        onChange: (keys, rows) => {
          this.rowSelection.selectedRowKeys = keys
          this.rowSelection.selectedRows = rows
        }
      },
      //行点击事件
      customRowClick: record => ({
        on: {
          click: () => {
            let rowkeys = this.rowSelection.selectedRowKeys
            let rows = this.rowSelection.selectedRows

            let exist = rowkeys.filter(e => {
              return e === record[this.options.rowKey]
            })

            let existRows = rows.filter(r => {
              return r[this.options.rowKey] === record[this.options.rowKey]
            })

            //单选
            // if (this.options.multiple === false) {
            //   this.rowSelection.selectedRowKeys = exist;
            // }

            if (exist.length > 0) {
              let filters = rowkeys.filter(e => {
                return e !== record[this.options.rowKey]
              })
              let rowFilters = rows.filter(r => {
                return r[this.options.rowKey] !== record[this.options.rowKey]
              })
              this.rowSelection.selectedRowKeys = filters
              this.rowSelection.selectedRows = rowFilters
            } else {
              rowkeys.push(record[this.options.rowKey])
              rows.push(record)
            }
          }
        }
      })
    }
  },
  props: {
    options: {
      type: Object,
      required: true
    },
    tableData: {
      type: Function,
      required: true
    },
    buttonMethods: {
      type: Object
    }
  },
  methods: {
    onTableChange(pagination, filters, sorters) {
      this.pagination = pagination
      this.filters = filters
      this.sorters = sorters
      this._LoadData()
    },
    _LoadData() {
      let { params } = this
      params.pageIndex = this.pagination.current
      params.pageSize = this.pagination.pageSize
      const result = this.tableData(params)
      result.then(res => {
        this.dataSource = res
        this.pagination.total = this.dataSource.length
      })
    },
    handleButtonClick(methodName) {
      const method = this.buttonMethods[methodName]
      if (typeof method === 'function') {
        method(this.rowSelection.selectedRows)
          .then(res => {
            if(typeof res==='string')
              this.$message.success(res)
          })
          .catch(err => {
            this.$message.warning(err);
          })
      }
    }
  },
  mounted() {
    // this._LoadData()
  },
  created() {
    this._LoadData()
  }
}
</script>

<style lang="scss" scoped>
</style>