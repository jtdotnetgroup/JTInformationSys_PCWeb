<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { AppDeviceEnquire } from '@/utils/mixin'

export default {
  mixins: [AppDeviceEnquire],
  data() {
    return {
      locale: zhCN
    }
  },
  mounted () {
   
  }
}
</script>
<style>
  #app {
    height: 100%;
  }
  .ant-layout-content{
    margin-left: 5px !important;
  }
  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
  border: none !important;
  border-right: 1px solid #e8e8e8 !important;
  border-radius: 0px !important;
}
.layout.ant-layout .header {
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
} 
  .ant-table-thead th{
    font-weight: bold !important;
    background-color:rgb(242,247,251) !important
  }
 /*页面内容内边框*/
.ant-card-body{
  padding: 15px !important;
}
/*表格方形*/
.ant-table-small.ant-table-bordered{
  border-radius: 0px;
}
.ant-table-small > .ant-table-content > .ant-table-body{
  margin: 0px !important;
}
.ant-btn{
  border-radius:2px!important; 
}
  .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab{
    border:none !important;
    border-right: 1px solid #ebece9 !important;
    border-radius:0px !important;
  }
  .layout.ant-layout .header{
    -webkit-box-shadow:none !important;
    box-shadow:none !important;
  }
  .ant-table-body{
    margin:0 0 !important;
  }
</style>
