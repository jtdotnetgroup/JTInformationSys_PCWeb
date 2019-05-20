<template>
  <a-card>
    <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttons"/>

    <div>
      <a-row :gutter="10">
        <a-col :span="4" >
          <treedata @btnClick="btnTree"/>
        </a-col>
        <a-col :span="20">
          <pagination :current="pagination.current"
          :pageSizeOptions="pagination.pageSizeOptions"
          :defaultPageSize="pagination.defaultPageSize"
          :total="pagination.total"
           @pageChange="pageChangeClick"/>

          <a-table
            :dataSource="tableData"
            :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
            :columns="columns"
            :pagination="false"
            :customRow="setRow"
          ></a-table>

        <!-- 公共组件 明细table -->
          <pTableVue ref="pTableVue"/>
        </a-col>

        <!-- 公共组件 模态框 -->
         <ModelFrom  ref="ModelFrom"/> 

      


      </a-row>
    </div>
  </a-card>
</template>

<script>
import buttons from './js/buttons'
import columns from './js/columns'
import tableData from './js/tableData'

export default {
  components: {
    tableOperatorBtn: () => import('@/JtComponents/TableOperatorButton'),
    pagination: () => import('@/JtComponents/Pagination'),
    treedata: () => import('./publicvue/ptreedata'),
    pTableVue: () => import('./publicvue/pTable'),
    ModelFrom:()=>import('./publicvue/ModelFrom'),
    ImportExcelModal:()=>('./publicvue/ImportExcelModal')

   
  },
  data() {
    return {
       pagination: {
        current: 1,
        total: 50,
        pageSize: 100,
        pageSizeOptions: ['100', '200', '300'],
        defaultPageSize: 100
      },
      tableData: tableData,
      columns: columns,
      selectedRowKeys: [],
      buttons: buttons.buttons
    }
  },
  methods: {
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleBtnClick(val) {
        switch (val) {
            case '新增':
                 
                 const obj={};

                this.$refs.ModelFrom.showModal(obj)
               
                break;
                case'维护':
              
                break;
        
            default:
                break;
        }

    },
    pageChangeClick(){

    },
    setRow(render){
      return {
        on:{
          click:()=>{

            this.$refs.pTableVue._loadData()
          }
        }

      }
    },
   

    btnTree() {
      // alert('单击')
    }
  },

  //计算属性用于响应式的改变函数
  computed: {

    test(){

      alert("方法执行")
    }
    
  },
}
</script>

<style lang="scss" scoped>
</style>