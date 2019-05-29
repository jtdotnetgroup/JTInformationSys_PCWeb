<template>
  <div>
    <div>
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

        <a-table
          id="cards"
          bordered
          :dataSource="dataSource"
          :columns="columnsMT"
          :pagination="false"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          :scroll="{ x: 2600, y: 500 }"
        >
          <template slot="serial" slot-scope="index">
            <span>{{dataTable.indexOf(index)+1}}</span>
          </template>

          <template slot="机台/设备" slot-scope="text, record">
            <EditableCell :text="text" @change="onCellChange(record.key, '机台/设备', $event)"/>
          </template>

          <template slot="操作员" slot-scope="text, record">
            <EditableCell :text="text" @change="onCellChange(record.key, '操作员', $event)"/>
          </template>

          <template slot="班次" slot-scope="text, record">
            <EditableCellInput :text="text" @change="onCellChange(record.key, '班次', $event)"/>
          </template>

          <template slot="派工数量" slot-scope="text, record">
            <EditableCellInput :text="text" @change="onCellChange(record.key, '派工数量', $event)"/>
          </template>

          <template slot="operation" slot-scope="text, record">
            <a-popconfirm
              v-if="dataSource.length"
              title="Sure to delete?"
              @confirm="() => onDelete(record.key)"
            >
              <a href="javascript:;" style="margin-left: 20px">Delete</a>
            </a-popconfirm>
          </template>
        </a-table>
      </a-modal>
    </div>
  </div>
</template>

<script>
import buttons from './js/buttons'
export default {
  components: {
    tableOperatorBtn: () => import('@/JtComponents/TableOperatorButton'),
    EditableCell: () => import('./pubilcvue/EditableCellSelect'),
    EditableCellInput: () => import('./pubilcvue/EditableCellInput')
  },
  data() {
    return {
      buttonps: buttons.buttonps,
      columnsMT: tableheader.columnsMT,
      dataSource: [
        {
          key: '0',
          日期: 'Edward King 0',
          '机台/设备': '32',
          操作员: 'London, Park Lane no. 0',
          班次: 'London, Park Lane no. 0',
          派工数量: 'London, Park Lane no. 0',
          派工单号: 'London, Park Lane no. 0',
          派单时间: '2019-5-13',
          计划员: 'London, Park Lane no. 0',
          备注: 'London, Park Lane no. 0'
        },
        {
          key: '1',
          日期: 'Edward King 0',
          '机台/设备': 'London, Park Lane no. 0',
          操作员: '男',
          班次: '男d',
          派工数量: 'London, Park Lane no. 0',
          派工单号: 'London, Park Lane no. 0',
          派单时间: '2019-5-13',
          计划员: 'London, Park Lane no. 0',
          备注: 'London, Park Lane no. 0'
        }
      ],
      count: 2
    }
  },
  methods: {
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource]
      const target = dataSource.find(item => item.key === key)
      if (target) {
        target[dataIndex] = value
        this.dataSource = dataSource
      }
    },
     hideModal() {
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
    onDelete(key) {
      const dataSource = [...this.dataSource]
      this.dataSource = dataSource.filter(item => item.key !== key)
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

    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleBtnClick(value) {},

  }
}
</script>

<style lang="scss" scoped>
</style>