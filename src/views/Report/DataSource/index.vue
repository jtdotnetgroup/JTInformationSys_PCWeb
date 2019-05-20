<template>
  <a-card style="min-height:100%;">
    <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttons" :search="true"/>
    <a-table
      :columns="columns"
      :rowKey="record => record.login.uuid"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template slot="name" slot-scope="name">{{name.first}} {{name.last}}</template>
    </a-table>
    <AddOrEdit ref="AddOrEdit"/>
  </a-card>
</template>
<script>
const columns = [
  {
    title: '序号',
    dataIndex: 'name',
    sorter: true,
    width: '20%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '数据源名称',
    dataIndex: 'gender',
    width: '20%'
  },
  {
    title: '类型',
    dataIndex: 'email'
  },
  {
    title: '服务器地址:端口',
    dataIndex: 'email'
  },
  {
    title: '数据库',
    dataIndex: 'email'
  },
  {
    title: '用户',
    dataIndex: 'email'
  },
  {
    title: '备注',
    dataIndex: 'email'
  }
]
export default {
  components: {
    tableOperatorBtn: () => import('@/JtComponents/TableOperatorButton'),
    editCell: () => import('@/JtComponents/JITEditCell'),
    AddOrEdit: () => import('./AddOrEdit')
  },
  data() {
    return {
      loading: false,
      columns,
      buttons: [
        { text: '刷新', icon: '', type: 'default' },
        { text: '新增', icon: '', type: 'default' },
        { text: '编辑', icon: '', type: 'default' },
        { text: '删除', icon: '', type: 'default' },
        { text: '链接测试', icon: '', type: 'default' }
      ]
    }
  },
  methods: {
    handleBtnClick(val) {
      if (val === '新增') {
        this.$refs.AddOrEdit.show();
      }
    }
  }
}
</script>
<style>
</style>
