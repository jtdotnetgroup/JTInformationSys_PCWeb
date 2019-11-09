<template>
    <div class="tableOperateButton">
        <template v-for="(item,index) in buttons" >
            <a-button   :icon="item.icon" :type="item.type" :key="index" @click="itemClick(item)">{{item.text}}</a-button>
        </template>
        <template v-if="search">
            <div class="searchBtn">
                <a-button icon="search" type="primary" @click="onButtonClick">搜索</a-button>
            </div>
        </template>
        <!-- <searchForm v-model="where" ref="searchForm" :methodName="searchMethodName" @input="handelSearch"/> -->
    </div>
</template>

<script>
    export default {
        name:'ButtonsGroup',
        components: {
            // searchForm:()=>import('@/components/SearchForm')
        },
        data() {
            return {
                where: ''
            }
        },
        props: {
            buttons: {
                type: Array,
                default: ()=>[
                    {
                        text:'新建',
                        icon:'plus',
                        type:'default',
                        onClick:(value)=>{console.log(value)}
                    },
                    {text:'编辑',icon:'edit',type:'primary'},
                    {text:'删除',icon:'delete',type:'danger'}
                ]
            },
            search:{
                type:Boolean,
                default:true
            },
            searchMethodName:{
                type:String,
                default:()=>{return ''}
            },
            reflash:{
                type:Object,
            },
            value:{
                type:String
            }
        },
        methods: {
            onButtonClick() {
                this.$refs.searchForm.show()
            },
            reflashClick(){
                if(!!this.reflash&&this.reflash.click){
                    this.reflash.click();
                }
            },
            handelSearch(where){
                this.$emit('input',where)
            },
            itemClick(item){
                this.$emit('buttonClick',item.onClick)
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