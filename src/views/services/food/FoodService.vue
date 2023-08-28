<template>
  <ion-page>
    <ion-header class="ion-no-border bg-white">
      <PNav>
        <ion-buttons slot="end">
          <span
            @click="$router.push({ name: 'FoodCart' })"
            class="ion-activatable relative mr-2 overflow-hidden p-2"
          >
            <img src="@/assets/icon/cart.svg" alt="" />
            <div
              :class="[cartItems ? 'right-0 top-0 h-5 w-5' : 'right-1 top-1']"
              class="absolute flex items-center justify-center rounded-full border-2 border-white bg-secondary p-1 text-xs font-medium text-white"
            >
              {{ cartItems }}
            </div>
            <ion-ripple-effect
              class="text-dark-200"
              type="unbounded"
            ></ion-ripple-effect>
          </span>
        </ion-buttons>
      </PNav>
      <h3 class="px-4 text-2xl font-semibold text-primary">Food</h3>
      <ion-searchbar mode="ios" />
      <div class="ion-padding -mt-2 flex flex-col gap-3">
        <div
          class="animation no-scrollbar flex items-center gap-1 overflow-x-auto text-xs"
        >
          <div
            ref="menuRef"
            @click="selectMenu($event, i)"
            :class="
              activeMenu == i
                ? 'bg-secondary font-medium text-white'
                : 'text-dark-400'
            "
            class="rounded-lg px-2 py-1"
            v-for="(menu, i) in menus"
            :key="i"
          >
            {{ menu.title }}
          </div>
        </div>
      </div>
      <PDivider />
    </ion-header>
    <ion-content fullscreen>
      <ion-refresher slot="fixed" @ionRefresh="reload($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <div class="ion-padding grid grid-cols-1 gap-4 pt-2">
        <PInfo :icon="alertIcon" text="Order now and get it tomorrow" />
      </div>
      <swiper
        :modules="modules"
        :autoplay="false"
        :pagination="false"
        :zoom="true"
        @swiper="setSwiperInstance"
        @slideChange="onSlideChange"
        class="onboarding mt-1 pb-8"
      >
        <swiper-slide v-for="(menu, i) in menus" :key="i">
          <div class="grid w-full grid-cols-1 gap-4 px-4">
            <FoodCard v-for="(item, i) in 10" :key="i" />
          </div>
        </swiper-slide>
      </swiper>
    </ion-content>

    <PLoader v-if="loading" />
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonRippleEffect,
  onIonViewWillEnter,
} from "@ionic/vue";

import { Autoplay, Keyboard, Pagination, Navigation, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import alertIcon from "@/assets/icon/alertIcon.svg";
import FoodCard from "./FoodCard.vue";

import { computed, inject, ref } from "vue";
import { useDataStore } from "@/stores/data.js";
import { helperFunctions } from "@/composable/helperFunctions";

const { moveCenter, processError } = helperFunctions;

const store = useDataStore();
const http = inject("http");

const modules = [Autoplay, Keyboard, Pagination, Navigation, Scrollbar];
const slides = ref();
const setSwiperInstance = (swiper) => {
  slides.value = swiper;
};

const onSlideChange = (e) => {
  console.log(e);
  activeMenu.value = e.activeIndex;
  moveCenter(menuRef.value[e.activeIndex], false);
};

const loading = ref(false);
const categories = computed(() => store.getCategories);
const foods = computed(() => store.getFoods);

console.log("Categories", categories.value, "Foods", foods.value);

const menuRef = ref();
const cartItems = ref(4);
const activeMenu = ref(0);
const menus = ref([
  {
    title: "All",
  },
  {
    title: "Swallowing",
  },
  {
    title: "Proteins",
  },
  {
    title: "Slides",
  },
  {
    title: "Soup",
  },
  {
    title: "Specials",
  },
  {
    title: "Peppersoups",
  },
]);

const selectMenu = (e, index) => {
  activeMenu.value = index;
  slides.value.slideTo(index);
  moveCenter(e);
};

const reload = async (event) => {
  setTimeout(() => {
    event.target.complete();
  }, 2000);
};

onIonViewWillEnter(() => {
  queryCategory();
  queryFood();
});

const queryCategory = async () => {
  try {
    loading.value = true;
    const res = await http({
      endpoint: "GetCategories",
      httpMethod: "get",
    });

    loading.value = false;
    console.log(res);

    store.$patch({
      categories: res.items,
    });
  } catch (error) {
    loading.value = false;
    const message = processError(error);
    console.log(message);
  }
};
const queryFood = async () => {
  try {
    loading.value = true;
    const res = await http({
      endpoint: "GetFood",
      httpMethod: "get",
    });

    loading.value = false;
    console.log(res);

    store.$patch({
      foods: res.items,
    });
  } catch (error) {
    loading.value = false;
    const message = processError(error);
    console.log(message);
  }
};
</script>

<style scope>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
