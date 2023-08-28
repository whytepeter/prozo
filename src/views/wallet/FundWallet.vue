<template>
  <PModal
    type="sheet"
    noHeader
    :initialBreakpoint="1"
    persistence
    :height="step == 'amount' ? 'h-[300px]' : 'h-[350px]'"
    :breakpoints="[0, 1]"
    :isOpen="isOpen"
    @close="closeFN"
  >
    <div class="grid grid-cols-1 gap-4 px-2 py-4">
      <h3 class="text-2xl font-semibold text-primary">
        {{
          step == "amount"
            ? "Enter amount you wish to fund"
            : "Select funding option"
        }}
      </h3>

      <PInput
        v-if="step == 'amount'"
        :error="errorMessage"
        format
        v-model="amount"
        label="Amount"
        inputmode="numeric"
      />

      <div v-if="step == 'method' && cards.length">
        <swiper
          :modules="modules"
          :autoplay="false"
          :zoom="true"
          :space-between="20"
          :slidesPerView="cards && cards.length > 1 ? 1.1 : 1"
          @swiper="setSwiperInstance"
          @slideChange="onSlideChange"
          class=""
        >
          <swiper-slide class="" v-for="(card, i) in cards" :key="i">
            <CreditCard
              :card="card"
              :color="selectedIndex == i ? 'secondary' : 'dark-100'"
              outlined
            />
          </swiper-slide>
        </swiper>
      </div>
      <div v-if="step == 'method'">
        <span
          @click="fundWallet('new')"
          class="flex cursor-pointer items-center gap-1 text-sm text-secondary"
        >
          <i class="pi pi-plus"></i>
          Use a different card
        </span>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <PButton block fill="outline" @click="closeFN">Cancel</PButton>
        <PButton v-if="step == 'amount'" :loading="loading" block @click="next"
          >Next</PButton
        >
        <PButton v-else :loading="loading" block @click="fundWallet('existing')"
          >Continue</PButton
        >
      </div>
    </div>
  </PModal>

  <PLoader v-if="loading" />
</template>

<script setup>
import { computed, ref, inject, watch } from "vue";

import CreditCard from "../../components/CreditCard.vue";

import { Autoplay, Keyboard, Pagination, Navigation, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import { useDataStore } from "@/stores/data.js";
import { onIonViewWillEnter } from "@ionic/vue";
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

const type = ref();

const selectedIndex = ref(0);
const cards = computed(() => store.getCards);

const selectedCard = computed(() => {
  if (cards.value.length) {
    let card;
    card = cards.value.find((el, i) => i === selectedIndex.value);
    return card;
  }
});

const next = () => {
  console.log(amount.value);
  if (amount.value.toString().trim() !== "" && !isNaN(amount.value)) {
    if (cards.value.length) {
      step.value = "method";
    } else {
      fundWallet("new");
    }
  } else {
    errorMessage.value = "Please enter amount";
  }
};

const closeFN = () => {
  selectedIndex.value = 0;
  step.value = "amount";
  amount.value = "";

  emit("close");
};

const fundWallet = async (arg) => {
  type.value = arg;
  try {
    loading.value = true;

    console.log(selectedCard.value);

    const payload = {
      amount: amount.value.toString(),
      cardType: arg,
      cardId: selectedCard.value && selectedCard.value.id,
    };

    console.log(payload);

    if (arg == "new") {
      delete payload.cardId;
    }

    const res = await http({
      endpoint: "FundWallet",
      httpMethod: "post",
      body: payload,
    });

    console.log(res);

    if (arg == "new") {
      openBrowser(
        res.data.authorization_url,
        "popover",
        queryBalanceAndHistory
      );
    }
    emit("close");
    await queryBalanceAndHistory();

    loading.value = false;
  } catch (error) {
    loading.value = false;
    const message = processError(error);
    console.log(message);
    showToast("error", message);
  }
};

const queryBalanceAndHistory = async () => {
  try {
    loading.value = true;

    const res = await http({
      endpoint: "GetWallet",
      httpMethod: "get",
    });

    const data = await http({
      endpoint: "GetTransactions",
      httpMethod: "get",
    });

    if (type.value == "new") {
      const card = await http({
        endpoint: "GetCards",
        httpMethod: "get",
      });

      store.$patch({
        cards: card.items,
      });
    }

    loading.value = false;

    store.$patch({
      transactions: data.items,
    });

    store.setWalletBalance(res);
  } catch (error) {
    loading.value = false;
  }
};
</script>

<style></style>
