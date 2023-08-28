<template>
  <main class="ion-padding py-8">
    <PEmpty
      :icon="icon"
      title="Oops"
      caption=" No services scheduled for today"
    />
    <!-- <div class="flex flex-col justify-center gap-2 text-center">
      <div class="mx-auto">
        <img src="@/assets/icon/sadEmogi.svg" alt="" class="object-cover" />
      </div>
      <h4 class="text-xl font-semibold text-dark-400">Oops</h4>
      <p class="text-center text-xs text-dark-400">
        No services scheduled for today
      </p>
    </div> -->
  </main>
</template>

<script setup>
import icon from "@/assets/icon/sadEmogi.svg";
</script>

<style></style>
