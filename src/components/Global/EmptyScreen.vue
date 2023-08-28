<template>
  <div class="my-6 grid grid-cols-1 gap-2 text-center">
    <span>
      <img :src="icon ? icon : defaultIcon" alt="" class="mx-auto" />
    </span>
    <h4 class="text-xl font-semibold text-dark-400">{{ title }}</h4>
    <span class="px-6 text-sm text-dark-300">{{ caption }}</span>
  </div>
</template>

<script setup>
import defaultIcon from "@/assets/icon/empty.svg";
defineProps({
  title: {
    type: String,
    default: "Nothing Here",
  },
  icon: {
    type: String,
    default: undefined,
  },
  caption: {
    type: String,
    default: "",
  },
});
</script>

<style></style>
