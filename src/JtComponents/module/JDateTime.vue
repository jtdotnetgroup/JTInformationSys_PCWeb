<template>
  <div :label="field.label">
    <!-- 默认样式 -->
    <a-date-picker
      v-if="field.options.type==='default'"
      :showTime="field.options.showTime"
      :showToday="field.options.showToday"
      :format="field.options.format"
    ></a-date-picker>
    <!-- 范围样式 -->
    <a-range-picker
      v-if="field.options.type==='range'"
      :showTime="field.options.showTime"
      :showToday="field.options.showToday"
      :format="field.options.format"
    ></a-range-picker>
  </div>
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      default: () => {
        return {
          label: 'DateTime',
          options: {
            // 控件类型，默认为default ,range为日期范围
            type: 'default',
            // 是否显示时间
            showTime: true,
            // 是否显示今天
            showToday: true,
            // 日期格式
            format: 'YYYY-MM-DD HH:mm:ss'
          }
        }
      }
    }
  }
}
</script>

<style  scoped>
</style>