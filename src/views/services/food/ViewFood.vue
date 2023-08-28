<template>
  <PModal
    @close="$emit('close')"
    :isOpen="isOpen"
    type="full"
    noHeader
    absolute
    :spacing="false"
    :showCloseButton="true"
  >
    <ion-page>
      <ion-content fullscreen>
        <div class="grid grid-cols-1 gap-6">
          <div class="-mt-20 h-[350px] w-full bg-primary-light"></div>
          <div class="ion-padding grid grid-cols-1 gap-2 text-center text-xl">
            <span class="font-medium text-primary">Eba with Okro Soup </span>
            <span class="text-sm text-dark-400"> (Asepo) & Grilled Beff </span>
            <span class="font-medium text-secondary">
              {{ formatAmount(displayPrice) }}
            </span>
          </div>

          <div class="ion-padding grid grid-cols-1 gap-4 text-center">
            <PButton fill="clear" color="secondary" block>
              <span class="flex items-center gap-2 text-xs">
                <i class="pi pi-plus"></i>
                Add Pepper Sauce
              </span>
            </PButton>
          </div>
        </div>
      </ion-content>

      <PFooter>
        <div
          :class="[
            !isIos ? 'ion-padding' : '',
            'mb-4',
            'grid-cols-a grid gap-2',
          ]"
        >
          <div class="mx-1 rounded-lg border border-primary p-2">
            <div class="flex items-center justify-between text-sm text-primary">
              <div
                @click="quantityFN('sub')"
                class="ion-activatable relative flex items-center justify-center rounded-full p-2"
              >
                <i class="pi pi-minus text-error"></i>
                <ion-ripple-effect
                  class="text-error"
                  type="unbounded"
                ></ion-ripple-effect>
              </div>

              <span class="text-base text-secondary">{{ quantity }}</span>

              <div
                @click="quantityFN"
                class="ion-activatable relative flex items-center justify-center rounded-full p-2"
              >
                <i class="pi pi-plus"></i>
                <ion-ripple-effect
                  class="text-primary"
                  type="unbounded"
                ></ion-ripple-effect>
              </div>
            </div>
          </div>
          <PButton
            block
            @click="$emit('close'), $router.push({ name: 'FoodCart' })"
          >
            Add to card - {{ formatAmount(displayPrice) }}
          </PButton>
        </div>
      </PFooter>
    </ion-page>
  </PModal>
</template>

<script setup>
import { IonPage, IonContent, IonRippleEffect } from "@ionic/vue";
import { helperFunctions } from "@/composable/helperFunctions";
import { Capacitor } from "@capacitor/core";
import { computed, ref } from "vue";

const { formatAmount } = helperFunctions;
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["close"]);

const isIos = computed(() => {
  return Capacitor.getPlatform() === "ios";
});

const quantity = ref(1);
const price = ref(3500);

const displayPrice = computed(() => {
  return price.value * quantity.value;
});
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

<style></style>
