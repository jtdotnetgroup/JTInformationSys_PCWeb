<template>
  <a-card style="min-height:100%;">
    <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttons" :search="true"/>
    <a-layout-content style="padding: 0 5px">
      <a-layout style="padding: 24px 0; background: #fff">
        <a-layout-sider width="200" style="background: #fff">
          <a-tree showLine :defaultExpandedKeys="['0-0-0-0']" @select="onSelect">
            <a-tree-node key="0-0">
              <span slot="title" style="color: #1890ff">叙事簿</span>
              <a-tree-node title="工序计划" key="0-0-0"></a-tree-node>
              <a-tree-node title="工序派工" key="0-0-1">
                <a-tree-node title="leaf" key="0-0-1-0"/>
              </a-tree-node>
              <a-tree-node title="工序汇报" key="0-0-2">
                <a-tree-node title="leaf" key="0-0-2-0"/>
                <a-tree-node title="leaf" key="0-0-2-1"/>
              </a-tree-node>
              <a-tree-node title="计件工资" key="0-0-2">
                <a-tree-node title="leaf" key="0-0-2-0"/>
                <a-tree-node title="leaf" key="0-0-2-1"/>
              </a-tree-node>
            </a-tree-node>
          </a-tree>
        </a-layout-sider>
        <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
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
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <AddOrEdit ref="AddOrEdit"/>
    <GroupSet ref="GroupSet"/>
    <SelWhere ref="SelWhere"/>
    <FieldSet ref="FieldSet"/>
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
    title: '名称',
    dataIndex: 'gender',
    width: '20%'
  },
  {
    title: '类型',
    dataIndex: 'email'
  },
  {
    title: 'ID',
    dataIndex: 'email'
  },
  {
    title: '分组',
    dataIndex: 'email'
  },
  {
    title: '描述',
    dataIndex: 'email'
  }
]
export default {
  components: {
    tableOperatorBtn: () => import('@/JtComponents/TableOperatorButton'),
    editCell: () => import('@/JtComponents/JITEditCell'),
    AddOrEdit: () => import('./AddOrEdit'),
    GroupSet: () => import('./GroupSet'),
    SelWhere: () => import('./SelWhere'),
    FieldSet: () => import('./FieldSet')
  },
  data() {
    return {
      columns,
      buttons: [
        { text: '刷新', icon: '', type: 'default' },
        { text: '新增', icon: '', type: 'default' },
        { text: '编辑', icon: '', type: 'default' },
        { text: '删除', icon: '', type: 'default' },
        { text: '字段设置', icon: '', type: 'default' },
        { text: '分组设置', icon: '', type: 'default' },
        { text: '查询条件设置', icon: '', type: 'default' }
      ]
    }
  },
  methods: {
    handleBtnClick(val) {
      switch (val) {
        case '新增': {
          this.$refs.AddOrEdit.show()
          break
        }
        case '编辑': {
          this.$refs.AddOrEdit.show()
          break
        }
        case '字段设置': {
          this.$refs.FieldSet.show()
          break
        }
        case '分组设置': {
          this.$refs.GroupSet.show()
          break
        }
        case '查询条件设置': {
          this.$refs.SelWhere.show()
          break
        }
        default: {
          break
        }
      }
    }
  }
}
</script>
<style>
</style>
