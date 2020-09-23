interface IRoutes {
    [key:string] :string
    shopCore: string
    adminPanelCore: string
    adminPanelLogin: string
    dashboard: string
    orders:string
    productsPanel:string
    products:string
    addProduct: string
    categories:string
    addCategory: string
    brands: string
    customers:string
    
}

export const routes:IRoutes = {
    shopCore: '/',
    adminPanelCore: '/admin',
    adminPanelLogin: '/admin/login',
    dashboard:'/admin/dashboard',
    orders:'/admin/orders',
    productsPanel:'/admin/products-panel/:type',
    products:'/admin/products-panel/products',
    addProduct:'/admin/products-panel/products/add-product',
    categories:'/admin/products-panel/categories',
    addCategory:'/admin/products-panel/categories/add-category',
    brands:'/admin/products-panel/brands',
    customers:'/admin/customers',
}