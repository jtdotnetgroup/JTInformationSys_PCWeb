<template>
  <a-card>
    <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttons"/>

    <div>
      <a-row :gutter="10">
        <a-col :span="4">
          <treeData @btnClick="btnTree"/>
        </a-col>
        <a-col :span="20">
          <pagination
            :current="pagination.current"
            :total="pagination.total"
            @pageChange="onPaginationChange"
          />
          <a-table
            :dataSource="tableData"
            :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
            :columns="columns"
            :pagination="false"
             rowKey="Id" 
          >
            <!-- <template slot="roles" slot-scope="roles">                      
                        <span v-for="(role,index) in roles.split(',')" :key="index">{{role}},</span>
            </template>-->
          </a-table>
        </a-col>
      </a-row>

      <!-- 新增组织弹框 -->
      <ModalFromOr ref="ModalFromOr"/>

      <!-- 新增员工弹框 -->
      <ModalFromEn ref="ModalFromEn"/>
    </div>
  </a-card>
</template>

<script>
import { GetAll,DeleteOu } from '@/api/Organization'
import buttons from './buttons'
import columns from './columns'
import tableData from './tableData'
import { close } from 'fs'
import store from '@/store'
export default {
  components: {
    tableOperatorBtn: () => import('@/JtComponents/TableOperatorButton'),
    pagination: () => import('@/JtComponents/Pagination'),
    treeData: () => import('./ptreedata'),
    ModalFromOr: () => import('./ModalFromOr'),
    ModalFromEn: () => import('./ModalFromEn')
  },
  data() {
    return {
      pagination: {
        current: 1,
        total: 50
      },
      tableData: [],
      columns: columns,
      selectedRowKeys: [],
      buttons: buttons,
      treevaule: '',
      treeId:''//用于记录树形的ID

    }
  },

  mounted() {
    //this._LoadData()
  },
  methods: {

    //查询员工信息表
    _LoadData() {
      var params = {
        Id:this.treeId,
        SkipCount: this.pagination.current - 1,
        MaxResultCount: this.pagination.pageSize
      }

      GetAll(params)
        .then(res => {
          this.tableData=[]
          const result = res.result
          if (result) {
            this.tableData = result.items
            this.pagination.total = result.totalCount
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    onPaginationChange(page, size) {
      this.pagination.current = page
      this.pagination.pageSize = size     
      this._loadData()
    },
    handleBtnClick(val) {
      switch (val) {
        case '新建组织':
          var formData = {}

          if (!!!this.treevaule) {
            formData.Code = '0000' + (store.getters.organizations.length + 1)
          } else {
            formData = this.treevaule
          }
          this.$refs.ModalFromOr.showModal(formData)
          break
        case '新建员工':

          var formData={}

           //if(this.tableData.length)

          

          this.$refs.ModalFromEn.showModal(formData)
          break
          case '删除组织':

         
      
           DeleteOu(id).then(res=>{

             

           }).catch(err=>{
             console.log(err)
           })


          break

        default:
          break
      }
    },

   


    //点击树形的办法
    btnTree(obj) {
      this.treevaule = obj
      this.treeId=obj.selectedNodes[0].componentOptions.propsData.dataRef.id
      this._LoadData()

    }
  }
}
</script>
