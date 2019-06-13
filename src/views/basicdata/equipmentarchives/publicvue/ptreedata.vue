<template>
  <div>
    <a-directory-tree :treeData="organizations" :expandedKeys="defaultExpandKeys" @select="onButtonClick" @expand="onExpand"></a-directory-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    this._LoadData()
  },
  methods: {
    _LoadData() {
      this.$store.dispatch('GetOrganizations')
    },
    onButtonClick(keys, e) {
      this.$emit('btnClick', keys, e)
    },
    onExpand(){

    }
  },
  computed: {
    organizations() {
      return this.$store.getters.organizations
    },
    defaultExpandKeys() {
      const keys = []
      this.$store.getters.organizations.forEach(e => {
        keys.push(e.key)
      })

      return keys
    }
  }
}
</script>

<style lang="scss" scoped>
</style>