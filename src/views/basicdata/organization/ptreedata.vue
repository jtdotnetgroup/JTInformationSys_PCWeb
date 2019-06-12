<template>
  <div>

  <a-tree  :showIcon="true" style="overflow-x:auto;overflow-y:hidden;width:100%; 
height:600px;" :treeData="organizations"   defaultExpandAll @select="onButtonClick"   >


 <a-icon slot="folderopen" type="folder-open" /> 

   <a-icon slot="folder" type="folder" /> 

</a-tree> 
 

  </div>
</template>

<script>
import { GetTreeList } from '@/api/Organization'
import store from '@/store'
export default {
  data() {
    return {
      // organizations:store.getters.organizations
      //organizations:[]
    }
  },
  mounted() {
      this._LoadData();
  },




  methods: { 
    
    // AddAndUpdate(){
    //   console.log("执行")
    // },
   
    _LoadData() {
      
       var params={
        ParentID:0
      }
      if(this.$store.getters.organizations.length===0){
        this.$store.dispatch('GetOrganizations',params)
      }
      
      // var params={
      //   ParentID:0
      // }
      //  GetTreeList(params).then(res => {          
      //      const results = res.result
      //      this.organizations=results;         
      //     // consloe.log(results)
      //  }).catch(err=>{
      //       console.log(err)
      //  })
    },

    onButtonClick(keys,e) {
      this.$emit('btnClick',e)
    }
  },
  computed: {
    organizations(){
      return store.getters.organizations
    }
  }
}
</script>

<style lang="scss" scoped>


</style>