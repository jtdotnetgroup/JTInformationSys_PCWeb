<template>
  <a-modal
    title="新增/维护"
    :visible="visiable"
    width="880px"
    style="left:100px"
    :maskClosable="false"
    @ok="handleSubmit"
    @cancel="onClose"
  >
    <a-form layout="inline" :form="form" @change="handleFormChange">
      <a-row>
        <a-col :span="20">
          <a-form-item label="任务名称">
            <a-input style="width:540px" v-decorator="['任务名称',{ initialValue: this.formData.产品编码}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-checkbox style="margin-top: 8px">启用</a-checkbox>
        </a-col>
      </a-row>

      <a-form-item label="计划类型">
        <a-select class="selectclass">
          <a-select-option
            v-for="(item, index) in itemsTiem"
            :key="index"
            @click="onChangeSelect(item.value)"
            :value="item.value"
          >{{item.text}}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="任务类型">
        <a-select class="selectclass">
          <a-select-option value="0">数据下载</a-select-option>
          <a-select-option value="1">数据上传</a-select-option>
          <a-select-option value="2">数据更新</a-select-option>
          <a-select-option value="3">数据删除</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item v-if="checkboxbool">
        <div class="checkboxclass">
          <template v-for="(item, index) in items">
            <a-checkbox :key="index" style="margin-top: 8px">{{item.text}}</a-checkbox>
          </template>
        </div>
      </a-form-item>

      <a-row>
        <a-form-item v-if="numberbool">
          每月第
          <a-input-number :min="1" :max="10" @change="onChange"/>&nbsp;&nbsp; 天
        </a-form-item>
      </a-row>

      <!-- 中间的虚线设置 -->
      <a-button class="buttonstyle">每天频率:</a-button>

     <a-row>
     <a-form-item >
         <a-radio>执行一次,时间为：</a-radio><a-time-picker @change="onChangetime" format="h:mm:ss A" />
      </a-form-item>
     </a-row>

    <a-row>
     <a-form-item > 
       <a-radio>重复执行,间隔为：</a-radio><a-input-number :min="1" :max="10" @change="onChange"/> 
        <a-select  style="width:100px">
          <a-select-option value="0">小时</a-select-option>   
        </a-select>
      </a-form-item>
    </a-row> 
     
      <a-row>
     <a-form-item >
        开始时间<a-time-picker @change="onChangetime" format="h:mm:ss A" />结束时间<a-time-picker @change="onChangetime" format="h:mm:ss A" />
      </a-form-item>
     </a-row>


      <a-form-item label=任务说明>
        <a-textarea style="width:650px" placeholder="请输入任务说明" :autosize="{ minRows: 2, maxRows: 6 }" />
      </a-form-item>
    
     
    </a-form>
  </a-modal>
</template>

<script>

export default {
  data() {
    return {
      visiable: false,
      formData: {},
      form: this.$form.createForm(this),
      items: [
        { text: '周一' },
        { text: '周二' },
        { text: '周三' },
        { text: '周四' },
        { text: '周五' },
        { text: '周六' },
        { text: '周日' }
      ],
      checkboxbool: false,
      numberbool: false,
      itemsTiem: [{ text: '每天', value: 1 }, { text: '每周', value: 2 }, { text: '每月', value: 3 }]
    }
  },
  methods: {
    showModal(formData) {
      this.visiable = true
    },
    onClose() {
      this.visiable = false
    },
    handleSubmit() {},
    handleFormChange() {},
    onChange(value) {
      console.log('changed', value)
    },
    onChangeSelect(key) {
      switch (key) {
        case 1:
          this.checkboxbool = false
          this.numberbool = false
          break
        case 2:
          this.checkboxbool = true
          this.numberbool = false
          break
        case 3:
          this.checkboxbool = false
          this.numberbool = true
          break
        default:
          break
      }
    },
    onChangetime(time, timeString){
      console.log(time, timeString);
    }
  }
}
</script>

<style  scoped>
.selectclass {
  width: 212px;
}
.checkboxclass {
  height: 50px;
  line-height: 30px;
}
.buttonstyle {
  width: 750px;
  text-align: left;
  border: none;
  border-bottom-style: ridge;
}
</style>