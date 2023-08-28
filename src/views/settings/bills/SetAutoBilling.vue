<template>
  <PModal
    type="sheet"
    noHeader
    :initialBreakpoint="1"
    persistence
    height="h-[350px]"
    :breakpoints="[0, 1]"
    :isOpen="isOpen"
    @close="closeFN"
  >
    <div class="grid grid-cols-1 gap-4 px-2 py-4">
      <h3 class="text-2xl font-semibold text-primary">Select billing method</h3>

      <div>
        <swiper
          :modules="modules"
          :autoplay="false"
          :zoom="true"
          :space-between="20"
          :slidesPerView="methods && methods.length > 1 ? 1.1 : 1"
          @swiper="setSwiperInstance"
          @slideChange="onSlideChange"
          class=""
        >
          <swiper-slide class="" v-for="(method, i) in methods" :key="i">
            <CreditCard
              :method="method.method"
              :card="method"
              :color="selectedIndex == i ? 'secondary' : 'dark-100'"
              outlined
            />
          </swiper-slide>
        </swiper>
      </div>

      <div>
        <span
          @click="$emit('close'), $router.push({ name: 'Cards' })"
          class="flex cursor-pointer items-center gap-1 text-sm text-secondary"
        >
          <i class="pi pi-plus"></i>
          Use a different card
        </span>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <PButton block fill="outline" @click="closeFN">Cancel</PButton>
        <PButton :loading="loading" block @click="setAutoBilling"
          >Continue</PButton
        >
      </div>
    </div>
  </PModal>

  <PLoader v-if="loading" />
</template>

<script setup>
import { computed, ref, inject, watch, onMounted } from "vue";

import CreditCard from "@/components/CreditCard.vue";

import { Autoplay, Keyboard, Pagination, Navigation, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import { useDataStore } from "@/stores/data.js";
import { helperFunctions } from "@/composable/helperFunctions";

const { openBrowser, showToast, processError } = helperFunctions;

const store = useDataStore();
const http = inject("http");

const modules = [Autoplay, Keyboard, Navigation, Scrollbar];
const slides = ref();
const setSwiperInstance = (swiper) => {
  slides.value = swiper;
};

const onSlideChange = (e) => {
  console.log(e.activeIndex);
  selectedIndex.value = e.activeIndex;
};

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const loading = ref(false);
const step = ref("amount");
const amount = ref("");
const errorMessage = ref(false);

const selectedIndex = ref(0);

const methods = computed(() => {
  const cards = [...store.getCards];
  const wallet = { ...store.getWallet };
  wallet.method = "wallet";
  cards.forEach((el) => {
    el.method = "card";
  });
  let options = [...[wallet], ...cards];
  options = options.sort((a, b) => b.use_for_auto_renew - a.use_for_auto_renew);
  return options;
});

// console.log(methods.value);

onMounted(() => {
  // console.log(methods.value);
});

const selectedMethod = computed(() => {
  if (methods.value.length) {
    return methods.value.find((el, i) => i === selectedIndex.value);
  }
});

const closeFN = () => {
  selectedIndex.value = 0;
  emit("close");
};

const setAutoBilling = async () => {
  try {
    loading.value = true;

    console.log(selectedMethod.value);

    const channel =
      selectedMethod && selectedMethod.value.method == "wallet"
        ? "wallet"
        : selectedMethod.value.id;

    const res = await http({
      endpoint: "UpdateAutoBilling",
      httpMethod: "patch",
      body: { channel },
    });

    console.log(res);
    showToast("success", "Auto Billing successfully set");
    emit("close");
    await queryAutoBillingStatus();
    await queryMywallet();
    await queryCards();
    loading.value = false;
  } catch (error) {
    loading.value = false;
    const message = processError(error);
    console.log(message);
    showToast("error", message);
  }
};

const queryAutoBillingStatus = async () => {
  try {
    const res = await http({
      endpoint: "AutoBillingStatus",
      httpMethod: "get",
    });

    console.log(res);

    store.$patch({
      autoBillingStatus: res.isAutoBillingActivated,
    });
  } catch (error) {
    const message = processError(error);
    console.log(message);
  }
};

const queryMywallet = async () => {
  try {
    const res = await http({
      endpoint: "MyWallet",
      httpMethod: "get",
    });
    console.log(res);

    store.$patch({
      wallet: res,
    });
  } catch (error) {
    const message = processError(error);
    console.log(message);
  }
};

const queryCards = async () => {
  try {
    // loading.value = true;
    const res = await http({
      endpoint: "GetCards",
      httpMethod: "get",
    });

    // loading.value = false;
    console.log(res);
    store.$patch({
      cards: res.items,
    });
  } catch (error) {
    // loading.value = false;
    const message = processError(error);
    console.log(message);
  }
};
</script>

<style></style>
