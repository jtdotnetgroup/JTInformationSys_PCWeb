<template>
  <a-card style="min-height:100%;">
    <a-row>
      <a-col :span="21" :push="3" style="padding-left:10px;">
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
          :pagination="false"
          rowKey="id"
        ></a-table>
      </a-col>
      <a-col :span="3" :pull="21" style="border-right: 1px solid #e2e2e2;">
        <a-tree
          showLine
          defaultExpandAll
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
  {
    title: '序号',
    dataIndex: 'XH',
    width: 80
  },
  {
    title: '主键Id',
    dataIndex: 'BasicInfoId',
    width: 80
  },
  {
    title: '唯一标识',
    dataIndex: 'BICode',
    width: 100
  },
  {
    title: '唯一名称',
    dataIndex: 'BIName',
    width: 150
  },
  {
    title: '类型',
    dataIndex: 'BIType',
    width: 80
  },
  {
    title: '描述',
    dataIndex: 'BIDescribe',
     width: 150
  },
   {
    title: '排序',
    dataIndex: 'BIOrder',
     width: 80
  }, 
   {
    title: 'Json',
    dataIndex: 'BIJson',
     width: 150
  }, 
  {
    title: '特定页面',
    dataIndex: 'BIURL',
    width: 150
  }
]
const treeData = [
  {
    title: '系统基本信息',
    key: '0',
    children: [
      {
        title: '颜色',
        key: 'color',
        children: [
          {
            title: '白色',
            key: 'white'
          },
          {
            title: '红色',
            key: 'red'
          },
          {
            title: '黑色',
            key: 'black'
          }
        ]
      }
    ]
  }
]
export default {
  // 组件
  components: {
    pagination: () => import('@/JtComponents/Pagination')
  },
  data() {
    return {
      dataSource: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 50
      },
      loading: false,
      columns,
      treeData,
      checkedKeys: ['0-0']
    }
  },
  methods: {
    onSelect(selectedKeys, info) {
      console.log(selectedKeys[0])
    },
    onCellChange() {},
    // 切换分页
    onPaginationChange(page, size) {
      this.pagination.current = page
      this.pagination.pageSize = size
      // this.loadTable()
    }
  }
}
</script>
