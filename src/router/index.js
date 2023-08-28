import { createRouter, createWebHistory } from '@ionic/vue-router';
import { useDataStore } from "@/stores/data";
import AppLayout from "@/layout/AppLayout.vue";

const routes = [
  {
    path: '/',
    redirect: '/start'
  },

  {
    path: '/home',
    component: AppLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name:'Home',
        component: () => import("@/views/home/HomeScreen.vue"),
      },
      {
        path: '/orders',
        name:'Orders',
        component: () => import("@/views/orders/OrderScreen.vue"),
      },
      {
        path: '/wallet',
        name:'Wallet',
        component: () => import("@/views/wallet/WalletScreen.vue"),
      },
      {
        path: '/subscription',
        name:'Subscription',
        component: () => import("@/views/subscription/SubscriptionScreen.vue"),
      },
      {
        path: '/settings',
        name:'AccountSettings',
        component: () => import("@/views/settings/AccountSettings.vue"),
      },
      {
        path: '/notification',
        name:'Notification',
        component: () => import("@/views/NotificationScreen.vue"),
      },
    ]
  },

  ///// Login //////
  {
    path: '/auth/login',
    name:'Login',
    component: () => import("@/views/auth/Login/LoginScreen.vue"),
  },


///// Register //////
  {
    path: '/start',
    name:'Start',
    component: () => import("@/views/StartScreen.vue"),
  },
  {
    path: '/get-started',
    name:'GetStarted',
    component: () => import("@/views/GetStarted.vue"),
  },
  {
    path: '/auth/register/location',
    name:'Register',
    component: () => import("@/views/auth/Register/LocationInfo.vue"),
  },
  {
    path: '/auth/register/personal',
    name:'RegisterPersonal',
    component: () => import("@/views/auth/Register/PersonalInfo.vue"),
  },
  {
    path: '/auth/register/join-us',
    name:'JoinUs',
    component: () => import("@/views/auth/Register/JoinUs.vue"),
  },

  ///// Forgot Password //////
  {
    path: '/auth/forgot-password',
    name:'ForgotPassword',
    component: () => import("@/views/auth/Password/ForgotPassword.vue"),
  },
  {
    path: '/auth/fogot-password/otp',
    name:'VerifyOtp',
    component: () => import("@/views/auth/Password/VerifyOtp.vue"),
  },
  {
    path: '/auth/forgot-password/reset',
    name:'ResetPassword',
    component: () => import("@/views/auth/Password/ResetPassword.vue"),
  },

  ///// Services //////
  {
    path: '/service/food',
    name:'FoodService',
    component: () => import("@/views/services/food/FoodService.vue"),
  },
  {
    path: '/service/food/cart',
    name:'FoodCart',
    component: () => import("@/views/services/food/CartScreen.vue"),
  },

  ///// Settings //////
  ///// Account Settings //////
  {
    path: '/settings/profile',
    name:'ProfileInformation',
    component: () => import("@/views/settings/profile/ProfileInformation.vue"),
  },
  {
    path: '/settings/bills',
    name:'BillsAndPayment',
    component: () => import("@/views/settings/bills/BillsAndPayment.vue"),
  },
  {
    path: '/settings/bills/auto',
    name:'AutoBilling',
    component: () => import("@/views/settings/bills/AutoBilling.vue"),
  },
  {
    path: '/settings/card',
    name:'Cards',
    component: () => import("@/views/settings/CardSettings.vue"),
  },
  {
    path: '/settings/referral',
    name:'Referrals',
    component: () => import("@/views/settings/ReferralScreen.vue"),
  },
  {
    path: '/settings/giftcard',
    name:'RedeemGiftcards',
    component: () => import("@/views/settings/RedeemGiftcards.vue"),
  },

  ///// Security //////
  {
    path: '/settings/security/change_password',
    name:'ChangePassword',
    component: () => import("@/views/settings/security/ChangePassword.vue"),
  },
  {
    path: '/settings/security/change_pin',
    name:'ChangePin',
    component: () => import("@/views/settings/security/ChangePin.vue"),
  },
  {
    path: '/settings/security/reset_pin',
    name:'ResetPin',
    component: () => import("@/views/settings/security/ResetPin.vue"),
  },
  
  ////// More //////
  {
    path: '/settings/faq',
    name:'Faq',
    component: () => import("@/views/settings/FaqScreen.vue"),
  },
  {
    path: '/settings/help',
    name:'GetHelp',
    component: () => import("@/views/settings/GetHelp.vue"),
  },
  {
    path: '/settings/help',
    name:'GetHelp',
    component: () => import("@/views/settings/GetHelp.vue"),
  },
  {
    path: '/settings/legal',
    name:'Legal',
    component: () => import("@/views/settings/LegalScreen.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const store = useDataStore();

  if (to.meta.requiresAuth && !store.isLoggedIn) {
    next("/auth/login");
  } else {
    next();
  }
});

export default router
