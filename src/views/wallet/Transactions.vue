<template>
  <div class="text-dark-500">
    <h4 class="mb-4 text-lg">Transaction History</h4>
    <div
      v-if="transactions && transactions.length"
      class="grid grid-cols-1 gap-4"
    >
      <div v-for="(item, i) in visibleData" :key="i">
        <p class="mb-4 text-sm text-dark-400">
          {{ weeks[item.day] }}, {{ months[item.month] }} {{ item.date }},
          {{ item.year }}
        </p>

        <div class="grid grid-cols-1 gap-4 text-sm">
          <div
            class="flex items-center gap-4 border-b border-dark-50 pb-4 last:border-0"
            v-for="transaction in item.data"
            :key="transaction.id"
          >
            <div class="w-8">
              <img
                :src="transaction.type == 'credit' ? inflow : outflow"
                alt=""
                class="w-full object-cover"
              />
            </div>
            <div class="flex w-full justify-between gap-4">
              <div class="grid grid-cols-1">
                <span>{{ transaction.description }}</span>
                <span class="text-xs uppercase text-dark-400"
                  >{{ transaction.time }}
                </span>
              </div>
              <div class="grid grid-cols-1 justify-items-end text-left">
                <span class="text-[16px] font-medium">{{
                  formatAmount(transaction.amount)
                }}</span>
                <span
                  :class="[getStatus(transaction.status).color, 'text-xs']"
                  >{{ getStatus(transaction.status).text }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="grid grid-cols-1 gap-4">
      <PEmpty caption="You don’t have any billing history at the moment" />
    </div>
  </div>
</template>

<script setup>
import inflow from "@/assets/icon/inflow.svg";
import outflow from "@/assets/icon/outflow.svg";

import { computed, inject, ref, watch } from "vue";
import { useDataStore } from "@/stores/data.js";
import { helperFunctions } from "@/composable/helperFunctions";
import { onIonViewWillEnter } from "@ionic/vue";

const { formatAmount, formatDate, transformData } = helperFunctions;
const store = useDataStore();
const http = inject("http");

const visibleData = ref([]);
const transactions = computed(() => store.getTransactions);
visibleData.value = transformData(transactions.value);

const getStatus = (status) => {
  const obj = {
    "00": {
      color: "text-secondary",
      text: "Success",
    },
    "01": {
      color: "text-warning",
      text: "Processing",
    },
    "02": {
      color: "text-warning",
      text: "Refunding",
    },
    "03": {
      color: "text-info",
      text: "Reversed",
    },
  };

  return obj[status];
};

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let weeks = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

watch(transactions, () => {
  visibleData.value = transformData(transactions.value);
});

onIonViewWillEnter(() => {
  visibleData.value = transformData(transactions.value);
});
</script>

<style></style>
