<template>
  <ion-page>
    <PNav title="" />
    <ion-content fullscreen>
      <h3 class="px-4 text-2xl font-semibold text-primary">Change Password</h3>
      <form class="ion-padding grid grid-cols-1 gap-2">
        <PInput
          v-model="args.oldPassword"
          label="Old Password"
          type="password"
          inputmode="password"
          :error="errorRules.oldPassword"
        />
        <PInput
          v-model="args.newPassword"
          label="Password"
          type="password"
          inputmode="password"
          :error="errorRules.newPassword"
        />
        <PInput
          v-model="args.confirmNewPassword"
          label="Confirm Password"
          type="password"
          inputmode="password"
          :error="errorRules.confirmNewPassword"
        />
      </form>
    </ion-content>
    <PFooter>
      <div class="ion-padding mb-4">
        <PButton block class="mt-4" :loading="loading" @click="submit"
          >Change Password</PButton
        >
      </div>
    </PFooter>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from "@ionic/vue";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useDataStore } from "@/stores/data.js";
import { helperFunctions } from "@/composable/helperFunctions";
import { inject } from "vue";

const store = useDataStore();
const http = inject("http");
const router = useRouter();
const { showToast } = helperFunctions;

const loading = ref(false);
const user = computed(() => store.getUser);
const args = reactive({
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
});

const errorRules = reactive({
  oldPassword: false,
  newPassword: false,
  confirmNewPassword: false,
});

function validate() {
  if (args.oldPassword.trim() == "") {
    errorRules.oldPassword = "Please enter a old password";
    return false;
  } else if (args.newPassword.trim() == "") {
    errorRules.newPassword = "Please enter a new password";
    return false;
  } else if (args.newPassword !== args.confirmNewPassword) {
    errorRules.confirmNewPassword = "Password doesn't match";
    return false;
  } else {
    errorRules.newPassword = false;
    errorRules.confirmNewPassword = false;

    return true;
  }
}

const submit = async () => {
  if (validate()) {
    console.log(args);
    args.email = user.value && user.value.email;
    try {
      loading.value = true;
      const res = await http({
        endpoint: "ChangePassword",
        httpMethod: "post",
        body: args,
      });

      console.log(res);

      args.oldPassword = "";
      args.newPassword = "";
      args.confirmNewPassword = "";

      loading.value = false;

      router.push({ name: "AccountSettings" });
      showToast("success", "Password updated successful");
    } catch (error) {
      loading.value = false;
      const message = error.response.data.message;
      console.log(message);
      showToast("error", message);
    }
  }
};
</script>
