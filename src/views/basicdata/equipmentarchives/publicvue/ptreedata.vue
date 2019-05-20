<template>
    <div>
     
          <a-tree   :treeData="organizations" defaultExpandAll @click="onButtonClick()">
         </a-tree>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                 organizations:[
                    {title:'xxx工作中心'},
                    {title:'xxx工作中心'},
                    {title:'xxx工作中心'}
                ]
            }
        },
        methods: {
            onButtonClick(){
                this.$emit('btnClick');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>