<template>
  <div class="relative">
    <ion-input
      ref="input"
      fill="solid"
      mode="ios"
      label-placement="floating"
      :label="label"
      color="primary"
      :type="handleType"
      :name="name"
      :inputmode="inputmode"
      :spellcheck="spellcheck"
      :helper-text="error ? error : hint"
      :disabled="disabled"
      :autocomplete="autocomplete"
      autocapitalize="off"
      :autocorrect="autocorrect"
      :autofocus="autofocus"
      :readonly="readonly"
      :required="required"
      :maxlength="maxlength"
      :minlength="minlength"
      :max="max"
      :min="min"
      :enterkeyhint="enterkeyhint"
      error-text="Invalid email"
      :clear-input="clearInput"
      @ionInput="updateField($event)"
      @ionBlur="markTouched"
      :value="formatAmount"
      class="custom text-sm text-dark-600"
    ></ion-input>
    <ion-progress-bar
      v-if="loading"
      color="secondary"
      type="indeterminate"
      class="-mt-3"
    ></ion-progress-bar>

    <div
      v-if="type == 'password'"
      @click="showPassword = !showPassword"
      class="absolute right-0 top-7 z-50 cursor-pointer bg-white pl-1 pt-[2.5px]"
    >
      <ion-icon
        style="margin-top: -1px"
        class="text-xl"
        color="primary"
        :icon="allIcons[showPassword ? 'eyeOutline' : 'eyeOffOutline']"
      ></ion-icon>
    </div>
  </div>
</template>

<script>
import { IonInput, IonIcon, IonProgressBar } from "@ionic/vue";

import * as allIcons from "ionicons/icons";
import { addIcons } from "ionicons";
import { computed, onMounted, ref } from "vue";

export default {
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    format: {
      type: Boolean,
      default: false,
    },
    spellcheck: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    clearInput: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    enterkeyhint: {
      type: [Boolean, Object, String],
      default: undefined,
    },
    maxlength: {
      type: [Number, String],
      default: undefined,
    },
    minlength: {
      type: [Number, String],
      default: undefined,
    },
    max: {
      type: [Number, String],
      default: undefined,
    },
    min: {
      type: [Number, String],
      default: undefined,
    },
    label: {
      type: String,
      default: "",
    },
    appendIcon: {
      type: [String, Boolean],
      default: false,
    },
    prependIcon: {
      type: [String, Boolean],
      default: false,
    },
    placeholder: String,
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      default: "",
    },
    inputmode: {
      type: String,
      default: "text",
    },
    autocomplete: {
      type: String,
      default: "off",
    },
    autocorrect: {
      type: String,
      default: "off",
    },
    color: {
      type: [String, Boolean],
      default: "primary",
    },
    error: {
      type: [String, Boolean, Number],
      default: false,
    },
    hint: {
      type: [String, Boolean],
      default: " ",
    },
  },

  components: {
    IonInput,
    IonIcon,
  },

  setup(props) {
    const showPassword = ref(false);

    onMounted(() => {
      // Register all icons globally
      addIcons(allIcons);
    });

    const handleType = computed(() => {
      if (props.type == "password") {
        return showPassword.value ? "text" : "password";
      } else {
        return props.type;
      }
    });

    const hintColor = computed(() => {
      if (props.error) {
        return `var(--ion-color-danger)`;
      } else {
        `var(--ion-color-medium-tint)`;
      }
    });

    return {
      allIcons,
      hintColor,
      showPassword,
      handleType,
    };
  },

  computed: {
    formatAmount() {
      if (this.format) {
        let val = this.modelValue;
        val = parseFloat(val);
        val = val.toLocaleString();

        if (val === "NaN") {
          return "";
        } else {
          return `₦${val}`;
        }
      } else {
        return this.modelValue;
      }
    },
  },

  methods: {
    updateField(e) {
      let amount = e.target.value;

      if (this.format) {
        amount = this.removeAlphabet(amount);
        e.target.value = amount;
        const firstChar = amount.charAt(0);
        if (firstChar === "₦") {
          amount = amount.substring(1);
        }

        if (amount !== null) {
          amount = amount.split(",").join("");
          amount = parseFloat(amount);
        }
      }

      this.$emit("update:modelValue", amount);
    },

    removeAlphabet(arg) {
      if (arg) {
        arg = arg.toString();
        let regex = /[a-zA-Z]/g;
        this.$emit("update:modelValue", arg.replace(regex, ""));
        return arg.replace(regex, "");
      }
    },

    markTouched() {
      this.$refs.input.$el.classList.add("ion-touched");
    },
  },
};
</script>

<style>
ion-input.custom {
  --padding-start: 0px !important;
}

ion-input.custom .helper-text {
  color: v-bind(hintColor) !important;
  line-height: 1rem;
}
ion-input.custom.has-focus .label-text {
  color: var(--ion-color-primary) !important;
}
</style>
