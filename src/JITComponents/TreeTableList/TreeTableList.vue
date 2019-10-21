<template>
  <div id="TreeTableList">
    <div>
      <a-input-search style="margin-bottom: 8px" placeholder="Search" @change="onChange" />
      <a-tree
        @expand="onExpand"
        :expandedKeys="expandedKeys"
        :autoExpandParent="autoExpandParent"
        :treeData="localTreeData"
      >
        <template slot="title" slot-scope="{title}">
          <span v-if="title.indexOf(searchValue) > -1">
            {{title.substr(0, title.indexOf(searchValue))}}
            <span style="color: #f50">{{searchValue}}</span>
            {{title.substr(title.indexOf(searchValue) + searchValue.length)}}
          </span>
          <span v-else>{{title}}</span>
        </template>
      </a-tree>
    </div>
    <div>
      <TableList :options="options" :tableData="tableData"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeTableList',
  data() {
    return {
      expandedKeys: [],
      localTreeData:[],
      autoExpandParent:true,
    }
  },
  props: {
    options: {
      type: Object,
      require:true
    },
    tableData:{
      type:Function,
      require:true
    },
    treeData:{
      type:Function,require:true
    }
  },
  methods: {
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onChange(e){
        
    },
    _loadTree(){
      const result=this.treeData({})
      .then(res=>{
        console.log(res)
        this.localTreeData=res
      })
    }
  },
  computed: {
  },
  created() {
    this._loadTree();
  },
}
</script>

<style  scoped>
#TreeTableList {
  display: grid;
  grid-template-columns: 1.5fr 8fr;
  grid-column-gap: 5px
}
</style>