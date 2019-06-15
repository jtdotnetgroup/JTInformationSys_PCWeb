<template>
    <a-card>

         <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttons"/>

         <a-table
            :dataSource="tableData"
            :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
            :columns="columns"
            :pagination="false"
            
          ></a-table>

           <!-- 公共组件 模态框 -->
         <ModelFrom  ref="ModelFrom"/> 


    </a-card>
</template>

<script>

    import buttons from './js/buttons'
    import columns from './js/columns'
    import tableData from './js/tableData'

    export default {
        components:{
             tableOperatorBtn: () => import('@/JtComponents/TableOperatorButton'), 
              ModelFrom:()=>import('./ModalFrom'),          
        },
        data() {
            return {
                 columns: columns,
                 selectedRowKeys: [],
                 buttons: buttons.buttons,
                 tableData: tableData,            
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
              
        
            default:
                break;
        }

            }
        }
   }
</script>

<style  scoped>

</style>