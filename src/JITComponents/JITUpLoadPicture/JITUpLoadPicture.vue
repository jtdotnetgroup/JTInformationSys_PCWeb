<template>
  <div>
    <a-upload
      :action="options.action"
      :name="options.name"
      :multiple="options.multiple"
      class="upload-list-inline"
      listType="picture-card"
      :fileList="fileList"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="fileList.length < options.max">
        <a-icon type="plus" />
        <div class="ant-upload-text">上传</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'JITUpLoadPicture',
  data() {
    return {
      fileList: [],
      previewVisible: false,
      previewImage: ''
    }
  },
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleCancel() {},
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange({ fileList }) {
      this.fileList = fileList
    }
  }
}
</script>

<style  scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>