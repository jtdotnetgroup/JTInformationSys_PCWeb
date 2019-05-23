<template>
  <div>


    <!-- <template v-for="item in organizations" >   -->
    <a-tree  :treeData="organizations"  defaultExpandAll @click="onButtonClick(this)"></a-tree> 
    <!-- <template /> -->


  </div>
</template>

<script>
import { GetTreeList } from '@/api/Organization'
import { Item } from 'ant-design-vue/es/vc-menu';
import { constants } from 'crypto';
import { close } from 'fs';

export default {
  data() {
    return {
      organizations:[]
    }
  },
  mounted() {
      this._LoadData();
  },

  methods: {
      
    _LoadData() {
      var params = {
        ParentID:0
      }
      
       GetTreeList(params).then(res => {
           const results = res.result
           this.organizations=results;
       }).catch(err=>{
            console.log(err)
       })


    },

    onButtonClick() {
      this.$emit('btnClick',this)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>