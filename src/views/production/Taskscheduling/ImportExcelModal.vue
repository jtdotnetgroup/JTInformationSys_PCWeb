<template>
  <a-modal
    title="导入排产数据"
    :visible="visible"
    width="1000px"
    style="left:80px"
    :maskClosable="true"
    @ok="handleSubmit"
    @cancel="onClose"
  >
    <a-upload
      action="/"
      :fileList="fileList"
      :beforeUpload="beforeUpload"
      :remove="handleRemove"
    >
      <a-button icon="upload"></a-button>
      <a-button
        type="primary"
        @click="handleUpload"
        :disabled="fileList.length === 0"
        :loading="uploading"
        style="margin-top: 16px"
      >{{uploading ? '导入中' : '导入' }}</a-button>
    </a-upload>
  </a-modal>
</template>

<script>
import { ImportExcel } from '@/api/ICMODaily'
import XLSX from 'xlsx'

export default {
  data() {
    return {
      visible: false,
      fileList: [],
      uploading: false
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    onClose() {
      this.visible = false
    },
    handleSubmit() {
      this.visible = false
    },
    beforeUpload(file) {
      this.fileList = [file]
      return false
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    handleUpload() {
      const { fileList } = this
      const formData = new FormData()
      fileList.forEach(file => {
        formData.append('files[]', file)
      })
      this.uploading = true
      ImportExcel(formData)
        .then(res => {
          this.fileList = []
          this.uploading = false
          this.$message.success('导入成功')
        })
        .catch(err => {
          this.uploading = false
          this.$message.error('导入失败')
        })
    }
  },
  computed: {
    fileData() {
      var data = {}
      if (this.fileList.length > 0) {
        var file = this.fileList[0]
        var fr = new FileReader()

        fr.onload = ev => {
          try {
            const data = ev.target.result
            const workbook = XLSX.read(data, {
              type: 'binary'
            })

            for (let sheet in workbook.Sheets) {
              const sheetArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]) //获得以第一列为键名的sheet数组对象
            }
            
          } catch (e) {
            this.$message.warning('文件类型不正确！')
            return false
          }
        }

        data = fr.readAsBinaryString(file)
      }

      return data
    }
  }
}
</script>

<style lang="scss" scoped>
</style>