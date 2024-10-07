<template>
  <GModal v-model:modalIsOpen="modelValue" title="Confirm delete">
    <div class="p-[24px]">
      <p class="text-[17px] font-medium">Are you sure you want to delete this task?</p>
      <div class="py-5 flex justify-end gap-5 items-center">
        <GBtn label="cancel" flat @click="emits('update:toggleModal', false)" />
        <GBtn class="text-white bg-red-600" label="Delete" @click="emits('confirm')" />
      </div>
    </div>
  </GModal>
</template>
<script lang="ts" setup>
import { computed } from "vue";
const props = defineProps({
  toggleModal: Boolean,
  label: String,
});
const emits = defineEmits(["confirm", "update:toggleModal"]);
const modelValue = computed({
  // getter
  get() {
    return props.toggleModal;
  },
  // setter
  set(newValue) {
    // console.log(newValue);
    return emits("update:toggleModal", newValue);
  },
});
</script>
