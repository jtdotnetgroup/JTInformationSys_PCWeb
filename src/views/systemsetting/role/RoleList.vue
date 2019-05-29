<template>
  <a-modal :visible="visible" title="新增/修改" @cancel="handleCancel" :width="900">
    <a-card :bordered="false" :style="{ height: '100%' }">
      <a-row :gutter="24">
        <a-col>
          <div style="max-width: 800px">
            <a-divider v-if="isMobile()"/>
            <div v-if="mdl.id">
              <h3>角色：{{ mdl.name }}</h3>
            </div>
            <a-form :form="form" :layout="isMobile() ? 'vertical' : 'horizontal'">
              <a-form-item label="角色唯一名称">
                <a-input
                  v-decorator="[ 'name', {rules: [{ required: true, message: '请输入角色名' }]} ]"
                  placeholder="请填写角色名称"
                />
              </a-form-item>

              <a-form-item label="角色显示名称">
                <a-input
                  v-decorator="[ 'displayname', {rules: [{ required: true, message: '请输入角色显示名称' }]} ]"
                  placeholder
                />
              </a-form-item>

              <a-form-item label="备注说明">
                <a-textarea
                  :row="3"
                  v-decorator="[ 'Description', {rules: []} ]"
                  placeholder="描述说明"
                />
              </a-form-item>

              <a-form-item label="拥有权限">
                <a-row :gutter="16" v-for="(permission,key, index) in displayPermissions" :key="index">
                  <a-col :xl="8" :lg="24">{{ key }}：</a-col>
                  <a-col :xl="16" :lg="24">
                    <a-checkbox
                    v-if="permission.actionsOptions.length > 0"
                    :indeterminate="permission.indeterminate"
                    :checked="permission.checkedAll"
                    @change="onChangeCheckAll($event, permission)">
                    全选
                  </a-checkbox>
                    <a-checkbox-group :options="permission.actionsOptions" v-model="permission.selected" @change="onChangeCheck(permission)" />
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
import { actionToObject } from '@/utils/permissions'
import pick from 'lodash.pick'
import store from '../../../store'
import { isUndefined, isNullOrUndefined } from 'util'
import fields from '../../../JtComponents/demoFields';

export default {
  name: 'RoleList',
  mixins: [mixinDevice],
  components: {},
  data() {
    return {
      form: this.$form.createForm(this),
      mdl: {},
      visible: false,
      roles: [],
      allPermissions: store.getters.allPermissions,
    }
  },
  created() {},
  methods: {
    callback(val) {},
    handleCancel() {
      this.visible = false
      this.mdl = {}
    },
    show(role) {
      if (role) {
        this.edit(role)
      } else {
        this.add()
      }
      this.visible = true
    },

    add() {
      this.edit({ id: 0 })
    },

    edit(record) {
      this.mdl = Object.assign({}, record)
      // 有权限表，处理勾选
      if (this.mdl.permissions && this.permissions) {
        // 先处理要勾选的权限结构
        const permissionsAction = {}
        this.mdl.permissions.forEach(permission => {
          permissionsAction[permission.permissionId] = permission.actionEntitySet.map(entity => entity.action)
        })

        console.log('permissionsAction', permissionsAction)
        // 把权限表遍历一遍，设定要勾选的权限 action
        this.permissions.forEach(permission => {
          const selected = permissionsAction[permission.id]
          permission.selected = selected || []
          this.onChangeCheck(permission)
        })

        console.log('this.permissions', this.permissions)
      }

      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'id', 'name', 'status', 'describe'))
      })
      console.log('this.mdl', this.mdl)
    },

    onChangeCheck(permission) {
      permission.indeterminate =
        !!permission.selected.length && permission.selected.length < permission.actionsOptions.length
      permission.checkedAll = permission.selected.length === permission.actionsOptions.length
    },
    onChangeCheckAll(e, permission) {
      console.log('permission:', permission)

      Object.assign(permission, {
        selected: e.target.checked ? permission.actionsOptions.map(obj => obj.value) : [],
        indeterminate: false,
        checkedAll: e.target.checked
      })
    },
    loadPermissions() {
      getPermissions().then(res => {
        const result = res.result
        this.permissions = result.map(permission => {
          const options = actionToObject(permission.actionData)
          permission.checkedAll = false
          permission.selected = []
          permission.indeterminate = false
          permission.actionsOptions = options.map(option => {
            return {
              label: option.describe,
              value: option.action
            }
          })
          return permission
        })
      })
    },
    
  },
  computed: {
    displayPermissions() {
      //权限数据转换显示
      var _this=this;
      var keys = Object.keys(this.allPermissions)
      const result = {}
      var modulName=""
      keys.forEach(k => {
        var arr=k.split(".");
        var modul = arr[0]
        var action=arr[1]
        modul=_this.$Localiztion(modul,"InformationSystem")
        if (modulName!==modul) {
           modulName=modul
          result[modul] = {}
          result[modul].actionsOptions=[]
        }
        
        action=_this.$Localiztion(action,"InformationSystem")
        result[modul].actionsOptions.push(action)

      })

      return result;
    }
  }
}
</script>

<style scoped>
</style>
