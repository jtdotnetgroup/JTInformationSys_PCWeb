<template>
    <div class="jtPagination">
<!-- showSizeChanger  @showSizeChange="onChange" -->
        <a-pagination v-model="currentPage" showQuickJumper size="small" :defaultPageSize="defaultPageSize"
         :pageSizeOptions="pageSizeOptions" showSizeChanger  @showSizeChange="onChange"  @change="onChange" 
            :showTotal="total => `总共 ${total} 条数据`"
         :total="total"></a-pagination>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentPage: this.current,
            }
        },
        props: {
            current: {
                type: Number,
                default: 1,
               //required:
            },
            total:{
                type:Number,
                default:0
            },
            defaultPageSize:{
                 type:Number,
                default:10
            },
             pageSizeOptions:{
                 type:Array,
                 default:()=>['10','50','100']
            }

        },
        methods: {
            onChange(page,pageSize) {
                this.$emit('pageChange',page,pageSize);
            }
        },
    }
</script>

<style  scoped>
    .jtPagination{
        background: #91d5ff;
        border-radius: 5px;
        margin-bottom:5px ;
        padding: 5px;
        border: 1px solid rgb(24, 144, 255);
        color: #999;
    }
</style>