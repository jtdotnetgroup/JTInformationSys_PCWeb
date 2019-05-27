<!--页面代码-->
<template>
  <a-card style="min-height:100%;">
    <!--功能按钮-->
    <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttons" :search="true"/>
    <!-- 分页 -->
    <pagination
      :current="pagination.current"
      :total="pagination.total"
      @pageChange="onPaginationChange"
    />
    <!--表格-->
    <a-table
      bordered
      :dataSource="dataSource"
      :columns="columns"
      :loading="loading"
      :rowSelection="{onChange: onSelectChange}"
      :pagination="false"
      rowKey="id"
    >
      <template slot="name" slot-scope="text, record">
        <editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)"/>
      </template>
      <span slot="isActive" slot-scope="isActive">
        <div v-if="isActive">
          <a-tag color="#87d068">启用</a-tag>
        </div>
        <div v-else>
          <a-tag color="#f50">不启用</a-tag>
        </div>
      </span>
    </a-table>
    <!--其他页面模板-->
    <AddOrEdit ref="AddOrEdit" @addSuccess="loadTable"/>
  </a-card>
</template>
<!--JS脚本-->
<script>
// 获取数据
import { GetAll, DataDel } from '@/api/User'
// 列名
const columns = [
  {
    title: '序号',
    dataIndex: 'XH',
    width: 80
  },
  {
    title: 'UserID',
    dataIndex: 'id',
    width: 150
  },
  // {
  //   title: '姓',
  //   dataIndex: 'surname'
  // },
  {
    title: '用户名',
    dataIndex: 'userName',
    width: 150
  },
  {
    title: '邮箱地址',
    dataIndex: 'emailAddress',
    width: 150
  },
  {
    title: '角色',
    dataIndex: 'roleNames'
  },
  {
    title: '是否启用',
    dataIndex: 'isActive',
    scopedSlots: { customRender: 'isActive' },
    width: 100
  },
  {
    title: '注册时间',
    dataIndex: 'creationTime',
    width: 150
  }
]
// 基础数据
export default {
  // 组件
  components: {
    tableOperatorBtn: () => import('@/JtComponents/TableOperatorButton'),
    editCell: () => import('@/JtComponents/JITEditCell'),
    pagination: () => import('@/JtComponents/Pagination'),
    AddOrEdit: () => import('./AddOrEdit')
  },
  // 所有数据
  data() {
    return {
      pagination: {
        current: 1,
        pageSize: 10,
        total: 50
      },
      loading: false,
      columns,
      dataSource: [],
      buttons: [
        { text: '刷新', icon: '', type: 'default' },
        { text: '新增', icon: '', type: 'default' },
        { text: '编辑', icon: '', type: 'default' },
        { text: '删除', icon: '', type: 'default' }
      ],
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  // 页面渲染完加载
  created() {
    this.loadTable()
  },
  // 所有方法
  methods: {
    // 切换分页
    onPaginationChange(page, size) {
      this.pagination.current = page
      this.pagination.pageSize = size
      this.loadTable()
    },
    // 显示表格加载框
    ShowLoad() {
      this.loading = true
    },
    // 隐藏表格加载框
    HideLoad() {
      this.loading = false
    },
    // 功能按钮点击事件
    handleBtnClick(val) {
      var _this = this
      switch (val) {
        case '刷新': {
          _this.loadTable()
          break
        }
        case '新增': {
          _this.$refs.AddOrEdit.show({ id: 0 })
          break
        }
        case '编辑': {
          if (_this.selectedRows.length === 1) {
            _this.$refs.AddOrEdit.show(_this.selectedRows[0])
          } else {
            _this.$notification['error']({
              message: '系统提示',
              description: '编辑时只能选择一个！'
            })
          }
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
    },
    // 选项卡切换时
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    // 表格加载
    loadTable() {
      var _this = this
      _this.dataSource = []
      var obj = {
        SkipCount: (_this.pagination.current - 1) * _this.pagination.pageSize,
        MaxResultCount: _this.pagination.pageSize
      }

      _this.ShowLoad()
      GetAll(obj)
        .then(res => {
          var result = res.result
          _this.pagination.total = result.totalCount
          var i = 0
          res.result.items.forEach(element => {
            element.XH = i + 1
            element.creationTime = this.$moment(element.creationTime).format('YYYY-MM-DD hh:mm')
            _this.dataSource.push(element)
            i++
          })
          _this.HideLoad()
        })
        .catch(function() {
          _this.HideLoad()
        })
    }
  }
}
</script>
<style>
</style>
