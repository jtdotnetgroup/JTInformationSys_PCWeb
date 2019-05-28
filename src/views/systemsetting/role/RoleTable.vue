<template>
  <a-card>
    <tableOperatorBtn @btnClick="handleBtnClick"/>

    <pagination :current="pagination.current" :total="pagination.total" @pageChange="onPaginationChange"/>

    <a-table :loading="loading"
      :dataSource="tableData"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :bordered="true"
      :pagination="false" rowKey="name"
      size="small"
      
    ></a-table>

    <roleEditModal ref="roleModal"/>
    <a-modal/>
  </a-card>
</template>

<script>
import tableOperatorBtn from '@/JtComponents/TableOperatorButton'
import pagination from '@/JtComponents/Pagination'
import Fields from './roleField.js'
import{GetAll,Create,Update,Delete} from '@/api/Role'

export default {
  components: {
    tableOperatorBtn,
    pagination,
    roleEditModal: () => import('./RoleList')
  },
  data() {
    return {
      queryParam: {
        rolename: ''
      },
      fields: Fields,
      columns: [
        { title: '名称', dataIndex: 'name',align: 'center'},
        { title: '显示名称', dataIndex: 'displayName',align: 'center' },
        { title: '描述', dataIndex: 'description',align: 'center' }
      ],
      tableData: [],
      selectedRowKeys: [],
      selectedRows:[],
      pagination: {
        current: 1,
        total: 50,
        size:10
      },
      advanced: false,
      createForm: false,
      loading:false,
      queryParams:{
        SkipCount:0,
        MaxResultCount:10,
        Keyword:''
      }
    }
  },
  mounted () {
    this._loadData();
  },
  methods: {
    _loadData(){
      this.queryParams.SkipCount=this.pagination.current-1;
      this.queryParams.MaxResultCount=this.pagination.size;
      this.loading=true;
      GetAll(this.queryParams).then(res=>{
        var result=res.result;

        if(result.items.length>0){
          this.tableData=result.items;
        }
        this.loading=false;
      }).catch(error=>{
        this.loading=false;
      })
    },
    onPaginationChange(page,size){
      this.pagination.current=page;
      this.pagination.size=size;
      this._loadData();
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleBtnClick(val) {
      switch (val) {
        case '新建': {
          this.$refs.roleModal.show()
          break;
        }
        case '编辑':{
          if(this.selectedRows.length===0){
            return;
          }
          this.$refs.roleModal.show(this.selectedRows[0])
          break;
        }
        case '删除':{
          if(this.selectedRows.length===0){
            return;
          }
          break;
        }
      }
    },
    handleCreateSubmit(values) {
      console.log(values)
    }
  },
  computed: {
    showEditBtn() {
      var result = this.selectedRowKeys.length === 1

      return result
    }
  }
}
</script>
<style scoped>
.ant-modal {
  width: 60vw !important;
  /* overflow-y: auto; */
}
</style>
