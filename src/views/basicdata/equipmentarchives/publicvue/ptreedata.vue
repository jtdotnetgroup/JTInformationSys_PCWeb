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
                this.$store.dispatch('GetOrganizations')
            },
            onButtonClick(keys,e){
                this.$emit('btnClick',keys,e);
            }
        },
        computed: {
           organizations(){
               return this.$store.getters.organizations
           } 
        },
    }
</script>

<style lang="scss" scoped>

</style>