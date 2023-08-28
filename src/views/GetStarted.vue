<template>
  <ion-page>
    <ion-content fullscreen>
      <div class="relative h-[500px]">
        <div
          class="ion-padding relative left-0 top-0 z-50 flex h-[500px] w-[320px] flex-col justify-end gap-2 overflow-hidden bg-tertiary-light pb-8 text-primary"
        >
          <span class="absolute -left-28 -top-10 w-[370px]">
            <img
              src="@/assets/images/food.png"
              alt=""
              class="w-full object-cover"
            />
          </span>
          <h4 class="text-2xl font-semibold">Pro Living</h4>
          <p class="text-sm leading-4">
            Lorem ipsum dolor sit amet consectetur. Ipsum tristique sit at diam
            semper enim ut ipsum ridiculus. Diam habitant risus posuere viverra.
          </p>
        </div>
        <div
          class="absolute left-0 top-0 z-20 h-[480px] w-[340px] bg-primary-light"
        ></div>
        <div
          class="absolute left-0 top-0 z-10 h-[460px] w-[360px] bg-info-light"
        ></div>
      </div>
      <div
        class="ion-padding flex items-center gap-1 text-2xl font-bold text-primary"
      >
        <span :class="['w-4']" class="h-2 w-2 rounded-full bg-primary"></span>
        <span class="h-2 w-2 rounded-full bg-primary-light"></span>
        <span class="h-2 w-2 rounded-full bg-primary-light"></span>
      </div>
    </ion-content>

    <PFooter color="white">
      <div class="ion-padding flex flex-col gap-3 pb-8">
        <PButton @click="$router.push({ name: 'Register' })"
          >Create Account</PButton
        >
        <PButton @click="$router.push({ name: 'Login' })" fill="outline"
          >Sign in</PButton
        >
      </div>
    </PFooter>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from "@ionic/vue";
</script>
