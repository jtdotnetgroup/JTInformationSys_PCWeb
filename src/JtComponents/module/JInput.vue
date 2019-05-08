<template>
  <a-input :placeholder="field.options.placeholder" :required="field.options.required"></a-input>
</template>

<script>
export default {
  name: 'JInput',
  props: {
    field: {
      type: Object,
      default: () => {
        return {
          // 排序
          sortIndex: 0,
          // 控件类型
          type: 'jinput',
          // 字段标题
          label: 'textField',
          options: {}
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>