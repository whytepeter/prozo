<template>
  <ion-page>
    <ion-content fullscreen color="primary">
      <div
        class="relative flex h-full w-full items-center justify-center overflow-hidden"
      >
        <div>
          <img src="@/assets/icon/logo-text-light.svg" alt="" class="w-36" />
        </div>

        <span
          class="absolute bottom-10 left-1/2 -translate-x-1/2 transform text-xs"
          >Enjoy Pro Living</span
        >
        <img
          src="@/assets/icon/fade.svg"
          alt=""
          class="absolute -bottom-10 -right-0 w-[600px]"
        />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, onIonViewWillEnter } from "@ionic/vue";
import { Preferences } from "@capacitor/preferences";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const firstTimer = ref(true);

const setFirstTimer = async () => {
  const { value } = await Preferences.get({ key: "firstTimer" });
  if (value) {
    firstTimer.value = JSON.parse(value);
  }

  if (!firstTimer.value) {
    console.log("Home");
    router.push({ name: "Home" });
  } else {
    console.log("GetStarted");
    router.push({ name: "GetStarted" });
  }

  console.log(firstTimer.value);
};
setFirstTimer();

onMounted(async () => {
  await setFirstTimer();
});

onIonViewWillEnter(async () => {
  await setFirstTimer();
});
</script>
