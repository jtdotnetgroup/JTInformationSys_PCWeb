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
  mounted() {
    GetScripts()
  }
}
</script>
<style>
#app {
  height: 100%;
}
.ant-layout-content {
  margin-left: 5px;
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
div .ant-card-body {
  padding: 10px 10px !important;
}
</style>
