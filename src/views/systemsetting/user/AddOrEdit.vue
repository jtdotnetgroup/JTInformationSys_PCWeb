<!--页面代码-->
<template>
  <a-spin tip="保存中，请稍等..." :spinning="spinning">
    <a-modal
      title="用户信息"
      :visible="visible"
      :maskClosable="false"
      @ok="handleOk"
      @cancel="handleCancel"
      width="30%"
    >
      <a-form :form="form" @submit="handleSubmit" :layout="formLayout">
        <a-form-item v-show="false" label="id">
          <a-input v-model="form.id"/>
        </a-form-item>
        <a-form-item label="姓：">
          <a-input v-model="form.surname"/>
        </a-form-item>
        <a-form-item label="用户名：">
          <a-input v-model="form.userName"/>
        </a-form-item>
        <a-form-item label="昵称：">
          <a-input v-model="form.name"/>
        </a-form-item>
        <a-form-item label="邮箱地址：">
          <a-input v-model="form.emailAddress"/>
        </a-form-item>
        <a-form-item label="是否启用：">
          <a-radio-group name="radioGroup" v-model="form.isActive" :defaultValue="form.isActive">
            <a-radio :value="true">启用</a-radio>
            <a-radio :value="false">不启用</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="角色：">
          <a-checkbox-group style="width: 100%;" v-model="form.roleNames">
            <a-row v-for="(item, index) in SelroleNames" :key="index">
              <a-col :span="8">
                <a-checkbox :value="item.normalizedName">{{item.normalizedName}}</a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="密码：" v-show="!IsEdit">
          <a-input type="password" v-model="form.password"/>
        </a-form-item>
        <a-form-item label="注册时间：" v-show="IsEdit">
          <a-input v-model="form.creationTime"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-spin>
</template>
<!--脚本文件-->
<script>
// 获取数据
import { GetMx, DataAdd, DataPUT, GetRoles } from '@/api/User'

//
export default {
  data() {
    return {
      formLayout: 'horizontal',
      spinning: false, // 加载框
      visible: false, // 是否显示模态框
      loading: false,
      IsEdit: false,
      form: {
        id: 0,
        name: '',
        surname: '',
        userName: '',
        emailAddress: '',
        isActive: true,
        roleNames: [],
        password: '',
        creationTime: ''
      },
      SelroleNames: [
        {
          name: 'Admin',
          displayName: 'Admin',
          normalizedName: 'ADMIN',
          description: null,
          permissions: [],
          id: 1
        }
      ]
    }
  },
  //
  created() {},
  mounted() {},
  //
  methods: {
    onChangeRole() {},
    // 获取角色列表
    beginGetRole() {
      console.log('GetRoles' + '1111111')
      var _this = this
      _this.SelroleNames = []
      GetRoles()
        .then(res => {
          if (res.success) {
            _this.SelroleNames = res.result.items
          } else {
            _this.$notification['error']({
              message: '系统提示',
              description: '获取角色列表失败，请稍后重试！'
            })
          }
        })
        .catch(error => {
          _this.$notification['error']({
            message: '系统异常提示',
            description: '获取角色列表失败，请稍后重试！'
          })
        })
    },
    // 显示
    showModal() {
      this.visible = true
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
      this.form.id = 0
      this.form.name = ''
      this.form.surname = ''
      this.form.userName = ''
      this.form.emailAddress = ''
      this.form.isActive = true
      this.form.roleNames = []
      this.form.creationTime = ''
      this.form.password = ''
    },
    // 显示
    show(obj) {
      this.IsEdit = false
      this.beginGetRole()
      if (obj.id !== 0) {
        this.IsEdit = true
        this.GetDetailed(obj)
      }
      this.showModal()
    },
    // 隐藏
    hide() {
      this.visible = false
    },
    // 确定后执行关闭弹出层/窗口
    handleOk() {
      this.handleSubmit(this.form)
    },
    // 取消操作关闭弹出层/窗口
    handleCancel() {
      this.empty()
      this.visible = false
    },
    // 提交
    handleSubmit(obj) {
      var _this = this
      if (obj.id === 0) {
        DataAdd(obj)
          .then(res => {
            if (res.success) {
              _this.$notification['success']({
                message: '系统提示',
                description: '添加成功'
              })
              _this.empty()
              _this.hide()
              _this.$emit('addSuccess');
            } else {
              _this.$notification['error']({
                message: '系统提示',
                description: '添加失败，请稍后重试！'
              })
            }
          })
          .catch(error => {
            _this.$notification['error']({
              message: '系统异常提示',
              description: '添加失败，请稍后重试！'
            })
          })
      } else {
        DataPUT(obj)
          .then(res => {
            if (res.success) {
              _this.$notification['success']({
                message: '系统提示',
                description: '修改成功'
              })
              _this.empty()
              _this.hide()
              _this.$emit('addSuccess');
            } else {
              _this.$notification['error']({
                message: '系统提示',
                description: '修改失败，请稍后重试！'
              })
            }
          })
          .catch(error => {
            _this.$notification['error']({
              message: '系统提示',
              description: '修改失败，请稍后重试！'
            })
          })
      }
    },
    // 获取明细
    GetDetailed(obj) {
      var _this = this
      GetMx(obj)
        .then(res => {
          console.log(res)
          if (res.success) {
            var result = res.result
            _this.form.id = result.id
            _this.form.name = result.name
            _this.form.surname = result.surname
            _this.form.userName = result.userName
            _this.form.emailAddress = result.emailAddress
            _this.form.isActive = result.isActive
            _this.form.roleNames = result.roleNames
            _this.form.creationTime = result.creationTime
          } else {
            this.$notification['error']({
              message: '系统提示',
              description: '数据加载异常，请稍后重试！'
            })
          }
        })
        .catch(error => {
          this.$notification['error']({
            message: '系统提示',
            description: '数据加载异常，请稍后重试！'
          })
        })
    }
  }
}
</script>
<style>
</style>
