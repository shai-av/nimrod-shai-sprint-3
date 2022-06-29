import homePage from './views/home-page.cmp.js';
import aboutPage from './views/about-page.cmp.js';
import mailApp from './apps/mail-app/views/mail-app.cmp.js';
import keepApp from './apps/keep-app/views/keep-app.cmp.js';
import bookApp from './apps/book-app/views/book-app.cmp.js'




const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage
    },
    {
        path: '/mail',
        component: mailApp
    },
    {
        path: '/keep',
        component: keepApp
    },
    {
        path: '/book',
        component: bookApp
    },
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})