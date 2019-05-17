<!--页面代码-->
<template>
  <a-spin tip="导入中，请稍等..." :spinning="spinning">
    <a-modal title="导入排产数据" :visible="visible" @ok="handleOk" @cancel="handleCancel" width="80%">
      <a-button type="primary" icon="upload" :size="size" @click="upload">点击选择文件</a-button>
      <a-input
        v-model="uploadPath"
        ref="file_up"
        id="upload"
        v-show="false"
        class="input-file"
        type="file"
        @change="exportData"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
      <span>&nbsp;&nbsp;</span>
      <a-radio-group name="radioType" :defaultValue="1">
        <a-radio :value="1">覆盖内容</a-radio>
        <!-- <a-radio :value="2">追加内容</a-radio> -->
      </a-radio-group>
      <a-button @click="AddRow">增加-行</a-button>
      <a-button @click="AddCol">增加-列</a-button>
      <a-button @click="empty">清空内容</a-button>
      <a-button @click="SaveAs">另存为…</a-button>
      <a-button @click="Download">模板下载</a-button>
      <!--表格-->
      <div style="padding-top:10px;">
        <!--数据表格-->
        <a-table id="BJ" bordered :dataSource="dataSource" :columns="columns">
          <template slot="name" slot-scope="text, record">
            <editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)"/>
          </template>
        </a-table>
        <!--校验表格-->
        <!--处理结果表格-->
      </div>
    </a-modal>
  </a-spin>
