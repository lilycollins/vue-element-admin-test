import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'
export const constantRoutes = [{
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [{
            path: '/redirect/:path(.*)',
            component: () =>
                import ('@/views/redirect/index')
        }]
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () =>
            import ('@/views/login/auth-redirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () =>
            import ('@/views/error-page/401'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
                path: 'dashboard',
                component: () =>
                    import ('@/views/dashboard/index'),
                name: 'Dashboard',
                meta: { title: '首页', icon: 'dashboard', affix: true }
            },
            {
                path: 'message',
                name: 'message',
                component: () =>
                    import ('@/views/dashboard/component/message'),
                hidden: true
            },
            {
                path: 'todo',
                name: 'todo',
                component: () =>
                    import ('@/views/dashboard/component/todo'),
                hidden: true
            }
        ]
    },
    {
        path: '/user',
        component: Layout,
        redirect: '/user/organ',
        name: 'user',
        meta: {
            title: '用户管理',
            icon: 'table'
        },
        children: [{
                path: 'organ',
                component: () =>
                    import ('@/views/user/organ.vue'),
                name: 'organ',
                meta: { title: '组织管理' }
            },
            {
                path: 'addChange/:type',
                name: 'addChange',
                component: () =>
                    import ('@/views/user/component/organComp'),
                hidden: true
            },
            {
                path: 'role',
                component: () =>
                    import ('@/views/user/role.vue'),
                name: 'role',
                meta: { title: '角色管理' }
            },
            {
                path: 'roleChange/:type',
                name: 'roleChange',
                component: () =>
                    import ('@/views/user/component/roleComp'),
                hidden: true
            },
            {
                path: 'userInfo',
                component: () =>
                    import ('@/views/user/userInfo.vue'),
                name: 'userInfo',
                meta: { title: '用户信息' }
            },
            {
                path: 'userChange/:type',
                name: 'userChange',
                component: () =>
                    import ('@/views/user/component/userComp'),
                hidden: true
            }
        ]
    },
    // {
    //     path: '/security',
    //     component: Layout,
    //     redirect: '/security/index',
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/security/index'),
    //         name: 'security',
    //         meta: { title: '安防管理', icon: 'guide', noCache: true }
    //     }]
    // },
    {
        path: '/fire',
        component: Layout,
        redirect: '/fire/complex-table',
        name: 'fire',
        meta: {
            title: '消防管理',
            icon: 'el-icon-s-help'
        },
        children: [{
                path: 'deviceCheck',
                component: () =>
                    import ('@/views/fire/deviceCheck.vue'),
                name: 'deviceCheck',
                meta: { title: '消防设备巡检计划' }
            },
            {
                path: 'checkPlan/:type',
                name: 'checkPlan',
                component: () =>
                    import ('@/views/fire/component/checkComp'),
                hidden: true
            },
            {
                path: 'deviceProtect',
                component: () =>
                    import ('@/views/fire/deviceProtect.vue'),
                name: 'deviceProtect',
                meta: { title: '消防设置维保计划' }
            },
            {
                path: 'checkProtect/:type',
                name: 'checkProtect',
                component: () =>
                    import ('@/views/fire/component/protectComp'),
                hidden: true
            },
            {
                path: 'history',
                component: () =>
                    import ('@/views/fire/history.vue'),
                name: 'history',
                meta: { title: '历史记录查询' }
            },
            {
                path: 'fireSecurity',
                component: () =>
                    import ('@/views/fire/security.vue'),
                name: 'fireSecurity',
                meta: { title: '消防安全信息发布' }
            },
            {
                path: 'pubMessage/:type',
                name: 'pubMessage',
                component: () =>
                    import ('@/views/fire/component/pubMessage'),
                hidden: true
            }
        ]
    },
    {
        path: '/fix',
        component: Layout,
        redirect: '/fix/protectThing',
        name: 'fix',
        meta: {
            title: '维修管理',
            icon: 'edit'
        },
        children: [{
                path: 'protectThing',
                component: () =>
                    import ('@/views/fix/protectThing.vue'),
                name: 'protectThing',
                meta: { title: '保修事件' }
            },
            {
                path: 'addProtect/:type',
                name: 'addProtect',
                component: () =>
                    import ('@/views/fix/component/addProtect'),
                hidden: true
            },
            {
                path: 'protectDetail',
                name: 'protectDetail',
                component: () =>
                    import ('@/views/fix/component/protectDetail'),
                hidden: true
            },
            {
                path: 'protectScore',
                name: 'protectScore',
                component: () =>
                    import ('@/views/fix/component/protectScore'),
                hidden: true
            },
            {
                path: 'fixThing',
                component: () =>
                    import ('@/views/fix/fixThing.vue'),
                name: 'fixThing',
                meta: { title: '维修事件' }
            },
            {
                path: 'fixManifest',
                component: () =>
                    import ('@/views/fix/fixManifest.vue'),
                name: 'fixManifest',
                meta: { title: '维修工单' }
            }
        ]
    },
    {
        path: '/consume',
        component: Layout,
        redirect: '/consume/complex-table',
        name: 'consume',
        meta: {
            title: '耗材管理',
            icon: 'tab'
        },
        children: [{
                path: 'preApply/:type',
                component: () =>
                    import ('@/views/consume/preApply.vue'),
                name: 'preApply',
                meta: { title: '耗材预申请' }
            },
            {
                path: 'preAdd/:type',
                name: 'preAdd',
                component: () =>
                    import ('@/views/consume/component/preApply'),
                hidden: true
            },
            {
                path: 'preDetail',
                name: 'preDetail',
                component: () =>
                    import ('@/views/consume/component/preApplyDetail'),
                hidden: true
            },
            {
                path: 'getRecord',
                component: () =>
                    import ('@/views/consume/getRecord.vue'),
                name: 'getRecord',
                meta: { title: '耗材领用记录' }
            },
            {
                path: 'consumeType',
                component: () =>
                    import ('@/views/consume/consumeType.vue'),
                name: 'consumeType',
                meta: { title: '耗材类型' }
            },
            {
                path: 'consumeInfo',
                component: () =>
                    import ('@/views/consume/consumeInfo.vue'),
                name: 'consumeInfo',
                meta: { title: '耗材信息' }
            },
            {
                path: 'messageChange/:type',
                name: 'messageChange',
                component: () =>
                    import ('@/views/consume/component/messageChange'),
                hidden: true
            },
            {
                path: 'supplier',
                component: () =>
                    import ('@/views/consume/supplier.vue'),
                name: 'supplier',
                meta: { title: '供应商管理' }
            },
            {
                path: 'supplyChange/:type',
                name: 'supplyChange',
                component: () =>
                    import ('@/views/consume/component/supplyChange'),
                hidden: true
            },
            {
                path: 'apply',
                component: () =>
                    import ('@/views/consume/apply.vue'),
                name: 'apply',
                meta: { title: '耗材申请' }
            },
            {
                path: 'applyDetail',
                name: 'applyDetail',
                component: () =>
                    import ('@/views/consume/component/applyDetail'),
                hidden: true
            },
            {
                path: 'storage',
                component: () =>
                    import ('@/views/consume/storage.vue'),
                name: 'storage',
                meta: { title: '耗材库存查询' }
            },
            {
                path: 'storageDetail',
                name: 'storageDetail',
                component: () =>
                    import ('@/views/consume/component/storageDetail'),
                hidden: true
            },
            {
                path: 'instore',
                component: () =>
                    import ('@/views/consume/instore.vue'),
                name: 'instore',
                meta: { title: '耗材入库' }
            },
            {
                path: 'instoreChange',
                name: 'instoreChange',
                component: () =>
                    import ('@/views/consume/component/instoreChange'),
                hidden: true
            },
            {
                path: 'instoreDetail',
                name: 'instoreDetail',
                component: () =>
                    import ('@/views/consume/component/instoreDetail'),
                hidden: true
            },
            {
                path: 'outstore',
                component: () =>
                    import ('@/views/consume/outstore.vue'),
                name: 'outstore',
                meta: { title: '耗材出库' }
            },
            {
                path: 'outstoreChange',
                name: 'outstoreChange',
                component: () =>
                    import ('@/views/consume/component/outstoreChange'),
                hidden: true
            },
            {
                path: 'outstoreDetail',
                name: 'outstoreDetail',
                component: () =>
                    import ('@/views/consume/component/outstoreDetail'),
                hidden: true
            },
            {
                path: 'inventory',
                component: () =>
                    import ('@/views/consume/inventory.vue'),
                name: 'inventory',
                meta: { title: '耗材盘点' }
            },
            {
                path: 'inventoryStart',
                name: 'inventoryStart',
                component: () =>
                    import ('@/views/consume/component/inventoryStart'),
                hidden: true
            },
            {
                path: 'inventoryPlan',
                name: 'inventoryPlan',
                component: () =>
                    import ('@/views/consume/component/inventoryPlan'),
                hidden: true
            }, {
                path: 'inventoryDetail',
                name: 'inventoryDetail',
                component: () =>
                    import ('@/views/consume/component/inventoryDetail'),
                hidden: true
            },
            {
                path: 'fixInventory',
                component: () =>
                    import ('@/views/consume/fixInventory.vue'),
                name: 'fixInventory',
                meta: { title: '耗材盘点修正' }
            },
            {
                path: 'addInven',
                name: 'addInven',
                component: () =>
                    import ('@/views/consume/component/addInven'),
                hidden: true
            },
            {
                path: 'fixInvenDetail',
                name: 'fixInvenDetail',
                component: () =>
                    import ('@/views/consume/component/fixInvenDetail'),
                hidden: true
            },
            {
                path: 'countAnalysis',
                component: () =>
                    import ('@/views/consume/countAnalysis.vue'),
                name: 'countAnalysis',
                meta: { title: '统计分析' }
            },
            {
                path: 'bi',
                component: () =>
                    import ('@/views/consume/bi.vue'),
                name: 'bi',
                meta: { title: '报表管理' }
            },
            {
                path: 'applyAudit',
                component: () =>
                    import ('@/views/consume/applyAudit.vue'),
                name: 'applyAudit',
                meta: { title: '耗材申请审核' }
            },
            {
                path: 'auditDetail',
                name: 'auditDetail',
                component: () =>
                    import ('@/views/consume/component/auditDetail'),
                hidden: true
            }
        ]
    },
    {
        path: '/overview',
        component: Layout,
        redirect: '/overview/index',
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/overview/index'),
            name: 'overview',
            meta: { title: '态势总览', icon: 'list', noCache: true }
        }]
    },
    {
        path: '/lead',
        component: Layout,
        redirect: '/lead/index',
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/lead/index'),
            name: 'lead',
            meta: { title: '领导驾驶舱', icon: 'lock', noCache: true }
        }]
    }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
    // {
    //     path: '/permission',
    //     component: Layout,
    //     redirect: '/permission/page',
    //     alwaysShow: true, // will always show the root menu
    //     name: 'Permission',
    //     meta: {
    //         title: 'Permission',
    //         icon: 'lock',
    //         roles: ['admin', 'editor'] // you can set roles in root nav
    //     },
    //     children: [{
    //             path: 'page',
    //             component: () =>
    //                 import ('@/views/permission/page'),
    //             name: 'PagePermission',
    //             meta: {
    //                 title: 'Page Permission',
    //                 roles: ['admin'] // or you can only set roles in sub nav
    //             }
    //         },
    //         {
    //             path: 'directive',
    //             component: () =>
    //                 import ('@/views/permission/directive'),
    //             name: 'DirectivePermission',
    //             meta: {
    //                 title: 'Directive Permission'
    //                     // if do not set roles, means: this page does not require permission
    //             }
    //         },
    //         {
    //             path: 'role',
    //             component: () =>
    //                 import ('@/views/permission/role'),
    //             name: 'RolePermission',
    //             meta: {
    //                 title: 'Role Permission',
    //                 roles: ['admin']
    //             }
    //         }
    //     ]
    // },

    // {
    //     path: '/icon',
    //     component: Layout,
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/icons/index'),
    //         name: 'Icons',
    //         meta: { title: 'Icons', icon: 'icon', noCache: true }
    //     }]
    // },

    // /** when your routing map is too long, you can split it into small modules **/
    // // componentsRouter,
    // // chartsRouter,
    // // nestedRouter,
    // // tableRouter,

    // {
    //     path: '/example',
    //     component: Layout,
    //     redirect: '/example/list',
    //     name: 'Example',
    //     meta: {
    //         title: 'Example',
    //         icon: 'el-icon-s-help'
    //     },
    //     children: [{
    //             path: 'create',
    //             component: () =>
    //                 import ('@/views/example/create'),
    //             name: 'CreateArticle',
    //             meta: { title: 'Create Article', icon: 'edit' }
    //         },
    //         {
    //             path: 'edit/:id(\\d+)',
    //             component: () =>
    //                 import ('@/views/example/edit'),
    //             name: 'EditArticle',
    //             meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
    //             hidden: true
    //         },
    //         {
    //             path: 'list',
    //             component: () =>
    //                 import ('@/views/example/list'),
    //             name: 'ArticleList',
    //             meta: { title: 'Article List', icon: 'list' }
    //         }
    //     ]
    // },

    // {
    //     path: '/tab',
    //     component: Layout,
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/tab/index'),
    //         name: 'Tab',
    //         meta: { title: 'Tab', icon: 'tab' }
    //     }]
    // },

    // {
    //     path: '/error',
    //     component: Layout,
    //     redirect: 'noRedirect',
    //     name: 'ErrorPages',
    //     meta: {
    //         title: 'Error Pages',
    //         icon: '404'
    //     },
    //     children: [{
    //             path: '401',
    //             component: () =>
    //                 import ('@/views/error-page/401'),
    //             name: 'Page401',
    //             meta: { title: '401', noCache: true }
    //         },
    //         {
    //             path: '404',
    //             component: () =>
    //                 import ('@/views/error-page/404'),
    //             name: 'Page404',
    //             meta: { title: '404', noCache: true }
    //         }
    //     ]
    // },
    // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
