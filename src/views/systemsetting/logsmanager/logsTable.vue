<template>
  <a-card>
    <!-- <tableOperatorBtn @btnClick="handleBtnClick" :buttons="buttons"/> -->

    <a-form :form="form" layout="inline">
      <a-form-item label="开始时间">
        <a-date-picker
          format="YYYY-MM-DD HH:mm:ss"
          v-decorator="['StartTime',{rules: [],initialValue:this.StartTime} ]"
        ></a-date-picker>
      </a-form-item>
      <a-form-item label="结束时间">
        <a-date-picker
          format="YYYY-MM-DD HH:mm:ss"
          v-decorator="['EndTime',{rules: [],initialValue: this.EndTime} ]"
        ></a-date-picker>
      </a-form-item>

      <a-form-item label="Message">
        <a-input v-decorator="['Message',{rules: [],initialValue: this.Message} ]"></a-input>
      </a-form-item>

      <a-form-item>
        <a-checkbox :value="Hour" @change="onChangeHour">1小时</a-checkbox>
      </a-form-item>

      <a-form-item>
        <a-checkbox :value="Today" @change="onChangeToday">今天</a-checkbox>
      </a-form-item>
      
       <a-form-item>
        <a-checkbox :value="Exception" @change="onChangeException">异常</a-checkbox>
      </a-form-item>

      <a-form-item>
        <a-button type="default" @click="OnClickSelect">查询</a-button>
      </a-form-item>
    </a-form>

    <pagination
      :current="pagination.current"
      :total="pagination.total"
      @pageChange="onPaginationChange"
    />

    <a-table
      bordered
      
      :dataSource="tableData"
      :columns="columns"
      :pagination="false"
      :loading="loading"
      rowKey="id"
      size="small"
      :scroll="{x: 1500,y: 500}"
    >
      <template slot="id" slot-scope="id">
        <a-button @click="OnClick(id)" icon="search">详情</a-button>
      </template>

      <!-- <template slot="serviceName" slot-scope="serviceName">
          <a-tooltip placement="topLeft"  >
        <template slot="title">
          <span >{{serviceName}}</span>
        </template>
        <span >{{`${serviceName.substring(0,40)}…`}}</span>
        </a-tooltip>
      </template> -->
    </a-table>
    <LogsModalFrom ref="LogsModalFrom"/>
  </a-card>
</template>


<script>
//import buttons from './js/buttons'
import columns from './js/columns'
import { GetAll } from '@/api/Abpauditlogs'
export default {
  components: {
    pagination: () => import('@/JtComponents/Pagination'),
    LogsModalFrom: () => import('./LogsModalFrom')
  },
  data() {
    return {
      pagination: {
        current: 1,
        pageSize: 10,
        total: 50
      },
      form: this.$form.createForm(this),
      Hour: false,
      Today: false,
      Exception:false,
      StartTime: null,
      EndTime: null,
      Message: null,
      //buttons: buttons,
      columns: columns,
      tableData: [],
      loading: true
    }
  },
  mounted() {
    this._loadData()
  },
  methods: {
    //分页的方法
    onPaginationChange(page, size) {
      this.pagination.current = page
      this.pagination.pageSize = size
      this.loading=true
      this._loadData()
    },
    handleBtnClick(val) {},

    

    //小时
    onChangeHour(e) {
      if( e.target.checked===false){
         this.StartTime= null,
      this.EndTime= null,
     this. Message= null

      }
      this.Hour = e.target.checked
    },
    //今天
    onChangeToday(e) {
       if( e.target.checked===false){
        this.StartTime= null,
        this.EndTime= null,
        this. Message= null
      }
      this.Today = e.target.checked
    },
    //异常查询
    onChangeException(e){
      this.Exception=e.target.checked

      
    },


    //查询的方法
    OnClickSelect() {
      this.form.validateFields((err, values) => {

         this.loading=true

        this.StartTime =values.StartTime!==null?this.$moment(values.StartTime).format('YYYY-MM-DD HH:mm:ss.sss'):values.StartTime
        this.EndTime =values.EndTime!==null?this.$moment(values.EndTime).format('YYYY-MM-DD HH:mm:ss.sss'):values.EndTime 
        this.Message=values.Message
        
        if (this.Hour === true) {
          var frontOneHour = new Date(new Date().getTime() - 1 * 60 * 60 * 1000)

          this.StartTime = this.$moment(frontOneHour).format('YYYY-MM-DD HH:mm:ss.sss')
          this.EndTime = new Date(new Date())
        } else if (this.Today === true) {
          var weehours = new Date(new Date().setHours(0, 0, 0, 0))
            // console.log(this.$moment(weehours).format('YYYY-MM-DD HH:mm:ss.sss'))
          this.StartTime= weehours
          this.EndTime= new Date(new Date())
        }
       

        if (!err) {
          this._loadData()
        }
      })
    },

    //单击详情显示模态框显示的方法
    OnClick(id) {

      var data = this.tableData.filter(e => {
          return e.id ===id
        })

      this.$refs.LogsModalFrom.show(data)
    },

    //查询日志信息
    _loadData() {
      var _this = this
      var params = {
        StartTime: _this.StartTime,
        EndTime: _this.EndTime,
        Message: _this.Message,
        Exception:_this.Exception,
        SkipCount: (this.pagination.current - 1) * this.pagination.pageSize,
        MaxResultCount: this.pagination.pageSize
      }

      GetAll(params)
        .then(res => {
          _this.tableData = []
          const result = res.result
          if (result) {
          
              result.items.forEach(e => {
              e.executionTime = this.$moment(e.executionTime).format('YYYY-MM-DD HH:mm:ss.sss')
              _this.tableData.push(e)
            })
            _this.pagination.total = result.totalCount
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          _this.loading = false
        })
    }
  }
}
</script>

<style >

  .ant-tooltip-inner {
    padding: 6px 8px;
    color: #fff;
    text-align: left;
    text-decoration: none;
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 4px;
    -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    min-height: 32px;
    word-wrap: break-word;
    width: 350px
    }
</style>