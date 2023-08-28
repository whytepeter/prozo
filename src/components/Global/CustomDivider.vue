<template>
  <hr :class="[!noMargin ? 'my-2' : '']" class="border-t-8 border-dark-50" />
</template>

<script setup>
defineProps({
  noMargin: {
    type: Boolean,
    default: false,
  },
});
</script>

<style></style>
