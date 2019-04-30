<template>
  <div  id="createFormDiv">
    <a-modal :visible="visiable" :title="title" @cancel="visiable=false" @ok="handleSubmit">
      <a-form :form="form" :layout="layout">
        <!-- 文本框 -->
        <a-form-item v-for="(field,index) in fields" :key="index" :label="field.label">
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
              v-for="(item,index) in field.options.selectOptions"
              :key="index"
              :value="item.value"
            >{{item.value}}</a-select-option>
          </a-select>
          <!-- 复选框 -->
          <template v-else-if="field.type==='check'">
            <a-checkbox
              v-if="field.options.type==='single'"
              v-decorator="field.decorator"
            >{{field.options.checkOptions}}</a-checkbox>
            <a-checkbox-group
              v-if="field.options.type==='multi'"
              :options="field.options.checkOptions"
              v-decorator="field.decorator"
            />
          </template>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import jinput from './module/JInput'
import jdatetime from './module/JDateTime'

export default {
  components: {
    jinput,
    jdatetime
  },
  data() {
    return {
      visiable: false,
      form: this.$form.createForm(this),
      confirmLoading: false
    }
  },
  methods: {
    add() {
      this.visiable = true
    },
    handleSubmit() {
      const {
        form: { validateFields }
      } = this

      validateFields((err, values) => {
        if (!err) {
          console.log(values)
        } else {
        }
      })
    }
  },
  props: {
    title: {
      type: String,
      default: 'CreateOrEditForm'
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

<style scope>
#createFormDiv{
  
}
.ant-modal {
  width: 60vw !important;
  height: 80vh ;
  /* overflow-y: auto; */
}
</style>