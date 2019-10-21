<template>
  <JITFormItemTemplate>
    <a-radio-group @change="handleChange" v-model="localvalue" :defaultValue="defaultValue">
      <a-radio
        v-for="(item,index) in options.selectlist"
        :key="index"
        :value="item.key"
      >{{item.label}}</a-radio>
    </a-radio-group>
  </JITFormItemTemplate>
</template>

<script>
export default {
  name: 'JITRadio',
  data() {
    return {
      localvalue: ''
    }
  },
  props: {
    value: {
      type: String | undefined,
      required: true
    },
    options: {
      type: Object,
      required: true
    },
    defaultValue:{
      type: String | undefined,
    }
  },
  methods: {
    handleChange(d) {
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>