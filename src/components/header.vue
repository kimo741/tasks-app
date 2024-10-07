<template>
  <div class="bg-[#EFF1F4]">
    <div class="p-[24px] container flex justify-between m-auto">
      <h1 class="text-[24px] font-bold text-black">Tasks</h1>
      <!-- add task Btn -->
      <button
        type="button"
        @click="emits('addTask')"
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        Add task
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
const emits = defineEmits(["addTask"]);
</script>
