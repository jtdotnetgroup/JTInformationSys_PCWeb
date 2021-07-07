<template>
  <div>
    <a-directory-tree
      style="overflow-x:auto;overflow-y:hidden;width:100%;
            height:600px;"
      :treeData="process"
      defaultExpandAll
      @select="onButtonClick"
    ></a-directory-tree>
  </div>
</template>

<script>
import { GetTree } from '@/api/TB_BadItemRelation'

export default {
  data() {
    return {
      process: []
    }
  },
  mounted() {
    this._LoadData()
  },
  methods: {
    _LoadData() {
      GetTree()
        .then(res => {
          this.process = []
          const result = res.result
          if (result) {
            this.process = result
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    onButtonClick(keys, e) {
      this.$emit('btnClick', e)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>