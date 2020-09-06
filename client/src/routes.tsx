interface IRoutes {
    shopCore: string
    adminPanelCore: string
    adminPanelLogin: string
    dashboard: string
    orders:string
    products:string
    customers:string
    
}

export const routes:IRoutes = {
    shopCore: '/',
    adminPanelCore: '/Admin',
    adminPanelLogin: '/Admin/Login',
    dashboard:'/Admin/Dashboard',
    orders:'/Admin/Orders',
    products:'/Admin/Products',
    customers:'/Admin/Customers',
}