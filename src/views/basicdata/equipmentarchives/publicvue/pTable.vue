<template>
  <div>
    <div id="button">
      <a-button style="background-color: #E6F7FF;border-color:#E6F7FF">
        <a-icon type="schedule"/>产能数据
      </a-button>
    </div>
    <a-table id="car"  size="small"  :bordered="true"  :columns="columnsMX" :pagination="false" ></a-table>
  </div>
</template>

<script>

import tableheader from '../js/columnscapacity'
export default {
  data() {
    return {
      columnsMX: tableheader,
      DataArr:[]
    } 
  },
  methods: {
  
    _loadData(obj){

      //alert(obj)
    }


  },


}
</script>

<style  scoped>
#card {
  margin-top: 10px;
}
#button {
  margin-top: 10px;
  background-color: #e6f7ff;
}
</style>