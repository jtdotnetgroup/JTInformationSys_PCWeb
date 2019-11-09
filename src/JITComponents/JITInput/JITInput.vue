<template>
  <JITFormItemTemplate :tips="options.tips">
    <a-input
      @change="handleChange"
      :disabled="options.disabled"
      v-model="localvalue"
      :defaultValue="value"
    ></a-input>
  </JITFormItemTemplate>
</template>

<script>
export default {
  name: 'JITInput',
  data() {
    return {
      localvalue: ''
    }
  },
  props: {
    options: {
      type: Object,
      required: true
    },
    value: {
      type: String | undefined,
      required: true
    }
  },
  methods: {
    handleChange(val) {
      this.$emit('input', this.localvalue)
      try {
        this.check(this.localvalue)
      } catch (error) {
        const { rules } = this.options
        this.$emit('checkfail', error, rules[0])
      }
    },
    //数据校验方法
    check(value) {
      //判断字段是否设置了校验规则
      const { rules } = this.options
      if (!!rules) {
        //字段存在校验规则
        //约定规则为数组，并且首个数组元素为字段名
        rules.forEach(r => {
          if (typeof r === 'object') {
            for (const key in r) {
              if (r.hasOwnProperty(key)) {
                const checkvalue = r[key]
                let flag = true
                switch (key) {
                  case 'required': {
                    //必填
                    flag = !!value
                    break
                  }
                  case 'min': {
                    //最小字符长度
                    flag = value.length >= checkvalue
                    break
                  }
                  case 'max': {
                    //最大字符长度
                    flag = value.length <= checkvalue
                    break
                  }
                  case 'cust': {
                    //正则校验
                  }
                }
                if (!flag) {
                  //抛出异常跳出循环
                  throw r.message
                }
              }
            }
          }
        })
        this.$emit('checkok', rules[0])
      }
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

<style scoped>
</style>