</template>
<!--脚本文件-->
<script>
// xlsx文件
import XLSX from 'xlsx'
// 导入
import { ImportExcelList } from '@/api/ICMODaily'
// 脚本
export default {
  // 所有数据
  data() {
    return {
      spinning: false, // 加载框
      uploadPath: '', // 文件路径
      visible: false, // 是否显示模态框
      dataSource: [], // 表格数据
      columns: [], // 表格列
      count: 0, // 数据长度
      ListObj: { body: [], header: [] } //表格数据 和 表格列
    }
  },
  // 所有方法
  methods: {
    // 另存为
    SaveAs() {
      console.log('SaveAs')
      var curTbl = document.getElementById('BJ')
      var oXL = new window.ActiveXObject('Excel.Application')
      var oWB = oXL.Workbooks.Add()
      var oSheet = oWB.ActiveSheet
      var sel = document.body.createTextRange()
      sel.moveToElementText(curTbl)
      sel.select()
      sel.execCommand('Copy')
      oSheet.Paste()
      oXL.Visible = true
    },
    //显示加载框
    ShowLoad() {
      this.spinning = true
    },
    //隐藏加载框
    HideLoad() {
      this.spinning = false
    },
    // 清空表格内容
    empty() {
      this.dataSource = []
      this.columns = []
      this.count = 0
      this.uploadPath = ''
    },
    // 显示
    show() {
      this.visible = true
    },
    // 隐藏
    hide() {
      this.visible = false
    },
    // 确定排班后执行关闭弹出层/窗口
    handleOk() {
      this.onSubmit()
      this.visible = false
    },
    // 取消操作关闭弹出层/窗口
    handleCancel() {
      this.visible = false
    },
    // 上传文件
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    // 触发文件上传按钮
    upload() {
      document.getElementById('upload').click()
    },
    // 解析表格获取数据
    exportData(event) {
      var _this = this
      _this.ListObj.body = [] // 表格数据
      _this.ListObj.header = [] // 表格列
      if (!event.currentTarget.files.length) {
        return
      }
      const that = this
      // 拿取文件对象
      var f = event.currentTarget.files[0]
      // 用FileReader来读取
      var reader = new FileReader()
      // 重写FileReader上的readAsBinaryString方法
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = ''
        var wb // 读取完成的数据
        var outdata // 你需要的数据
        var reader = new FileReader()
        reader.onload = function(e) {
          // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
          var bytes = new Uint8Array(reader.result)
          var length = bytes.byteLength
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          // 接下来就是xlsx了，具体可看api
          wb = XLSX.read(binary, {
            type: 'binary'
          })
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
          // 自定义方法向父组件传递数据
          console.log(outdata)

          var str = ''
          var i = 0
          
          for (var tmp in outdata) {
            var obj = outdata[tmp]
            for (var item in obj) {
              if (i == 0) {
                _this.ListObj.header.push(item)
                // _this.ListObj.header.push('操作');
              }
            }
            // obj.操作='删除'
            _this.ListObj.body.push(obj)
            i++
          }
          // _this.ListObj.header.push('操作');
          // console.log(JSON.stringify(_this.ListObj.header) + '_________' + JSON.stringify(_this.ListObj.body))
          _this.loadTable()
        }
        reader.readAsArrayBuffer(f)
      }
      reader.readAsBinaryString(f)
    },
    // 加载表格
    loadTable() {
      this.empty()
      this.dataSource = this.ListObj.body
      var colobj = []
      this.ListObj.header.forEach(item => {
        var col = { title: item, dataIndex: item }
        colobj.push(col)
      })
      this.columns = colobj
      this.count = this.ListObj.body.length
    },
    // 确认导入
    onSubmit() {
      var _this = this //

      _this.ShowLoad() // 显示加载框

      var dataSource = this.dataSource // 表格所有数据
      // var header = this.ListOb.header  // 列
      // console.log(this.dataSource)
      const result = []
      // 生成最终传入接口的数据
      dataSource.forEach(item => {
        const keys = Object.keys(item)
        var row = { FMOBillNo: item.任务单号, Dailies: [] }
        keys.forEach(key => {
          if (_this.IsValidDate(key)) {
            row.Dailies.push({
              FPlanAuxQty: item[key],
              FMachineID: item.机台号,
              FShift: item.班次,
              FOperID: item.工序名,
              FDate: key
            })
          }
        })
        result.push(row)
      })

      // console.log(result)
      // 导入成功  执行  this.empty()  清除导入表格
      ImportExcelList(result)
        .then(res => {
          _this.HideLoad()
          console.log('success:' + res)
          if (res.success) {
            _this.$notification['success']({
              message: '系统提示',
              description: '导入成功！'
            })
            //
            _this.empty() // 清除导入表格
          } else {
            const key = `open${Date.now()}`;
            _this.$notification['error']({
              message: '系统提示',
              description: '系统忙，导入失败请稍后重试！',
              btn: h => {
                return h(
                  'a-button',
                  {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    on: {
                      click: () => this.$notification.close(key)
                    }
                  },
                  '我知道了'
                )
              },
              onClose: close
            })
          }
        })
        .catch(error => {
          _this.HideLoad()
          _this.$notification['error']({
            message: '系统提示',
            description: '系统忙，导入失败请稍后重试！'
          })
        })
    },
    // 判断是否是有效日期
    IsValidDate(DateStr) {
      var arr = []
      if (DateStr.indexOf('-') !== -1) {
        arr = DateStr.split('-')
      }
      if (DateStr.indexOf('/') !== -1) {
        arr = DateStr.split('/')
      }
      if (arr.length === 3) {
        var intYear = parseInt(arr[0], 10)
        var intMonth = parseInt(arr[1], 10)
        var intDay = parseInt(arr[2], 10)
        // console.log(intYear + ',' + intMonth + ',' + intDay)
        if (isNaN(intYear) || isNaN(intMonth) || isNaN(intDay)) {
          return false
        }
        if (intYear > 2100 || intYear < 1900 || intMonth > 12 || intMonth < 0 || intDay > 31 || intDay < 0) {
          return false
        }
        if ((intMonth === 4 || intMonth === 6 || intMonth === 9 || intMonth === 11) && intDay > 30) {
          return false
        }
        if ((intYear % 100 === 0 && intYear % 400) || (intYear % 100 && intYear % 4 === 0)) {
          if (intDay > 29) return false
        } else {
          if (intDay > 28) return false
        }
        return true
      }
      return false
    }
  }
}
</script>
<!--CSS样式-->
<style>
</style>
