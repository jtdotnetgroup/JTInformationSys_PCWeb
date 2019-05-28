<template>
  <a-modal
    title="新增/维护"
    :visible="visiable"
    width="1000px"
    style="left:80px"
    :maskClosable="true"
    @ok="handleSubmit"
    @cancel="onClose"
  >
    <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttons" :search="false"/>

    <a-form layout="inline" :form="form" @change="handleFormChange">
      <a-form-item label="任务单号">
        <a-input v-decorator="['任务单号',{ initialValue: this.formData.任务单号}]" disabled></a-input>
      </a-form-item>
      <a-form-item label="计划开工">
        <a-date-picker
          disabled
          v-decorator="['计划开工',{ initialValue: this.$moment(this.formData.计划开工日期)}]"
        ></a-date-picker>
      </a-form-item>
      <a-form-item label="计划完工">
        <a-date-picker
          disabled
          v-decorator="['计划完工',{ initialValue: this.$moment(this.formData.计划完工日期)}]"
        ></a-date-picker>
      </a-form-item>
      <a-form-item label="产品编码">
        <a-input disabled v-decorator="['产品编码',{ initialValue: this.formData.产品编码}]"></a-input>
      </a-form-item>
      <a-form-item label="产品名称">
        <a-input disabled v-decorator="['产品名称',{ initialValue: this.formData.产品名称}]"></a-input>
      </a-form-item>
      <a-form-item label="规格型号">
        <a-input disabled v-decorator="['规格型号',{ initialValue: this.formData.规格型号}]"></a-input>
      </a-form-item>
      <a-form-item label="计划数量">
        <a-input disabled v-decorator="['计划数量',{ initialValue: this.formData.计划生产数量}]"></a-input>
      </a-form-item>
      <a-form-item label="排产数量">
        <a-input disabled v-decorator="['排产数量',{ initialValue: this.formData.排产数量}]"></a-input>
      </a-form-item>
    </a-form>

    <a-table
      id="table"
      size="small"
      rowKey="fSrcID"
      :dataSource="tableData"
      :columns="columns"
      :pagination="false"
      :bordered="true"
      :loading="dataLoading"   
    >
      <template v-for="(col,index) in editColumns" :slot="col" slot-scope="text, record, index">
        <editCell :key="index" :text="text" @change="onCellChange(record.日期, col, $event)"/>
      </template>
    </a-table>
  </a-modal>
</template>

<script>
import { columns, editColumns } from './DispatchColumns'
import { GetAllDailyList, SaveDailyList } from '@/api/TaskScheduling'
import { GetDailyListByFMOInterID } from '@/api/ICMODaily'
export default {
  components: {
    tableOperatorBtn: () => import('@/JtComponents/TableOperatorButton'),
    editCell: () => import('@/JtComponents/JITEditCell')
  },
  data() {
    return {
      visiable: false,
      buttons: [
        { text: '结转', icon: '', type: 'default' },
        { text: '保存', icon: '', type: 'default' },
        { text: '审核', icon: '', type: 'default' },
        { text: '派工', icon: '', type: 'default' },
        { text: '新建', icon: '', type: 'default' }
      ],
      form: this.$form.createForm(this),
      formData: {},
      columns: columns,
      editColumns: editColumns,
      dataLoading: false,
      selectedRowKeys: [],
      selectedRows: [],
      dataSource: []
    }
  },
  props: {
    value: {
      type: Object
    }
  },
  methods: {
    show(formData) {
      this.visiable = true
      this.formData = formData
      this.dataLoading = true
      const params = {
        fMOInterID: formData.fmoInterID
      }

      GetDailyListByFMOInterID(params)
        .then(res => {
          console.log('ok')
          var result = res.result
          this.dataLoading = false
          if (result) {
            this.dataSource = result
          }
        })
        .catch(err => {
          this.dataLoading = false
          console.log(err)
        })
    },
    saveDailyList() {
      var data = {
        fmoInterID: this.formData.fmoInterID,
        fmoBillNo: this.formData.任务单号,
        dailies: []
      }
      //添加明细
      this.dataSource.forEach(row => {
        data.dailies.push({
          fid:row.fid,
          FMachineName:row.机台,
          fDate: row.日期,
          FShift:row.班次,
          fPlanAuxQty: row.计划数量,
        })
      })

      SaveDailyList(data)
        .then(res => {
          var result = res.result
          if (result) {
            console.log(result)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleBtnClick(value) {
      switch (value) {
        case '保存': {
          this.saveDailyList()
        }
      }
    },
    handleSubmit() {
      const {
        form: { validateFields }
      } = this
      validateFields((err, values) => {
        if (!err) {
          let result = {}

          for (const key in values) {
            if (values.hasOwnProperty(key)) {
              const element = values[key]
              result[key] = element ? element.toString() : undefined
            }
          }

          this.$emit('submit', result)
        } else {
          console.log(err)
        }
      })
    },
    handleFormChange(changedFields) {
      this.formData = { ...this.formData, ...changedFields }
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    onCellChange(key, dataIndex, value) {
      console.log(value)
      const dataSource = [...this.dataSource]
      const dstarget = dataSource.find(item => this.$moment(item.日期).format('YYYY-MM-D') === key)
      const tabletarget = this.tableData.find(item => item.日期 === key)

      if (dstarget) {
        dstarget[dataIndex] = value
        this.dataSource = dataSource
      } else {
        var data = {
          key: key,
          日期: tabletarget.日期,
          机台: '',
          班组: '',
          操作员: '',
          派工数量: 0,
          完成数量: 0,
          合格数量: 0,
          fmoBillNo: this.formData.任务单号,
          fmoInterID: this.formData.fmoInterID,
          计划数量: value
        }
        this.dataSource.push(data)
      }
    },
    onClose() {
      this.dataSource = []
      this.visiable = false
    }
  },
  computed: {
    tableData() {

      if(this.dataSource.length>0){
        return this.dataSource;
      }

      let startDate = this.$moment(this.formData.计划开工日期)
      //结束日期推后一天
      let endDate = this.$moment(this.formData.计划完工日期).add(1, 'days')

      var result = []
      var index = 0

      while (startDate.isBefore(endDate)) {
        var item = this.dataSource.filter(e => {
          return startDate.isSame(e.日期, 'day')
        })

        item.forEach(row => {
          var data = {
            key: index,
            日期: startDate.format('YYYY-MM-D'),
            机台: '',
            班次: '',
            操作员: '',
            派工数量: 0,
            完成数量: 0,
            合格数量: 0,
            fmoBillNo: this.formData.任务单号,
            fmoInterID: this.formData.fmoInterID,
            计划数量: 0
          }

          data.计划数量 = row.计划数量
          data.派工数量 = row.派工数量
          data.完成数量 = row.完成数量
          data.合格数量 = row.合格数量
          data.机台 = row.机台
          data.班次 = row.班次
          data.操作员 = row.操作员

          result.push(data)
        })

        // if (item.length > 0) {
        //   data.计划数量 = item[0].计划数量
        //   data.派工数量 = item[0].派工数量
        //   data.完成数量 = item[0].完成数量
        //   data.合格数量 = item[0].合格数量
        // }

        // result.push(data)
        startDate = startDate.add(1, 'days')
        index = index + 1
      }
      return result
    }
  }
}
</script>

<style scoped>
#table {
  margin-top: 10px;
}
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>