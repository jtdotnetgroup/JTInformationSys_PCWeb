<template>
  <a-card>
    <buttons
      :buttons="buttons"
      v-model="where"
      :searchMethodName="searchMethodName"
      :search="true"
      @input="_LoadData"
    />
    <page
      :current="pagination.current"
      :total="pagination.totalCount"
      :defaultPageSize="pagination.pageSize"
      @input="_LoadData"
      v-model="pagination"
    />
    <a-table
      rowKey="fid"
      :columns="columns"
      :dataSource="dataList"
      :pagination="false"
      :loading="loading"
      :scroll="{ x: 1595, y: 550 }"
      :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: rowSelection.onChange }"
      :customRow="customRowClick"
    >
      <template slot="fBillNo" slot-scope="record, text">{{ text.fBillNo }}</template>
    </a-table>
    <icmoDispBillForm ref="icmoDispBillForm" />
    <ExceptionModal ref="ExceptionModal" />
    <DispatchWorkModalForm ref="DispatchWorkModalForm" @selectChange="_LoadData()"  />
  </a-card>
</template>

<script>
	 
import { CloseDispBill } from '@/api/DispBill'
import { GetAllDispBill } from '@/api/DispBill'
import { GenericColumns } from '@/utils/helper/ColumnsHelper'

export default {
  name: 'icmodispbill',
  components: {
    page: () => import('@/JtComponents/Pagination'),
    buttons: () => import('@/JtComponents/ButtonsGroup'),
    searchForm: () => import('@/JtComponents/SearchForm'),
    icmoDispBillForm: () => import('./components/icmoDispBillForm'),

    ExceptionModal: () => import('@/views/production/Taskassignment/ICMOException'),
    DispatchWorkModalForm: () => import('@/views/production/Taskassignment/DispatchWorkModalForm')
  },
  data() {
    return {
      buttons: [
        {
          text: '编辑',
          icon: 'edit',
          type: 'default',
          onClick: () => {
            const billObject = this.selectedRows[0]
            if (!!billObject) {
              this.$refs.icmoDispBillForm.show(billObject)
            }
          }
        },
        {
          text: '异常',
          icon: 'warning',
          type: 'default',
          onClick: () => {
            this._YC()
          }
        },
        {
          text: '关闭',
          icon: 'close-circle',
          type: 'danger',
          onClick: () => {
            this.GBMX()
          }
        },
        {
          text: '刷新',
          icon: 'reload',
          type: 'default',
          onClick: () => {
            this._LoadData()
          }
        }
      ],
      selectedRowKeys: [],
      selectedRows: [],
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = selectedRowKeys
          this.selectedRows = selectedRows
        }
        // onSelect: (record, selected, selectedRows) => {
        //   this.selectedRows = selectedRows
        // },
        // onSelectAll: (selected, selectedRows, changeRows) => {}
      },
      columnsDic: {
        id: 'id',
        fDate: '派工日期',
        fid: 'fid',
        fmoBillNo: '任务单号',
        fmoInterID: '',
        fBillNo: { title: '派工单号', width: 250 },
        fBillTime: '制单日期',
        machine: '设备',
        fMachineID: 'fMachineID',
        worker: '员工',
        userName: '员工账号',
        fWorkerID: '',
        fShift: '班次',
        fCommitAuxQty: '派工数量',
        dispFid: 'dispFid',
        fStatus: '状态'
      },
      searchMethodName: 'JIT.DIME2Barcode#ICMODispBillAppService#GetAll',
      where: '',
      dispBillWhere: '!String.IsNullOrEmpty(FBillNo)',
      pagination: {
        current: 1,
        pageSize: 20,
        totalCount: 0
      },
      dataList: [],
      loading: false,
      customRowClick: record => ({
        on: {
          click: () => {
            let rowkeys = []
            let rows = []

            let exist = rowkeys.filter(e => {
              return e['fid'] === record['fid']
            })

            let existRows = rows.filter(r => {
              return r['fid'] === record['fid']
            })

            //单选
            // if (this.options.multiple === false) {
            //   this.rowSelection.selectedRowKeys = exist;
            // }

            if (exist.length > 0) {
              let filters = rowkeys.filter(e => {
                return e !== record['fid']
              })
              let rowFilters = rows.filter(r => {
                return r['fid'] !== record['fid']
              })
              this.selectedRowKeys = filters
              this.selectedRows = rowFilters
            } else {
              rowkeys.push(record['fid'])
              rows.push(record)
            }

            this.selectedRowKeys = rowkeys
            this.selectedRows = rows
          }
        }
      })
    }
  },
  methods: {
    _LoadData() {
      if (!this.loading) {
        this.loading = true
        let endwhere = !!this.where ? (this.where += '&& ' + this.dispBillWhere) : this.dispBillWhere
        var params = {
          SkipCount: (this.pagination.current - 1) * this.pagination.pageSize,
          MaxResultCount: this.pagination.pageSize,
          Where: endwhere
        }
        GetAllDispBill(params)
          .then(res => {
            res.result.items.map(e => {
              e.fBillTime = this.$moment(e.fBillTime).format('YYYY-MM-D')
              e.fDate = this.$moment(e.fDate).format('YYYY-MM-D')
            })
            this.dataList = res.result.items
            this.pagination.totalCount = res.result.totalCount
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    // 关闭明细
    GBMX() {
      var _this = this
      if (this.selectedRows.length !== 1) {
        this.$notification['error']({
          message: '系统提示',
          description: '请选择一条数据'
        })
        return
      } else {
        var record = this.selectedRows[0]
        this.$confirm({
          title: '确定要关闭该任务吗?',
          content: '系统提示',
          onOk() {
            var obj = {
              id: record.dispFid
            }
            CloseDispBill(obj)
              .then(res => {
                if (res.success) {
                  _this.$message.success('关闭成功')
                  _this._LoadData();
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
      }
    },
    _YC() {
      var _this = this
      if (this.selectedRows.length !== 1) {
        this.$notification['error']({
          message: '系统提示',
          description: '请选择一条数据'
        })
        return
      } else {
        _this.$refs.ExceptionModal.show(this.selectedRows[0].dispFid)
      }
    }
  },
  computed: {
    columns() {
      return GenericColumns(this.columnsDic)
    },
    tablescroll() {
      return {
        x: this.columns.length * 120 + 120,
        y: 500
      }
    }
  },
  created() {
    this._LoadData()
  }
}
</script>

<style lang="scss" scoped></style>
