<template>
  <div>
    <a-directory-tree
      style="overflow-x:auto;overflow-y:hidden;width:100%;height:600px;"
      :expandedKeys="defaultExpandKeys"
      :treeData="organizations"
      @select="onButtonClick"
      @expand="onExpand"
    ></a-directory-tree>
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
    this._LoadData()
  },

  methods: {
    _LoadData() {
      var params = {
        ParentID: 0
      }
      if (this.$store.getters.organizations.length === 0) {
        this.$store.dispatch('GetOrganizations', params)
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

    onButtonClick(keys, e) {
      this.$emit('btnClick', e)
    },
    onExpand() {}
  },
  computed: {
    organizations() {
      return store.getters.organizations
    },
    
    defaultExpandKeys(){
      const keys=[]
      store.getters.organizations.forEach(e => {
        keys.push(e.key)
      });

      return keys
    }
  }
}
</script>

<style lang="scss" scoped>
</style>