<template>
  <ion-page>
    <ion-tabs class="bg-white" @ion-tabs-did-change="setActive($event)">
      <ion-router-outlet></ion-router-outlet>

      <ion-tab-bar
        color="white"
        slot="bottom"
        class="bg-white border-t border-outline rounded-t-2xl py-3"
      >
        <ion-tab-button
          v-for="tab in tabs"
          :key="tab.label"
          :tab="tab.tab"
          :href="tab.href"
          @click="$router.push(tab.href)"
        >
          <div class="w-5">
            <img
              :src="$route.path.includes(tab.tab) ? tab.activeICon : tab.icon"
              :alt="tab.tab"
            />
          </div>
          <ion-label
            :class="[
              $route.path.includes(tab.tab)
                ? 'text-secondary font-medium'
                : 'text-dark-500 font-light',
            ]"
            class="text-xs"
            >{{ tab.label }}</ion-label
          >
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup>
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  // IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";

import home from "@/assets/icon/home.svg";
import homeActive from "@/assets/icon/homeActive.svg";
import order from "@/assets/icon/order.svg";
import orderActive from "@/assets/icon/orderActive.svg";
import wallet from "@/assets/icon/wallet.svg";
import walletActive from "@/assets/icon/walletActive.svg";
import subscription from "@/assets/icon/subscription.svg";
import subscriptionActive from "@/assets/icon/subscriptionActive.svg";
import account from "@/assets/icon/account.svg";
import accountActive from "@/assets/icon/accountActive.svg";

import { reactive, ref } from "vue";

const active = ref("home");

const setActive = (e) => {
  console.log(e);
  active.value = e.tab;
};

const tabs = reactive([
  {
    tab: "home",
    href: "/home",
    label: "Home",
    icon: home,
    activeICon: homeActive,
  },
  {
    tab: "order",
    href: "/orders",
    label: "Orders",
    icon: order,
    activeICon: orderActive,
  },
  {
    tab: "wallet",
    href: "/wallet",
    label: "Wallet",
    icon: wallet,
    activeICon: walletActive,
  },
  {
    tab: "subscription",
    href: "/subscription",
    label: "Subscription",
    icon: subscription,
    activeICon: subscriptionActive,
  },
  {
    tab: "settings",
    href: "/settings",
    label: "Account",
    icon: account,
    activeICon: accountActive,
  },
]);
</script>

<style scoped>
ion-tab-bar.custom {
}
</style>
