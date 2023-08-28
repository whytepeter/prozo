<template>
  <ion-textarea
    ref="input"
    fill="solid"
    mode="ios"
    label-placement="floating"
    :label="label"
    color="primary"
    :type="type"
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
    :enterkeyhint="enterkeyhint"
    error-text="Invalid email"
    :clear-input="clearInput"
    @ionInput="$emit('update:modelValue', $event.target.value)"
    @ionBlur="markTouched"
    :value="modelValue"
    class="custom text-dark-600 text-sm"
  ></ion-textarea>
</template>

<script>
import { IonTextarea } from "@ionic/vue";

import { computed, ref } from "vue";

export default {
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
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
      type: Number,
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
    IonTextarea,
  },

  setup(props) {
    const hintColor = computed(() => {
      if (props.error) {
        return `var(--ion-color-danger)`;
      } else {
        `var(--ion-color-medium-tint)`;
      }
    });

    return {
      hintColor,
    };
  },

  computed: {
    formatAmount() {
      if (this.format) {
        let val = this.modelValue;
        val = parseInt(val);
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
          amount = parseInt(amount);
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
ion-textarea.custom {
  --padding-right: 4px !important;
}

ion-textarea.custom .helper-text {
  color: v-bind(hintColor) !important;
}
ion-textarea.custom.has-focus .label-text {
  color: var(--ion-color-primary) !important;
}
</style>
