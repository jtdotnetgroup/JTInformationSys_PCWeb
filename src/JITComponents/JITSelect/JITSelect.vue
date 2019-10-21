<template>
  <JITFormItemTemplate :tips="options.tips">
    <a-select v-model="localvalue" @select="handleSelect" :defaultValue="value" :disabled="options.disabled">
      <a-select-option v-for="(item,index) in options.selectlist" :key="index" :value="item.key" :disabled="item.disabled">{{item.label}}</a-select-option>
    </a-select>
  </JITFormItemTemplate>
</template>

<script>
export default {
  name: 'JITSelect',
  data() {
    return {
      localvalue: this.defaultValue
    }
  },
  props: {
    value: {
      type: String | Number | Object | undefined,
      required: true
    },
    options: {
      type: Object,
      required: true
    },
    defaultValue:{
      type: String | Number | Object | undefined,
    }
  },
  methods: {
    handleSelect(val, option) {
      this.localvalue = val
      this.$emit('input', this.localvalue)
    }
  },
  created() {
    this.localvalue = this.value
    this.$emit('input', this.localvalue)
  },
  watch:{
    value(newval,oldval){
      this.localvalue=newval;
      this.$emit('input', this.localvalue)
    },
   }
}
</script>

<style lang="scss" scoped>
</style>