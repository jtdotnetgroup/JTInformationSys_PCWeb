<template>
  <a-card>

    <tableOperatorBtn @btnClick="handleBtnClick"/>
    
    <pagination :current="pagination.current" :total="pagination.total"/>

    <a-table :dataSource="tableData" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" 
    :columns="columns" :pagination="false"></a-table>
    
    <createOrEditForm ref="createOrEditForm"  :visiable="createForm" title="新建角色" :fields="fields" />

  </a-card>
</template>

<script>

import tableOperatorBtn from '@/JtComponents/TableOperatorButton'
import pagination from '@/JtComponents/Pagination'
import createOrEditForm from '@/JtComponents/CreateOrEditForm'
import { constants } from 'crypto'
import Fields from './roleField.js'

  export default {
    components: {
      tableOperatorBtn,pagination,createOrEditForm
    },
    data() {
      return {
        queryParam:{
          rolename:'',
        },
        fields:Fields,
        columns:[
          {title:'名称',dataIndex:'name'},
          {title:'显示名称',dataIndex:'displayName'},
          {title:'描述',dataIndex:'description'}
        ],
        tableData:[
          {name:'administrators',displayName:'系统管理员组',description:'系统管理员组'},
          {name:'administrators',displayName:'系统管理员组',description:'系统管理员组'},
          {name:'administrators',displayName:'系统管理员组',description:'系统管理员组'},
          {name:'administrators',displayName:'系统管理员组',description:'系统管理员组'}
        ],
        selectedRowKeys:[],
        pagination:{
          current:1,
          total:50,
        },
        advanced:false,
        createForm:false,
      }
    },
    methods: {
      onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleBtnClick(val){
      switch(val){
        case '新建':{
          this.$refs.createOrEditForm.add();
        }
      }
    }
    },
    computed: {
      showEditBtn() {
        var result=this.selectedRowKeys.length===1;

        return result;
      }
    },
  }
</script>
<style scope>
  
</style>

