<template>
  <div>

    <a-directory-tree  :treeData="organizations" defaultExpandedKeys="['00001']"  defaultExpandAll @select="onButtonClick"></a-directory-tree> 
 

  </div>
</template>

<script>
import { GetTreeList } from '@/api/Organization'
import { Item } from 'ant-design-vue/es/vc-menu';
import { constants } from 'crypto';
import { close } from 'fs';
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