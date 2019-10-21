<template>
  <div class="JITFormItemTemplate">
    <slot></slot>
    <a-tooltip v-if="!!tips" :title="tips">
      <a-icon type="question-circle-o" />
    </a-tooltip>
  </div>
</template>

<script>
export default {
  name: 'JITFormItemTemplate',
  props: {
      tips: {
          type: String,
      },
  },
}
</script>

<style  scoped>
.JITFormItemTemplate {
  display: flex;
}
.JITFormItemTemplate >>> .anticon-question-circle-o {
  padding-left: 5px;
  margin-top: 8px;
}
</style>