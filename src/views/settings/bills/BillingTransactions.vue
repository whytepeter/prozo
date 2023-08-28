<template>
  <main class="grid grid-cols-1 gap-4">
    <h4 class="text-dark-500 text-lg">Billing History</h4>
    <PEmpty caption="You don’t have any billing history at the moment" />
  </main>
</template>

<script setup>
import { inject } from "vue";
import { useDataStore } from "@/stores/data.js";

const store = useDataStore();
const http = inject("http");
</script>

<style></style>
