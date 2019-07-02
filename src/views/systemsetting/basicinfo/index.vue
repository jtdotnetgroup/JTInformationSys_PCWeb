<template>
  <a-card style="min-height:100%;">
    <a-row>
      <a-col :span="21" :push="3" style="padding-left:10px;">
        <!--功能按钮-->
        <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttons" :search="true" />

        <!-- <a-col :span=""></a-col>
        <a-input addonBefore="增加行数"></a-input> -->




        <!--表格-->
        <a-table
          size="small"
          bordered
          :dataSource="dataSource"
          :columns="columns"
          :loading="loading"
          :pagination="false"
          rowKey="BasicInfoId"
          
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        >
          <template
            v-for="col in ['BICode', 'BIName', 'BIType','BIDescribe','BIOrder','BIJson']"
            :slot="col"
            slot-scope="text,record,index"
          >
            <div :key="col">
              <a-input
                class="NewInput"
                v-if="true"
                style="margin: -5px 0"
                :value="text"
                @change="e => handleChange(e.target.value, index, col)"
              />
            </div>
          </template>
        </a-table>
        <!--其他页面模板-->
        <AddOrEdit ref="AddOrEdit" @addSuccess="Refresh" />
      </a-col>
      <a-col :span="3" :pull="21" style="border-right: 1px solid #e2e2e2;">
        <a-tree
          showLine
         
         v-if="treeData.length"
         :defaultExpandedKeys="['0']"
          v-model="checkedKeys"
          :treeData="treeData"
          @select="onSelect"
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
import { GetAll, GetAll3, Create, Delete } from '@/api/basicinfo'
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
      selectedRowKeys: []
    }
  },
  methods: {

    //行编辑的方法
    handleChange(value, key, column) {
    
      const newData = [...this.dataSource]
      const target = newData[key]
      if (target) {
        target[column] = value
        this.dataSource = newData
      }
    },

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
          var obj = [
            {
              title: '系统信息',
              key: '0',
              basicInfoId: null,
              biurl: '',
              children: res.result
            }
          ]
          this.treeData = obj

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
            _this.selectedRowKeys = []
            _this.selectedRows=[]
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
    YesBJ() {
      const newData = [...this.dataSource]
      newData.forEach(element => {
        element.editable = true
      })
    },
    // 刷新
    Refresh() {
      this.GettTreeData()
    },

    //移除行的公共方法
    DeleteRowData() {
        this.selectedRowKeys = []
       this.selectedRows.forEach(e => {
        const dataSource = [...this.dataSource]
        this.dataSource = dataSource.filter(item => item.XH !== e.XH)
        

      })
    },

    //移除数据库的数据
    DeleteData(){

      var _this=this;

       // 提示是否执行删除，是则继续，否则温馨提示
              _this.$confirm({
                title: '系统提示！',
                content: '确定要删除选中的吗?',
                onOk() {
                  _this.ShowLoad()

                  Delete(_this.selectedRows)
                    .then(res => {
                      if (res.result > 0) {
                        _this.$message.success('成功')

                        _this.DeleteRowData()

                        _this.selectedRows = []
                      } else {
                        _this.$message.error('失败')
                      }
                    })
                    .catch(err => {
                      console.log(err)
                    })
                    .finally(() => {
                      _this.HideLoad()
                    })
                },
                onCancel() {
                  _this.loading = false
                  _this.$notification['warning']({
                    message: '系统提示',
                    description: '数据要谨慎删除！'
                  })
                }
              })

    },

    // 功能按钮点击事件
    handleBtnClick(val) {
      var _this = this
      switch (val) {
        case '刷新': {
          _this.GetData()
          break
        }
        case '新增': {
          var Time = this.$moment().format('YYYY-MM-DD HH:mm:ss.sss')

          const { count, dataSource } = this
          const obj = {}
          obj.XH = this.dataSource.length + 1
          obj.BasicInfoId = 0
          obj.BICode = ''
          obj.BIName = ''
          obj.BIType = ''
          obj.BIDescribe = ''
          obj.BIOrder = ''
          obj.BIJson = ''
          obj.BIURL = ''
          obj.BIState = ''
          obj.IsDeleted = false
          obj.ParentId = this.SelId
          obj.CreateTime = Time
          obj.CreateUserId = 0
          obj.Remark = ''
          _this.dataSource = [...dataSource, obj]
          _this.count = count + 1
          break
        }
        case '保存': {
        
          if (!(_this.dataSource.filter(item => item.BICode.length===0).length===0)) {
            _this.$message.warning('唯一标识不能为空')
            return
          }

           _this.ShowLoad()

          Create(_this.dataSource)
            .then(res => {
              if (res.result > 0) {
                _this.$message.success('成功')
                this.Refresh()
              } else {
                _this.$message.error('失败')
              }
            })
            .catch(err => {
              console.log(err)
            })
            .finally(() => {
              _this.HideLoad()
            })
          break
        }
        case '删除': {
         
          if (_this.selectedRows.filter(item => item.BasicInfoId>0).length>0) {
            _this.DeleteData()
          }else{
             _this.DeleteRowData()
          }

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
.NewInput {
  border: 0px;
  border-radius: 0px;
}
</style>
