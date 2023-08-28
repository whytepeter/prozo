<template>
  <div
    v-if="method == 'card'"
    :class="[
      outlined
        ? `border bg-white py-5 text-dark-400 border-${color}`
        : 'bg-primary p-6 text-tertiary-light',
    ]"
    class="ion-padding relative grid w-full grid-cols-1 gap-2 rounded-xl text-left"
  >
    <div
      v-if="!outlined"
      class="flex items-center justify-between gap-4 text-tertiary-light"
    >
      <span> {{ card && card.card_type }} </span>

      <div
        @click="showConfirm = true"
        class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-tertiary-light p-1 text-error"
      >
        <i class="pi pi-trash"></i>
      </div>
    </div>

    <div
      :class="[
        outlined ? 'text-lg text-dark-500' : 'text-xl text-primary-light',
      ]"
      class="font-semibold"
    >
      {{ card && card.bin }}
      ** ****
      {{ card && card.last4 }}
    </div>

    <div
      :class="[outlined ? 'text-xs' : 'justify-between gap-2']"
      class="flex items-center text-sm"
    >
      <span v-if="outlined">{{}}</span>
      <span v-else>{{ fullName }}</span>

      <span
        >{{ getMonth(card && card.exp_month) }}/{{
          card && card.exp_year
        }}</span
      >
    </div>

    <span
      v-if="outlined"
      :class="`text-${color}`"
      class="absolute right-4 top-1/2 -translate-y-1/2 transform text-xl"
    >
      <i v-if="color == 'secondary'" class="pi pi-check-circle"></i>
      <i v-else class="pi pi-circle text-dark-200"></i>
    </span>

    <span class="pointer-events-none absolute -bottom-4 right-0">
      <img src="@/assets/icon/fade.svg" alt="" />
    </span>
  </div>

  <div
    v-if="method == 'wallet'"
    :class="['border bg-white py-6 text-dark-400', `border-${color}`]"
    class="ion-padding relative flex w-full items-center justify-between rounded-xl"
  >
    <div class="itemd-center flex gap-3">
      <img src="@/assets/icon/walletIcon.svg" alt="" />
      <div class="grid grid-cols-1 text-left text-xs leading-4">
        <span class="text-lg font-medium text-dark-500">
          {{ formatAmount(card.balance) }}
        </span>
        <span>Prozo Wallet</span>
      </div>
    </div>
    <span
      :class="`text-${color}`"
      class="absolute right-4 top-1/2 -translate-y-1/2 transform text-xl"
    >
      <i v-if="color == 'secondary'" class="pi pi-check-circle"></i>
      <i v-else class="pi pi-circle text-dark-200"></i>
    </span>
  </div>

  <PAlert
    type="info"
    :isOpen="showConfirm"
    @close="showConfirm = false"
    title="Delete Card"
    caption="You are about to delete this card"
  >
    <div class="grid grid-cols-2 gap-2">
      <PButton @click="showConfirm = false" block> Cancel</PButton>
      <PButton :loading="loading" fill="outline" @click="deleteCard" block>
        Yes</PButton
      >
    </div>
  </PAlert>

  <!-- <PLoader v-if="loading" /> -->
</template>

<script setup>
import { computed, ref } from "vue";
import { inject } from "vue";
import { useDataStore } from "@/stores/data.js";
import { helperFunctions } from "@/composable/helperFunctions";

const { showToast, formatAmount, processError } = helperFunctions;

const store = useDataStore();
const http = inject("http");

const props = defineProps({
  outlined: {
    type: Boolean,
    default: false,
  },

  selected: {
    type: Boolean,
    default: false,
  },
  method: {
    type: String,
    default: "card",
  },
  color: {
    type: String,
    default: "secondary",
  },

  card: {
    type: Object,
    default: () => ({}),
  },
});

const showConfirm = ref(false);
const loading = ref(false);

const paystackDetails = computed(() => JSON.parse(props.card.paystackDetails));
const fullName = computed(() => {
  return paystackDetails.value &&
    paystackDetails.value.authorization.account_name
    ? paystackDetails.value.authorization.account_name
    : "";
});

const getMonth = (arg) => {
  const months = {
    1: "Jan",
    "01": "Jan",
    2: "Feb",
    "02": "Feb",
    3: "Mar",
    "03": "Mar",
    4: "Apr",
    "04": "Apr",
    5: "May",
    "05": "May",
    6: "Jun",
    "06": "Jun",
    7: "Jul",
    "07": "Jul",
    8: "Aug",
    "08": "Aug",
    9: "Sep",
    "09": "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  return arg ? months[arg] : "N/A";
};

const deleteCard = async () => {
  console.log(props.card);
  try {
    loading.value = true;
    const res = await http({
      endpoint: "DeleteCard",
      httpMethod: "delete",
      additionalParams: {
        id: props.card.id,
      },
    });

    loading.value = false;
    showConfirm.value = false;
    console.log(res);
    showToast("success", "Card successfully deleted");
    await queryCards();
  } catch (error) {
    loading.value = false;
    const message = processError(error);
    console.log(message);
    showToast("error", message);
  }
};

const queryCards = async () => {
  try {
    const res = await http({
      endpoint: "GetCards",
      httpMethod: "get",
    });

    console.log(res);
    store.$patch({
      cards: res.items,
    });
  } catch (error) {
    const message = processError(error);
    console.log(message);
  }
};
</script>

<style></style>
