<template>
  <a-modal :visible="visible" title="异常记录" @ok="onClose" @cancel="onClose" :width="800">
    <a-table :dataSource="tableData" :columns="columns" :pagination="false"></a-table>
  </a-modal>
</template>

<script>
import { GetExceptionsByDispFid } from '@/api/ICMOException'
import { GenericColumns } from '@/utils/helper/ColumnsHelper'
export default {
  name: 'ExceptionList',
  data() {
    return {
      tableData: [],
      fsrcId: '',
      visible: false,
      loading: false,
      cols: {
        id: 'string',
        fid: 'string',
        fSrcID: 'string',
        fBiller: '报告人',
        fTime: '时间',
        fRemark: '异常',
        fRecoverTime: '恢复时间',
        fNote: '备注'
      }
    }
  },
  computed: {
    columns() {
      return GenericColumns(this.cols)
    }
  },
  methods: {
    _LoadData() {
      const params = { fid: this.fsrcId }
      this.loading = true
      GetExceptionsByDispFid(params)
        .then(res => {
            this.tableData=res.result
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    show(fsrcId) {
      this.fsrcId = fsrcId
      this.visible = true
      this._LoadData()
    },
    onClose() {
      this.visible = false
      this.fsrcId = ''
      ;(this.tableData = []), (this.loading = false)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>