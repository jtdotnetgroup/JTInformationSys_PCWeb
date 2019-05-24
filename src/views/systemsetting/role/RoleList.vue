<template>
  <a-modal :visible="visible" title="新增/修改" @cancel="handleCancel" :width="900" @ok="Save">
    <template slot="footer">
      <a-button key="back" @click="handleCancel">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="Save">保存</a-button>
    </template>
    <a-card :bordered="false" :style="{ height: '100%' }">
      <a-row :gutter="24">
        <a-col>
          <div style="max-width: 800px">
            <a-divider v-if="isMobile()"/>
            <a-form :form="form" :layout="isMobile() ? 'vertical' : 'horizontal'">
              <a-form-item label="角色唯一名称">
                <a-input
                  :disabled="isEdit"
                  v-decorator="[ 'name', {rules: [{ required: true, message: '请输入角色名' }]} ]"
                  placeholder="请填写角色名称"
                />
              </a-form-item>

              <a-form-item label="角色显示名称">
                <a-input
                  v-decorator="[ 'displayName', {rules: [{ required: true, message: '请输入角色显示名称' }]} ]"
                  placeholder
                />
              </a-form-item>

              <a-form-item label="备注说明">
                <a-textarea
                  :row="3"
                  v-decorator="[ 'description', {rules: []} ]"
                  placeholder="描述说明"
                />
              </a-form-item>

              <a-form-item label="拥有权限">
                <a-row :gutter="5" v-for="(permission, index) in permissions" :key="index">
                  <a-col :xl="4" :lg="24">{{ permission.displayName }}：</a-col>
                  <a-col :xl="20" :lg="24">
                    <a-checkbox
                      v-if="permission.actionsOptions.length > 0"
                      :checked="permission.checkedAll"
                      @change="onChangeCheckAll($event, permission)"
                    >全选</a-checkbox>
                    <a-checkbox-group
                      :options="permission.actionsOptions"
                      v-model="mdl.permissions"
                      @change="onChangeCheck(permission)"
                    >
                      <span slot="label" slot-scope="{value}">{{value}}</span>
                    </a-checkbox-group>
                  </a-col>
                </a-row>
              </a-form-item>
            </a-form>
          </div>
        </a-col>
      </a-row>
    </a-card>
  </a-modal>
</template>

<script>
import { getRoleList, getPermissions } from '@/api/manage'
import { mixinDevice } from '@/utils/mixin'
import { Create, Update } from '@/api/Role'
import { actionToObject } from '@/utils/permissions'
import pick from 'lodash.pick'
import store from '../../../store'
import { isUndefined, isNullOrUndefined } from 'util'
import fields from '../../../JtComponents/demoFields'

export default {
  name: 'RoleList',
  mixins: [mixinDevice],
  components: {},
  data() {
    return {
      form: this.$form.createForm(this),
      mdl: {
        permissions: []
      },
      visible: false,
      roles: [],
      allPermissions: store.getters.allPermissions,
      permissions: [],
      isEdit: false,
      loading: false
    }
  },
  created() {},
  methods: {
    callback(val) {},
    handleCancel() {
      this.visible = false
      this.mdl = {}
      this.form.resetFields()
    },
    show(role) {
      if (role) {
        this.isEdit = true
        this.edit(role)
      } else {
        this.isEdit = false
        this.add()
      }
      this.displayPermissions()
      this.visible = true
    },

    add() {
      this.edit({ id: 0, permissions: [] })
    },

    edit(record) {
      this.mdl = Object.assign({}, record)
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'id', 'name', 'displayName', 'description'))
      })
    },

    onChangeCheck(permission) {
      // permission.indeterminate =
      //   !!permission.selected.length && permission.selected.length < permission.actionsOptions.length
      // console.log(permission)
      // permission.checkedAll = permission.selected.length === permission.actionsOptions.length
    },
    onChangeCheckAll(e, permission) {
      var mdl = this.mdl
      if (e.target.checked) {
        permission.actionsOptions.forEach(e => {
          if (!mdl.permissions.includes(e.value)) {
            mdl.permissions.push(e.value)
          }
        })
      } else {
        permission.actionsOptions.forEach(e => {
          if (mdl.permissions.includes(e.value)) {
            mdl.permissions = mdl.permissions.filter(p => p !== e.value)
          }
        })
      }
      permission.checkedAll = e.target.checked
    },
    displayPermissions() {
      //权限数据转换显示
      var _this = this
      var keys = Object.keys(this.allPermissions)
      //返回的结果
      const result = {}
      keys.forEach(k => {
        var arr = k.split('.')
        //模块名称
        var modul = arr[0]
        //权限名称
        var action = arr[1]
        //多语言名称
        var displayName = _this.$Localiztion(modul, 'InformationSystem')
        /*
          把模块名称作为result的字段名，例如 modul=SystemSettings,则result[modul]就是result.SystemSettings
        */

        if (!!!result[modul]) {
          //当对应模块为空时，则把模块名称作为字段添加到result对象中，值是一个空的对像 {}
          result[modul] = {}
          //设置模块的显示名称
          result[modul].displayName = displayName
          //设置模块的权限列表，初始值为一个空的数组
          result[modul].actionsOptions = []
        }
        //权限对象
        var actionItem = {}
        //权限的显示名称
        actionItem.label = _this.$Localiztion(action, 'InformationSystem')
        //权限具体的值，这个才是传回后端的值
        actionItem.value = k
        //添加到权限列表进行显示
        result[modul].actionsOptions.push(actionItem)

        //设置是否全选
        if (!!this.mdl.permissions) {
          result[modul].checkedAll =
            this.mdl.permissions.filter(p1 => p1.indexOf(modul) >= 0).length ===
            keys.filter(p2 => p2.indexOf(modul) >= 0).length
        } else {
          result[modul].checkedAll = false
        }
      })

      this.permissions = result
    },

    Save() {
      var _this = this
      this.form.validateFields((err, values) => {
        if (!err) {
          values.permissions = this.mdl.permissions
          values.id=this.mdl.id
          this.loading = true
          var request=this.isEdit?Update(values):Create(values);
          request.then(res=>{
            this.loading=false;
            _this.$message.success('保存成功',3)
            this.handleCancel();
          }).catch(err=>{
            this.loading=false;
          })
        }
      })
    }
  },
  computed: {}
}
</script>

<style scoped>
.ant-form-item label{
  font-weight: bold;
}                

</style>
