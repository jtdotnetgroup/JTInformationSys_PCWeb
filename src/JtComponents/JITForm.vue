<template>
  <a-form :form="form" :layout="layout">
    <!-- <a-col :span="8" > -->
    <!-- 文本框 -->
    <a-form-item
      v-for="(field,index) in fields"
      :key="index"
      :label="field.label"
      :labelCol="{span:4}"
      :wrapperCol="{span:14}"
    >
      <template v-if="field.type==='input'">
        <!-- 文本 -->
        <a-input v-if="field.options.type==='text'" clearable v-decorator="field.decorator"></a-input>
        <!-- 数字 -->
        <a-input-number v-if="field.options.type==='number'" v-decorator="field.decorator"></a-input-number>
      </template>
      <!-- 日期选择 -->
      <template v-else-if="field.type==='datetime'">
        <!-- 默认日期样式 -->
        <a-date-picker
          v-if="field.options.type==='default'"
          :showTime="field.options.showTime"
          :showToday="field.options.showToday"
          :format="field.options.format"
          v-decorator="field.decorator"
        ></a-date-picker>
        <!-- 范围日期选择 -->
        <a-range-picker
          v-if="field.options.type==='range'"
          :showTime="field.options.showTime"
          :showToday="field.options.showToday"
          :format="field.options.format"
          v-decorator="field.decorator"
        ></a-range-picker>
      </template>
      <!-- 下拉选择框 -->
      <a-select v-else-if="field.type==='select'" v-decorator="field.decorator">
        <a-select-option
          v-for="(item, $index) in field.options.selectOptions"
          :key="$index"
          :value="item.value"
        >{{ item.value }}</a-select-option>
      </a-select>
      <!-- 复选框 -->
      <template v-else-if="field.type==='check'">
        <a-checkbox
          v-if="field.options.type==='single'"
          v-decorator="field.decorator"
        >{{ field.options.checkOptions }}</a-checkbox>
        <a-checkbox-group
          v-if="field.options.type==='multi'"
          :options="field.options.checkOptions"
          v-decorator="field.decorator"
        />
      </template>
    </a-form-item>
    <!-- </a-col> -->
  </a-form>
</template>

<script>
import './CreateOrEditForm.css'
export default {
  components: {},
  data() {
    return {
      form: this.$form.createForm(this),
    }
  },
  methods: {
    
  },
  props: {
    title: {
      type: String,
      default: 'JITFORM'
    },
    fields: {
      type: Array,
      required: true
    },
    layout: {
      type: String,
      default: 'horizontal'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>