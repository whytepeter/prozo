<template>
  <div
    @click="handleView"
    :class="[!cart ? 'justify-between' : '']"
    class="flex items-center gap-4"
  >
    <div
      v-if="cart"
      class="h-[80px] w-[80px] flex-shrink-0 rounded-lg bg-primary-light"
    ></div>

    <div :class="[cart ? 'flex w-full items-center justify-between' : '']">
      <div class="grid grid-cols-1 text-left text-xs leading-5">
        <span class="text-sm font-medium text-dark-600"
          >Eba with Okro Soup
        </span>
        <span class="text-dark-400">(Asepo) & Grilled Beff</span>
        <span class="text-sm text-secondary">{{ formatAmount(3500) }}</span>
      </div>

      <div
        v-if="cart"
        class="flex flex-col justify-center overflow-hidden rounded-lg border border-primary text-xs"
      >
        <div
          @click="quantityFN('sub')"
          class="ion-activatable relative flex w-full items-center justify-center px-4 py-2 pt-3"
        >
          <i class="pi pi-minus text-error"></i>
          <ion-ripple-effect class="text-error" type=""></ion-ripple-effect>
        </div>

        <span class="text-center text-base text-secondary">{{ quantity }}</span>

        <div
          @click="quantityFN"
          class="ion-activatable relative flex w-full items-center justify-center px-4 py-2 pb-3"
        >
          <i class="pi pi-plus text-primary"></i>
          <ion-ripple-effect class="text-primary" type=""></ion-ripple-effect>
        </div>
      </div>
    </div>

    <div
      v-if="!cart"
      class="h-[80px] w-[80px] flex-shrink-0 rounded-lg bg-primary-light"
    ></div>
  </div>

  <ViewFood :isOpen="viewFood" @close="viewFood = false" />
</template>

<script setup>
import { helperFunctions } from "@/composable/helperFunctions";
import { ref } from "vue";

import ViewFood from "./ViewFood.vue";

const { formatAmount } = helperFunctions;
const props = defineProps({
  cart: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: {},
  },
});

const viewFood = ref(false);
const quantity = ref(1);

const handleView = () => {
  if (!props.cart) {
    viewFood.value = true;
  }
};

const quantityFN = (arg = "add") => {
  if (arg == "sub") {
    if (quantity.value > 1) {
      quantity.value -= 1;
    }
  } else {
    quantity.value += 1;
  }
};
</script>

<style scope lang="scss"></style>
