<template>
    <div>
        
        <a-directory-tree :treeData="organizations" defaultExpandAll @select="onButtonClick">
         </a-directory-tree>

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
            onButtonClick(keys,e){
                this.$emit('btnClick',keys,e);
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