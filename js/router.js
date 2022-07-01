import homePage from './views/home-page.cmp.js'
import mailApp from './apps/mail-app/views/mail-app.cmp.js'
import keepApp from './apps/keep-app/views/keep-app.cmp.js'
import bookApp from './apps/book-app/views/book-app.cmp.js'
import bookDetails from './apps/book-app/views/book-details.cmp.js'
import mailDetails from './apps/mail-app/cmps/mail-details.cmp.js'

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/mail',
        component: mailApp
    },
    {
        path: '/mail/details/:mailId',
        component: mailDetails
    },
    {
        path: '/keep',
        component: keepApp
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/details/:bookId',
        component: bookDetails
    },
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})