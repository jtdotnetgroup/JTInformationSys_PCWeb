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
             :loading="loading"
            :dataSource="tableData"
            :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
            :columns="columns"
            :pagination="false"
             rowKey="id"
             :bordered="true"
             :scroll="{x: 1500,y: 500}"
             size="small"
          >
         

            <template slot="fSex" slot-scope="fSex">
              <span >{{fSex==1?"男":"女"}}</span>
            </template>
            <template slot="fWorkingState" slot-scope="fWorkingState">
              <span >{{fWorkingState==1?"在职":"离职"}}</span>
            </template>

            <template slot="fSystemUser" slot-scope="fSystemUser">
           
            <div v-if="fSystemUser==1" class="tabletd">
                <a-checkbox :checked="true" ></a-checkbox>

             </div>
              <div v-else class="tabletd">
                  <a-checkbox :checked="false" ></a-checkbox>
             </div>
     
            </template>
          </a-table>
        </a-col>
      </a-row>

      <!-- 新增组织弹框 -->
      <ModalFromOr ref="ModalFromOr"/>

      <!-- 新增员工弹框 -->
      <ModalFromEn ref="ModalFromEn"   @addSuccess="handelAddSuccess"/>
    </div>
  </a-card>
</template>

<script>
import { GetAll, DeleteOu,  } from '@/api/Organization'
import { GetFMpno } from '@/api/Employee'
import { Delete } from '@/api/Employee'

import buttons from './buttons'
import columns from './columns'
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
        pageSize: 10,
        total: 50
      },
      loading:true,
      tableData:[],
      columns: columns,
      selectedRowKeys: [],
      buttons: buttons,
      treevaule:'',
      treeId: '', //用于记录树形的ID
      isEdit: false,
    }
  },

  mounted() {
  this._LoadData()
  },
 
  methods: {
    //查询员工信息表
    _LoadData() {
      var params = {
        Id: this.treeId==''?0:this.treeId,
        SkipCount: this.pagination.current - 1,
        MaxResultCount: this.pagination.pageSize
      }
      GetAll(params)
        .then(res => {
          this.tableData = []
          const result = res.result  
          if (result) {
            this.tableData = result.items
            this.pagination.total = result.totalCount
            this.loading = false
          }
        })
        .catch(err => {
           this.loading = false
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
      this._LoadData()
    },
    //点击新增修改等按钮的方法
    handleBtnClick(val) {
      var _this = this
      switch (val) {
        case '新建组织': {
          var formData = {}
          if (!(!!this.treevaule)) {
            formData.Code = '00' + (store.getters.organizations.length + 1)
          } else {
            formData = this.treevaule
          }
          this.$refs.ModalFromOr.showModal(formData)
          break
        }
        case '新建员工': {
          this.isEdit = false
          var formData = {}
          formData = this.treevaule

          this.$refs.ModalFromEn.showModal(formData, this.isEdit)
          break
        }

        case '编辑员工': {
          this.isEdit = true

          var formData = {}

          if (this.tableData.length > 0) {
            if (this.selectedRowKeys.length === 1) {
              formData = this.selectedRows[0]
              this.$refs.ModalFromEn.showModal(formData, this.isEdit)
            } else {
              this.$message.warning('只能编辑一条！')
            }
          } else {
            this.$message.warning('请选择数据！')
          }

          break
        }

        case '删除组织': {
          if (this.treeId == '') {
            this.$message.info('请选择需要删除的组织')
            return
          }

          this.$confirm({
            title: '系统提示！',
            content: '确定要删除选中的吗?',
            onOk() {
              var params = {
                Id: _this.treeId
              }

              DeleteOu(params)
                .then(res => {
                  if (res.result > 0) {
                    _this.$message.success('成功')

                    _this.$store.dispatch('GetOrganizations', params)
                  } else {
                    _this.$message.error('失败')
                  }
                })
                .catch(err => {
                  console.log(err)
                  _this.$message.error('失败')
                })
            },
            onCancel() {
              _this.$message.warning('数据要谨慎删除')
            }
          })

          break
        }
        case '删除员工': {
          if (_this.selectedRows.length !== 1) {
            this.$message.info('请选择需要删除删除的员工')
            return
          }

          this.$confirm({
            title: '系统提示！',
            content: '确定要删除选中的吗?',
            onOk() {
              var params = {
                Id: _this.selectedRows[0].id
              }

              Delete(params)
                .then(res => {
                  if (res.result > 0) {
                    _this.$message.success('成功')

               
                _this._LoadData()

                  } else {
                    _this.$message.error('失败')
                  }
                })
                .catch(err => {
                  console.log(err)
                  _this.$message.error('失败')
                })
            },
            onCancel() {
              _this.$message.warning('数据要谨慎删除')
            }
          })

          break
        }
        default:
          break
      }
    },

    //点击树形的办法
    btnTree(obj) {
      if (obj.selectedNodes.length > 0) {
        this.selectedRowKeys = []
        this.selectedRows = []
        this.treevaule = obj
        this.treeId = obj.selectedNodes[0].componentOptions.propsData.dataRef.id
        this.loading=true
        this._LoadData()
      } else {
        this.treevaule = ''
      }
    },
    //员工模态宽执行回掉的方法
    handelAddSuccess(){
      this.loading=true
      this.selectedRowKeys=[];
      this._LoadData();
      this.treevaule=''
    }
  }
}
</script>

<style scoped>

.tabletd{
  text-align: center
}



</style>


