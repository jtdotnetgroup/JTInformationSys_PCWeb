<template>
    <div class="tableOperateButton">
        <template v-for="(item,index) in buttons" >
            <a-button  :icon="item.icon" :type="item.type" :key="index" @click="onButtonClick(item.text)">{{item.text}}</a-button>
        </template>
        <template v-if="search">
            <div class="searchBtn">
                <a-button icon="search" type="primary" @click="onButtonClick('搜索')">搜索</a-button>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        props: {
            buttons: {
                type: Array,
                default: ()=>[
                    {
                        text:'新建',
                        icon:'plus',
                        type:'default'
                    },
                    {text:'编辑',icon:'edit',type:'primary'},
                    {text:'删除',icon:'delete',type:'danger'}
                ]
            },
            search:{
                type:Boolean,
                default:true
            }
        },
        methods: {
            onButtonClick(val) {
                this.$emit('btnClick',val);
            }
        },
    }
</script>

<style  scoped>
    .tableOperateButton{
        margin-bottom: 8px;
    }
    .tableOperateButton>.ant-btn:not(:first-child){
        margin-left: 5px;
    }
    .searchBtn{
        display: inline-block;
        float:right;
    }
</style>