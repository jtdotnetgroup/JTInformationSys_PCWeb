<template>
    <div>

        <a-tree :treeData="organizations" defaultExpandAll>
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
        
    }
</script>

<style lang="scss" scoped>

</style>