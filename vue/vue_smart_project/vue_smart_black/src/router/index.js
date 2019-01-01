import Vue from 'vue'
import Router from 'vue-router'
import "../assets/css/reset.css"
import "../assets/css/header.css"
import  Shop from  "../views/shop"
import Item from "../views/item"
import Cart from "../views/cart"
import Checkout from "../views/checkout"
import Payment from  "../views/Payment"
import Account from "../views/account"
import Order from '../views/account/order'
import Address from '../views/account/address'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name:"Shop",
      component: Shop
    },
    {
      path: '/item',
      name:"Item",
      component: Item
    },
    {
      path: '/cart',
      name:"Cart",
      component: Cart
    },
    {
      path: '/checkout',
      name:"Checkout",
      component: Checkout
    },
    {
      path: '/payment',
      name:"Payment",
      component: Payment
    },
    {
      path: '/account',
      component: Account,
      children: [
        {
          path: '',
          name: 'Account',
          component: Order
        },
        {
          path: '/address',
          name: 'Address',
          component: Address
        }
      ]
    }
  ]
})
