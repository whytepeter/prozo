<template>
  <div class="pin-input" :class="{ error: !!error }">
    <label class="mb-2 inline-block text-[#515251]">{{ label }}</label>
    <div class="flex items-center gap-4">
      <div v-for="i in length" :key="`input-${i}`" class="flex-1">
        <input
          :data-key="i - 1"
          v-model="input[i - 1]"
          @paste="handlePaste($event, i - 1)"
          :maxlength="1"
          type="text"
          ref="inputRefs"
          inputmode="numeric"
          @keydown="handleKeyDown($event, i - 1)"
          @input="handleInput($event, i - 1)"
          class=""
        />
      </div>
    </div>

    <div class="pin-input-error" v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  label: String,
  length: {
    type: [Number, String],
    default: 6,
  },
  error: Boolean || String,
});

const emit = defineEmits(["change"]);

const input = ref(Array(props.length).fill(""));
const inputRefs = ref([]);

// keys
const BACKSPACE_KEY = "Backspace";
const ARROWLEFT = "ArrowLeft";
const ARROWRIGHT = "ArrowRight";

const emitChange = () => {
  emit("change", input.value.join(""));
};

const handleKeyDown = (event, index) => {
  const keyPressed = event.key;
  let nextTarget = inputRefs.value[index + 1];
  let prevTarget = inputRefs.value[index - 1];
  let prevValue = input.value[index];
  switch (keyPressed) {
    case BACKSPACE_KEY:
      event.preventDefault();
      if (!prevValue) {
        if (prevTarget) {
          prevTarget.focus();
          prevTarget.select();
        }
      } else {
        // delete entry
        input.value[index] = "";
        emitChange();
      }
      break;
    case ARROWLEFT:
      event.preventDefault();
      if (prevTarget) {
        prevTarget.focus();
        prevTarget.select();
      }
      break;
    case ARROWRIGHT:
      event.preventDefault();
      if (nextTarget) {
        nextTarget.focus();
        nextTarget.select();
      }
      break;
    default:
      break;
  }
};

const handleInput = (event, index) => {
  event.preventDefault();
  let value = event.target.value;
  if (!value) return;
  input.value[index] = value;
  emitChange();
  let nextTarget = inputRefs.value[index + 1];
  if (nextTarget) {
    nextTarget.focus();
    nextTarget.select();
  }
};

const handlePaste = (event, index) => {
  event.preventDefault();
  // Get the pasted text from the clipboard
  const pastedText = event.clipboardData.getData("text/plain");
  // start filling from index
  let start = index;
  let newValue = [...input.value.slice(0, start), ...pastedText].slice(
    0,
    props.length
  );
  input.value = newValue;
  emitChange();
};
</script>

<style lang="scss" scoped>
.pin-input {
  input {
    @apply box-border h-10 w-full appearance-none rounded-lg border border-[#B5B6B5] bg-white px-2 text-center  font-semibold text-primary caret-secondary  outline-none;

    &:focus {
      @apply border-[#11453B];
    }
  }

  &.error {
    input {
      @apply border-[#EA4E4B];
    }
  }
}

.pin-input-error {
  @apply mt-2 text-sm text-error;
}
</style>
