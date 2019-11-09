<template>
  <a-modal
    title="设备选择"
    :visible="visible"
    @ok="handleOk"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-input-group compact>
      <a-select v-model="selectModel.defaultValue" style="width:120px;">
        <a-select-option
          v-for="(item) in selectModel.option"
          :key="item"
          :value="item.value"
        >{{item.title}}</a-select-option>
      </a-select>
      <a-input style="width: 200px" v-model="formtext" placeholder="设备名称" />
      <a-button type="primary" @click="loadData">搜索</a-button>
      <br />
    </a-input-group>
    <a-table
    :rowSelection="{selectedRowKeys:rowSelection. selectedRowKeys, onChange:rowSelection.onChange}"
      :columns="columns"
      :dataSource="data"
      size="small"
      :customRow="customRowClick"
      rowKey="fNumber"
    ></a-table>
  </a-modal>
</template>
<script>
// 获取数据
import { GetAllList, GetSelectModel } from '@/api/t_equipment'
// 脚本
const columns = [
  // {
  //   title: '选择',
  //   dataIndex: 'fInterID',
  //   scopedSlots: { customRender: 'fInterID' }
  // },
  {
    title: '编号',
    dataIndex: 'fNumber'
  },
  {
    title: '设备号',
    dataIndex: 'fName'
  },
  {
    title: '所属车间',
    dataIndex: 'displayName'
  }
]
export default {
  data() {
    return {
      columns,
      data: [],
      formtext: '',
      visible: false,
      confirmLoading: false,
      selectModel: {
        defaultValue: 0,
        option: []
      },
      rowData: {},
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

            this.rowSelection.selectedRowKeys=[];
            this.rowSelection.selectedRows=[];
            this.rowSelection.selectedRows.push(record);
            this.rowSelection.selectedRowKeys.push(record.fNumber);

            console.log(this.rowSelection.selectedRowKeys);
          }
        }
      })
    }
  },
  methods: {
    // 选项卡切换时
    onSelectChange(selectedRowKeys, selectedRows) {
      // this.selectedRowKeys = selectedRowKeys
      // this.selectedRows = selectedRows
    },
    show(record) {
      this.visible = true
      this.rowData = record
      this.rowSelection.selectedRowKeys = []
      this.rowSelection.selectedRows = []
      this.loadData()
    },
    // setRow(record) {
    //   return {
    //     on: {
    //       //表格行点击事件
    //       click: () => {
    //         console.log(this)

    //         // let rowkeys = this.selectedRowKeys
    //         // let exist = rowkeys.filter(e => {
    //         //   return e === record.fNumber
    //         // })

    //         // if (!!exist.length) {
    //         //   let filters = rowkeys.filter(e => {
    //         //     return e !== record.fNumber
    //         //   })
    //         //   this.selectedRowKeys = filters
    //         // } else {
    //         //   rowkeys.push(record.fNumber)
    //         // }

    //         // this.selectedRowKeys=rowkeys;
    //       }
    //     }
    //   }
    // },
    handleOk(e) {
      var _this = this
      if (_this.rowSelection.selectedRows.length === 1) {
        this.$emit('selectChange', this.rowSelection.selectedRows[0], this.rowData)
        this.confirmLoading = true
        this.rowSelection.selectedRowKeys=[];
        this.rowSelection.selectedRows=[];
        this.visible = false
        this.confirmLoading = false
      } else {
        _this.$notification['error']({
          message: '系统提示',
          description: '编辑时只能选择一个！'
        })
      }
    },
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    // 显示车间下拉列表
    showCJ() {
      GetSelectModel().then(res => {
        if (res.success) {
          this.selectModel.option = [{ value: 0, title: '全部车间' }].concat(res.result)
        }
      })
    },
    loadData() {

      this.rowSelection.selectedRowKeys=[];
      this.rowSelection.selectedRows=[];

      var obj = {
        fName: this.formtext,
        fWorkCenterID: this.selectModel.defaultValue,
        sorting: 'fName',
        skipCount: 0,
        maxResultCount: 100
      }
      GetAllList(obj).then(res => {
        if (res.success) {
          this.data = res.result
        }
      })
    }
  }, // 页面渲染完加载
  created() {
    this.showCJ()
  }
}
</script>