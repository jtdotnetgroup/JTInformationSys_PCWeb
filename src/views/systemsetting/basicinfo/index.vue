<template>
  <a-card style="min-height:100%;">
    <a-row>
      <a-col :span="21" :push="3" style="padding-left:10px;">
        <!--功能按钮-->
        <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttons" :search="true"/>
        <!--表格-->
        <a-table
          size="small"
          bordered
          :dataSource="dataSource"
          :columns="columns"
          :loading="loading"
          :pagination="false"
          rowKey="id"
          :rowSelection="{onChange: onSelectChange}"
        >
          <template
            v-for="col in ['BICode', 'BIName', 'BIType','BIDescribe','BIOrder','BIJson']"
            :slot="col"
            slot-scope="text"
          >
            <div :key="col">
              <a-input
              class="NewInput"
                v-if="true"
                style="margin: -5px 0"
                :value="text" 
              /> 
            </div>
          </template>
        </a-table>
        <!--其他页面模板-->
        <AddOrEdit ref="AddOrEdit" @addSuccess="Refresh"/>
      </a-col>
      <a-col :span="3" :pull="21" style="border-right: 1px solid #e2e2e2;">
        <a-tree
          showLine
          defaultExpandAll
          v-model="checkedKeys"
          :treeData="treeData"
          @select="onSelect"
          :defaultSelectedKeys="SelId"
        ></a-tree>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
// 列名
const columns = [
  // {
  //   title: '序号',
  //   dataIndex: 'XH',
  //   width: 80
  // },
  // {
  //   title: '主键Id',
  //   dataIndex: 'BasicInfoId',
  //   width: 80
  // },
  {
    title: '唯一标识',
    dataIndex: 'BICode',
    width: 10,
    scopedSlots: { customRender: 'BICode' }
  },
  {
    title: '唯一名称',
    dataIndex: 'BIName',
    width: 150,
    scopedSlots: { customRender: 'BIName' }
  },
  {
    title: '类型',
    dataIndex: 'BIType',
    width: 80,
    scopedSlots: { customRender: 'BIType' }
  },
  {
    title: '描述',
    dataIndex: 'BIDescribe',
    width: 150,
    scopedSlots: { customRender: 'BIDescribe' }
  },
  {
    title: '排序',
    dataIndex: 'BIOrder',
    width: 80,
    scopedSlots: { customRender: 'BIOrder' }
  },
  {
    title: 'Json',
    dataIndex: 'BIJson',
    width: 150,
    scopedSlots: { customRender: 'BIJson' }
  }
  // ,
  //   {
  //     title: '特定页面',
  //     dataIndex: 'BIURL',
  //     width: 150
  //   }
]

// 获取数据
import { GetAll, GetAll3 } from '@/api/basicinfo'
export default {
  // 组件
  components: {
    tableOperatorBtn: () => import('@/JtComponents/TableOperatorButton'),
    pagination: () => import('@/JtComponents/Pagination'),
    AddOrEdit: () => import('./AddOrEdit')
  },
  data() {
    return {
      dataSource: [],
      buttons: [
        { text: '刷新', icon: '', type: 'default' },
        { text: '新增', icon: '', type: 'default' },
        { text: '删除', icon: '', type: 'default' },
        { text: '保存', icon: '', type: 'default' }
      ],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 50
      },
      loading: false,
      columns,
      treeData: [],
      checkedKeys: ['0-0'],
      SelId: null,
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  methods: {
    // 选项卡切换时
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    //
    onSelect(selectedKeys, e) {
      console.log(selectedKeys[0], e.selectedNodes[0].data.props)
      this.SelId = e.selectedNodes[0].data.props.basicInfoId
      this.GetData()
    },
    onCellChange() {},
    // 切换分页
    onPaginationChange(page, size) {
      this.pagination.current = page
      this.pagination.pageSize = size
      // this.loadTable()
    },
    // 显示表格加载框
    ShowLoad() {
      this.loading = true
    },
    // 隐藏表格加载框
    HideLoad() {
      this.loading = false
    },
    // 获取树形菜单
    GettTreeData() {
      GetAll3().then(res => {
        if (res.success) {
          this.treeData = res.result
          this.GetData()
        }
      })
    },
    GetData() {
      var _this = this
      _this.dataSource = []
      _this.ShowLoad()
      var obj = { ParentId: this.SelId }
      GetAll(obj)
        .then(res => {
          if (res.success) {
            var i = 0
            res.result.forEach(item => {
              i++
              var obj = {}
              obj.XH = i
              obj.BasicInfoId = item.basicInfoId
              obj.BICode = item.biCode
              obj.BIName = item.biName
              obj.BIType = item.biType
              obj.BIDescribe = item.biDescribe
              obj.BIOrder = item.biOrder
              obj.BIJson = item.biJson
              obj.BIURL = item.biurl
              obj.BIState = item.biState
              obj.IsDeleted = item.isDeleted
              obj.ParentId = item.parentId
              obj.CreateTime = item.createTime
              obj.CreateUserId = item.createUserId
              obj.Remark = item.remark
              _this.dataSource.push(obj)
            })
          }
        })
        .finally(() => {
          _this.HideLoad()
        })

    },
    YesBJ(){
       const newData = [...this.dataSource]
       newData.forEach(element => {
         element.editable =true;
       });
    },
    // 刷新
    Refresh() {
      this.GettTreeData()
    },
    //
    // 功能按钮点击事件
    handleBtnClick(val) {
      var _this = this
      switch (val) {
        case '刷新': {
          alert(JSON.stringify(_this.dataSource))
          _this.GetData()
          break
        }
        case '新增': {
          const { count, dataSource } = this
          const obj = {}
          obj.XH = this.dataSource.length + 1
          obj.BasicInfoId = ''
          obj.BICode = ''
          obj.BIName = ''
          obj.BIType = ''
          obj.BIDescribe = ''
          obj.BIOrder = ''
          obj.BIJson = ''
          obj.BIURL = ''
          obj.BIState = ''
          obj.IsDeleted = ''
          obj.ParentId = ''
          obj.CreateTime = ''
          obj.CreateUserId = ''
          obj.Remark = ''
          _this.dataSource = [...dataSource, obj]
          _this.count = count + 1
          break
        }
        case '保存': {
          break
        }
        case '删除': {
          if (_this.selectedRows.length !== 1) {
            _this.$notification['warning']({
              message: '系统提示',
              // description: '请选择一个或一个以上'
              description: '请选择一个'
            })
            return
          }
          // 提示是否执行删除，是则继续，否则温馨提示
          _this.$confirm({
            title: '系统提示！',
            content: '确定要删除选中的吗?',
            onOk() {
              _this.ShowLoad()
              DataDel(_this.selectedRows[0])
                .then(res => {
                  if (res.success) {
                    _this.$notification['success']({
                      message: '系统提示',
                      description: '删除成功'
                    })
                    _this.loadTable()
                  } else {
                    _this.$notification['error']({
                      message: res.error.message,
                      description: res.error.details
                    })
                  }
                  _this.HideLoad()
                })
                .catch(function() {
                  _this.HideLoad()
                })
            },
            onCancel() {
              _this.$notification['warning']({
                message: '系统提示',
                description: '数据要谨慎删除！'
              })
            }
          })
          break
        }
        default: {
          _this.$notification['info']({
            message: '系统提示',
            description: '功能待完善'
          })
          break
        }
      }
    }
  },
  // 页面渲染完加载
  created() {
    this.Refresh()
  }
}
</script>
<style>
.NewInput{
  border: 0px;
  border-radius:0px; 
}
</style>
