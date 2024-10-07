<template>
  <svg
    @click="emits('click')"
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="close">
      <mask
        id="mask0_3148_26829"
        style="mask-type: alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="22"
        height="22"
      >
        <rect id="Bounding box" width="22" height="22" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_3148_26829)">
        <path
          id="close_2"
          d="M5.86634 17.4173L4.58301 16.134L9.71634 11.0007L4.58301 5.86732L5.86634 4.58398L10.9997 9.71732L16.133 4.58398L17.4163 5.86732L12.283 11.0007L17.4163 16.134L16.133 17.4173L10.9997 12.284L5.86634 17.4173Z"
          fill="#1C1B1F"
        />
      </g>
    </g>
  </svg>
</template>
<script setup lang="ts">
const emits = defineEmits(["click"]);
</script>
