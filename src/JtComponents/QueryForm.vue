<template>
    <a-modal visible="visible" title="查询" @cancle="handleCancle" :destroyOnClose="true">
        
    </a-modal>
</template>

<script>
    export default {
        data() {
            return {
                visible: false
            }
        },
        methods: {
            show() {
                this.visible=true
            },
            handleCancle(){
                this.visible=false;
            }
        },
    }
</script>

<style  scoped>
.ant-modal{
    width: 60vw !important;
}
</style>