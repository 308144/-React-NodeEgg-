export const transfer2menu = (parentPath, route) => {
    const { name, path, routes = [], hideInMenu } = route;
    if (hideInMenu) {
        return null;
    }
    return {
        label: name,
        key: parentPath + path,
        children: routes.length ? routes.map(item => transfer2menu(parentPath + path, item)) : null,
    };
};
export const getMenuItemsByRoute = (routes) => {
    const menuItems = [];
    function recurse(route) {
        if (!route.hideInMenu) {
            menuItems.push(transfer2menu('', route));
        }
    }
    routes.forEach(item => recurse(item));
    return menuItems;
};
//# sourceMappingURL=router.js.map