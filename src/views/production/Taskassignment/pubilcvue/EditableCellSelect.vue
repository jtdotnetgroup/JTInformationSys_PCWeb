<template>
  <div class="editable-cell">
    <div
      v-if="editable"
      class="editable-cell-input-wrapper"
    >

   <a-select
    showSearch
    :value="value"
    placeholder="input search text"
    style="width: 200px"
    :defaultActiveFirstOption="false"
    :showArrow="false"
    :filterOption="false"
    @search="handleSearch"
    @change="handleChange"
    :notFoundContent="null"
  >
    <a-select-option v-for="d in data" :key="d.value">{{d.text}}</a-select-option>
  </a-select>
      
      <a-icon
        type="check"
        class="editable-cell-icon-check"
        @click="check"
      />
    </div>
    <div
      v-else
      class="editable-cell-text-wrapper"
    >
      {{ value || ' ' }}
      <a-icon
        type="search"  
        class="editable-cell-icon"
        @click="edit"
      />
    </div>
  </div>
</template>
<script>
import jsonp from 'fetch-jsonp'
import querystring from 'querystring'
import { alias } from 'ant-design-vue/es/icon/utils';
let timeout
let currentValue

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }
  currentValue = value

  function fake() {
    const str = querystring.encode({
      code: 'utf-8',
      q: value
    })
    jsonp(`https://suggest.taobao.com/sug?${str}`)
      .then(response => response.json())
      .then(d => {
        if (currentValue === value) {
          const result = d.result
          const data = []
          result.forEach(r => {
            data.push({
              value: r[0],
              text: r[0]
            })
          })
          callback(data)
        }
      })
  }

  timeout = setTimeout(fake, 300)
}

export default {
  props: {
    text: String
  },
  data() {
    return {
      value: this.text,
      editable: false,
      data: [],
      //value: undefined
    }
  },
  methods: {
    handleSearch(value) {
      fetch(value, data => (this.data = data))
    },

    handleChange(value) {
         console.log(value)
        this.value = value
        fetch(value, data => this.data = data);

    },
    check() {
      this.editable = false
      this.$emit('change', this.value)
    },
    edit() {
      this.editable = true
    }
  }
}
</script>
<style scoped>

.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}



</style>

