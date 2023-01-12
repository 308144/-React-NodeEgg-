import { Route } from '@/routes'

export const transfer2menu = (parentPath: string, route: Route) => {
  const { name, path, routes = [], hideInMenu } = route
  if (hideInMenu) {
    return null
  }
  return {
    label: name,
    key: parentPath + path,
    children: routes.length ? routes.map(item => transfer2menu(parentPath + path, item)) : null,
  }
}

export const getMenuItemsByRoute = (routes: Route[]) => {
  const menuItems = []
  function recurse(route: Route) {
    // 如果父节点不显示在menu栏 就不再计算子节点
    if (!route.hideInMenu) {
      menuItems.push(transfer2menu('', route))
    }
  }

  routes.forEach(item => recurse(item))

  return menuItems
}
