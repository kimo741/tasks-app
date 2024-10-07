<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import CloseIcon from "@/icons/close.vue";
const emits = defineEmits(["update:modalIsOpen"]);

defineProps<{
  modalIsOpen: Boolean;
  title: string;
}>();
const closeModalOnEscape = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    // closeModal();
    emits("update:modalIsOpen", false);
  }
};
onMounted(() => {
  window.addEventListener("keydown", closeModalOnEscape);
});

onUnmounted(() => {
  window.removeEventListener("keydown", closeModalOnEscape);
});
</script>
<style lang="scss">
.bounce-enter-active {
  animation: bounce-in 1s linear;
}
@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.7);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.openDialog {
  animation: bounce-in 0.2s ease-in-out;
}
.v-enter-active {
  transition: opacity 0.5s ease-in-out 0.5s;
  // transition-delay: 0.8s;
}
.v-leave-active {
  transition: opacity 0.3s ease;
  // transition-delay: 0.5s;
}
.v-enter-from {
  visibility: hidden;
}
.v-enter-from,
.v-leave-to {
  // visibility: visible;
  opacity: 0;
}
</style>
<template>
  <Teleport v-if="modalIsOpen" to="body">
    <div class="fixed inset-0 z-[100] bg-black/20 flex items-center">
      <div
        class="w-full flex items-center justify-center overflow-auto py-4rem px-1rem openDialog"
      >
        <div class="w-full max-w-screen-sm bg-white rounded-[8px]">
          <div
            v-if="title"
            class="flex items-center p-[24px] justify-between under-line relative before:absolute before:w-full before:h-[1px] before:bg-[#EFF1F4] before:left-0 before:bottom-0"
          >
            <div class="text-[18px] font-semibold">{{ title }}</div>
            <div class="w-min">
              <CloseIcon
                class="cursor-pointer"
                @click="emits('update:modalIsOpen', false)"
              />
            </div>
          </div>

          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
