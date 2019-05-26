const getters = {
  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  userInfo: state => state.user.info,
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab,
  permissions: state => state.user.permissions,
  allPermissions: state => state.permission.allPermissions,
  organizations: state => state.organizations.organizations,
  workcenters: state => state.organizations.workcenters,
  workers: state => state.organizations.workers
  employees: state => state.organizations.tableData
}

export default getters
