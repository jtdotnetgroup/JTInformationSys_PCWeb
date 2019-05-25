<template>
    <div>
        
        <a-tree :treeData="organizations" defaultExpandAll @click="onButtonClick()">
         </a-tree>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                 
            }
        },
        mounted(){
          this._LoadData();
        },
        methods: {
            _LoadData(){
                this.$store.dispatch('GetWorkCenters')
            },
            onButtonClick(){
                this.$emit('btnClick');
            }
        },
        computed: {
           organizations(){
               return this.$store.getters.workcenters
           } 
        },
    }
</script>

<style lang="scss" scoped>

</style>