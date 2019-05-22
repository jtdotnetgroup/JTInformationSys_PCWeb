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
  data () {
    return {
      locale: zhCN
    }
  },
  mounted () {
    GetScripts();
  }
}
</script>
<style>
  #app {
    height: 100%;
  }
  .ant-layout-content{
    margin-left: 5px;
  }
  div .ant-card-body{
    padding: 10px 10px !important;
  }
</style>
