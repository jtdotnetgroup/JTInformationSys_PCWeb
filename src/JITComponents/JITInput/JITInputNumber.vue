<template>
  <JITFormItemTemplate :tips="options.tips">
    <a-input-number
      v-model="localvalue"
      :max="options.max"
      :min="options.min"
      :precision="options.precision"
      @change="handleChange"
      :defaultValue="value"
    ></a-input-number>
  </JITFormItemTemplate>
</template>

<script>
export default {
  name: 'JITInputNumber',
  data() {
    return {
      localvalue: 0
    }
  },
  props: {
    value: {
      type: Number | undefined,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleChange(val) {
    //   this.localvalue = val
      this.$emit('input', this.localvalue)
      try {
        this.check(this.localvalue)
      } catch (error) {
        const { rules } = this.options

        this.$emit('checkfail', error, rules[0])
      }
    },
    check(value) {
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
                    flag = value >= checkvalue
                    break
                  }
                  case 'max': {
                    //最大字符长度
                    flag = value <= checkvalue
                    break
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
    if (!!this.value) {
      this.localvalue = this.value
    } else {
    //   const { min } = this.options
      this.localvalue = 0
    }

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