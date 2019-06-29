<template>
  <a-modal
    title="新增/维护"
    :visible="visible"
    width="1000px"
    style="left:80px"
    :maskClosable="true"
    @ok="handleSubmit"
    @cancel="onClose"
  >
    <a-form :form="form" layout="inline">
      <a-form-item label="用户姓名">
        <!-- <a-input @change="OnChange" v-decorator="['UserName',{rules: []} ]" placeholder="请输用户姓名搜索"></a-input> -->
     
      <div class="components-input-demo-presuffix">
      <a-input-search v-model="Surname"
      placeholder="请输用户姓名搜索"
      @search="onSearch"
      enterButton>

      <a-icon v-if="Surname"  slot="suffix" type="close-circle" @click="emitEmpty" />
      </a-input-search>
    </div>
      
      </a-form-item>
      <a-form-item  label="查看角色成员">
        <a-select style="width:150px"  v-decorator="['id',{rules: [],initialValue:1}]"
             @change="SelectClick" >
          <a-select-option 
            v-for="(item,index) in RoleStaics"
            :key="index"
            :value="item.id"
          >{{item.text}}</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>

    <pagination
      :current="pagination.current"
      :total="pagination.total"
      @pageChange="onPaginationChange"
    />
    <a-table
      bordered
      :rowSelection="{selectedRowKeys: selectedRowKeys,onChange: onSelectChange}"
      :dataSource="tableData"
      :columns="columns"
      :pagination="false"
      :loading="loading"
      
      rowKey="id"
      size="small"
    />
  </a-modal>
</template>


<script>
import columns from './columns'
import { GetRoleUser, Create } from '@/api/VW_RoleUserAll'

export default {
  components: {
    pagination: () => import('@/JtComponents/Pagination')
  },

  data() {
    return {
      pagination: {
        current: 1,
        pageSize: 10,
        total: 50
      },

      Surname: '',
      selectedRowKeys: [],
      selectedRows: [],
      visible: false,
      tableData: [],
      columns: columns,
      loading: true,
      form: this.$form.createForm(this),
      RoleStaics: [{ id: 1, text: '角色成员' }, { id: 2, text: '不是角色成员' }],
      RoleId: 0,//记录角色的id    
      RoleStaic: 1,//选择器的记录值
    
    }
  },
  mounted() {
   // this._LoadData()
  },
  computed: {},
  methods: {
    show(formData) {
      this.loading=true
      this.visible = true
      this.RoleId = formData.id
      this._LoadData()
    },

    emitEmpty(){

      this.Surname = ''
      this.loading = true
      this._LoadData() 

    },

    //提交事件
    handleSubmit() {

      //console.log(this.selectedRows)


      var _this = this
      var userListsId = []
      var tableData = _this.tableData
      for (let index = 0; index < tableData.length; index++) {
        var ss = _this.selectedRows.filter(e => {
          return e.id === tableData[index].id
        })
        if (ss.length > 0) {
          userListsId.push({ userID: ss[0].id, UserBool: true })
        } else {
          userListsId.push({ userID: tableData[index].id, UserBool: false })
        }
      }

      var params = { id: this.RoleId, userListsId: [] }
      params.userListsId = userListsId

      Create(params)
        .then(res => {
          if (res.result > 0) {
            _this.$message.success('成功')
            this.onClose()
          } else {
            _this.$message.error('失败')
            this.onClose()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
     //窗体关闭事件
    onClose() {
       this.Surname = ''
      this.visible = false
      this.RoleId = 0
      this.selectedRows = []
      this.RoleStaic = 1
      this.form.resetFields()
    
      this.pagination.current=1
      this.pageSize= 10
    },
    //复选框选择事件
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows=selectedRows
      console.log(selectedRows)
    },
    //分页的方法
    onPaginationChange(page, size) {
      this.pagination.current = page
      this.pagination.pageSize = size
       this.loading = true
      this._LoadData()
    },
  
    //选择器的下拉单击方法
    SelectClick(value) {
     // console.log(value)
      if(value===undefined){
        this.RoleStaic=1
      }else{
         this.RoleStaic = value
      }
      this.Surname=''
      this.loading = true
      this._LoadData()
    },
    //用户名称的搜索事件
    onSearch(value) {

        this.loading = true
        this.Surname=value
        this._LoadData()     
    },

    //查询全部的方法
    _LoadData() {
      var _this = this
      var params = {
        RoleStaic: _this.RoleStaic,
        RoleId: _this.RoleId,
        Surname:_this.Surname,
        SkipCount: (this.pagination.current - 1) * this.pagination.pageSize,
        MaxResultCount: this.pagination.pageSize
      }
      GetRoleUser(params)
        .then(res => {
          _this.tableData = []
          _this.selectedRowKeys=[]
          _this.selectedRows=[]
          const result = res.result
          if (result) {
              let index=0

            //    _this.tableData=result.items
              // console.log(result)

             result.items.forEach(e=>{
             //e.key=index+=1
            if (e.roleId !== null&&e.roleId===_this.RoleId) {
                _this.selectedRowKeys.push(e.id)
                _this.selectedRows.push(e)
            }           
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

<style  scoped>
.components-input-demo-presuffix .anticon-close-circle {
  cursor: pointer;
  color: #ccc;
  transition: color 0.3s;
  font-size: 12px;
}
.components-input-demo-presuffix .anticon-close-circle:hover {
  color: #999;
}
.components-input-demo-presuffix .anticon-close-circle:active {
  color: #666;
}
</style>