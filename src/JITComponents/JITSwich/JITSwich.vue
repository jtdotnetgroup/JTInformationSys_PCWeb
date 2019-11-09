<template>
  <JITFormItemTemplate class="FormItemControl" :tips="options.tips">
    <a-switch v-model="localvalue" :disabled="options.disabled" @change="handleChange"></a-switch>
  </JITFormItemTemplate>
</template>

<script>
export default {
  name: 'JITSwich',
  data() {
    return {
      localvalue: this.value,
    }
  },
  props: {
    value: {
      type: Boolean | undefined,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  watch:{
    value(newval,oldval){
      this.localvalue=newval;
    }
  },
  methods: {
    handleChange(val) {
      this.localvalue = val
      this.$emit('input', this.localvalue)
    }
  },
  created() {
    this.localvalue = this.value
    this.$emit('input', this.localvalue)
  },
}
</script>

<style  scoped>
.FormItemControl {
  display: flex;
}
</style>