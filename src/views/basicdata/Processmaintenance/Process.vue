<template>
  <a-card>
    <a-row :gutter="10">
      <a-col :span="4">
        <TreeForm @btnClick="btnTree"/>
      </a-col>

      <a-col :span="20">
        <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttonp"/>
        <pagination
          :current="pagination.current"
          :total="pagination.total"
          @pageChange="onPaginationChange"
        />

        <a-table
          :loading="loading"
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          :dataSource="dataTable"
          :columns="columnsMain"
          bordered
          :pagination="false"
          rowKey="fid"
          :scroll="scroll"
          size="small"
        >
        
         <template slot="fDeleted" slot-scope="fDeleted">
           
            <div v-if="fDeleted==true" class="tabletd">
                <a-checkbox :checked="true" ></a-checkbox>
             </div>
              <div v-else class="tabletd">
                  <a-checkbox :checked="false" ></a-checkbox>
             </div>
     
            </template>
        
        </a-table>
      </a-col>
    </a-row>

    <!-- 不良项目模态框 -->
    <ProcessModalFrom ref="ProcessModalFrom" @addSuccess="handelAddSuccess"/>
  </a-card>
</template>

<script>
import columns from './js/columns'
import buttonp from './js/buttonp'
import { GetAllBadItemRelation,Delete } from '@/api/TB_BadItemRelation'

export default {
  components: {
    tableOperatorBtn: () => import('@/JtComponents/TableOperatorButton'),
    pagination: () => import('@/JtComponents/Pagination'),
    TreeForm: () => import('./TreeForm'),
    ProcessModalFrom: () => import('./ProcessModalFrom')
  },
  data() {
    return {
      pagination: {
        current: 1,
        pageSize: 10,
        total: 50
      },
      buttonp: buttonp,
      loading: true,
      dataTable: [],
      columnsMain: columns,
      selectedRowKeys: [],
      terrData:'',

      scroll: {
        x: 1500,
        y: 500
      },
      FOperID: 0
    }
  },

  mounted() {
    this._LoadData()
  },

  methods: {
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },

    onPaginationChange(page, size) {
      this.pagination.current = page
      this.pagination.pageSize = size
    },
    
    //加载不良项目的方法
    _LoadData() {
      var _this = this
      var params = {
        FOperID: this.FOperID == 0 ? 0 : this.FOperID
      }

      GetAllBadItemRelation(params)
        .then(res => {
          this.dataTable = []
          const result = res.result

          if (result) {
            _this.dataTable = result.items

            console.log(result.items)

            _this.pagination.total = result.totalCount
            _this.loading = false
          }
        })
        .catch(err => {
          _this.loading = false
          console.log(err)
        })
    },

    //点击新增修改等按钮的方法
    handleBtnClick(val) {
      switch (val) {
        case '新建':
           var  fromData = {}
         if (this.terrData=='') {
            this.$message.error('选择你要新建的工序')
          }else{           
            fromData.key=this.terrData.selectedNodes[0].key
            fromData.fid=''
   
            this.$refs.ProcessModalFrom.showModal(fromData)
          }       
          break
          case '编辑':

           var  fromData = {}
         if (this.selectedRowKeys.length==1) {

            fromData=this.selectedRows[0]
            this.$refs.ProcessModalFrom.showModal(fromData)
            
          }else{           
           this.$message.error('选择你要修改的不良项目')
          }       

          break
          case '禁用':

          var _this=this

          if (_this.selectedRows.length !== 1) {
            this.$message.info('请选择需要禁用的不良项目')
            return
          }

          this.$confirm({
            title: '系统提示！',
            content: '确定要禁用选中的吗?',
            onOk() {
              var params = {
                fid: _this.selectedRows[0].fid
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
              _this.$message.warning('数据要谨慎禁用')
            }
          })
          

          break

        default:
          break
      }
    },

    handelAddSuccess(){
      this.loading==true
     this._LoadData(),
     this.selectedRowKeys = []
    this.selectedRows = []


    },

    //树形的方法
    btnTree(e) {
      if (e.selectedNodes.length > 0) {
        this.selectedRowKeys = []
        this.selectedRows = []
        this.FOperID = e.selectedNodes[0].componentOptions.propsData.dataRef.key
        this.terrData = e

        this._LoadData()
      } else {
      }
    }
  }
}
</script>

<style scoped>

.tabletd{
  text-align: center
  

  
}

</style>