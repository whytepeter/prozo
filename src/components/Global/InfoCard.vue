<template>
  <div
    class="flex cursor-pointer items-center gap-2 rounded-lg border border-tertiary bg-tertiary-light p-3"
  >
    <img v-if="icon" :src="icon" alt="" class="object-cover" />

    <div class="grid grid-cols-1 text-dark-500">
      <span class="font-medium">{{ title }}</span>
      <span class="text-xs text-dark-500">{{ text }} </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: String,
  title: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
});
</script>

<style></style>
