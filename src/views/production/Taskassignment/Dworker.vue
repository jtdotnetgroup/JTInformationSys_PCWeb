<template>
    <a-card >
     
           <!-- <a-button-group >
           <a-button  @click="showModal">
               查询            
            </a-button>
            <a-button >
                派工
            </a-button>
            <a-button >
                导出
            </a-button>
            <a-button >
                结转
            </a-button>
            <a-button >
                暂停
            </a-button>
            <a-button >
                启动
            </a-button>
         </a-button-group>
        <a-pagination id="card"  style="background-color:#E6F7FF" showSizeChanger showQuickJumper :total="50"  />      -->

        <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttonp"/>


        <!-- <a-pagination id="card"  style="background-color:#E6F7FF" showSizeChanger showQuickJumper :total="50"  />      -->

        <pagination :current="pagination.current" :total="pagination.total"/>




        <!-- 表格 -->
        <a-table id="card" :rowSelection="rowSelection" :dataSource="dataSource" :columns="columns" :pagination="paginations"  />

        <div id="button"  >
            <a-button style="background-color: #E6F7FF;border-color:#E6F7FF">
            <a-icon type="schedule"/>排产明细
            </a-button>
        </div>

         <a-table id="card"  bordered  :dataSource="dataSourceMX" :columns="columnsMX" :pagination="paginations" >
         
           <!-- <a-table-coml v-for="" >         
           </a-table-coml> -->


         </a-table>


  <div id="divmodal">

  <a-modal
      title="新增/维护"
      v-model="visible"
      @ok="hideModal"
      okText="确认"
      cancelText="取消"
     
      width="1000px"
      style="left:80px"
      :maskClosable="maskClosable"
   
    >

       <!-- <a-button-group  >
           
            <a-button >
                新增
            </a-button>
            <a-button >
                保存
            </a-button>
            <a-button >
                审核
            </a-button>
            <a-button >
                派工
            </a-button>
         </a-button-group> -->

        <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttonps"/>


           <div class="table-page-search-wrapper"  id="card">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="派工单号">
              <a-input v-model="queryParam.id" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="任务单号">
              <a-input v-model="queryParam.id" placeholder=""/>
              </a-form-item>
          </a-col>

        

          <template v-if="advanced">


   <a-col :md="8" :sm="24">
            <a-form-item label="排产数量">
                 <a-input v-model="queryParam.id" placeholder=""/>
              </a-form-item>
          </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item label="派工数量">
               <a-input v-model="queryParam.id" placeholder=""/>
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item label="备注">
                <a-input-number v-model="queryParam.callNo" style="width: 100%"/>
              </a-form-item>
            </a-col>

          
          
          
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>


      <a-table id="card"  bordered  :dataSource="dataSourceMX" :columns="columnsMT" :pagination="paginations" >
         
           <!-- <a-table-coml v-for="" >         
           </a-table-coml> -->


         </a-table>

      

    </a-modal>


      </div>


    </a-card>
</template>

<script>

import buttons from './buttons'
import tableheader  from './tableheader';
import { getRoleList, getServiceList } from '@/api/manage';


    export default {
       components:{
        // @是根目录 。。是上一级 。是当前目录
          tableOperatorBtn:()=>import('@/JtComponents/TableOperatorButton'),
            pagination:()=>import('@/JtComponents/Pagination'),
      },        
        data() {
            return {
              pagination: {
                    current:1,
                    total:50
                },
                buttonp:buttons.buttonp,

                buttonps:buttons.buttonps,
                   // 高级搜索 展开/关闭
                advanced: false,

                queryParam: {},
                maskClosable:false,

                 visible: false,
                 dataSource:tableheader.dataSource,
                 columns:tableheader.columns,
                 paginations:{position:'false'},
                 columnsMT:tableheader.columnsMT,

                   columnsMX:tableheader.columnsMX,
                   dataSourceMX:tableheader.dataSourceMX,
            }
        }, 
         created () {

    getRoleList({ t: new Date() })
  },
    computed: {
       rowSelection() {
       const { selectedRowKeys } = this;
       return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },      
      }
    }
  },
  methods:{
      showModal() {
      this.visible = true
    },
     hideModal() {
      this.visible = false
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    },
     toggleAdvanced () {
      this.advanced = !this.advanced
    },

handleBtnClick(val){
      if(val=="查询"){

     this.visible = true
      }
    }

  }
}

</script>

<style  scoped>
#card{

margin-top: 10px

}
#button{
margin-top: 10px;
background-color:#E6F7FF

}


#divmodal{
   width: 900px;
}


</style>