<template>
  <a-card>
    <!-- <div> -->
      <a-row :gutter="10">
        <a-col :span="4">
          <treedata @btnClick="btnTree"/>
        </a-col>
        <a-col :span="20">
          <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttons"/>
          <pagination
            :current="pagination.current"
            :total="pagination.total"
            @pageChange="onPaginationChange"
          />

          <a-table 
            :loading="loading"
            :dataSource="tableData"
            :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
            :columns="columns"
            :pagination="false"
            :customRow="setRow"
            size="small"
            :scroll="{x: 1500,y: 500}"
             :bordered="true"
          ></a-table>

          <!-- 公共组件 明细table -->
          <pTableVue ref="pTableVue"/>
        </a-col>

        <!-- 公共组件 模态框 -->
        <ModelFrom ref="ModelFrom" @addSuccess="handelAddSuccess" />

        <ShiftForm ref="ShiftForm"/>
      </a-row>
    <!-- </div> -->
  </a-card>
</template>

<script>
import {buttons} from './js/buttons'
import {columns} from './js/columns'
import { GetAll } from '@/api/Equipment'

export default {
  components: {
    tableOperatorBtn: () => import('@/JtComponents/TableOperatorButton'),
    pagination: () => import('@/JtComponents/Pagination'),
    treedata: () => import('./publicvue/ptreedata'),
    pTableVue: () => import('./publicvue/pTable'),
    ModelFrom: () => import('./publicvue/ModelFrom'),
    ImportExcelModal: () => './publicvue/ImportExcelModal',
    ShiftForm: () => import('./publicvue/ShiftList')
  },
  data() {
    return {
      pagination: {
        current: 1,
        total: 0,
        size: 10
      },
      tableData: [],
      columns: columns,
      selectedRowKeys: [],
      selectedRows: [],
      buttons: buttons.buttons,
      loading: false,
      OrganizationID:0,
      OrgCode:''
    }
  },
  methods: {
    onPaginationChange(page, size) {
      this.pagination.current = page
      this.pagination.size = size
      this._loadData()
    },
    handleBtnClick(val) {
      switch (val) {
        case '新增': {
          this.$refs.ModelFrom.showModal()
          break
        }

        case '维护': {
          if (this.selectedRows.length !== 1) {
            return
          }
          this.$refs.ModelFrom.showModal(this.selectedRows[0])
          break
        }

        case '班次信息维护': {
          if(this.selectedRows.length===1){
            this.$refs.ShiftForm.show(this.selectedRows[0].fInterID);
          }
        }

        default: {
          break
        }
      }
    },
    pageChangeClick() {},
    onSelectChange(keys, rows) {
      this.selectedRowKeys = keys
      this.selectedRows = rows
    },
    setRow(render) {
      return {
        on: {
          click: () => {
            this.$refs.pTableVue._loadData()
          }
        }
      }
    },

    _loadData() {
      var params = {
        SkipCount: (this.pagination.current - 1)*this.pagination.size,
        MaxResultCount: this.pagination.size,
        OrganizationID:this.OrganizationID>0?this.OrganizationID:'',
        OrganizationCode:this.OrgCode
      }
      this.loading = true
      GetAll(params)
        .then(res => {
          this.tableData=[]
          this.loading = false
          const result=res.result    
          var index=0     
          if(result){

            result.items.forEach(e => {
              e.findex=index+1
              this.tableData.push(e)
              index++
            });
              
              //this.tableData = result.items
              this.pagination.total = result.totalCount
          }
          
        })
        .catch(err => {
          this.loading = false
        })
    },

    btnTree(keys,e) {
      if(keys.length===0){
        return;
      }

      this.OrgCode=keys[0];
      
      this._loadData();
      
    },
    handelAddSuccess(){
      this.loading=false
      this.selectedRowKeys=[]
      this._loadData()
    },
    getOrgID(code){

    }
  },

  //计算属性用于响应式的改变函数
  computed: {},
  mounted() {
    this._loadData()
    this.$store.dispatch('GetWorkCenters');
  },
  
}
</script>

<style lang="scss" scoped>

</style>