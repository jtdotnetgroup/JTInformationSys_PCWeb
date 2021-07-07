<template>
  <div>
    <a-upload :action="options.action" :name="options.name" :multiple="options.multiple" class="upload-list-inline">
      <a-button>
        <a-icon type="upload" />上传文件
      </a-button>
    </a-upload>
  </div>
</template>

<script>
export default {
  name: 'JITUpLoad',
  data() {
    return {
      fileList: []
    }
  },
  props: {
    options: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
 .upload-list-inline >>> .ant-upload-list-item {
    float: left;
    width: 200px;
    margin-right: 8px;
  }
  .upload-list-inline >>> .ant-upload-animate-enter {
    animation-name: uploadAnimateInlineIn;
  }
  .upload-list-inline >>> .ant-upload-animate-leave {
    animation-name: uploadAnimateInlineOut;
  }
</style>