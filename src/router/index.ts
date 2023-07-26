import Home from "../views/Home.vue";
import { createRouter, createWebHashHistory, RouterOptions, Router, RouteRecordRaw } from 'vue-router'
//由于router的API默认使用了类型进行初始化，内部包含类型定义，所以本文内部代码中的所有数据类型是可以省略的
//RouterRecordRaw是路由组件对象
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        // component: () => import('../views/Home.vue')
        component: Home,
        redirect: "goods",//重定向
        children:[
            {
                path:"goods",
                name:"goods",
                meta:{
                    isShow: true,
                    title: "商品列表"
                },
                component:() => import("../views/GoodsView.vue")
            },
            {
                path:"user",
                name:"user",
                meta:{
                    isShow: true,
                    title: "用户列表"
                },
                component:() => import("../views/UserView.vue")
            },
            {
                path:"role",
                name:"role",
                meta:{
                    isShow: true,
                    title: "角色列表"
                },
                component:() => import("../views/RoleView.vue")
            },
            {
                path:"authority",
                name:"authority",
                meta:{
                    isShow: false,
                    title: "权限列表"
                },
                component:() => import("../views/Authority.vue")
            }
        ]
    },
    { path: '/my', name: 'My', component: () => import('../views/My.vue') },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
]

// RouterOptions是路由选项类型
const options: RouterOptions = {
    history: createWebHashHistory(),
    routes,
}

// Router是路由对象类型
const router: Router = createRouter(options)
router.beforeEach((to, from, next) =>{
    const token: string | null = localStorage.getItem('token')
    if (!token && to.path!=='/login'){
        next('/login')
    }
    else{
        next()
    }
})
export default router