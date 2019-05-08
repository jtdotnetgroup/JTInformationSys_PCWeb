<template>
    <a-card>
        <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttons"/>
    
        

        <div>
            <a-row :gutter="10">
            <a-col :span="4">
                <a-tree :treeData="organizations" defaultExpandAll>
                </a-tree>
            </a-col>
              <a-col :span="20">
                  <pagination :current="pagination.current" :total="pagination.total"/>
                  <a-table :dataSource="tableData" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" 
                  :columns="columns" :pagination="false">

                    <template slot="roles" slot-scope="roles">
                        
                        <span v-for="(role,index) in roles.split(',')" :key="index">{{role}},</span>

                    </template>

                  </a-table>
              </a-col>
            </a-row>
        </div>
        
    </a-card>
</template>

<script>
    import buttons from './buttons';
    import columns from './columns';
    import tableData from './tableData'
    export default {
        components: {
            tableOperatorBtn:()=>import('@/JtComponents/TableOperatorButton'),
            pagination:()=>import('@/JtComponents/Pagination'),

        },
        data() {
            return {
                pagination: {
                    current:1,
                    total:50
                },
                tableData:tableData,
                columns:columns,
                selectedRowKeys:[],
                buttons:buttons,
                organizations:[
                    {title:'xxx集团',key:'0-0',children:[
                        {title:'xxxx有限公司',key:'0-1',children:[
                            {title:'人事部',key:'0-1-1'},
                            {title:'开发部',key:'0-1-2'},
                            {title:'财务部',key:'0-1-3'}
                        ]}
                    ]}
                ]
            }
        },
        methods: {
             onSelectChange (selectedRowKeys, selectedRows) {
                this.selectedRowKeys = selectedRowKeys
                this.selectedRows = selectedRows
            },
            handleBtnClick(val){

            }
        },
    }
</script>
